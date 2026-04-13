import { z } from "zod";

export const AEInputSchema = z.object({
  chiffreAffaires: z.number().min(0),
  activite: z.enum(["vente", "prestation_bic", "prestation_bnc"]),
  // Taux passes en params
  tauxCotisations: z.number(), // 12.3% vente, 21.2% prestation BIC, 21.1% prestation BNC
  tauxAbattementFiscal: z.number(), // 71% vente, 50% BIC, 34% BNC
  versementLiberatoire: z.boolean().default(false),
  tauxVersementLiberatoire: z.number().default(0), // 1%, 1.7%, 2.2%
});

export const AEOutputSchema = z.object({
  cotisationsSociales: z.number(),
  revenuApresCharges: z.number(),
  revenuImposable: z.number(),
  tauxChargesEffectif: z.number(),
  versementLiberatoireIR: z.number(),
  detail: z.object({
    chiffreAffaires: z.number(),
    abattementFiscal: z.number(),
    cotisationsSociales: z.number(),
  }),
});

export type AEInput = z.infer<typeof AEInputSchema>;
export type AEOutput = z.infer<typeof AEOutputSchema>;

/**
 * Simule les charges et le revenu net d'un auto-entrepreneur.
 *
 * Cotisations sociales : pourcentage du CA (12.3% vente, 21.2% BIC, 21.1% BNC)
 * Abattement fiscal : applique sur le CA pour determiner le revenu imposable
 *   (71% vente, 50% BIC, 34% BNC)
 *
 * Fonction PURE.
 */
export function calculerAutoEntrepreneur(input: AEInput): AEOutput {
  const v = AEInputSchema.parse(input);

  const cotisationsSociales = v.chiffreAffaires * v.tauxCotisations;
  const revenuApresCharges = v.chiffreAffaires - cotisationsSociales;

  // Revenu imposable = CA - abattement fiscal (minimum 305 EUR)
  const abattement = v.chiffreAffaires * v.tauxAbattementFiscal;
  const revenuImposable = Math.max(0, v.chiffreAffaires - Math.max(abattement, 305));

  const versementLiberatoireIR =
    v.versementLiberatoire ? v.chiffreAffaires * v.tauxVersementLiberatoire : 0;

  const tauxChargesEffectif =
    v.chiffreAffaires > 0
      ? (cotisationsSociales + versementLiberatoireIR) / v.chiffreAffaires
      : 0;

  return AEOutputSchema.parse({
    cotisationsSociales,
    revenuApresCharges,
    revenuImposable,
    tauxChargesEffectif,
    versementLiberatoireIR,
    detail: {
      chiffreAffaires: v.chiffreAffaires,
      abattementFiscal: abattement,
      cotisationsSociales,
    },
  });
}
