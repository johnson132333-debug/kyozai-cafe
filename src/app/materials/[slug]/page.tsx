import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllMaterials,
  getMaterial,
  getMaterialCode,
} from "@/lib/materials";
import { LivePreview } from "@/components/LivePreview";
import { CodeViewer } from "@/components/CodeViewer";
import { AdSlot } from "@/components/AdSlot";

export async function generateStaticParams() {
  return getAllMaterials().map((material) => ({ slug: material.slug }));
}

export async function generateMetadata(
  props: PageProps<"/materials/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const material = getMaterial(slug);
  if (!material) return {};
  return {
    title: `${material.title} | 教材ラボ`,
    description: material.description,
  };
}

export default async function MaterialPage(
  props: PageProps<"/materials/[slug]">
) {
  const { slug } = await props.params;
  const material = getMaterial(slug);

  if (!material) {
    notFound();
  }

  const code = getMaterialCode(slug);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        ← 教材一覧に戻る
      </Link>

      <div className="mb-2 flex flex-wrap gap-1.5">
        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          {material.subject}
        </span>
        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          {material.unit}
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {material.grade}
        </span>
      </div>

      <h1 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
        {material.title}
      </h1>
      <p className="mb-8 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
        {material.description}
      </p>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <LivePreview code={code} title={material.title} slug={material.slug} />
          <CodeViewer code={code} slug={material.slug} />
        </div>
        <div className="space-y-6">
          <AdSlot slot="0000000001" />
          <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            <h2 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
              使い方
            </h2>
            <ol className="list-decimal space-y-1 pl-4">
              <li>左のプレビューでその場に動作を確認</li>
              <li>「コードを表示」から中身をチェック</li>
              <li>「コードをコピー」または「ダウンロード」</li>
              <li>学校のPCやプロジェクターでそのまま使用</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
