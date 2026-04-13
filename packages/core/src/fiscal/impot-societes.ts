import { z } from "zod";

export const ISInputSchema = z.object({
  beneficeImposable: z.number().min(0),
  tauxReduit: z.number(), // 0.15
  seuilReduit: z.number(), // 42500
  tauxNormal: z.number(), // 0.25
  eligibleTauxReduit: z.boolean().default(true),
});

export const ISOutputSchema = z.object({
  montantIS: z.number(),
  tauxEffectif: z.number(),
  detail: z.object({
    montantTrancheReduite: z.number(),
    montantTrancheNormale: z.number(),
    baseTrancheReduite: z.number(),
    baseTrancheNormale: z.number(),
  }),
});

export type ISInput = z.infer<typeof ISInputSchema>;
export type ISOutput = z.infer<typeof ISOutputSchema>;

/**
 * Calcule l'impot sur les societes.
 * Taux reduit de 15% sur les premiers 42 500 EUR si eligible.
 * Taux normal de 25% au-dela.
 *
 * Fonction PURE.
 */
export function calculerIS(input: ISInput): ISOutput {
  const v = ISInputSchema.parse(input);

  if (v.beneficeImposable === 0) {
    return ISOutputSchema.parse({
      montantIS: 0,
      tauxEffectif: 0,
      detail: {
        montantTrancheReduite: 0,
        montantTrancheNormale: 0,
        baseTrancheReduite: 0,
        baseTrancheNormale: 0,
      },
    });
  }

  let baseTrancheReduite: number;
  let baseTrancheNormale: number;

  if (v.eligibleTauxReduit) {
    baseTrancheReduite = Math.min(v.beneficeImposable, v.seuilReduit);
    baseTrancheNormale = Math.max(0, v.beneficeImposable - v.seuilReduit);
  } else {
    baseTrancheReduite = 0;
    baseTrancheNormale = v.beneficeImposable;
  }

  const montantTrancheReduite = baseTrancheReduite * v.tauxReduit;
  const montantTrancheNormale = baseTrancheNormale * v.tauxNormal;
  const montantIS = montantTrancheReduite + montantTrancheNormale;
  const tauxEffectif = montantIS / v.beneficeImposable;

  return ISOutputSchema.parse({
    montantIS,
    tauxEffectif,
    detail: {
      montantTrancheReduite,
      montantTrancheNormale,
      baseTrancheReduite,
      baseTrancheNormale,
    },
  });
}
