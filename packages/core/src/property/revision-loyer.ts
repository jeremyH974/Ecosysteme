import { z } from "zod";

export const RevisionLoyerInputSchema = z.object({
  loyerActuel: z.number().positive(),
  irlAncien: z.number().positive(),
  irlNouveau: z.number().positive(),
});

export const RevisionLoyerOutputSchema = z.object({
  nouveauLoyer: z.number(),
  augmentationMontant: z.number(),
  augmentationPourcentage: z.number(),
  detail: z.object({
    loyerActuel: z.number(),
    irlAncien: z.number(),
    irlNouveau: z.number(),
    ratioIRL: z.number(),
  }),
});

export type RevisionLoyerInput = z.infer<typeof RevisionLoyerInputSchema>;
export type RevisionLoyerOutput = z.infer<typeof RevisionLoyerOutputSchema>;

/**
 * Calcule le nouveau loyer apres revision annuelle basee sur l'IRL.
 *
 * Formule : nouveau_loyer = loyer_actuel × (IRL_nouveau / IRL_ancien)
 *
 * Art. 17-1 de la loi du 6 juillet 1989.
 * Le loyer ne peut augmenter que dans la limite de la variation de l'IRL.
 *
 * Fonction PURE.
 */
export function calculerRevisionLoyer(input: RevisionLoyerInput): RevisionLoyerOutput {
  const v = RevisionLoyerInputSchema.parse(input);

  const ratioIRL = v.irlNouveau / v.irlAncien;
  const nouveauLoyer = v.loyerActuel * ratioIRL;
  const augmentationMontant = nouveauLoyer - v.loyerActuel;
  const augmentationPourcentage = (ratioIRL - 1) * 100;

  return RevisionLoyerOutputSchema.parse({
    nouveauLoyer,
    augmentationMontant,
    augmentationPourcentage,
    detail: {
      loyerActuel: v.loyerActuel,
      irlAncien: v.irlAncien,
      irlNouveau: v.irlNouveau,
      ratioIRL,
    },
  });
}
