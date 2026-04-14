import { z } from "zod";

// --- Types ---

export const FraisReelsInputSchema = z.object({
  joursDeplacementAn: z.number().int().nonnegative(),
  distanceAllerKm: z.number().nonnegative(),
  puissanceFiscale: z.enum(["3", "4", "5", "6", "7+"]),
  nbRepasHorsDomicile: z.number().int().nonnegative(),
  valeurRepasActuel: z.number().nonnegative(),
  valeurRepasDomicile: z.number().nonnegative(),
  autresFrais: z.number().nonnegative(),
  salaireBrutAnnuel: z.number().positive(),
  baremeKm: z.array(
    z.object({
      puissance: z.string(),
      t1_coeff: z.number(),
      t1_ajout: z.number(),
      t2_coeff: z.number(),
      t2_ajout: z.number(),
      t3_coeff: z.number(),
      t3_ajout: z.number(),
    }),
  ),
});

export const FraisReelsOutputSchema = z.object({
  totalFraisReels: z.number(),
  deductionForfaitaire10: z.number(),
  plusFavorable: z.enum(["frais_reels", "forfait"]),
  economie: z.number(),
  detail: z.object({
    fraisTransport: z.number(),
    distanceAnnuelleAR: z.number(),
    fraisRepas: z.number(),
    autresFrais: z.number(),
  }),
});

export type FraisReelsInput = z.infer<typeof FraisReelsInputSchema>;
export type FraisReelsOutput = z.infer<typeof FraisReelsOutputSchema>;

// --- Helpers ---

/** Plafond par repas pour la part deductible (20.20 - valeur domicile) */
const PLAFOND_REPAS_TOTAL = 20.20;

function calculerBaremeKm(distanceAnnuelle: number, ligne: { t1_coeff: number; t1_ajout: number; t2_coeff: number; t2_ajout: number; t3_coeff: number; t3_ajout: number }): number {
  if (distanceAnnuelle <= 5000) {
    return distanceAnnuelle * ligne.t1_coeff + ligne.t1_ajout;
  }
  if (distanceAnnuelle <= 20000) {
    return distanceAnnuelle * ligne.t2_coeff + ligne.t2_ajout;
  }
  return distanceAnnuelle * ligne.t3_coeff + ligne.t3_ajout;
}

// --- Fonction principale ---

/**
 * Compare les frais reels (transport + repas + autres) a la deduction forfaitaire de 10%.
 *
 * Le bareme kilometrique et la valeur du repas a domicile sont passes en params
 * (jamais hardcodes dans la primitive).
 */
export function calculerFraisReels(input: FraisReelsInput): FraisReelsOutput {
  const v = FraisReelsInputSchema.parse(input);

  // Distance annuelle aller-retour
  const distanceAnnuelleAR = v.distanceAllerKm * 2 * v.joursDeplacementAn;

  // Frais transport via bareme km
  const ligne = v.baremeKm.find((b) => b.puissance === v.puissanceFiscale);
  if (!ligne) {
    throw new Error(`BAREME_INTROUVABLE: Aucune ligne du bareme pour la puissance fiscale ${v.puissanceFiscale}.`);
  }
  const fraisTransport = calculerBaremeKm(distanceAnnuelleAR, ligne);

  // Frais repas : (cout reel - valeur domicile), plafonne a (20.20 - valeur domicile) par repas
  const plafondParRepas = Math.max(0, PLAFOND_REPAS_TOTAL - v.valeurRepasDomicile);
  const deductibleParRepas = Math.max(0, Math.min(v.valeurRepasActuel - v.valeurRepasDomicile, plafondParRepas));
  const fraisRepas = deductibleParRepas * v.nbRepasHorsDomicile;

  // Total frais reels
  const totalFraisReels = fraisTransport + fraisRepas + v.autresFrais;

  // Deduction forfaitaire 10%
  const deductionForfaitaire10 = v.salaireBrutAnnuel * 0.10;

  // Comparaison
  const plusFavorable = totalFraisReels > deductionForfaitaire10 ? "frais_reels" as const : "forfait" as const;
  const economie = Math.abs(totalFraisReels - deductionForfaitaire10);

  return FraisReelsOutputSchema.parse({
    totalFraisReels,
    deductionForfaitaire10,
    plusFavorable,
    economie,
    detail: {
      fraisTransport,
      distanceAnnuelleAR,
      fraisRepas,
      autresFrais: v.autresFrais,
    },
  });
}
