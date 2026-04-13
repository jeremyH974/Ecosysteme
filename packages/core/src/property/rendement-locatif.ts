import { z } from "zod";

export const RendementLocatifInputSchema = z.object({
  prixAchat: z.number().positive(),
  loyerMensuel: z.number().positive(),
  chargesAnnuelles: z.number().min(0).default(0),
  fraisNotaire: z.number().min(0).default(0),
  vacanceLocativeMois: z.number().min(0).max(12).default(1),
});

export const RendementLocatifOutputSchema = z.object({
  rendementBrut: z.number(),
  rendementNet: z.number(),
  revenuAnnuelBrut: z.number(),
  revenuAnnuelNet: z.number(),
  coutTotalAcquisition: z.number(),
  detail: z.object({
    loyerAnnuel: z.number(),
    loyerEffectif: z.number(),
    chargesAnnuelles: z.number(),
  }),
});

export type RendementLocatifInput = z.infer<typeof RendementLocatifInputSchema>;
export type RendementLocatifOutput = z.infer<typeof RendementLocatifOutputSchema>;

/**
 * Calcule le rendement locatif brut et net d'un investissement immobilier.
 *
 * Rendement brut = (loyer annuel / prix achat) * 100
 * Rendement net = ((loyer effectif - charges) / cout total) * 100
 *
 * Fonction PURE.
 */
export function calculerRendementLocatif(input: RendementLocatifInput): RendementLocatifOutput {
  const v = RendementLocatifInputSchema.parse(input);

  const loyerAnnuel = v.loyerMensuel * 12;
  const moisOccupes = 12 - v.vacanceLocativeMois;
  const loyerEffectif = v.loyerMensuel * moisOccupes;
  const revenuAnnuelBrut = loyerAnnuel;
  const revenuAnnuelNet = loyerEffectif - v.chargesAnnuelles;
  const coutTotalAcquisition = v.prixAchat + v.fraisNotaire;

  const rendementBrut = (loyerAnnuel / v.prixAchat) * 100;
  const rendementNet = (revenuAnnuelNet / coutTotalAcquisition) * 100;

  return RendementLocatifOutputSchema.parse({
    rendementBrut,
    rendementNet,
    revenuAnnuelBrut,
    revenuAnnuelNet,
    coutTotalAcquisition,
    detail: {
      loyerAnnuel,
      loyerEffectif,
      chargesAnnuelles: v.chargesAnnuelles,
    },
  });
}
