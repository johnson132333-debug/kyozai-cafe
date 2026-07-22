"use client";

import { useState } from "react";

type CopyLinkButtonProps = {
  label?: string;
  copiedLabel?: string;
  className?: string;
};

export function CopyLinkButton({
  label = "🔗 このページのリンクをコピー（児童生徒に送る）",
  copiedLabel = "✅ コピーしました！このまま貼り付けてください",
  className = "",
}: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed", error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900 ${className}`}
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
