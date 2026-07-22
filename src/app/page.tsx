import { getAllMaterials, getOrderedSubjects } from "@/lib/materials";
import { MaterialGrid } from "@/components/MaterialGrid";
import { AdSlot } from "@/components/AdSlot";

export default function Home() {
  const materials = getAllMaterials();
  const subjects = getOrderedSubjects(materials);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <section className="mb-10 text-center">
        <h1 className="mb-3 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          先生のための、すぐ使えるWeb教材ライブラリ
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-600 sm:text-base dark:text-slate-400">
          クロードで作った授業用ツール・クイズ・シミュレーションを、その場でブラウザ実行して試せます。
          気に入ったらコードをコピーまたはダウンロードして、そのまま学校のPCやタブレットで使えます。
        </p>
      </section>

      <div className="mb-10">
        <AdSlot slot="0000000000" />
      </div>

      <section id="materials">
        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
          教材一覧（{materials.length}件）
        </h2>
        <MaterialGrid materials={materials} subjects={subjects} />
      </section>

      <section
        id="about"
        className="mt-16 rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
      >
        <h2 className="mb-2 text-base font-semibold text-slate-900 dark:text-white">
          このサイトについて
        </h2>
        <p className="mb-2">
          教材カフェは、AIで作成した授業用の小さなWebツールを先生同士で共有・活用するためのライブラリです。
          各教材はブラウザだけで動くHTML/CSS/JavaScriptで作られており、インストール不要でその場から試せます。
        </p>
        <p>
          コードはコピーやダウンロードして自由に改変できます。学校の実態に合わせて問題文や見た目を調整してご利用ください。
        </p>
      </section>
    </div>
  );
}
