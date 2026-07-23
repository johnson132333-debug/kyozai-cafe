#!/usr/bin/env node
// content/materials/ の変更（追加・修正）を検知し、Xに1件のツイートとして
// お知らせを投稿する。GitHub Actions (.github/workflows/announce-on-x.yml)
// から、push ごとに実行される想定。
//
// 認証情報が未設定の場合は何もせず正常終了する（secretsをまだ登録していない
// 段階でワークフローが赤くならないようにするため）。

import { execSync } from "node:child_process";
import { createHmac, randomBytes } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";

const SITE_URL = "https://kyozai-cafe.com";
const MAX_TWEET_LENGTH = 260; // 絵文字・URL分の余裕をみて少し短めに

const apiKey = process.env.X_API_KEY;
const apiKeySecret = process.env.X_API_KEY_SECRET;
const accessToken = process.env.X_ACCESS_TOKEN;
const accessTokenSecret = process.env.X_ACCESS_TOKEN_SECRET;

if (!apiKey || !apiKeySecret || !accessToken || !accessTokenSecret) {
  console.log("X の認証情報が設定されていないため、投稿をスキップします。");
  process.exit(0);
}

const beforeSha = process.env.BEFORE_SHA;
const afterSha = process.env.AFTER_SHA || "HEAD";

function sh(cmd) {
  return execSync(cmd, { encoding: "utf-8" }).trim();
}

function resolveBeforeSha() {
  if (beforeSha && !/^0+$/.test(beforeSha)) {
    try {
      sh(`git cat-file -e ${beforeSha}`);
      return beforeSha;
    } catch {
      // フォールバックへ
    }
  }
  // 最初のpushなど、beforeが使えない場合は直前のコミットと比較する
  try {
    return sh("git rev-parse HEAD^");
  } catch {
    return null;
  }
}

const from = resolveBeforeSha();
if (!from) {
  console.log("比較対象のコミットが見つからないため、投稿をスキップします。");
  process.exit(0);
}

let diffOutput = "";
try {
  diffOutput = sh(
    `git diff --name-status ${from} ${afterSha} -- 'content/materials/*.json' 'content/materials/*.html'`
  );
} catch (error) {
  console.log("git diff に失敗しました:", error.message);
  process.exit(0);
}

if (!diffOutput) {
  console.log("教材の変更はありませんでした。");
  process.exit(0);
}

// slug -> "added" | "modified"
const bySlug = new Map();
for (const line of diffOutput.split("\n")) {
  const [status, path] = line.split("\t");
  if (!path || !path.startsWith("content/materials/")) continue;
  const filename = path.replace("content/materials/", "");
  const slug = filename.replace(/\.(json|html)$/, "");
  const isAdded = status === "A";
  const current = bySlug.get(slug);
  if (isAdded || current !== "added") {
    bySlug.set(slug, isAdded ? "added" : current === "added" ? "added" : "modified");
  }
}

const items = [];
for (const [slug, kind] of bySlug) {
  const jsonPath = `content/materials/${slug}.json`;
  if (!existsSync(jsonPath)) continue; // 削除された教材は対象外
  try {
    const meta = JSON.parse(readFileSync(jsonPath, "utf-8"));
    items.push({
      slug,
      kind,
      title: meta.title,
      grade: meta.grade,
      subject: meta.subject,
      studentFacing: meta.studentFacing !== false,
    });
  } catch (error) {
    console.log(`${jsonPath} の読み込みに失敗しました:`, error.message);
  }
}

if (items.length === 0) {
  console.log("お知らせ対象の教材がありませんでした。");
  process.exit(0);
}

function buildTweetText(items) {
  const added = items.filter((i) => i.kind === "added");
  const modified = items.filter((i) => i.kind === "modified");

  const lines = [];
  if (added.length === 1 && modified.length === 0) {
    const it = added[0];
    lines.push(`🆕 新しい教材を追加しました`);
    lines.push(`「${it.title}」（${it.grade} / ${it.subject}）`);
  } else if (modified.length === 1 && added.length === 0) {
    const it = modified[0];
    lines.push(`🔧 教材を更新しました`);
    lines.push(`「${it.title}」`);
  } else {
    if (added.length > 0) {
      lines.push(`🆕 新しい教材を${added.length}件追加しました`);
      lines.push(added.slice(0, 3).map((i) => `・${i.title}`).join("\n"));
      if (added.length > 3) lines.push(`ほか${added.length - 3}件`);
    }
    if (modified.length > 0) {
      lines.push(`🔧 ${modified.length}件の教材を更新しました`);
    }
  }
  lines.push("");
  lines.push(`☕ ${SITE_URL}`);

  let text = lines.join("\n");
  if (text.length > MAX_TWEET_LENGTH) {
    text = text.slice(0, MAX_TWEET_LENGTH - 1) + "…";
  }
  return text;
}

const tweetText = buildTweetText(items);
console.log("投稿内容:\n" + tweetText);

// ---------------- OAuth 1.0a 署名 ----------------

function percentEncode(str) {
  return encodeURIComponent(str).replace(
    /[!*'()]/g,
    (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase()
  );
}

function buildAuthHeader(method, url, oauthParams) {
  const sortedKeys = Object.keys(oauthParams).sort();
  const paramString = sortedKeys
    .map((k) => `${percentEncode(k)}=${percentEncode(oauthParams[k])}`)
    .join("&");

  const baseString = [
    method.toUpperCase(),
    percentEncode(url),
    percentEncode(paramString),
  ].join("&");

  const signingKey = `${percentEncode(apiKeySecret)}&${percentEncode(accessTokenSecret)}`;
  const signature = createHmac("sha1", signingKey).update(baseString).digest("base64");

  const headerParams = { ...oauthParams, oauth_signature: signature };
  const headerString = Object.keys(headerParams)
    .sort()
    .map((k) => `${percentEncode(k)}="${percentEncode(headerParams[k])}"`)
    .join(", ");

  return `OAuth ${headerString}`;
}

async function postTweet(text) {
  const url = "https://api.twitter.com/2/tweets";
  const oauthParams = {
    oauth_consumer_key: apiKey,
    oauth_token: accessToken,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: String(Math.floor(Date.now() / 1000)),
    oauth_nonce: randomBytes(16).toString("hex"),
    oauth_version: "1.0",
  };

  const authHeader = buildAuthHeader("POST", url, oauthParams);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  const body = await res.text();
  if (!res.ok) {
    throw new Error(`X API error (${res.status}): ${body}`);
  }
  console.log("投稿完了:", body);
}

try {
  await postTweet(tweetText);
} catch (error) {
  console.error("Xへの投稿に失敗しました:", error.message);
  process.exit(1);
}
