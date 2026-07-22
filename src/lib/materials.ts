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
};

// 教科の表示順（学校でよくある並び順）。ここにない教科は末尾に追加されます。
const SUBJECT_ORDER = ["算数", "国語", "社会", "理科", "英語", "学級経営"];

function readMeta(slug: string): Material {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.json`), "utf-8");
  return JSON.parse(raw) as Material;
}

export function getAllMaterials(): Material[] {
  const slugs = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""));

  return slugs
    .map((slug) => readMeta(slug))
    .sort((a, b) => a.title.localeCompare(b.title, "ja"));
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
