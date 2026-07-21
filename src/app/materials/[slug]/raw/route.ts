import { NextResponse } from "next/server";
import { getAllMaterials, getMaterial, getMaterialCode } from "@/lib/materials";

export async function generateStaticParams() {
  return getAllMaterials().map((material) => ({ slug: material.slug }));
}

export async function GET(
  _request: Request,
  context: RouteContext<"/materials/[slug]/raw">
) {
  const { slug } = await context.params;
  const material = getMaterial(slug);

  if (!material) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const code = getMaterialCode(slug);

  return new NextResponse(code, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}.html"`,
    },
  });
}
