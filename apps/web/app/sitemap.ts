import type { MetadataRoute } from "next";

const BASE_URL = "https://ecosysteme-tools.vercel.app";
const LAST_MODIFIED = new Date("2026-04-14");

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = [
    "rupture-conventionnelle",
    "simulateur-brut-net",
    "optimisation-sasu",
    "simulateur-auto-entrepreneur",
    "comparateur-statuts",
    "simulateur-tmi",
    "indemnites-km",
    "revision-loyer",
    "frais-notaire",
    "rendement-locatif",
    "plus-value-immobiliere",
    "niveau-richesse",
    "allocation-chomage",
    "simulateur-retraite",
  ];

  const guides = [
    "comment-calculer-indemnite-rupture-conventionnelle",
  ];

  return [
    { url: BASE_URL, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/outils`, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 0.9 },
    ...tools.map((slug) => ({
      url: `${BASE_URL}/outils/${slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...guides.map((slug) => ({
      url: `${BASE_URL}/guides/${slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
