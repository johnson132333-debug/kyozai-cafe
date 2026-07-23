"use client";

import { useEffect } from "react";

type AdSlotProps = {
  slot: string;
  className?: string;
};

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

// AdSenseの読み込みスクリプトは、このコンポーネントが実際にレンダーされる
// ページ（先生用ページ）だけで読み込まれる。児童生徒用ページ(/students)は
// AdSlotを使わないため、AdSenseへのリクエスト自体が発生しない。
export function AdSlot({ slot, className }: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    if (!client) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("AdSense load error", error);
    }
  }, [client]);

  if (!client) {
    return (
      <div
        className={`flex min-h-[90px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500 ${className ?? ""}`}
      >
        広告スペース（AdSense 審査通過後に表示されます）
      </div>
    );
  }

  return (
    <>
      {/* next/scriptのafterInteractiveだと初期HTMLにはlink rel="preload"しか
          出力されず、実際のscriptタグはJS実行後にDOMへ追加される。AdSenseの
          サイト連携確認は生のHTMLでこのタグを探すため、あえて素のscriptタグ
          として出力する。 */}
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
        crossOrigin="anonymous"
      />
      <ins
        className={`adsbygoogle block ${className ?? ""}`}
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  );
}
