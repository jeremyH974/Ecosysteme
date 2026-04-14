export interface ToolRef {
  name: string;
  slug: string;
  url: string;
  desc: string;
  example?: string;
}

export interface Situation {
  id: string;
  title: string;
  subtitle: string;
  accroche: string;
  icon: string;
  primary: ToolRef[];
  secondary: ToolRef[];
}

export const SITUATIONS: Situation[] = [
  {
    id: "salarie",
    title: "Je suis salarie",
    subtitle: "Salarie",
    accroche: "Comprenez votre salaire et anticipez les grandes transitions",
    icon: "\u{1F4BC}",
    primary: [
      { name: "Simulateur brut/net", slug: "simu-brut-net", url: "/outils/simulateur-brut-net", desc: "Convertissez votre salaire brut en net", example: "2 500 EUR brut = 1 950 EUR net" },
      { name: "Rupture conventionnelle", slug: "rupture-calc", url: "/outils/rupture-conventionnelle", desc: "Calculez votre indemnite de depart", example: "10 ans, 3 000 EUR = 7 500 EUR" },
      { name: "Allocations chomage", slug: "allocation-chomage", url: "/outils/allocation-chomage", desc: "Estimez votre ARE apres un depart", example: "57% de votre SJR" },
      { name: "Jours ouvres", slug: "jours-ouvres", url: "/outils/jours-ouvres", desc: "Calculez les jours ouvres entre deux dates", example: "~251 jours/an" },
    ],
    secondary: [
      { name: "Simulateur retraite", slug: "simulateur-retraite", url: "/outils/simulateur-retraite", desc: "Estimez votre future pension" },
      { name: "Frais reels", slug: "frais-reels-impots", url: "/outils/frais-reels-impots", desc: "Deduisez vos frais professionnels" },
      { name: "Indemnites km", slug: "indemnites-km", url: "/outils/indemnites-km", desc: "Bareme kilometrique fiscal" },
      { name: "Simulateur TMI", slug: "simulateur-tmi", url: "/outils/simulateur-tmi", desc: "Votre tranche d&apos;imposition" },
    ],
  },
  {
    id: "independant",
    title: "Je me lance a mon compte",
    subtitle: "Independant",
    accroche: "Choisissez le bon statut et optimisez votre revenu net",
    icon: "\u{1F4BB}",
    primary: [
      { name: "Comparateur SASU vs AE", slug: "comparateur-statuts", url: "/outils/comparateur-statuts", desc: "Quel statut est le plus avantageux ?", example: "AE vs SASU pour 50k CA" },
      { name: "Auto-entrepreneur", slug: "simulateur-ae", url: "/outils/simulateur-auto-entrepreneur", desc: "Cotisations et revenu net micro", example: "21.1% de cotisations BNC" },
      { name: "Optimisation SASU", slug: "sasu-optim", url: "/outils/optimisation-sasu", desc: "Mix salaire/dividendes optimal", example: "Gain de 3 000 EUR/an" },
      { name: "Frais reels", slug: "frais-reels-impots", url: "/outils/frais-reels-impots", desc: "Deduisez vos frais professionnels" },
    ],
    secondary: [
      { name: "Indemnites km", slug: "indemnites-km", url: "/outils/indemnites-km", desc: "Frais de deplacement" },
      { name: "Jours ouvres", slug: "jours-ouvres", url: "/outils/jours-ouvres", desc: "Planifiez votre activite" },
      { name: "Simulateur TMI", slug: "simulateur-tmi", url: "/outils/simulateur-tmi", desc: "Optimisez votre fiscalite" },
    ],
  },
  {
    id: "immobilier",
    title: "J'investis dans l'immobilier",
    subtitle: "Immobilier",
    accroche: "Calculez la rentabilite reelle avant d'acheter, gerer ou vendre",
    icon: "\u{1F3E0}",
    primary: [
      { name: "Frais de notaire", slug: "frais-notaire", url: "/outils/frais-notaire", desc: "Estimez les frais d'acquisition", example: "250k ancien = ~18 200 EUR" },
      { name: "Rendement locatif", slug: "rendement-locatif", url: "/outils/rendement-locatif", desc: "Rentabilite brute et nette", example: "4.8% brut, 3.2% net" },
      { name: "Revision loyer IRL", slug: "revision-loyer", url: "/outils/revision-loyer", desc: "Indexation annuelle du loyer" },
      { name: "Plus-value immobiliere", slug: "plus-value-immo", url: "/outils/plus-value-immobiliere", desc: "Imposition a la revente", example: "Exonere apres 22 ans IR" },
    ],
    secondary: [
      { name: "Simulateur TMI", slug: "simulateur-tmi", url: "/outils/simulateur-tmi", desc: "Impact fiscal des revenus fonciers" },
      { name: "Niveau de richesse", slug: "niveau-richesse", url: "/outils/niveau-richesse", desc: "Situez-vous par rapport aux Francais" },
    ],
  },
  {
    id: "impots",
    title: "Je prepare ma declaration d'impots",
    subtitle: "Impots",
    accroche: "Optimisez avant de declarer — comparez, simulez, decidez",
    icon: "\u{1F4CA}",
    primary: [
      { name: "Simulateur TMI", slug: "simulateur-tmi", url: "/outils/simulateur-tmi", desc: "Votre taux marginal d'imposition", example: "30 000 EUR = TMI 30%" },
      { name: "Frais reels", slug: "frais-reels-impots", url: "/outils/frais-reels-impots", desc: "Frais reels vs forfait 10%", example: "Economie de 800 EUR" },
      { name: "Niveau de richesse", slug: "niveau-richesse", url: "/outils/niveau-richesse", desc: "Ou vous situez-vous ?", example: "Median = 2 183 EUR" },
      { name: "Indemnites km", slug: "indemnites-km", url: "/outils/indemnites-km", desc: "Bareme kilometrique deductible" },
    ],
    secondary: [
      { name: "Plus-value immobiliere", slug: "plus-value-immo", url: "/outils/plus-value-immobiliere", desc: "Imposition revente" },
      { name: "Simulateur retraite", slug: "simulateur-retraite", url: "/outils/simulateur-retraite", desc: "Impact fiscal futur" },
      { name: "Prime d'activite", slug: "prime-activite", url: "/outils/prime-activite", desc: "Aide CAF selon vos revenus" },
      { name: "Conges payes", slug: "conges-payes", url: "/outils/conges-payes", desc: "Indemnite de conges" },
    ],
  },
];

export function getSituationsForTool(toolSlug: string): string[] {
  return SITUATIONS.filter(s =>
    s.primary.some(t => t.url.includes(toolSlug)) ||
    s.secondary.some(t => t.url.includes(toolSlug))
  ).map(s => s.id);
}
