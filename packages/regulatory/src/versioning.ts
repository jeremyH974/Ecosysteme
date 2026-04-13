import type { Bareme } from "./bareme.js";

/**
 * Verifie si un bareme est actif a une date donnee.
 */
export function isBaremeActif(bareme: Bareme, date: Date = new Date()): boolean {
  const dateISO = date.toISOString();
  return bareme.date_debut <= dateISO && (bareme.date_fin === null || bareme.date_fin > dateISO);
}

/**
 * Verifie si un bareme necessite une mise a jour
 * (date de verification > 30 jours).
 */
export function needsVerification(bareme: Bareme, now: Date = new Date()): boolean {
  const verifieLe = new Date(bareme.verifie_le);
  const diffMs = now.getTime() - verifieLe.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays > 30;
}
