export interface ToolRecommendation {
  toolName: string;
  toolUrl: string;
  description: string;
}

interface ToolDefinition {
  slug: string;
  name: string;
  url: string;
  description: string;
  tags: string[];
}

const TOOLS: ToolDefinition[] = [
  {
    slug: "rupture-calc",
    name: "Calcul rupture conventionnelle",
    url: "/outils/rupture-conventionnelle",
    description: "Estimez votre indemnite legale de rupture conventionnelle",
    tags: ["salaire", "emploi", "droit-travail", "indemnite"],
  },
  {
    slug: "simu-brut-net",
    name: "Simulateur brut / net",
    url: "/outils/simulateur-brut-net",
    description: "Convertissez votre salaire brut en net avec le detail des cotisations",
    tags: ["salaire", "emploi", "cotisations", "net"],
  },
  {
    slug: "sasu-optim",
    name: "Optimisation SASU",
    url: "/outils/optimisation-sasu",
    description: "Trouvez la repartition optimale salaire/dividendes pour votre SASU",
    tags: ["freelance", "sasu", "dividendes", "ir", "is", "optimisation"],
  },
  {
    slug: "revision-loyer",
    name: "Revision de loyer (IRL)",
    url: "/outils/revision-loyer",
    description: "Calculez le nouveau montant de votre loyer avec l'indice IRL",
    tags: ["immobilier", "loyer", "bailleur", "locataire"],
  },
  {
    slug: "simulateur-tmi",
    name: "Simulateur TMI",
    url: "/outils/simulateur-tmi",
    description: "Calculez votre taux marginal d'imposition et le detail de votre IR",
    tags: ["ir", "impot", "fiscalite", "tmi"],
  },
  {
    slug: "frais-notaire",
    name: "Frais de notaire",
    url: "/outils/frais-notaire",
    description: "Estimez les frais de notaire pour votre achat immobilier",
    tags: ["immobilier", "notaire", "achat", "droits-mutation"],
  },
  {
    slug: "rendement-locatif",
    name: "Rendement locatif",
    url: "/outils/rendement-locatif",
    description: "Calculez le rendement brut et net de votre investissement locatif",
    tags: ["immobilier", "investissement", "rendement", "locatif"],
  },
  {
    slug: "simulateur-ae",
    name: "Simulateur auto-entrepreneur",
    url: "/outils/simulateur-auto-entrepreneur",
    description: "Simulez vos cotisations et revenus en auto-entrepreneur",
    tags: ["freelance", "auto-entrepreneur", "micro", "cotisations"],
  },
  {
    slug: "indemnites-km",
    name: "Indemnites kilometriques",
    url: "/outils/indemnites-km",
    description: "Calculez vos frais kilometriques deductibles",
    tags: ["fiscal", "frais", "voiture", "deduction"],
  },
  {
    slug: "plus-value-immo",
    name: "Plus-value immobiliere",
    url: "/outils/plus-value-immobiliere",
    description: "Calculez l'imposition sur la revente de votre bien",
    tags: ["immobilier", "plus-value", "vente", "impot"],
  },
  {
    slug: "comparateur-statuts",
    name: "Comparateur SASU vs AE",
    url: "/outils/comparateur-statuts",
    description: "Comparez les revenus nets entre auto-entrepreneur et SASU",
    tags: ["freelance", "comparaison", "statut", "sasu", "ae"],
  },
  {
    slug: "niveau-richesse",
    name: "Niveau de richesse",
    url: "/outils/niveau-richesse",
    description: "Ou vous situez-vous par rapport aux autres Francais ?",
    tags: ["salaire", "comparaison", "statistiques", "richesse"],
  },
  {
    slug: "allocation-chomage",
    name: "Allocations chomage",
    url: "/outils/allocation-chomage",
    description: "Estimez votre allocation chomage (ARE)",
    tags: ["chomage", "are", "pole-emploi", "indemnisation"],
  },
  {
    slug: "simulateur-retraite",
    name: "Simulateur retraite",
    url: "/outils/simulateur-retraite",
    description: "Estimez votre future pension de retraite",
    tags: ["retraite", "pension", "trimestres", "cotisation"],
  },
  {
    slug: "prime-activite",
    name: "Prime d'activite",
    url: "/outils/prime-activite",
    description: "Estimez votre prime d'activite CAF",
    tags: ["prime", "caf", "aide", "salaire"],
  },
  {
    slug: "conges-payes",
    name: "Conges payes",
    url: "/outils/conges-payes",
    description: "Calculez votre indemnite de conges payes",
    tags: ["conges", "vacances", "indemnite", "jours"],
  },
];

// Recommendations croisees explicites : pour chaque outil, les slugs recommandes (ordonnees)
const CROSS_RECOMMENDATIONS: Record<string, string[]> = {
  "rupture-calc": ["simu-brut-net", "simulateur-tmi"],
  "simu-brut-net": ["rupture-calc", "simulateur-tmi"],
  "sasu-optim": ["simulateur-ae", "simulateur-tmi"],
  "revision-loyer": ["frais-notaire", "rendement-locatif"],
  "simulateur-tmi": ["simu-brut-net", "sasu-optim"],
  "frais-notaire": ["rendement-locatif", "revision-loyer"],
  "rendement-locatif": ["frais-notaire", "revision-loyer"],
  "simulateur-ae": ["sasu-optim", "simulateur-tmi"],
  "indemnites-km": ["simulateur-tmi", "simu-brut-net"],
  "plus-value-immo": ["frais-notaire", "rendement-locatif"],
  "comparateur-statuts": ["simulateur-ae", "sasu-optim"],
  "niveau-richesse": ["simu-brut-net", "simulateur-tmi"],
  "allocation-chomage": ["rupture-calc", "simu-brut-net"],
  "simulateur-retraite": ["simu-brut-net", "simulateur-tmi"],
  "prime-activite": ["simu-brut-net", "niveau-richesse"],
  "conges-payes": ["rupture-calc", "simu-brut-net"],
};

/**
 * Retourne les recommandations croisees pour un outil donne.
 * Maximum 2 recommandations, jamais l'outil courant.
 */
export function getRecommendations(
  currentToolSlug: string,
  max = 2,
): ToolRecommendation[] {
  const recommendedSlugs = CROSS_RECOMMENDATIONS[currentToolSlug] ?? [];

  return recommendedSlugs
    .slice(0, max)
    .map((slug) => TOOLS.find((t) => t.slug === slug))
    .filter((t): t is ToolDefinition => t !== undefined)
    .map((t) => ({
      toolName: t.name,
      toolUrl: t.url,
      description: t.description,
    }));
}
