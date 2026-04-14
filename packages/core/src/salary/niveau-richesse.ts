import { z } from "zod";

export const NiveauRichesseInputSchema = z.object({
  salaireNetMensuel: z.number().min(0),
  // Statistiques nationales passees en params
  smicNet: z.number().positive(),
  salaireMoyen: z.number().positive(),
  salaireMedian: z.number().positive(),
  seuilPauvrete: z.number().positive(),
  seuil10PctSuperieurs: z.number().positive(),
  seuil1PctSuperieurs: z.number().positive(),
});

export const NiveauRichesseOutputSchema = z.object({
  niveau: z.enum(["sous_seuil_pauvrete", "modeste", "median", "aise", "top_10", "top_1"]),
  niveauLabel: z.string(),
  percentile: z.number(),
  comparaisons: z.object({
    vsSmic: z.number(),
    vsMoyen: z.number(),
    vsMedian: z.number(),
    vsSeuilPauvrete: z.number(),
  }),
  detail: z.object({
    salaireNetMensuel: z.number(),
    salaireNetAnnuel: z.number(),
  }),
});

export type NiveauRichesseInput = z.infer<typeof NiveauRichesseInputSchema>;
export type NiveauRichesseOutput = z.infer<typeof NiveauRichesseOutputSchema>;

/**
 * Evalue le niveau de richesse d'un salaire par rapport aux statistiques nationales.
 */
export function calculerNiveauRichesse(input: NiveauRichesseInput): NiveauRichesseOutput {
  const v = NiveauRichesseInputSchema.parse(input);
  const s = v.salaireNetMensuel;

  let niveau: NiveauRichesseOutput["niveau"];
  let niveauLabel: string;
  let percentile: number;

  if (s >= v.seuil1PctSuperieurs) {
    niveau = "top_1"; niveauLabel = "Top 1% des salaires"; percentile = 99;
  } else if (s >= v.seuil10PctSuperieurs) {
    niveau = "top_10"; niveauLabel = "Top 10% des salaires"; percentile = 90;
  } else if (s >= v.salaireMoyen) {
    niveau = "aise"; niveauLabel = "Au-dessus de la moyenne"; percentile = 70;
  } else if (s >= v.salaireMedian) {
    niveau = "median"; niveauLabel = "Autour de la mediane"; percentile = 50;
  } else if (s >= v.seuilPauvrete) {
    niveau = "modeste"; niveauLabel = "Salaire modeste"; percentile = 25;
  } else {
    niveau = "sous_seuil_pauvrete"; niveauLabel = "Sous le seuil de pauvrete"; percentile = 10;
  }

  return NiveauRichesseOutputSchema.parse({
    niveau,
    niveauLabel,
    percentile,
    comparaisons: {
      vsSmic: s / v.smicNet,
      vsMoyen: s / v.salaireMoyen,
      vsMedian: s / v.salaireMedian,
      vsSeuilPauvrete: s / v.seuilPauvrete,
    },
    detail: {
      salaireNetMensuel: s,
      salaireNetAnnuel: s * 12,
    },
  });
}
