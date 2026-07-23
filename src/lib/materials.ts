import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content", "materials");

export type Material = {
  slug: string;
  title: string;
  subject: string;
  unit: string;
  grade: string;
  description: string;
  tags: string[];
  // 児童生徒が自分で操作することを想定しない教員操作前提のツールは false にする。
  // 未指定は true（児童生徒用ページに表示）として扱う。
  studentFacing?: boolean;
  // 同じ教科・学年内での並び順（小さいほど先）。教科書の年間指導計画で先に
  // 習う単元を前に出したいときだけ指定する。未指定はタイトル順で末尾に回る。
  order?: number;
};

export function isStudentFacing(material: Material): boolean {
  return material.studentFacing !== false;
}

// 教科の表示順（学校でよくある並び順）。ここにない教科は末尾に追加されます。
const SUBJECT_ORDER = ["算数", "国語", "生活科", "社会", "理科", "体育", "英語", "学級経営", "特別支援"];

function readMeta(slug: string): Material {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.json`), "utf-8");
  return JSON.parse(raw) as Material;
}

export function getAllMaterials(): Material[] {
  const slugs = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""));

  return slugs.map((slug) => readMeta(slug)).sort(compareMaterials);
}

function compareMaterials(a: Material, b: Material): number {
  const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
  const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
  if (orderA !== orderB) return orderA - orderB;
  return a.title.localeCompare(b.title, "ja");
}

export function getMaterial(slug: string): Material | null {
  const jsonPath = path.join(CONTENT_DIR, `${slug}.json`);
  if (!fs.existsSync(jsonPath)) return null;
  return readMeta(slug);
}

export function getMaterialCode(slug: string): string {
  const htmlPath = path.join(CONTENT_DIR, `${slug}.html`);
  return fs.readFileSync(htmlPath, "utf-8");
}

export function getOrderedSubjects(materials: Material[]): string[] {
  const present = new Set(materials.map((m) => m.subject));
  const ordered = SUBJECT_ORDER.filter((s) => present.has(s));
  const rest = Array.from(present)
    .filter((s) => !SUBJECT_ORDER.includes(s))
    .sort((a, b) => a.localeCompare(b, "ja"));
  return [...ordered, ...rest];
}
