export type GradeBand = "小学校" | "中学校" | "全学年";

export const GRADE_BANDS: GradeBand[] = ["小学校", "中学校", "全学年"];

// 「小学4年〜中学1年」のような自由記述の学年から、大まかな学年帯を判定します
export function getGradeBands(grade: string): GradeBand[] {
  const bands: GradeBand[] = [];
  if (grade.includes("小学")) bands.push("小学校");
  if (grade.includes("中学")) bands.push("中学校");
  if (grade.includes("全学年")) bands.push("全学年");
  return bands;
}

// 児童生徒用ページの学年選択で使う、単一学年の表示順。
// 教材のgradeフィールドはこの単学年表記に統一されている想定。
export const EXACT_GRADE_ORDER = [
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
