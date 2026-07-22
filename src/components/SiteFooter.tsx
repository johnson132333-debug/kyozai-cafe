import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-xs">
            ☕
          </span>
          <p>
            教材カフェ｜掲載コードは自由にコピー・改変して授業でご利用いただけます。
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/privacy"
            className="text-slate-500 underline decoration-slate-300 underline-offset-2 hover:text-slate-800 hover:decoration-slate-500 dark:text-slate-400 dark:hover:text-slate-200"
          >
            プライバシーポリシー
          </Link>
          <span>&copy; {new Date().getFullYear()} 教材カフェ</span>
        </div>
      </div>
    </footer>
  );
}
