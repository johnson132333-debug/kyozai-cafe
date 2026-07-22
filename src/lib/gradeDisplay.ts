// 単一学年（EXACT_GRADE_ORDER）の表示用スタイル・ラベル・アイコン。
// 児童生徒用・先生用の両方の学年選択UIで共有します。

export const GRADE_STYLES: Record<string, string> = {
  小学1年: "bg-lime-100 dark:bg-lime-950 text-lime-900 dark:text-lime-100 border-lime-300 dark:border-lime-800",
  小学2年: "bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-100 border-amber-300 dark:border-amber-800",
  小学3年: "bg-orange-100 dark:bg-orange-950 text-orange-900 dark:text-orange-100 border-orange-300 dark:border-orange-800",
  小学4年: "bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-100 border-emerald-300 dark:border-emerald-800",
  小学5年: "bg-sky-100 dark:bg-sky-950 text-sky-900 dark:text-sky-100 border-sky-300 dark:border-sky-800",
  小学6年: "bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-100 border-indigo-300 dark:border-indigo-800",
  中学1年: "bg-violet-100 dark:bg-violet-950 text-violet-900 dark:text-violet-100 border-violet-300 dark:border-violet-800",
  全学年: "bg-pink-100 dark:bg-pink-950 text-pink-900 dark:text-pink-100 border-pink-300 dark:border-pink-800",
};

export const DEFAULT_GRADE_STYLE =
  "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700";

export const GRADE_LABELS: Record<string, string> = {
  小学1年: "1年生",
  小学2年: "2年生",
  小学3年: "3年生",
  小学4年: "4年生",
  小学5年: "5年生",
  小学6年: "6年生",
  中学1年: "中学1年",
  全学年: "みんな向け",
};
