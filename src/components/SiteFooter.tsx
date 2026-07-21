export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-8 text-xs text-slate-500 dark:text-slate-400">
        <p className="mb-1">
          教材ラボ｜掲載コードは自由にコピー・改変して授業でご利用いただけます。
        </p>
        <p>&copy; {new Date().getFullYear()} 教材ラボ</p>
      </div>
    </footer>
  );
}
