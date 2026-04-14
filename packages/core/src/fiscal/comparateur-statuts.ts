import { z } from "zod";

export const ComparateurStatutsInputSchema = z.object({
  chiffreAffaires: z.number().positive(),
  chargesReelles: z.number().min(0).default(0), // charges deductibles en SASU
  activite: z.enum(["vente", "prestation_bic", "prestation_bnc"]),
  nbPartsFiscales: z.number().min(1).default(1),
  // Taux AE
  tauxCotisationsAE: z.number(),
  tauxAbattementAE: z.number(),
  // Taux SASU
  tauxCotisationsPatronalesSASU: z.number().default(0.42),
  tauxCotisationsSalarialesSASU: z.number().default(0.22),
  tauxISReduit: z.number().default(0.15),
  tauxISNormal: z.number().default(0.25),
  seuilISReduit: z.number().default(42500),
  tauxPFU: z.number().default(0.30),
  // Tranches IR
  tranchesIR: z.array(z.object({ de: z.number(), jusqu_a: z.number().nullable(), taux: z.number() })),
});

const StatutResultSchema = z.object({
  label: z.string(),
  revenuNet: z.number(),
  chargesSociales: z.number(),
  impots: z.number(),
  protectionSociale: z.string(),
  complexite: z.string(),
});

export const ComparateurStatutsOutputSchema = z.object({
  autoEntrepreneur: StatutResultSchema,
  sasu: StatutResultSchema,
  recommandation: z.string(),
  ecart: z.number(),
  ecartPourcentage: z.number(),
});

export type ComparateurStatutsInput = z.infer<typeof ComparateurStatutsInputSchema>;
export type ComparateurStatutsOutput = z.infer<typeof ComparateurStatutsOutputSchema>;

/**
 * Compare les regimes auto-entrepreneur et SASU pour un meme chiffre d'affaires.
 * Permet de determiner le statut le plus avantageux.
 */
export function comparerStatuts(input: ComparateurStatutsInput): ComparateurStatutsOutput {
  const v = ComparateurStatutsInputSchema.parse(input);

  // === AUTO-ENTREPRENEUR ===
  const cotisAE = v.chiffreAffaires * v.tauxCotisationsAE;
  const revenuApresChargesAE = v.chiffreAffaires - cotisAE;
  const abattementAE = Math.max(v.chiffreAffaires * v.tauxAbattementAE, 305);
  const revenuImposableAE = Math.max(0, v.chiffreAffaires - abattementAE);
  const irAE = calculerIRSimple(revenuImposableAE, v.nbPartsFiscales, v.tranchesIR);
  const netAE = revenuApresChargesAE - irAE;

  // === SASU ===
  // Strategie simplifiee : 100% salaire (pas d'optimisation dans le comparateur)
  const benefice = v.chiffreAffaires - v.chargesReelles;
  const salaireBrutMax = benefice / (1 + v.tauxCotisationsPatronalesSASU);
  const cotisPatronales = salaireBrutMax * v.tauxCotisationsPatronalesSASU;
  const cotisSalariales = salaireBrutMax * v.tauxCotisationsSalarialesSASU;
  const salaireNet = salaireBrutMax - cotisSalariales;
  const irSASU = calculerIRSimple(salaireNet, v.nbPartsFiscales, v.tranchesIR);
  const netSASU = salaireNet - irSASU;
  const chargesSocialesSASU = cotisPatronales + cotisSalariales;

  const ecart = netAE - netSASU;
  const ecartPct = netSASU > 0 ? (ecart / netSASU) * 100 : 0;

  const recommandation =
    ecart > 1000
      ? "L'auto-entreprise est significativement plus avantageuse pour ce niveau de CA."
      : ecart < -1000
        ? "La SASU est plus avantageuse grace a la deduction des charges reelles et a l'optimisation possible."
        : "Les deux statuts sont proches. Le choix depend de vos besoins en protection sociale et de vos charges reelles.";

  return ComparateurStatutsOutputSchema.parse({
    autoEntrepreneur: {
      label: "Auto-entrepreneur",
      revenuNet: netAE,
      chargesSociales: cotisAE,
      impots: irAE,
      protectionSociale: "Basique (retraite reduite, pas d'assurance chomage)",
      complexite: "Tres simple (declaration trimestrielle uniquement)",
    },
    sasu: {
      label: "SASU",
      revenuNet: netSASU,
      chargesSociales: chargesSocialesSASU,
      impots: irSASU,
      protectionSociale: "Complete (assimile salarie, retraite pleine, maladie)",
      complexite: "Complexe (comptabilite, declarations sociales, AG annuelle)",
    },
    recommandation,
    ecart,
    ecartPourcentage: ecartPct,
  });
}

// IR simplifie pour le comparateur (evite la dependance circulaire)
function calculerIRSimple(
  revenu: number,
  nbParts: number,
  tranches: Array<{ de: number; jusqu_a: number | null; taux: number }>,
): number {
  const parPart = revenu / nbParts;
  let ir = 0;
  for (const t of tranches) {
    const plafond = t.jusqu_a ?? Infinity;
    if (parPart <= t.de) continue;
    ir += (Math.min(parPart, plafond) - t.de) * t.taux;
  }
  return ir * nbParts;
}
