import { z } from "zod";

const TrancheIRSchema = z.object({
  de: z.number().min(0),
  jusqu_a: z.number().nullable(),
  taux: z.number().min(0).max(1),
});

export const IRInputSchema = z.object({
  revenuNetImposable: z.number().min(0),
  nbParts: z.number().min(1),
  tranches: z.array(TrancheIRSchema).min(1),
});

export const IROutputSchema = z.object({
  montantIR: z.number(),
  tauxMoyen: z.number(),
  tauxMarginal: z.number(),
  detailParTranche: z.array(
    z.object({
      de: z.number(),
      jusqu_a: z.number().nullable(),
      taux: z.number(),
      montantImposable: z.number(),
      montantImpot: z.number(),
    }),
  ),
});

export type IRInput = z.infer<typeof IRInputSchema>;
export type IROutput = z.infer<typeof IROutputSchema>;

/**
 * Calcule l'impot sur le revenu avec le bareme progressif.
 * Applique le mecanisme du quotient familial.
 *
 * Fonction PURE : recoit les tranches en parametre.
 */
export function calculerIR(input: IRInput): IROutput {
  const v = IRInputSchema.parse(input);

  if (v.revenuNetImposable === 0) {
    return IROutputSchema.parse({
      montantIR: 0,
      tauxMoyen: 0,
      tauxMarginal: 0,
      detailParTranche: v.tranches.map((t) => ({
        ...t,
        montantImposable: 0,
        montantImpot: 0,
      })),
    });
  }

  // Quotient familial : revenu divise par nombre de parts
  const revenuParPart = v.revenuNetImposable / v.nbParts;

  let irParPart = 0;
  let tauxMarginal = 0;
  const detailParTranche = [];

  for (const tranche of v.tranches) {
    const plafond = tranche.jusqu_a ?? Infinity;
    const plancher = tranche.de;

    if (revenuParPart <= plancher) {
      detailParTranche.push({
        ...tranche,
        montantImposable: 0,
        montantImpot: 0,
      });
      continue;
    }

    const montantDansTranche = Math.min(revenuParPart, plafond) - plancher;
    const impotTranche = montantDansTranche * tranche.taux;

    irParPart += impotTranche;
    if (montantDansTranche > 0) {
      tauxMarginal = tranche.taux;
    }

    detailParTranche.push({
      ...tranche,
      montantImposable: montantDansTranche * v.nbParts,
      montantImpot: impotTranche * v.nbParts,
    });
  }

  // IR total = IR par part * nombre de parts
  const montantIR = irParPart * v.nbParts;
  const tauxMoyen = montantIR / v.revenuNetImposable;

  return IROutputSchema.parse({
    montantIR,
    tauxMoyen,
    tauxMarginal,
    detailParTranche,
  });
}
