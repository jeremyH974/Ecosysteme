import { z } from "zod";

export const PFUInputSchema = z.object({
  montantDividendes: z.number().min(0),
  tauxIR: z.number().default(0.128), // 12.8%
  tauxPrelevementsSociaux: z.number().default(0.172), // 17.2%
});

export const PFUOutputSchema = z.object({
  montantPFU: z.number(),
  montantIR: z.number(),
  montantPrelevementsSociaux: z.number(),
  netApresPFU: z.number(),
  tauxEffectif: z.number(),
});

export type PFUInput = z.infer<typeof PFUInputSchema>;
export type PFUOutput = z.infer<typeof PFUOutputSchema>;

/**
 * Calcule le Prelevement Forfaitaire Unique (flat tax) sur les dividendes.
 * Taux total : 30% (12.8% IR + 17.2% prelevements sociaux).
 *
 * Fonction PURE.
 */
export function calculerPFU(input: PFUInput): PFUOutput {
  const v = PFUInputSchema.parse(input);

  if (v.montantDividendes === 0) {
    return PFUOutputSchema.parse({
      montantPFU: 0,
      montantIR: 0,
      montantPrelevementsSociaux: 0,
      netApresPFU: 0,
      tauxEffectif: 0,
    });
  }

  const montantIR = v.montantDividendes * v.tauxIR;
  const montantPrelevementsSociaux = v.montantDividendes * v.tauxPrelevementsSociaux;
  const montantPFU = montantIR + montantPrelevementsSociaux;
  const netApresPFU = v.montantDividendes - montantPFU;
  const tauxEffectif = montantPFU / v.montantDividendes;

  return PFUOutputSchema.parse({
    montantPFU,
    montantIR,
    montantPrelevementsSociaux,
    netApresPFU,
    tauxEffectif,
  });
}
