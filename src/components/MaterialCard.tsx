import Link from "next/link";
import type { Material } from "@/lib/materials";

export function MaterialCard({ material }: { material: Material }) {
  return (
    <Link
      href={`/materials/${material.slug}`}
      className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-2 flex flex-wrap gap-1.5">
        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          {material.subject}
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {material.grade}
        </span>
      </div>
      <h3 className="mb-1.5 text-base font-semibold text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
        {material.title}
      </h3>
      <p className="mb-3 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
        {material.description}
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5">
        {material.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-slate-50 px-2 py-0.5 text-[11px] text-slate-500 dark:bg-slate-800 dark:text-slate-400"
          >
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
