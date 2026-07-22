// 学年選択UI（先生用・児童生徒用の両方）で使う、単一学年の表示順。
// 教材のgradeフィールドはこの単学年表記に統一されている想定。
export const EXACT_GRADE_ORDER = [
  "小学1年",
  "小学2年",
  "小学3年",
  "小学4年",
  "小学5年",
  "小学6年",
  "中学1年",
  "全学年",
];

export function getOrderedGrades(grades: string[]): string[] {
  const present = new Set(grades);
  const ordered = EXACT_GRADE_ORDER.filter((g) => present.has(g));
  const rest = Array.from(present)
    .filter((g) => !EXACT_GRADE_ORDER.includes(g))
    .sort((a, b) => a.localeCompare(b, "ja"));
  return [...ordered, ...rest];
}
