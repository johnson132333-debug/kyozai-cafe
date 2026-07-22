# 教材カフェ (kyozai-cafe)

先生が授業で使うツール・クイズ・シミュレーションをブラウザ上でその場に試し、コードをコピー／ダウンロードして学校ですぐ使える教材ライブラリです。Next.js (App Router) + Tailwind CSS で構築しています。

## 開発

```bash
npm install
npm run dev
```

http://localhost:3000 で確認できます。

## 教材を追加する方法

`content/materials/` に、同じ slug（ファイル名）で2ファイルを追加します。

- `<slug>.json` — メタデータ

  ```json
  {
    "slug": "example-tool",
    "title": "教材のタイトル",
    "subject": "教科名",
    "grade": "対象学年",
    "description": "教材の説明文",
    "tags": ["タグ1", "タグ2"]
  }
  ```

- `<slug>.html` — 実際に動くコード（HTML/CSS/JSを1ファイルに自己完結させる）。サンドボックス化された `iframe` にそのまま読み込まれてプレビュー表示されます。

ファイルを追加するだけで、トップページの一覧・詳細ページ・ダウンロードが自動的に生成されます（ビルド時に `content/materials/` を読み込みます）。

## 広告（Google AdSense）の設定

1. Google AdSense の審査に申し込み、承認されたら発行される publisher ID（`ca-pub-xxxxxxxxxxxxxxxx`）を取得します。
2. `.env.example` を `.env.local` にコピーし、`NEXT_PUBLIC_ADSENSE_CLIENT` にその ID を設定します。
3. `public/ads.txt` に、AdSense 管理画面で案内される1行を追記します。
4. 未設定の間、広告枠にはプレースホルダーが表示されます（本番エラーにはなりません）。

審査には実際に公開されたサイトと、ある程度のコンテンツ・トラフィックが必要です。まずはVercelなどにデプロイして独自ドメインで公開してから申請してください。

## デプロイ（Vercel推奨）

```bash
npm install -g vercel
vercel
```

もしくは GitHub リポジトリを Vercel に接続すれば、push のたびに自動デプロイされます。
