"use client";

import { useMemo, useState } from "react";
import type { Material } from "@/lib/materials";
import { getOrderedGrades } from "@/lib/grades";
import { GRADE_STYLES, GRADE_LABELS, DEFAULT_GRADE_STYLE } from "@/lib/gradeDisplay";
import { SUBJECT_STYLES, DEFAULT_SUBJECT_STYLE } from "@/lib/subjectDisplay";
import { MaterialCard } from "./MaterialCard";
import { GradeIcon, SubjectIcon } from "./icons";

type MaterialGridProps = {
  materials: Material[];
  subjects: string[];
};

function groupByUnit(items: Material[]): [string, Material[]][] {
  const map = new Map<string, Material[]>();
  for (const item of items) {
    if (!map.has(item.unit)) map.set(item.unit, []);
    map.get(item.unit)!.push(item);
  }
  return Array.from(map.entries());
}

function uniqueUnitsInOrder(items: Material[]): string[] {
  const seen: string[] = [];
  for (const item of items) {
    if (!seen.includes(item.unit)) seen.push(item.unit);
  }
  return seen;
}

type Crumb = { label: string; onClick: () => void };

function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-slate-300 dark:text-slate-600">›</span>}
          <button
            type="button"
            onClick={crumb.onClick}
            className="rounded-full border-2 border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition-colors duration-150 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400"
          >
            {crumb.label}
          </button>
        </span>
      ))}
    </div>
  );
}

export function MaterialGrid({ materials, subjects }: MaterialGridProps) {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const grades = useMemo(() => getOrderedGrades(materials.map((m) => m.grade)), [materials]);

  const resetToGradePicker = () => {
    setSelectedGrade(null);
    setShowAll(false);
    setSelectedSubject(null);
    setSelectedUnit(null);
  };

  // --- 「ぜんぶ見る」：従来どおり検索＋教科別・単元別の一覧をそのまま表示 ---
  if (showAll) {
    const filtered = materials.filter((m) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.unit.toLowerCase().includes(q) ||
        m.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
    const bySubject = new Map<string, Material[]>();
    for (const m of filtered) {
      if (!bySubject.has(m.subject)) bySubject.set(m.subject, []);
      bySubject.get(m.subject)!.push(m);
    }
    const visibleSubjects = subjects.filter((s) => (bySubject.get(s)?.length ?? 0) > 0);

    return (
      <div>
        <Breadcrumb crumbs={[{ label: "すべての学年", onClick: resetToGradePicker }]} />
        <div className="mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="教材名・単元・タグで検索"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm transition-shadow focus:border-blue-500 focus:shadow-md focus:outline-none sm:w-72 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>

        {visibleSubjects.length > 1 && (
          <nav className="mb-10 flex flex-wrap gap-2 border-b border-slate-200 pb-6 dark:border-slate-800">
            {visibleSubjects.map((subject) => (
              <a
                key={subject}
                href={`#subject-${subject}`}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 shadow-sm transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
              >
                {subject}（{bySubject.get(subject)?.length}）
              </a>
            ))}
          </nav>
        )}

        {visibleSubjects.length === 0 ? (
          <p className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
            該当する教材が見つかりませんでした。
          </p>
        ) : (
          <div className="space-y-12">
            {visibleSubjects.map((subject) => {
              const items = bySubject.get(subject) ?? [];
              const units = groupByUnit(items);
              return (
                <section key={subject} id={`subject-${subject}`} className="scroll-mt-20">
                  <h2 className="mb-5 flex items-baseline gap-2 border-b border-slate-200 pb-2 text-xl font-bold text-slate-900 dark:border-slate-800 dark:text-white">
                    {subject}
                    <span className="text-sm font-normal text-slate-400">{items.length}件</span>
                  </h2>
                  <div className="space-y-7">
                    {units.map(([unit, unitItems]) => (
                      <div key={unit}>
                        <h3 className="mb-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                          {unit}
                        </h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {unitItems.map((material) => (
                            <MaterialCard key={material.slug} material={material} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // --- ステップ1：学年を選ぶ ---
  if (!selectedGrade) {
    return (
      <div>
        <p className="mb-6 text-center text-base font-bold text-slate-700 dark:text-slate-300">
          担当学年を選んでください
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {grades.map((grade) => (
            <button
              key={grade}
              type="button"
              onClick={() => setSelectedGrade(grade)}
              className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-8 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md active:translate-y-0 active:scale-[0.98] ${
                GRADE_STYLES[grade] ?? DEFAULT_GRADE_STYLE
              }`}
            >
              <GradeIcon grade={grade} className="h-10 w-10" />
              <span className="text-lg font-bold">{GRADE_LABELS[grade] ?? grade}</span>
            </button>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
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

  // --- ステップ2：教科を選ぶ ---
  if (!selectedSubject) {
    const subjectsHere = subjects.filter((s) => gradeFiltered.some((m) => m.subject === s));

    return (
      <div>
        <Breadcrumb crumbs={[gradeCrumb]} />
        <p className="mb-6 text-center text-base font-bold text-slate-700 dark:text-slate-300">
          教科を選んでください
        </p>
        {subjectsHere.length === 0 ? (
          <p className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
            この学年の教材はまだありません。
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {subjectsHere.map((subject) => {
              const count = gradeFiltered.filter((m) => m.subject === subject).length;
              return (
                <button
                  key={subject}
                  type="button"
                  onClick={() => setSelectedSubject(subject)}
                  className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-8 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md active:translate-y-0 active:scale-[0.98] ${
                    SUBJECT_STYLES[subject] ?? DEFAULT_SUBJECT_STYLE
                  }`}
                >
                  <SubjectIcon subject={subject} className="h-10 w-10" />
                  <span className="text-lg font-bold">{subject}</span>
                  <span className="text-xs font-normal opacity-70">{count}件</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const subjectFiltered = gradeFiltered.filter((m) => m.subject === selectedSubject);
  const subjectCrumb: Crumb = {
    label: selectedSubject,
    onClick: () => {
      setSelectedSubject(null);
      setSelectedUnit(null);
    },
  };
  const units = uniqueUnitsInOrder(subjectFiltered);

  // --- ステップ3：単元を選ぶ（単元が2つ以上あるときだけ）---
  if (units.length > 1 && !selectedUnit) {
    return (
      <div>
        <Breadcrumb crumbs={[gradeCrumb, subjectCrumb]} />
        <p className="mb-6 text-center text-base font-bold text-slate-700 dark:text-slate-300">
          単元を選んでください
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {units.map((unit) => {
            const count = subjectFiltered.filter((m) => m.unit === unit).length;
            return (
              <button
                key={unit}
                type="button"
                onClick={() => setSelectedUnit(unit)}
                className="flex items-center justify-between rounded-xl border-2 border-slate-200 bg-white px-5 py-4 text-left shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-500 dark:hover:bg-slate-800"
              >
                <span className="font-semibold text-slate-800 dark:text-slate-100">{unit}</span>
                <span className="text-xs text-slate-400">{count}件</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // --- ステップ4：教材一覧 ---
  const finalMaterials =
    units.length > 1 && selectedUnit
      ? subjectFiltered.filter((m) => m.unit === selectedUnit)
      : subjectFiltered;

  const crumbs = [gradeCrumb, subjectCrumb];
  if (units.length > 1 && selectedUnit) {
    crumbs.push({ label: selectedUnit, onClick: () => setSelectedUnit(null) });
  }

  const filteredByQuery = finalMaterials.filter((m) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      m.title.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  return (
    <div>
      <Breadcrumb crumbs={crumbs} />
      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="教材名・タグで検索"
          className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none sm:w-72 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>
      {filteredByQuery.length === 0 ? (
        <p className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
          該当する教材が見つかりませんでした。
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredByQuery.map((material) => (
            <MaterialCard key={material.slug} material={material} />
          ))}
        </div>
      )}
    </div>
  );
}
