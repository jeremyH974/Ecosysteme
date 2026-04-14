import type { MetadataRoute } from "next";

const BASE_URL = "https://ecosysteme-tools.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = [
    "rupture-conventionnelle",
    "simulateur-brut-net",
    "optimisation-sasu",
    "simulateur-auto-entrepreneur",
    "simulateur-tmi",
    "revision-loyer",
    "frais-notaire",
    "rendement-locatif",
  ];

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/outils`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...tools.map((slug) => ({
      url: `${BASE_URL}/outils/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
