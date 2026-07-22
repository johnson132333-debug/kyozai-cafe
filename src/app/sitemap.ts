import type { MetadataRoute } from "next";
import { getAllMaterials } from "@/lib/materials";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const materials = getAllMaterials();

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
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
  ];
}
