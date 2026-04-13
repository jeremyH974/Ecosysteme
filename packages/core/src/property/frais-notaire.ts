import { z } from "zod";

export const FraisNotaireInputSchema = z.object({
  prixAchat: z.number().positive(),
  typeAchat: z.enum(["ancien", "neuf"]),
  // Taux passes en params
  tauxDroitsMutationAncien: z.number(), // ~5.80% (departement standard)
  tauxDroitsMutationNeuf: z.number(), // ~0.715% (taxe de publicite fonciere)
  tauxEmolumentsNotaire: z.number(), // ~1% (degressif simplifie)
  fraisDivers: z.number(), // ~1000-1500 EUR forfaitaires
});

export const FraisNotaireOutputSchema = z.object({
  totalFraisNotaire: z.number(),
  pourcentageDuPrix: z.number(),
  detail: z.object({
    droitsMutation: z.number(),
    emolumentsNotaire: z.number(),
    fraisDivers: z.number(),
  }),
});

export type FraisNotaireInput = z.infer<typeof FraisNotaireInputSchema>;
export type FraisNotaireOutput = z.infer<typeof FraisNotaireOutputSchema>;

/**
 * Estime les frais de notaire pour un achat immobilier.
 *
 * Ancien : ~7-8% du prix (droits de mutation ~5.80% + emoluments + frais)
 * Neuf : ~2-3% du prix (taxe publicite fonciere ~0.715% + emoluments + frais)
 *
 * Fonction PURE.
 */
export function calculerFraisNotaire(input: FraisNotaireInput): FraisNotaireOutput {
  const v = FraisNotaireInputSchema.parse(input);

  const tauxDroits =
    v.typeAchat === "ancien" ? v.tauxDroitsMutationAncien : v.tauxDroitsMutationNeuf;

  const droitsMutation = v.prixAchat * tauxDroits;
  const emolumentsNotaire = v.prixAchat * v.tauxEmolumentsNotaire;
  const totalFraisNotaire = droitsMutation + emolumentsNotaire + v.fraisDivers;
  const pourcentageDuPrix = (totalFraisNotaire / v.prixAchat) * 100;

  return FraisNotaireOutputSchema.parse({
    totalFraisNotaire,
    pourcentageDuPrix,
    detail: {
      droitsMutation,
      emolumentsNotaire,
      fraisDivers: v.fraisDivers,
    },
  });
}
