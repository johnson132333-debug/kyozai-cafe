import Link from "next/link";
import type { Metadata } from "next";
import { getAllMaterials, getOrderedSubjects, isStudentFacing } from "@/lib/materials";
import { STUDENT_ICONS, DEFAULT_STUDENT_ICON } from "@/lib/studentIcons";

export const metadata: Metadata = {
  title: "がくしゅうひろば | 教材カフェ",
  description: "児童生徒が自分でタップして使える学習アプリのページです。",
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

export default function StudentsPage() {
  const materials = getAllMaterials().filter(isStudentFacing);
  const subjects = getOrderedSubjects(materials);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          🌟 がくしゅうひろば
        </h1>
        <p className="text-sm text-slate-600 sm:text-base dark:text-slate-400">
          すきなアプリを タップして あそんでみよう！
        </p>
      </div>

      <div className="space-y-12">
        {subjects.map((subject) => {
          const items = materials.filter((m) => m.subject === subject);
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
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        >
          🔧 せんせい用ページはこちら
        </Link>
      </div>
    </div>
  );
}
