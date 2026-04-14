import { z } from "zod";

export const CongesPayesInputSchema = z.object({
  salaireBrutMensuel: z.number().positive(),
  joursAcquis: z.number().min(0).max(30),
  joursPris: z.number().min(0).max(30),
  methode: z.enum(["maintien", "dixieme"]).default("maintien"),
});

export const CongesPayesOutputSchema = z.object({
  indemniteConges: z.number(),
  methodeRetenue: z.string(),
  joursRestants: z.number(),
  detail: z.object({
    maintienSalaire: z.number(),
    dixiemeBrut: z.number(),
    methodePlusFavorable: z.string(),
  }),
});

export type CongesPayesInput = z.infer<typeof CongesPayesInputSchema>;
export type CongesPayesOutput = z.infer<typeof CongesPayesOutputSchema>;

/**
 * Calcule l'indemnite de conges payes.
 *
 * Deux methodes comparees (la plus favorable au salarie s'applique) :
 * 1. Maintien de salaire : salaire habituel pendant les conges
 * 2. 1/10e du brut annuel : 10% de la remuneration brute totale
 */
export function calculerCongesPayes(input: CongesPayesInput): CongesPayesOutput {
  const v = CongesPayesInputSchema.parse(input);

  const brutAnnuel = v.salaireBrutMensuel * 12;
  const joursRestants = v.joursAcquis - v.joursPris;

  // Methode maintien : salaire journalier * jours pris
  // Jours ouvres par mois : ~21.67
  const salaireJournalier = v.salaireBrutMensuel / 21.67;
  const maintienSalaire = salaireJournalier * v.joursPris;

  // Methode 1/10e : 10% du brut annuel * (jours pris / jours acquis)
  const dixiemeBrut = v.joursAcquis > 0
    ? (brutAnnuel * 0.1) * (v.joursPris / v.joursAcquis)
    : 0;

  // Retenir la plus favorable
  const methodePlusFavorable = maintienSalaire >= dixiemeBrut ? "maintien" : "dixieme";
  const indemniteConges = Math.max(maintienSalaire, dixiemeBrut);

  return CongesPayesOutputSchema.parse({
    indemniteConges,
    methodeRetenue: methodePlusFavorable === "maintien"
      ? "Maintien de salaire (plus favorable)"
      : "1/10e du brut annuel (plus favorable)",
    joursRestants,
    detail: {
      maintienSalaire,
      dixiemeBrut,
      methodePlusFavorable,
    },
  });
}
