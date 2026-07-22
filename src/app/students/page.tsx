import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { getAllMaterials, getOrderedSubjects, isStudentFacing } from "@/lib/materials";
import { StudentGradeGrid } from "@/components/StudentGradeGrid";

export const metadata: Metadata = {
  title: "がくしゅうひろば | 教材カフェ",
  description: "児童生徒が自分でタップして使える学習アプリのページです。",
};

export default async function StudentsPage() {
  // StudentGradeGrid reads ?grade=/&subject=/&unit= via useSearchParams so
  // shared deep links resume at the right step. That only works during the
  // server render (instead of falling back to an empty Suspense shell) if
  // this route is dynamically rendered per request rather than statically
  // prerendered once at build time.
  await connection();

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

      <Suspense fallback={null}>
        <StudentGradeGrid materials={materials} subjects={subjects} />
      </Suspense>

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
