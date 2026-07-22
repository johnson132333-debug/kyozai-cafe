type LivePreviewProps = {
  code: string;
  title: string;
  slug: string;
};

export function LivePreview({ code, title, slug }: LivePreviewProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm dark:border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          プレビュー
        </span>
        <a
          href={`/materials/${slug}/raw`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 transition-colors hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
        >
          新しいタブで開く ↗
        </a>
      </div>
      <iframe
        title={title}
        srcDoc={code}
        sandbox="allow-scripts allow-forms allow-modals allow-popups"
        className="h-[560px] w-full bg-white"
      />
    </div>
  );
}
