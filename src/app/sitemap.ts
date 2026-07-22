import type { MetadataRoute } from "next";
import { getAllMaterials, isStudentFacing } from "@/lib/materials";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const materials = getAllMaterials();
  const studentMaterials = materials.filter(isStudentFacing);

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/students`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...materials.map((material) => ({
      url: `${SITE_URL}/materials/${material.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...studentMaterials.map((material) => ({
      url: `${SITE_URL}/students/${material.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
