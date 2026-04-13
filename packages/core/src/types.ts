import { z } from "zod";

/** Montant monetaire en euros (>= 0) */
export const MonetaryAmountSchema = z.number().nonnegative();
export type MonetaryAmount = z.infer<typeof MonetaryAmountSchema>;

/** Montant monetaire en euros (> 0, strictement positif) */
export const PositiveAmountSchema = z.number().positive();
export type PositiveAmount = z.infer<typeof PositiveAmountSchema>;

/** Pourcentage exprime en decimal (0.0 a 1.0) */
export const PercentageSchema = z.number().min(0).max(1);
export type Percentage = z.infer<typeof PercentageSchema>;

/** Nombre d'annees entier (>= 0) */
export const AnneeSchema = z.number().int().nonnegative();
export type Annee = z.infer<typeof AnneeSchema>;

/** Nombre de mois (0 a 11) */
export const MoisSchema = z.number().int().min(0).max(11);
export type Mois = z.infer<typeof MoisSchema>;
