import { z } from "zod";

export const RuptureInputSchema = z.object({
  salaireBrutMensuelMoyen: z.number().positive(),
  ancienneteAnnees: z.number().int().min(0),
  ancienneteMois: z.number().int().min(0).max(11),
  // Les valeurs des baremes sont passees en parametre, pas lues ici
  tauxParAnneeJusqua10ans: z.number(),
  tauxParAnneeAuDela10ans: z.number(),
});

export const RuptureOutputSchema = z.object({
  montantMinimalLegal: z.number(),
  detail: z.object({
    ancienneteTotaleEnAnnees: z.number(),
    baseCalcul: z.number(),
    montantPremierTranche: z.number(),
    montantDeuxiemeTranche: z.number(),
  }),
});

export type RuptureInput = z.infer<typeof RuptureInputSchema>;
export type RuptureOutput = z.infer<typeof RuptureOutputSchema>;

/**
 * Calcule l'indemnite minimale legale de rupture conventionnelle.
 *
 * Fonction PURE : recoit les taux en parametre, ne lit aucun bareme.
 * Aucun arrondi silencieux — les nombres sont retournes avec precision complete.
 *
 * @throws ZodError si les inputs sont invalides
 * @throws Error ANCIENNETE_INSUFFISANTE si anciennete < 8 mois
 */
export function calculerIndemniteRuptureConventionnelle(input: RuptureInput): RuptureOutput {
  const validated = RuptureInputSchema.parse(input);

  // Anciennete totale en annees (avec fraction)
  const ancienneteTotale = validated.ancienneteAnnees + validated.ancienneteMois / 12;

  // Art. L1234-9 : le calcul legal s'applique a partir de 8 mois d'anciennete
  if (ancienneteTotale < 8 / 12) {
    throw new Error(
      "ANCIENNETE_INSUFFISANTE: Le calcul legal s'applique a partir de 8 mois d'anciennete. " +
        `Anciennete actuelle: ${Math.floor(ancienneteTotale * 12)} mois.`,
    );
  }

  const base = validated.salaireBrutMensuelMoyen;

  // Art. L1237-19-1 : le taux passe de 1/4 a 1/3 au-dela de 10 ans d'anciennete
  const anneesPremiereTranche = Math.min(ancienneteTotale, 10);
  const montantPremierTranche = base * validated.tauxParAnneeJusqua10ans * anneesPremiereTranche;

  const anneesDeuxiemeTranche = Math.max(0, ancienneteTotale - 10);
  const montantDeuxiemeTranche = base * validated.tauxParAnneeAuDela10ans * anneesDeuxiemeTranche;

  const montantMinimalLegal = montantPremierTranche + montantDeuxiemeTranche;

  return RuptureOutputSchema.parse({
    montantMinimalLegal,
    detail: {
      ancienneteTotaleEnAnnees: ancienneteTotale,
      baseCalcul: base,
      montantPremierTranche,
      montantDeuxiemeTranche,
    },
  });
}
