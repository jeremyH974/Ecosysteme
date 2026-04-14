import { z } from "zod";

export const IndemniteKmInputSchema = z.object({
  distanceAnnuelle: z.number().positive(),
  puissanceFiscale: z.enum(["3", "4", "5", "6", "7+"]),
  // Bareme kilometrique passe en params
  bareme: z.array(
    z.object({
      puissance: z.string(),
      jusqu_a_5000: z.object({ coeff: z.number(), ajout: z.number() }),
      de_5001_a_20000: z.object({ coeff: z.number(), ajout: z.number() }),
      au_dela_20000: z.object({ coeff: z.number(), ajout: z.number() }),
    }),
  ),
});

export const IndemniteKmOutputSchema = z.object({
  montantTotal: z.number(),
  montantMensuel: z.number(),
  detail: z.object({
    distanceAnnuelle: z.number(),
    puissanceFiscale: z.string(),
    tranche: z.string(),
    formule: z.string(),
  }),
});

export type IndemniteKmInput = z.infer<typeof IndemniteKmInputSchema>;
export type IndemniteKmOutput = z.infer<typeof IndemniteKmOutputSchema>;

/**
 * Calcule les indemnites kilometriques selon le bareme fiscal.
 * Utilisable pour les frais reels (declaration IR) ou remboursement employeur.
 *
 * Bareme 2024 : https://www.service-public.fr/particuliers/vosdroits/F19846
 */
export function calculerIndemnitesKm(input: IndemniteKmInput): IndemniteKmOutput {
  const v = IndemniteKmInputSchema.parse(input);

  const ligne = v.bareme.find((b) => b.puissance === v.puissanceFiscale);
  if (!ligne) {
    throw new Error(`PUISSANCE_INTROUVABLE: Pas de bareme pour la puissance ${v.puissanceFiscale} CV`);
  }

  let montantTotal: number;
  let tranche: string;
  let formule: string;

  if (v.distanceAnnuelle <= 5000) {
    montantTotal = v.distanceAnnuelle * ligne.jusqu_a_5000.coeff + ligne.jusqu_a_5000.ajout;
    tranche = "Jusqu'a 5 000 km";
    formule = `${String(v.distanceAnnuelle)} x ${String(ligne.jusqu_a_5000.coeff)} + ${String(ligne.jusqu_a_5000.ajout)}`;
  } else if (v.distanceAnnuelle <= 20000) {
    montantTotal = v.distanceAnnuelle * ligne.de_5001_a_20000.coeff + ligne.de_5001_a_20000.ajout;
    tranche = "De 5 001 a 20 000 km";
    formule = `${String(v.distanceAnnuelle)} x ${String(ligne.de_5001_a_20000.coeff)} + ${String(ligne.de_5001_a_20000.ajout)}`;
  } else {
    montantTotal = v.distanceAnnuelle * ligne.au_dela_20000.coeff + ligne.au_dela_20000.ajout;
    tranche = "Au-dela de 20 000 km";
    formule = `${String(v.distanceAnnuelle)} x ${String(ligne.au_dela_20000.coeff)} + ${String(ligne.au_dela_20000.ajout)}`;
  }

  return IndemniteKmOutputSchema.parse({
    montantTotal,
    montantMensuel: montantTotal / 12,
    detail: {
      distanceAnnuelle: v.distanceAnnuelle,
      puissanceFiscale: v.puissanceFiscale,
      tranche,
      formule,
    },
  });
}
