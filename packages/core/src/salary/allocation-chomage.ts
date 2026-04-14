import { z } from "zod";

export const AllocationChomageInputSchema = z.object({
  salaireBrutMensuelMoyen: z.number().positive(), // moyenne des 12 derniers mois
  ancienneteJours: z.number().int().min(0), // jours travailles sur 24 derniers mois
  age: z.number().int().min(16).max(67),
  // Parametres ARE passes en params
  tauxJournalier57: z.number().default(0.57),
  tauxJournalier405: z.number().default(0.405),
  partFixeJournaliere: z.number().default(13.18), // revalorise 01/07/2025
  plancher: z.number().default(32.13), // ARE minimum journalier — revalorise 01/07/2025
  plafond: z.number().default(274.80), // ARE maximum journalier (75% SJR)
});

export const AllocationChomageOutputSchema = z.object({
  eligible: z.boolean(),
  motifNonEligible: z.string().optional(),
  allocationJournaliere: z.number(),
  allocationMensuelle: z.number(),
  dureeMaxJours: z.number(),
  dureeMaxMois: z.number(),
  tauxRemplacement: z.number(),
  detail: z.object({
    salaireJournalierReference: z.number(),
    methode1: z.number(),
    methode2: z.number(),
    methodeRetenue: z.string(),
  }),
});

export type AllocationChomageInput = z.infer<typeof AllocationChomageInputSchema>;
export type AllocationChomageOutput = z.infer<typeof AllocationChomageOutputSchema>;

/**
 * Estime l'allocation chomage (ARE) selon les regles de France Travail.
 *
 * Methode 1 : 40,4% du SJR + part fixe (12,95 EUR)
 * Methode 2 : 57% du SJR
 * Retenue : la plus favorable (max des deux)
 * Plancher : 31,59 EUR/jour minimum
 * Plafond : 75% du SJR maximum
 */
export function calculerAllocationChomage(input: AllocationChomageInput): AllocationChomageOutput {
  const v = AllocationChomageInputSchema.parse(input);

  // Eligibilite : 130 jours travailles (6 mois) sur 24 derniers mois
  if (v.ancienneteJours < 130) {
    return AllocationChomageOutputSchema.parse({
      eligible: false,
      motifNonEligible: "Duree de travail insuffisante : il faut au moins 130 jours (6 mois) travailles sur les 24 derniers mois.",
      allocationJournaliere: 0,
      allocationMensuelle: 0,
      dureeMaxJours: 0,
      dureeMaxMois: 0,
      tauxRemplacement: 0,
      detail: { salaireJournalierReference: 0, methode1: 0, methode2: 0, methodeRetenue: "aucune" },
    });
  }

  // Salaire Journalier de Reference
  const sjr = (v.salaireBrutMensuelMoyen * 12) / 365;

  // Deux methodes de calcul
  const methode1 = sjr * v.tauxJournalier405 + v.partFixeJournaliere;
  const methode2 = sjr * v.tauxJournalier57;

  // Retenir la plus favorable
  let are = Math.max(methode1, methode2);
  const methodeRetenue = methode1 >= methode2 ? "40,4% SJR + 12,95 EUR" : "57% SJR";

  // Plancher
  are = Math.max(are, v.plancher);
  // Plafond : 75% du SJR
  are = Math.min(are, sjr * 0.75);

  // Duree : egale aux jours travailles, plafonnee selon l'age
  let dureeMaxJours: number;
  if (v.age < 53) {
    dureeMaxJours = Math.min(v.ancienneteJours, 730); // 24 mois max
  } else if (v.age < 55) {
    dureeMaxJours = Math.min(v.ancienneteJours, 913); // 30 mois max
  } else {
    dureeMaxJours = Math.min(v.ancienneteJours, 1095); // 36 mois max
  }

  const allocationMensuelle = are * 30;
  const tauxRemplacement = allocationMensuelle / (v.salaireBrutMensuelMoyen * 0.78); // par rapport au net approx

  return AllocationChomageOutputSchema.parse({
    eligible: true,
    allocationJournaliere: are,
    allocationMensuelle,
    dureeMaxJours,
    dureeMaxMois: Math.round(dureeMaxJours / 30),
    tauxRemplacement,
    detail: {
      salaireJournalierReference: sjr,
      methode1,
      methode2,
      methodeRetenue,
    },
  });
}
