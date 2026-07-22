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
