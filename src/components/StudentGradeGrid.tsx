"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Material } from "@/lib/materials";
import { getOrderedGrades } from "@/lib/grades";
import { GRADE_STYLES, GRADE_ICONS, GRADE_LABELS, DEFAULT_GRADE_STYLE } from "@/lib/gradeDisplay";
import {
  SUBJECT_STYLES,
  SUBJECT_ICONS,
  DEFAULT_SUBJECT_STYLE,
  DEFAULT_SUBJECT_ICON,
} from "@/lib/subjectDisplay";
import { STUDENT_ICONS, DEFAULT_STUDENT_ICON } from "@/lib/studentIcons";
import { CopyLinkButton } from "./CopyLinkButton";

type StudentGradeGridProps = {
  materials: Material[];
  subjects: string[];
};

function uniqueUnitsInOrder(items: Material[]): string[] {
  const seen: string[] = [];
  for (const item of items) {
    if (!seen.includes(item.unit)) seen.push(item.unit);
  }
  return seen;
}

function buildQuery(parts: { all?: boolean; grade?: string; subject?: string; unit?: string }) {
  const params = new URLSearchParams();
  if (parts.all) params.set("all", "1");
  if (parts.grade) params.set("grade", parts.grade);
  if (parts.subject) params.set("subject", parts.subject);
  if (parts.unit) params.set("unit", parts.unit);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

type Crumb = { label: string; onClick: () => void };

function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-slate-300 dark:text-slate-600">›</span>}
          <button
            type="button"
            onClick={crumb.onClick}
            className="rounded-full border-2 border-slate-200 bg-white px-4 py-1.5 text-sm font-bold text-slate-600 shadow-sm transition-colors duration-150 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400"
          >
            {crumb.label}
          </button>
        </span>
      ))}
    </div>
  );
}

export function StudentGradeGrid({ materials, subjects }: StudentGradeGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const showAll = searchParams.get("all") === "1";
  const selectedGrade = searchParams.get("grade");
  const selectedSubject = searchParams.get("subject");
  const selectedUnit = searchParams.get("unit");

  const grades = getOrderedGrades(materials.map((m) => m.grade));

  const goTo = (parts: { all?: boolean; grade?: string; subject?: string; unit?: string }) => {
    router.replace(pathname + buildQuery(parts), { scroll: false });
  };
  const resetToGradePicker = () => goTo({});

  function renderTiles(
    items: Material[],
    style: (slug: string) => string,
    icon: (slug: string) => string
  ) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {items.map((material) => (
          <Link
            key={material.slug}
            href={`/students/${material.slug}`}
            className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md active:translate-y-0 active:scale-[0.98] ${style(
              material.slug
            )}`}
          >
            <span className="text-5xl">{icon(material.slug)}</span>
            <span className="text-base font-bold">{material.title}</span>
          </Link>
        ))}
      </div>
    );
  }

  // --- 「ぜんぶ見る」：教科ごとにグループ化した全件表示 ---
  if (showAll) {
    return (
      <div>
        <Breadcrumb crumbs={[{ label: "ぜんぶのアプリ", onClick: resetToGradePicker }]} />
        <div className="mb-8 text-center">
          <CopyLinkButton />
        </div>
        <div className="space-y-12">
          {subjects.map((subject) => {
            const items = materials.filter((m) => m.subject === subject);
            if (items.length === 0) return null;
            const style = SUBJECT_STYLES[subject] ?? DEFAULT_SUBJECT_STYLE;
            return (
              <section key={subject}>
                <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">{subject}</h2>
                {renderTiles(
                  items,
                  () => style,
                  (slug) => STUDENT_ICONS[slug] ?? DEFAULT_STUDENT_ICON
                )}
              </section>
            );
          })}
        </div>
      </div>
    );
  }

  // --- ステップ1：なんねんせい？ ---
  if (!selectedGrade) {
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
              onClick={() => goTo({ grade })}
              className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-8 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md active:translate-y-0 active:scale-[0.98] ${
                GRADE_STYLES[grade] ?? DEFAULT_GRADE_STYLE
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
            onClick={() => goTo({ all: true })}
            className="rounded-full border-2 border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-500 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          >
            ぜんぶ見る
          </button>
        </div>
      </div>
    );
  }

  const gradeFiltered = materials.filter(
    (m) => m.grade === selectedGrade || m.grade === "全学年"
  );
  const gradeCrumb: Crumb = {
    label: GRADE_LABELS[selectedGrade] ?? selectedGrade,
    onClick: resetToGradePicker,
  };

  // --- ステップ2：きょうかは なに？ ---
  if (!selectedSubject) {
    const subjectsHere = subjects.filter((s) => gradeFiltered.some((m) => m.subject === s));

    return (
      <div>
        <Breadcrumb crumbs={[gradeCrumb]} />
        <div className="mb-8 text-center">
          <CopyLinkButton />
        </div>
        <p className="mb-6 text-center text-base font-bold text-slate-700 dark:text-slate-300">
          きょうかを えらんでね
        </p>
        {subjectsHere.length === 0 ? (
          <p className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
            このがくねんのアプリはまだありません。
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {subjectsHere.map((subject) => (
              <button
                key={subject}
                type="button"
                onClick={() => goTo({ grade: selectedGrade, subject })}
                className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-8 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md active:translate-y-0 active:scale-[0.98] ${
                  SUBJECT_STYLES[subject] ?? DEFAULT_SUBJECT_STYLE
                }`}
              >
                <span className="text-4xl">{SUBJECT_ICONS[subject] ?? DEFAULT_SUBJECT_ICON}</span>
                <span className="text-lg font-bold">{subject}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  const subjectFiltered = gradeFiltered.filter((m) => m.subject === selectedSubject);
  const subjectCrumb: Crumb = {
    label: selectedSubject,
    onClick: () => goTo({ grade: selectedGrade }),
  };
  const units = uniqueUnitsInOrder(subjectFiltered);

  // --- ステップ3：どれにする？（たんげんが2つ以上あるときだけ）---
  if (units.length > 1 && !selectedUnit) {
    return (
      <div>
        <Breadcrumb crumbs={[gradeCrumb, subjectCrumb]} />
        <div className="mb-8 text-center">
          <CopyLinkButton />
        </div>
        <p className="mb-6 text-center text-base font-bold text-slate-700 dark:text-slate-300">
          どれにする？ えらんでね
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {units.map((unit) => (
            <button
              key={unit}
              type="button"
              onClick={() => goTo({ grade: selectedGrade, subject: selectedSubject, unit })}
              className="rounded-xl border-2 border-slate-200 bg-white px-5 py-4 text-center text-base font-bold text-slate-800 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-500 dark:hover:bg-slate-800"
            >
              {unit}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // --- ステップ4：アプリ一覧 ---
  const finalMaterials =
    units.length > 1 && selectedUnit
      ? subjectFiltered.filter((m) => m.unit === selectedUnit)
      : subjectFiltered;

  const crumbs = [gradeCrumb, subjectCrumb];
  if (units.length > 1 && selectedUnit) {
    crumbs.push({
      label: selectedUnit,
      onClick: () => goTo({ grade: selectedGrade, subject: selectedSubject }),
    });
  }

  return (
    <div>
      <Breadcrumb crumbs={crumbs} />
      <div className="mb-8 text-center">
        <CopyLinkButton />
      </div>
      {finalMaterials.length === 0 ? (
        <p className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
          アプリがまだありません。
        </p>
      ) : (
        renderTiles(
          finalMaterials,
          () => SUBJECT_STYLES[selectedSubject] ?? DEFAULT_SUBJECT_STYLE,
          (slug) => STUDENT_ICONS[slug] ?? DEFAULT_STUDENT_ICON
        )
      )}
    </div>
  );
}
