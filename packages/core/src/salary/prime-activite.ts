import { z } from "zod";

export const PrimeActiviteInputSchema = z.object({
  salaireNetMensuel: z.number().min(0),
  nbPersonnesFoyer: z.number().int().min(1).default(1),
  nbEnfants: z.number().int().min(0).default(0),
  autresRevenus: z.number().min(0).default(0),
  // Parametres passes en params
  montantForfaitaire: z.number().default(622.63), // celibataire sans enfant, avril 2026
  bonification: z.number().default(173.22), // bonification max
  seuilBonification: z.number().default(632.16), // 0.5 SMIC net
  plafondBonification: z.number().default(1264.32), // SMIC net
});

export const PrimeActiviteOutputSchema = z.object({
  montantEstime: z.number(),
  eligible: z.boolean(),
  detail: z.object({
    forfaitaire: z.number(),
    bonification: z.number(),
    revenus: z.number(),
    nbPersonnes: z.number(),
  }),
});

export type PrimeActiviteInput = z.infer<typeof PrimeActiviteInputSchema>;
export type PrimeActiviteOutput = z.infer<typeof PrimeActiviteOutputSchema>;

/**
 * Estime la prime d'activite.
 *
 * Formule simplifiee : forfaitaire + bonification - 38% des revenus
 * La prime reelle depend du detail des ressources du foyer (CAF).
 */
export function calculerPrimeActivite(input: PrimeActiviteInput): PrimeActiviteOutput {
  const v = PrimeActiviteInputSchema.parse(input);

  // Forfaitaire ajuste selon la composition du foyer
  let forfaitaire = v.montantForfaitaire;
  if (v.nbPersonnesFoyer >= 2) forfaitaire *= 1.5;
  if (v.nbEnfants >= 1) forfaitaire += v.montantForfaitaire * 0.3 * Math.min(v.nbEnfants, 2);
  if (v.nbEnfants >= 3) forfaitaire += v.montantForfaitaire * 0.4 * (v.nbEnfants - 2);

  // Bonification individuelle (progressive entre 0.5 SMIC et SMIC)
  let bonification = 0;
  if (v.salaireNetMensuel >= v.plafondBonification) {
    bonification = v.bonification;
  } else if (v.salaireNetMensuel >= v.seuilBonification) {
    bonification = v.bonification * (v.salaireNetMensuel - v.seuilBonification) / (v.plafondBonification - v.seuilBonification);
  }

  // Revenus pris en compte (salaire + 61% du salaire + autres)
  const revenusPrisEnCompte = v.salaireNetMensuel + v.autresRevenus;

  // Prime = forfaitaire + bonification + 61% salaire - revenus
  const prime61 = v.salaireNetMensuel * 0.61;
  const montant = forfaitaire + bonification + prime61 - revenusPrisEnCompte;
  const montantEstime = Math.max(0, Math.round(montant * 100) / 100);

  return PrimeActiviteOutputSchema.parse({
    montantEstime,
    eligible: montantEstime > 0 && v.salaireNetMensuel > 0,
    detail: {
      forfaitaire,
      bonification,
      revenus: revenusPrisEnCompte,
      nbPersonnes: v.nbPersonnesFoyer + v.nbEnfants,
    },
  });
}
