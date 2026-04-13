import type { BaremeCategorie } from "./bareme.js";

export interface PublicationCalendrier {
  categorie: BaremeCategorie;
  label: string;
  mois_attendu: number;
  jour_alerte: number;
}

export const CALENDAR_PUBLICATIONS: PublicationCalendrier[] = [
  { categorie: "indices_loyers", label: "IRL Q1", mois_attendu: 4, jour_alerte: 5 },
  { categorie: "indices_loyers", label: "IRL Q2", mois_attendu: 7, jour_alerte: 5 },
  { categorie: "indices_loyers", label: "IRL Q3", mois_attendu: 10, jour_alerte: 5 },
  { categorie: "indices_loyers", label: "IRL Q4", mois_attendu: 1, jour_alerte: 5 },
  { categorie: "tranches_ir", label: "Bareme IR", mois_attendu: 1, jour_alerte: 2 },
  { categorie: "smic", label: "SMIC", mois_attendu: 1, jour_alerte: 2 },
];

export interface BaremeAlerte {
  categorie: BaremeCategorie;
  label: string;
  message: string;
}

/**
 * Verifie si des baremes attendus n'ont pas ete mis a jour.
 * A appeler en CRON quotidien.
 */
export async function checkBaremesAlertes(_now: Date = new Date()): Promise<BaremeAlerte[]> {
  // Stub — sera implemente avec la base de donnees en Phase 1+
  return [];
}
