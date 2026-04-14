import { z } from "zod";

export const PlusValueImmoInputSchema = z.object({
  prixAchat: z.number().positive(),
  prixVente: z.number().positive(),
  fraisAcquisition: z.number().min(0).default(0), // frais notaire reels ou forfait 7.5%
  travauxDeductibles: z.number().min(0).default(0),
  dureeDetentionAnnees: z.number().int().min(0),
  residencePrincipale: z.boolean().default(false),
  // Taux en params
  tauxImposition: z.number().default(0.19),
  tauxPrelevementsSociaux: z.number().default(0.172),
  // Abattements par annee de detention (simplifie)
  abattementIRParAn6a21: z.number().default(0.06), // 6% par an de la 6e a la 21e annee
  abattementIRParAn22: z.number().default(0.04), // 4% la 22e annee
  abattementPSParAn6a21: z.number().default(0.0165), // 1.65% par an
  abattementPSParAn22: z.number().default(0.018), // 1.8% la 22e annee
  abattementPSParAnApres22: z.number().default(0.09), // 9% par an apres 22 ans
});

export const PlusValueImmoOutputSchema = z.object({
  plusValueBrute: z.number(),
  plusValueNetteIR: z.number(),
  plusValueNettePV: z.number(),
  impotIR: z.number(),
  prelevementsSociaux: z.number(),
  totalImposition: z.number(),
  netApresImpot: z.number(),
  exonere: z.boolean(),
  detail: z.object({
    prixAchatCorrige: z.number(),
    abattementIR: z.number(),
    abattementPS: z.number(),
    dureeDetention: z.number(),
  }),
});

export type PlusValueImmoInput = z.infer<typeof PlusValueImmoInputSchema>;
export type PlusValueImmoOutput = z.infer<typeof PlusValueImmoOutputSchema>;

function calculerAbattement(
  duree: number,
  tauxParAn6a21: number,
  tauxAn22: number,
  tauxApres22: number,
): number {
  if (duree <= 5) return 0;
  let abattement = 0;
  // 6e a 21e annee (16 annees max)
  const anneesTrancheA = Math.min(Math.max(duree - 5, 0), 16);
  abattement += anneesTrancheA * tauxParAn6a21;
  // 22e annee
  if (duree >= 22) abattement += tauxAn22;
  // Au-dela de 22 ans
  const anneesApres22 = Math.max(duree - 22, 0);
  abattement += anneesApres22 * tauxApres22;
  return Math.min(abattement, 1); // plafonner a 100%
}

/**
 * Calcule la plus-value immobiliere et l'imposition associee.
 *
 * Exonerations : residence principale, detention > 22 ans (IR), > 30 ans (PS)
 */
export function calculerPlusValueImmo(input: PlusValueImmoInput): PlusValueImmoOutput {
  const v = PlusValueImmoInputSchema.parse(input);

  // Residence principale = exoneration totale
  if (v.residencePrincipale) {
    return PlusValueImmoOutputSchema.parse({
      plusValueBrute: v.prixVente - v.prixAchat,
      plusValueNetteIR: 0,
      plusValueNettePV: 0,
      impotIR: 0,
      prelevementsSociaux: 0,
      totalImposition: 0,
      netApresImpot: v.prixVente - v.prixAchat,
      exonere: true,
      detail: { prixAchatCorrige: v.prixAchat, abattementIR: 1, abattementPS: 1, dureeDetention: v.dureeDetentionAnnees },
    });
  }

  // Prix d'achat corrige (frais + travaux)
  const frais = v.fraisAcquisition > 0 ? v.fraisAcquisition : v.prixAchat * 0.075;
  const prixAchatCorrige = v.prixAchat + frais + v.travauxDeductibles;
  const plusValueBrute = Math.max(0, v.prixVente - prixAchatCorrige);

  // Abattements pour duree de detention
  const abattementIR = calculerAbattement(v.dureeDetentionAnnees, v.abattementIRParAn6a21, v.abattementIRParAn22, 0);
  const abattementPS = calculerAbattement(v.dureeDetentionAnnees, v.abattementPSParAn6a21, v.abattementPSParAn22, v.abattementPSParAnApres22);

  const plusValueNetteIR = plusValueBrute * (1 - abattementIR);
  const plusValueNettePV = plusValueBrute * (1 - abattementPS);

  const impotIR = plusValueNetteIR * v.tauxImposition;
  const prelevementsSociaux = plusValueNettePV * v.tauxPrelevementsSociaux;
  const totalImposition = impotIR + prelevementsSociaux;
  const netApresImpot = plusValueBrute - totalImposition;

  return PlusValueImmoOutputSchema.parse({
    plusValueBrute,
    plusValueNetteIR,
    plusValueNettePV,
    impotIR,
    prelevementsSociaux,
    totalImposition,
    netApresImpot,
    exonere: v.dureeDetentionAnnees >= 30,
    detail: { prixAchatCorrige, abattementIR, abattementPS, dureeDetention: v.dureeDetentionAnnees },
  });
}
