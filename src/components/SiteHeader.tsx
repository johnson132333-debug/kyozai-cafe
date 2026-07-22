import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 sticky top-0 z-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            教材カフェ
          </span>
          <span className="hidden text-xs text-slate-500 sm:inline dark:text-slate-400">
            先生のためのすぐ使えるWeb教材集
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <a
            href="#materials"
            className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            教材一覧
          </a>
          <a
            href="#about"
            className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            このサイトについて
          </a>
        </nav>
      </div>
    </header>
  );
}
