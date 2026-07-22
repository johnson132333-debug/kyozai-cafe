import { getAllMaterials, getOrderedSubjects } from "@/lib/materials";
import { MaterialGrid } from "@/components/MaterialGrid";
import { AdSlot } from "@/components/AdSlot";

export default function Home() {
  const materials = getAllMaterials();
  const subjects = getOrderedSubjects(materials);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-blue-50 via-white to-white dark:border-slate-800 dark:from-blue-950/40 dark:via-slate-950 dark:to-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:py-20">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm dark:border-blue-900 dark:bg-slate-900 dark:text-blue-300">
            ☕ 教材カフェ
          </span>
          <h1 className="mx-auto mb-4 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            先生のための、
            <br className="sm:hidden" />
            すぐ使えるWeb教材ライブラリ
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
            クロードで作った授業用ツール・クイズ・シミュレーションを、その場でブラウザ実行して試せます。
            気に入ったらコードをコピーまたはダウンロードして、そのまま学校のPCやタブレットで使えます。
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="rounded-full bg-white px-4 py-1.5 font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-800">
              教材数 {materials.length}件
            </span>
            <span className="rounded-full bg-white px-4 py-1.5 font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-800">
              教科 {subjects.length}分野
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-10">
          <AdSlot slot="0000000000" />
        </div>

        <section id="materials" className="scroll-mt-20">
          <MaterialGrid materials={materials} subjects={subjects} />
        </section>

        <section
          id="about"
          className="mt-16 scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-base dark:bg-blue-950">
              ℹ️
            </span>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              このサイトについて
            </h2>
          </div>
          <p className="mb-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            教材カフェは、AIで作成した授業用の小さなWebツールを先生同士で共有・活用するためのライブラリです。
            各教材はブラウザだけで動くHTML/CSS/JavaScriptで作られており、インストール不要でその場から試せます。
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            コードはコピーやダウンロードして自由に改変できます。学校の実態に合わせて問題文や見た目を調整してご利用ください。
          </p>
        </section>
      </div>
    </div>
  );
}
