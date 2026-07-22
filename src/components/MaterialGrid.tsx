"use client";

import { useMemo, useState } from "react";
import type { Material } from "@/lib/materials";
import type { GradeBand } from "@/lib/grades";
import { GRADE_BANDS, getGradeBands } from "@/lib/grades";
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
  const [query, setQuery] = useState("");
  const [gradeBand, setGradeBand] = useState<GradeBand | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return materials.filter((m) => {
      const matchesGrade = !gradeBand || getGradeBands(m.grade).includes(gradeBand);
      const matchesQuery =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.unit.toLowerCase().includes(q) ||
        m.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesGrade && matchesQuery;
    });
  }, [materials, query, gradeBand]);

  const bySubject = useMemo(() => {
    const map = new Map<string, Material[]>();
    for (const m of filtered) {
      if (!map.has(m.subject)) map.set(m.subject, []);
      map.get(m.subject)!.push(m);
    }
    return map;
  }, [filtered]);

  const visibleSubjects = subjects.filter((s) => (bySubject.get(s)?.length ?? 0) > 0);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="教材名・単元・タグで検索"
          className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none sm:w-72 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setGradeBand(null)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              gradeBand === null
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            すべての学年
          </button>
          {GRADE_BANDS.map((band) => (
            <button
              key={band}
              type="button"
              onClick={() => setGradeBand(band)}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                gradeBand === band
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {band}
            </button>
          ))}
        </div>
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
