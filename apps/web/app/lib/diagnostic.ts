export type Profil = "salarie" | "independant" | "immobilier" | "impots";

export interface DiagnosticQuestion {
  id: string;
  label: string;
  helpText?: string;
  type: "number" | "select" | "radio";
  options?: { value: string; label: string }[];
  suffix?: string;
  placeholder?: string;
}

export interface DiagnosticResult {
  titre: string;
  description: string;
  outils: Array<{
    name: string;
    url: string;
    pourquoi: string;
    priorite: "haute" | "moyenne";
  }>;
  insight: string;
}

// Questions adaptees par profil — memes 5 themes, vocabulaire different
const QUESTIONS_SALARIE: DiagnosticQuestion[] = [
  { id: "revenu", label: "Votre salaire brut mensuel", placeholder: "ex: 2 800", type: "number", suffix: "EUR brut" },
  { id: "anciennete", label: "Anciennete dans votre entreprise", type: "select", options: [
    { value: "0", label: "Moins d'1 an" }, { value: "2", label: "1 a 3 ans" },
    { value: "5", label: "3 a 10 ans" }, { value: "15", label: "Plus de 10 ans" },
  ]},
  { id: "situation_familiale", label: "Situation familiale", type: "radio", options: [
    { value: "1", label: "Celibataire" }, { value: "2", label: "En couple" }, { value: "3", label: "Famille" },
  ]},
  { id: "projet", label: "Votre projet actuel", type: "select", options: [
    { value: "comprendre", label: "Comprendre mon salaire" },
    { value: "depart", label: "Je pense a quitter mon poste" },
    { value: "impots", label: "Optimiser mes impots" },
    { value: "retraite", label: "Preparer ma retraite" },
  ]},
  { id: "transport", label: "Distance domicile-travail (aller)", placeholder: "ex: 25", type: "number", suffix: "km", helpText: "Pour estimer vos frais reels deductibles" },
];

const QUESTIONS_INDEPENDANT: DiagnosticQuestion[] = [
  { id: "revenu", label: "Votre chiffre d'affaires annuel (ou previsionnel)", placeholder: "ex: 60 000", type: "number", suffix: "EUR/an" },
  { id: "statut", label: "Votre statut actuel", type: "radio", options: [
    { value: "ae", label: "Auto-entrepreneur" }, { value: "sasu", label: "SASU" },
    { value: "aucun", label: "Pas encore cree" },
  ]},
  { id: "situation_familiale", label: "Situation familiale", type: "radio", options: [
    { value: "1", label: "Celibataire" }, { value: "2", label: "En couple" }, { value: "3", label: "Famille" },
  ]},
  { id: "charges", label: "Charges professionnelles annuelles", placeholder: "ex: 5 000", type: "number", suffix: "EUR/an", helpText: "Loyer bureau, materiel, sous-traitance..." },
  { id: "projet", label: "Votre priorite", type: "select", options: [
    { value: "choisir", label: "Choisir le bon statut" },
    { value: "optimiser", label: "Optimiser ma remuneration" },
    { value: "declarer", label: "Preparer ma declaration" },
    { value: "comparer", label: "Comparer AE vs SASU" },
  ]},
];

const QUESTIONS_IMMOBILIER: DiagnosticQuestion[] = [
  { id: "revenu", label: "Vos revenus nets mensuels (foyer)", placeholder: "ex: 3 500", type: "number", suffix: "EUR net" },
  { id: "projet", label: "Votre projet immobilier", type: "radio", options: [
    { value: "acheter", label: "Acheter un bien" }, { value: "louer", label: "Mettre en location" },
    { value: "vendre", label: "Vendre un bien" }, { value: "gerer", label: "Gerer mon bien locatif" },
  ]},
  { id: "budget", label: "Budget ou valeur du bien", placeholder: "ex: 250 000", type: "number", suffix: "EUR" },
  { id: "situation_familiale", label: "Situation familiale", type: "radio", options: [
    { value: "1", label: "Celibataire" }, { value: "2", label: "En couple" }, { value: "3", label: "Famille" },
  ]},
  { id: "loyer", label: "Loyer mensuel (si locatif)", placeholder: "ex: 800", type: "number", suffix: "EUR/mois", helpText: "Laissez vide si non concerne" },
];

const QUESTIONS_IMPOTS: DiagnosticQuestion[] = [
  { id: "revenu", label: "Votre revenu net imposable annuel", placeholder: "ex: 35 000", type: "number", suffix: "EUR/an" },
  { id: "situation_familiale", label: "Nombre de parts fiscales", type: "select", options: [
    { value: "1", label: "1 part (celibataire)" }, { value: "1.5", label: "1.5 parts" },
    { value: "2", label: "2 parts (couple)" }, { value: "2.5", label: "2.5 parts" },
    { value: "3", label: "3 parts" },
  ]},
  { id: "transport", label: "Distance domicile-travail (aller)", placeholder: "ex: 25", type: "number", suffix: "km" },
  { id: "projet", label: "Ce que vous cherchez a optimiser", type: "select", options: [
    { value: "tmi", label: "Connaitre ma tranche d'imposition" },
    { value: "frais", label: "Frais reels vs forfait 10%" },
    { value: "global", label: "Vue d'ensemble de ma fiscalite" },
    { value: "immobilier", label: "Fiscalite immobiliere" },
  ]},
  { id: "statut", label: "Votre statut professionnel", type: "radio", options: [
    { value: "salarie", label: "Salarie" }, { value: "independant", label: "Independant" }, { value: "mixte", label: "Les deux" },
  ]},
];

export const PROFIL_QUESTIONS: Record<Profil, DiagnosticQuestion[]> = {
  salarie: QUESTIONS_SALARIE,
  independant: QUESTIONS_INDEPENDANT,
  immobilier: QUESTIONS_IMMOBILIER,
  impots: QUESTIONS_IMPOTS,
};

export const PROFIL_LABELS: Record<Profil, { title: string; icon: string; accroche: string }> = {
  salarie: { title: "Je suis salarie", icon: "\u{1F4BC}", accroche: "Comprenez votre salaire et anticipez les transitions" },
  independant: { title: "Je suis independant", icon: "\u{1F4BB}", accroche: "Choisissez le bon statut et optimisez votre revenu" },
  immobilier: { title: "J'ai un projet immo", icon: "\u{1F3E0}", accroche: "Calculez la rentabilite reelle de votre investissement" },
  impots: { title: "J'optimise mes impots", icon: "\u{1F4CA}", accroche: "Comparez, simulez, decidez avant de declarer" },
};

// Generateur de resultats personnalises
export function generateDiagnosticResult(profil: Profil, answers: Record<string, string>): DiagnosticResult {
  const revenu = parseFloat(answers.revenu || "0");
  const projet = answers.projet || "";

  if (profil === "salarie") {
    const outils: DiagnosticResult["outils"] = [
      { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", pourquoi: "Pour connaitre votre salaire net exact", priorite: "haute" },
    ];
    if (projet === "depart") {
      outils.unshift({ name: "Rupture conventionnelle", url: "/outils/rupture-conventionnelle", pourquoi: `Avec ${answers.anciennete || "quelques"} ans d'anciennete, estimez votre indemnite`, priorite: "haute" });
      outils.push({ name: "Allocations chomage", url: "/outils/allocation-chomage", pourquoi: "Anticipez vos droits ARE apres le depart", priorite: "haute" });
    }
    if (projet === "impots" || parseFloat(answers.transport || "0") > 15) {
      outils.push({ name: "Frais reels", url: "/outils/frais-reels-impots", pourquoi: `${answers.transport || "Vos"} km de trajet = potentielle economie d'impots`, priorite: "haute" });
    }
    if (projet === "retraite") {
      outils.push({ name: "Simulateur retraite", url: "/outils/simulateur-retraite", pourquoi: "Estimez votre future pension", priorite: "haute" });
    }
    outils.push({ name: "Simulateur TMI", url: "/outils/simulateur-tmi", pourquoi: "Votre tranche marginale d'imposition", priorite: "moyenne" });

    const netEstime = revenu > 0 ? Math.round(revenu * 0.78) : 0;
    return {
      titre: "Votre diagnostic salarie",
      description: revenu > 0 ? `Avec un brut de ${revenu.toLocaleString("fr-FR")} EUR, votre net est d'environ ${netEstime.toLocaleString("fr-FR")} EUR.` : "Voici les outils adaptes a votre situation.",
      outils: outils.slice(0, 4),
      insight: projet === "depart" ? "Un depart bien prepare peut faire une difference de plusieurs milliers d'euros." : "Commencez par votre brut/net, puis explorez les optimisations.",
    };
  }

  if (profil === "independant") {
    const outils: DiagnosticResult["outils"] = [];
    if (answers.statut === "aucun" || projet === "choisir" || projet === "comparer") {
      outils.push({ name: "Comparateur SASU vs AE", url: "/outils/comparateur-statuts", pourquoi: `Pour ${revenu > 0 ? revenu.toLocaleString("fr-FR") + " EUR de CA" : "votre CA"}, quel statut est optimal ?`, priorite: "haute" });
    }
    if (answers.statut === "ae" || projet === "choisir") {
      outils.push({ name: "Auto-entrepreneur", url: "/outils/simulateur-auto-entrepreneur", pourquoi: "Cotisations et revenu net en micro", priorite: "haute" });
    }
    if (answers.statut === "sasu" || projet === "optimiser") {
      outils.push({ name: "Optimisation SASU", url: "/outils/optimisation-sasu", pourquoi: "Mix salaire/dividendes optimal", priorite: "haute" });
    }
    outils.push({ name: "Simulateur TMI", url: "/outils/simulateur-tmi", pourquoi: "Pour affiner l'optimisation fiscale", priorite: "moyenne" });

    return {
      titre: "Votre diagnostic independant",
      description: revenu > 0 ? `Avec ${revenu.toLocaleString("fr-FR")} EUR de CA, voici vos priorites.` : "Voici les outils pour demarrer.",
      outils: outils.slice(0, 4),
      insight: revenu > 40000 ? "Au-dela de 40k EUR de CA, la SASU devient souvent plus avantageuse." : "L'auto-entreprise est generalement optimale sous 40k EUR de CA.",
    };
  }

  if (profil === "immobilier") {
    const outils: DiagnosticResult["outils"] = [];
    if (projet === "acheter") {
      outils.push({ name: "Frais de notaire", url: "/outils/frais-notaire", pourquoi: `Estimez les frais sur ${revenu > 0 ? (parseFloat(answers.budget || "0")).toLocaleString("fr-FR") + " EUR" : "votre budget"}`, priorite: "haute" });
      outils.push({ name: "Rendement locatif", url: "/outils/rendement-locatif", pourquoi: "Calculez la rentabilite avant d'acheter", priorite: "haute" });
    }
    if (projet === "louer" || projet === "gerer") {
      outils.push({ name: "Revision loyer IRL", url: "/outils/revision-loyer", pourquoi: "Indexez votre loyer chaque annee", priorite: "haute" });
      outils.push({ name: "Rendement locatif", url: "/outils/rendement-locatif", pourquoi: "Suivez la rentabilite de votre bien", priorite: "haute" });
    }
    if (projet === "vendre") {
      outils.push({ name: "Plus-value immobiliere", url: "/outils/plus-value-immobiliere", pourquoi: "Calculez l'imposition a la revente", priorite: "haute" });
    }
    outils.push({ name: "Simulateur TMI", url: "/outils/simulateur-tmi", pourquoi: "Impact fiscal des revenus fonciers", priorite: "moyenne" });

    return {
      titre: "Votre diagnostic immobilier",
      description: projet === "acheter" ? "Avant d'acheter, calculez les vrais couts." : "Voici les outils pour gerer votre patrimoine.",
      outils: outils.slice(0, 4),
      insight: projet === "acheter" ? "Les frais de notaire representent 7-8% dans l'ancien, 2-3% dans le neuf." : "La revision IRL est un levier de rendement souvent neglige.",
    };
  }

  // impots
  const outils: DiagnosticResult["outils"] = [
    { name: "Simulateur TMI", url: "/outils/simulateur-tmi", pourquoi: `Votre TMI pour ${revenu > 0 ? revenu.toLocaleString("fr-FR") + " EUR" : "vos revenus"}`, priorite: "haute" },
  ];
  if (projet === "frais" || parseFloat(answers.transport || "0") > 10) {
    outils.push({ name: "Frais reels", url: "/outils/frais-reels-impots", pourquoi: "Comparez avec le forfait 10%", priorite: "haute" });
    outils.push({ name: "Indemnites km", url: "/outils/indemnites-km", pourquoi: "Bareme kilometrique deductible", priorite: "moyenne" });
  }
  if (projet === "immobilier") {
    outils.push({ name: "Plus-value immobiliere", url: "/outils/plus-value-immobiliere", pourquoi: "Fiscalite de la revente", priorite: "haute" });
  }
  outils.push({ name: "Niveau de richesse", url: "/outils/niveau-richesse", pourquoi: "Situez-vous par rapport aux Francais", priorite: "moyenne" });

  return {
    titre: "Votre diagnostic fiscal",
    description: revenu > 0 ? `Avec ${revenu.toLocaleString("fr-FR")} EUR de revenu imposable, voici vos leviers.` : "Voici les outils pour optimiser.",
    outils: outils.slice(0, 4),
    insight: projet === "frais" ? "Les frais reels sont avantageux des que vos depenses depassent 10% du brut." : "Connaitre son TMI est la premiere etape de toute optimisation.",
  };
}
