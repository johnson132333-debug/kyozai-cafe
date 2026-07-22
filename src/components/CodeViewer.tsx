"use client";

import { useState } from "react";

type CodeViewerProps = {
  code: string;
  slug: string;
};

export function CodeViewer({ code, slug }: CodeViewerProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed", error);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm dark:border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
        >
          {open ? "▼ コードを隠す" : "▶ コードを表示"}
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            {copied ? "✓ コピーしました！" : "コードをコピー"}
          </button>
          <a
            href={`/materials/${slug}/raw`}
            download={`${slug}.html`}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            ダウンロード
          </a>
        </div>
      </div>
      {open && (
        <pre className="max-h-[500px] overflow-auto bg-slate-950 p-4 text-xs leading-relaxed text-slate-100">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
