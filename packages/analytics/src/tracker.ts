import type { AnalyticsEvent } from "./events.js";

/**
 * Envoie un evenement analytics.
 * Phase 0 : console.log uniquement.
 * Phase 1+ : integration Plausible.
 *
 * Ne jamais tracker de donnees personnelles.
 * Ne jamais tracker les valeurs des champs du formulaire.
 */
export function track(_event: AnalyticsEvent): void {
  // Phase 0 : no-op. Plausible integration en Phase 1.
}
