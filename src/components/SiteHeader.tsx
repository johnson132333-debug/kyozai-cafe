import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/85 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/85">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-base shadow-sm shadow-blue-600/30">
            ☕
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
              教材カフェ
            </span>
            <span className="hidden text-[11px] text-slate-500 sm:inline dark:text-slate-400">
              先生のためのすぐ使えるWeb教材集
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm sm:gap-2">
          <Link
            href="/#materials"
            className="rounded-full px-3 py-1.5 font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            教材一覧
          </Link>
          <Link
            href="/students"
            className="rounded-full bg-blue-600 px-3.5 py-1.5 font-semibold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700"
          >
            児童生徒用ページ
          </Link>
          <Link
            href="/#about"
            className="hidden rounded-full px-3 py-1.5 font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:inline-block dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            このサイトについて
          </Link>
        </nav>
      </div>
    </header>
  );
}
