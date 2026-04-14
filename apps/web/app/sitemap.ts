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
    "prime-activite",
    "conges-payes",
    "jours-ouvres",
    "frais-reels-impots",
  ];

  const guides = [
    "comment-calculer-indemnite-rupture-conventionnelle",
    "smic-2026",
    "differences-brut-net",
    "salaire-cadre-non-cadre",
    "2500-brut-en-net",
    "3000-brut-en-net",
    "2000-brut-en-net",
    "prelevement-a-la-source",
    "indemnite-licenciement",
    "methode-calcul-brut-net",
    "frais-reels-ou-forfait-10-pourcent",
  ];

  return [
    // Homepage — priority 1.0
    { url: BASE_URL, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 1.0 },

    // Outils index — priority 0.9
    { url: `${BASE_URL}/outils`, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 0.9 },

    // 18 outils — priority 0.9
    ...tools.map((slug) => ({
      url: `${BASE_URL}/outils/${slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),

    // Situations — priority 0.8
    ...["salarie", "independant", "immobilier", "impots"].map((slug) => ({
      url: `${BASE_URL}/situations/${slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // Guides — priority 0.8
    ...guides.map((slug) => ({
      url: `${BASE_URL}/guides/${slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
