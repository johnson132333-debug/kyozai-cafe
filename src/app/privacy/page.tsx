import type { Metadata } from "next";
import { SITE_NAME, CONTACT_FORM_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: `プライバシーポリシー | ${SITE_NAME}`,
  description: `${SITE_NAME}のプライバシーポリシーです。`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        プライバシーポリシー
      </h1>

      <p className="mb-6">
        {SITE_NAME}（以下「当サイト」）における、個人情報およびアクセス情報の取り扱いについて説明します。
      </p>

      <h2 className="mb-2 mt-8 text-lg font-semibold text-slate-900 dark:text-white">
        広告について
      </h2>
      <p className="mb-4">
        当サイトは、第三者配信の広告サービス（Google
        AdSenseなど）を利用する場合があります。このような広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookie（クッキー）を使用することがあります。
      </p>
      <p className="mb-4">
        Cookieを無効にする方法や、Google
        AdSenseに関する詳細については
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:no-underline dark:text-blue-400"
        >
          広告 – ポリシーと規約 – Google
        </a>
        をご確認ください。
      </p>

      <h2 className="mb-2 mt-8 text-lg font-semibold text-slate-900 dark:text-white">
        アクセス解析ツールについて
      </h2>
      <p className="mb-4">
        当サイトは、サイトの利用状況を把握するためにアクセス解析ツールを利用する場合があります。これらのツールはCookieを使用してデータを収集しますが、個人を特定する情報は含まれません。
      </p>

      <h2 className="mb-2 mt-8 text-lg font-semibold text-slate-900 dark:text-white">
        掲載コードの利用について
      </h2>
      <p className="mb-4">
        当サイトに掲載されている教材コードは、学校の授業などで自由にコピー・改変してご利用いただけます。ただし、当サイトのコンテンツを利用したことにより生じたいかなる損害についても、当サイトは責任を負いません。
      </p>

      <h2 className="mb-2 mt-8 text-lg font-semibold text-slate-900 dark:text-white">
        お問い合わせ
      </h2>
      <p>
        本ポリシーや教材の作成・修正に関するお問い合わせは、下記のフォームからご連絡ください。
        <br />
        <a
          href={CONTACT_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block rounded-full bg-blue-600 px-5 py-2 font-semibold text-white no-underline hover:bg-blue-700"
        >
          お問い合わせフォームを開く
        </a>
        <br />
        <span className="mt-2 inline-block text-xs text-slate-500 dark:text-slate-400">
          メールでのご連絡は kyozai.cafe@gmail.com までお願いします。
        </span>
      </p>

      <p className="mt-10 text-xs text-slate-400">最終更新日: 2026年7月22日</p>
    </div>
  );
}
