"use client";

import { useMemo, useState } from "react";
import type { Material } from "@/lib/materials";
import { getOrderedGrades } from "@/lib/grades";
import { GRADE_STYLES, GRADE_ICONS, GRADE_LABELS, DEFAULT_GRADE_STYLE } from "@/lib/gradeDisplay";
import { MaterialCard } from "./MaterialCard";

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

export function MaterialGrid({ materials, subjects }: MaterialGridProps) {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [query, setQuery] = useState("");

  const grades = useMemo(() => getOrderedGrades(materials.map((m) => m.grade)), [materials]);

  const gradeFiltered = useMemo(() => {
    if (showAll || !selectedGrade) return materials;
    return materials.filter((m) => m.grade === selectedGrade || m.grade === "全学年");
  }, [materials, selectedGrade, showAll]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return gradeFiltered.filter((m) => {
      if (!q) return true;
      return (
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.unit.toLowerCase().includes(q) ||
        m.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [gradeFiltered, query]);

  const bySubject = useMemo(() => {
    const map = new Map<string, Material[]>();
    for (const m of filtered) {
      if (!map.has(m.subject)) map.set(m.subject, []);
      map.get(m.subject)!.push(m);
    }
    return map;
  }, [filtered]);

  const visibleSubjects = subjects.filter((s) => (bySubject.get(s)?.length ?? 0) > 0);

  if (!selectedGrade && !showAll) {
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
              className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-8 text-center transition hover:scale-[1.03] active:scale-[0.98] ${
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
      <div className="mb-6 flex items-center justify-center gap-3">
        <span className="rounded-full bg-slate-900 px-4 py-1.5 text-sm font-bold text-white dark:bg-white dark:text-slate-900">
          {showAll ? "すべての学年" : (GRADE_LABELS[selectedGrade!] ?? selectedGrade)}
        </span>
        <button
          type="button"
          onClick={() => {
            setSelectedGrade(null);
            setShowAll(false);
          }}
          className="rounded-full border-2 border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:text-slate-400"
        >
          学年を選びなおす
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="教材名・単元・タグで検索"
          className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none sm:w-72 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>

      {visibleSubjects.length > 1 && (
        <nav className="mb-10 flex flex-wrap gap-2 border-b border-slate-200 pb-6 dark:border-slate-800">
          {visibleSubjects.map((subject) => (
            <a
              key={subject}
              href={`#subject-${subject}`}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
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
