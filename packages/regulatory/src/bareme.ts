import { z } from "zod";

export const BaremeCategorie = z.enum([
  "cotisations_salariales",
  "cotisations_patronales",
  "cotisations_tns",
  "tranches_ir",
  "seuils_tva",
  "indices_loyers",
  "baremes_km",
  "seuils_ae",
  "taux_is",
  "abattements_immo",
  "smic",
  "rupture_conventionnelle",
]);

export type BaremeCategorie = z.infer<typeof BaremeCategorie>;

export const BaremeSchema = z.object({
  id: z.string(),
  nom: z.string(),
  categorie: BaremeCategorie,
  valeur: z.union([z.number(), z.array(z.unknown()), z.record(z.unknown())]),
  date_debut: z.string().datetime(),
  date_fin: z.string().datetime().nullable(),
  source_url: z.string().url(),
  source_label: z.string(),
  verifie_le: z.string().datetime(),
  verifie_par: z.string(),
  notes: z.string().optional(),
});

export type Bareme = z.infer<typeof BaremeSchema>;
