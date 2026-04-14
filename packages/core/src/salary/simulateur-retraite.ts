import { z } from "zod";

export const RetraiteInputSchema = z.object({
  salaireNetMensuelActuel: z.number().positive(),
  ageActuel: z.number().int().min(18).max(66),
  ageDepart: z.number().int().min(62).max(70),
  trimestresValides: z.number().int().min(0),
  // Parametres passes en params
  trimestresRequis: z.number().int().default(172), // generation 1965+
  tauxPlein: z.number().default(0.50),
  decoteParTrimestre: z.number().default(0.00625), // 0.625% par trimestre manquant
  surcoteParTrimestre: z.number().default(0.0125), // 1.25% par trimestre supplementaire
  tauxComplementaire: z.number().default(0.30), // ~30% du brut reconstitue en points AGIRC-ARRCO
});

export const RetraiteOutputSchema = z.object({
  pensionMensuelleEstimee: z.number(),
  pensionBase: z.number(),
  pensionComplementaire: z.number(),
  tauxApplique: z.number(),
  decoteSurcote: z.string(),
  trimestresManquants: z.number(),
  tauxRemplacement: z.number(),
  detail: z.object({
    salaireBrutReconstitue: z.number(),
    trimestresProjetesAuDepart: z.number(),
    anneesCotisees: z.number(),
  }),
});

export type RetraiteInput = z.infer<typeof RetraiteInputSchema>;
export type RetraiteOutput = z.infer<typeof RetraiteOutputSchema>;

/**
 * Estime la pension de retraite (base + complementaire).
 *
 * Formule base : SAM * taux * (trimestres / trimestres requis)
 * Le SAM est approxime a partir du salaire actuel.
 * La complementaire est estimee a ~30% de la base.
 *
 * Estimation indicative — le calcul reel depend de la carriere complete.
 */
export function calculerRetraite(input: RetraiteInput): RetraiteOutput {
  const v = RetraiteInputSchema.parse(input);

  // Reconstitution brut approximatif
  const salaireBrut = v.salaireNetMensuelActuel / 0.78;
  // SAM : moyenne des 25 meilleures annees (approxime au brut actuel)
  const sam = salaireBrut;

  // Trimestres projetes au depart
  const anneesRestantes = Math.max(0, v.ageDepart - v.ageActuel);
  const trimestresProjectes = v.trimestresValides + anneesRestantes * 4;

  // Decote/surcote
  const trimestresManquants = Math.max(0, v.trimestresRequis - trimestresProjectes);
  const trimestresExcedentaires = Math.max(0, trimestresProjectes - v.trimestresRequis);

  let taux = v.tauxPlein;
  let decoteSurcote: string;

  if (trimestresManquants > 0) {
    const decote = Math.min(trimestresManquants, 20) * v.decoteParTrimestre;
    taux = v.tauxPlein - decote;
    decoteSurcote = `Decote de ${(decote * 100).toFixed(2)}% (${trimestresManquants} trimestres manquants)`;
  } else if (trimestresExcedentaires > 0) {
    const surcote = trimestresExcedentaires * v.surcoteParTrimestre;
    taux = v.tauxPlein + surcote;
    decoteSurcote = `Surcote de ${(surcote * 100).toFixed(2)}% (${trimestresExcedentaires} trimestres supplementaires)`;
  } else {
    decoteSurcote = "Taux plein";
  }

  // Proratisation
  const coefProratisation = Math.min(trimestresProjectes / v.trimestresRequis, 1);

  // Pension de base
  const pensionBase = sam * taux * coefProratisation;

  // Pension complementaire (estimation simplifiee)
  const pensionComplementaire = pensionBase * v.tauxComplementaire;

  const pensionTotale = pensionBase + pensionComplementaire;
  const tauxRemplacement = pensionTotale / v.salaireNetMensuelActuel;

  return RetraiteOutputSchema.parse({
    pensionMensuelleEstimee: pensionTotale,
    pensionBase,
    pensionComplementaire,
    tauxApplique: taux,
    decoteSurcote,
    trimestresManquants,
    tauxRemplacement,
    detail: {
      salaireBrutReconstitue: salaireBrut,
      trimestresProjetesAuDepart: trimestresProjectes,
      anneesCotisees: trimestresProjectes / 4,
    },
  });
}
