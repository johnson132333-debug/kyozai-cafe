import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllMaterials,
  getMaterial,
  getMaterialCode,
  isStudentFacing,
} from "@/lib/materials";

export async function generateStaticParams() {
  return getAllMaterials()
    .filter(isStudentFacing)
    .map((material) => ({ slug: material.slug }));
}

export async function generateMetadata(
  props: PageProps<"/students/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const material = getMaterial(slug);
  if (!material) return {};
  return { title: `${material.title} | がくしゅうひろば` };
}

export default async function StudentPlayPage(
  props: PageProps<"/students/[slug]">
) {
  const { slug } = await props.params;
  const material = getMaterial(slug);

  if (!material || !isStudentFacing(material)) {
    notFound();
  }

  const code = getMaterialCode(slug);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Link
          href="/students"
          className="shrink-0 rounded-full bg-slate-900 px-6 py-3 text-base font-bold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          ← もどる
        </Link>
        <h1 className="truncate text-lg font-bold text-slate-900 dark:text-white">
          {material.title}
        </h1>
        <span className="w-24 shrink-0" aria-hidden="true" />
      </div>

      <div className="overflow-hidden rounded-2xl border-4 border-slate-200 dark:border-slate-800">
        <iframe
          title={material.title}
          srcDoc={code}
          sandbox="allow-scripts allow-forms allow-modals allow-popups"
          className="h-[75vh] w-full bg-white"
        />
      </div>
    </div>
  );
}
