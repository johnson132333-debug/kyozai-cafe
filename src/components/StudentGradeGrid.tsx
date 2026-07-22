"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Material } from "@/lib/materials";
import { getOrderedGrades } from "@/lib/grades";
import { STUDENT_ICONS, DEFAULT_STUDENT_ICON } from "@/lib/studentIcons";

type StudentGradeGridProps = {
  materials: Material[];
  subjects: string[];
};

const SUBJECT_STYLES: Record<string, string> = {
  算数: "bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-100 border-amber-300 dark:border-amber-800",
  国語: "bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-100 border-rose-300 dark:border-rose-800",
  社会: "bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-100 border-emerald-300 dark:border-emerald-800",
  理科: "bg-sky-100 dark:bg-sky-950 text-sky-900 dark:text-sky-100 border-sky-300 dark:border-sky-800",
  英語: "bg-violet-100 dark:bg-violet-950 text-violet-900 dark:text-violet-100 border-violet-300 dark:border-violet-800",
  学級経営: "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700",
  特別支援: "bg-pink-100 dark:bg-pink-950 text-pink-900 dark:text-pink-100 border-pink-300 dark:border-pink-800",
};
const DEFAULT_SUBJECT_STYLE =
  "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700";

const GRADE_STYLES: Record<string, string> = {
  小学2年: "bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-100 border-amber-300 dark:border-amber-800",
  小学3年: "bg-orange-100 dark:bg-orange-950 text-orange-900 dark:text-orange-100 border-orange-300 dark:border-orange-800",
  小学4年: "bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-100 border-emerald-300 dark:border-emerald-800",
  小学5年: "bg-sky-100 dark:bg-sky-950 text-sky-900 dark:text-sky-100 border-sky-300 dark:border-sky-800",
  小学6年: "bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-100 border-indigo-300 dark:border-indigo-800",
  中学1年: "bg-violet-100 dark:bg-violet-950 text-violet-900 dark:text-violet-100 border-violet-300 dark:border-violet-800",
  全学年: "bg-pink-100 dark:bg-pink-950 text-pink-900 dark:text-pink-100 border-pink-300 dark:border-pink-800",
};

const GRADE_LABELS: Record<string, string> = {
  小学2年: "2年生",
  小学3年: "3年生",
  小学4年: "4年生",
  小学5年: "5年生",
  小学6年: "6年生",
  中学1年: "中学1年",
  全学年: "みんな向け",
};

const GRADE_ICONS: Record<string, string> = {
  小学2年: "2️⃣",
  小学3年: "3️⃣",
  小学4年: "4️⃣",
  小学5年: "5️⃣",
  小学6年: "6️⃣",
  中学1年: "🎓",
  全学年: "🌈",
};

export function StudentGradeGrid({ materials, subjects }: StudentGradeGridProps) {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const grades = useMemo(() => getOrderedGrades(materials.map((m) => m.grade)), [materials]);

  const visibleMaterials = useMemo(() => {
    if (showAll || !selectedGrade) return materials;
    return materials.filter((m) => m.grade === selectedGrade || m.grade === "全学年");
  }, [materials, selectedGrade, showAll]);

  const visibleSubjects = useMemo(
    () => subjects.filter((s) => visibleMaterials.some((m) => m.subject === s)),
    [subjects, visibleMaterials]
  );

  if (!selectedGrade && !showAll) {
    return (
      <div>
        <p className="mb-6 text-center text-base font-bold text-slate-700 dark:text-slate-300">
          なんねんせい？ えらんでね
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {grades.map((grade) => (
            <button
              key={grade}
              type="button"
              onClick={() => setSelectedGrade(grade)}
              className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-8 text-center transition hover:scale-[1.03] active:scale-[0.98] ${
                GRADE_STYLES[grade] ?? DEFAULT_SUBJECT_STYLE
              }`}
            >
              <span className="text-4xl">{GRADE_ICONS[grade] ?? "⭐"}</span>
              <span className="text-lg font-bold">{GRADE_LABELS[grade] ?? grade}</span>
            </button>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="rounded-full border-2 border-slate-200 px-5 py-2 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            ぜんぶ見る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-center gap-3">
        <span className="rounded-full bg-slate-900 px-4 py-1.5 text-sm font-bold text-white dark:bg-white dark:text-slate-900">
          {showAll ? "ぜんぶのアプリ" : (GRADE_LABELS[selectedGrade!] ?? selectedGrade)}
        </span>
        <button
          type="button"
          onClick={() => {
            setSelectedGrade(null);
            setShowAll(false);
          }}
          className="rounded-full border-2 border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:text-slate-400"
        >
          学年をえらびなおす
        </button>
      </div>

      <div className="space-y-12">
        {visibleSubjects.map((subject) => {
          const items = visibleMaterials.filter((m) => m.subject === subject);
          if (items.length === 0) return null;
          const style = SUBJECT_STYLES[subject] ?? DEFAULT_SUBJECT_STYLE;

          return (
            <section key={subject}>
              <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">{subject}</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {items.map((material) => (
                  <Link
                    key={material.slug}
                    href={`/students/${material.slug}`}
                    className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-6 text-center transition hover:scale-[1.03] active:scale-[0.98] ${style}`}
                  >
                    <span className="text-5xl">
                      {STUDENT_ICONS[material.slug] ?? DEFAULT_STUDENT_ICON}
                    </span>
                    <span className="text-base font-bold">{material.title}</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
        {visibleSubjects.length === 0 && (
          <p className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
            この学年のアプリはまだありません。
          </p>
        )}
      </div>
    </div>
  );
}
