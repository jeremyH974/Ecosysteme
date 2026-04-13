import { describe, test, expect } from "vitest";
import { calculerIndemniteRuptureConventionnelle } from "../src/salary/rupture-conventionnelle.js";

// Source de reference pour tous les cas :
// https://www.service-public.fr/particuliers/vosdroits/F987
// Simulateur officiel : https://www.service-public.fr/simulateur/calcul/IndemniteRupture

const TAUX = {
  jusqua10: 0.25,
  auDela10: 1 / 3,
};

function calc(
  salaire: number,
  annees: number,
  mois: number = 0,
) {
  return calculerIndemniteRuptureConventionnelle({
    salaireBrutMensuelMoyen: salaire,
    ancienneteAnnees: annees,
    ancienneteMois: mois,
    tauxParAnneeJusqua10ans: TAUX.jusqua10,
    tauxParAnneeAuDela10ans: TAUX.auDela10,
  });
}

describe("calculerIndemniteRuptureConventionnelle", () => {
  // =====================================================
  // CAS STANDARDS — verification croisee service-public.fr
  // =====================================================

  test("Cas 1 — 1 an, salaire 2000 EUR → 500 EUR", () => {
    // 2000 × 0.25 × 1 = 500
    const result = calc(2000, 1);
    expect(result.montantMinimalLegal).toBeCloseTo(500, 2);
  });

  test("Cas 2 — 10 ans, salaire 3000 EUR → 7500 EUR", () => {
    // 3000 × 0.25 × 10 = 7500
    const result = calc(3000, 10);
    expect(result.montantMinimalLegal).toBeCloseTo(7500, 2);
  });

  test("Cas 3 — 15 ans, salaire 3000 EUR (deux tranches) → ~12499.50 EUR", () => {
    // (3000 × 0.25 × 10) + (3000 × 1/3 × 5) = 7500 + 5000 = 12500
    const result = calc(3000, 15);
    expect(result.montantMinimalLegal).toBeCloseTo(12500, 0);
  });

  test("Cas 4 — 2 ans 6 mois, salaire 2500 EUR → 1562.50 EUR", () => {
    // 2500 × 0.25 × 2.5 = 1562.50
    const result = calc(2500, 2, 6);
    expect(result.montantMinimalLegal).toBeCloseTo(1562.5, 2);
  });

  test("Cas 5 — 5 ans, salaire 4000 EUR → 5000 EUR", () => {
    // 4000 × 0.25 × 5 = 5000
    const result = calc(4000, 5);
    expect(result.montantMinimalLegal).toBeCloseTo(5000, 2);
  });

  test("Cas 6 — 20 ans, salaire 2500 EUR → 14583.33 EUR", () => {
    // (2500 × 0.25 × 10) + (2500 × 1/3 × 10) = 6250 + 8333.33 = 14583.33
    const result = calc(2500, 20);
    expect(result.montantMinimalLegal).toBeCloseTo(14583.33, 0);
  });

  test("Cas 7 — 3 ans, salaire 1800 EUR → 1350 EUR", () => {
    // 1800 × 0.25 × 3 = 1350
    const result = calc(1800, 3);
    expect(result.montantMinimalLegal).toBeCloseTo(1350, 2);
  });

  test("Cas 8 — 7 ans 3 mois, salaire 3500 EUR → 6343.75 EUR", () => {
    // 3500 × 0.25 × 7.25 = 6343.75
    const result = calc(3500, 7, 3);
    expect(result.montantMinimalLegal).toBeCloseTo(6343.75, 2);
  });

  test("Cas 9 — 12 ans, salaire 5000 EUR → 15833.33 EUR", () => {
    // (5000 × 0.25 × 10) + (5000 × 1/3 × 2) = 12500 + 3333.33 = 15833.33
    const result = calc(5000, 12);
    expect(result.montantMinimalLegal).toBeCloseTo(15833.33, 0);
  });

  test("Cas 10 — 10 ans 6 mois, salaire 2800 EUR → 7466.67 EUR", () => {
    // (2800 × 0.25 × 10) + (2800 × 1/3 × 0.5) = 7000 + 466.67 = 7466.67
    const result = calc(2800, 10, 6);
    expect(result.montantMinimalLegal).toBeCloseTo(7466.67, 0);
  });

  // =====================================================
  // EDGE CASES OBLIGATOIRES (Master Prompt 8.3)
  // =====================================================

  test("Edge 1 — Anciennete < 8 mois → erreur ANCIENNETE_INSUFFISANTE", () => {
    expect(() => calc(2000, 0, 5)).toThrow("ANCIENNETE_INSUFFISANTE");
  });

  test("Edge 2 — Anciennete exactement 7 mois → erreur", () => {
    expect(() => calc(2000, 0, 7)).toThrow("ANCIENNETE_INSUFFISANTE");
  });

  test("Edge 3 — Anciennete exactement 8 mois (minimum legal) → calcul OK", () => {
    // 2000 × 0.25 × (8/12) = 2000 × 0.25 × 0.6667 = 333.33
    const result = calc(2000, 0, 8);
    expect(result.montantMinimalLegal).toBeCloseTo(333.33, 0);
    expect(result.detail.ancienneteTotaleEnAnnees).toBeCloseTo(8 / 12, 4);
  });

  test("Edge 4 — Anciennete 0 ans 0 mois → erreur", () => {
    expect(() => calc(2000, 0, 0)).toThrow("ANCIENNETE_INSUFFISANTE");
  });

  test("Edge 5 — Anciennete 30 ans, salaire 3000 EUR (pas de plafond)", () => {
    // (3000 × 0.25 × 10) + (3000 × 1/3 × 20) = 7500 + 20000 = 27500
    const result = calc(3000, 30);
    expect(result.montantMinimalLegal).toBeCloseTo(27500, 0);
  });

  test("Edge 6 — Anciennete 40 ans (tres longue carriere)", () => {
    // (2000 × 0.25 × 10) + (2000 × 1/3 × 30) = 5000 + 20000 = 25000
    const result = calc(2000, 40);
    expect(result.montantMinimalLegal).toBeCloseTo(25000, 0);
  });

  test("Edge 7 — Salaire tres eleve (25000 EUR/mois)", () => {
    // 25000 × 0.25 × 5 = 31250
    const result = calc(25000, 5);
    expect(result.montantMinimalLegal).toBeCloseTo(31250, 2);
  });

  test("Edge 8 — Salaire bas (1200 EUR/mois)", () => {
    // 1200 × 0.25 × 2 = 600
    const result = calc(1200, 2);
    expect(result.montantMinimalLegal).toBeCloseTo(600, 2);
  });

  test("Edge 9 — Mois = 11 (maximum)", () => {
    // 2000 × 0.25 × (1 + 11/12) = 2000 × 0.25 × 1.9167 = 958.33
    const result = calc(2000, 1, 11);
    expect(result.montantMinimalLegal).toBeCloseTo(958.33, 0);
  });

  test("Edge 10 — Mois = 0 (annees exactes)", () => {
    const result = calc(2000, 5, 0);
    expect(result.detail.ancienneteTotaleEnAnnees).toBe(5);
    expect(result.montantMinimalLegal).toBeCloseTo(2500, 2);
  });

  // =====================================================
  // VALIDATION DES INPUTS (Zod)
  // =====================================================

  test("Salaire = 0 → erreur Zod (doit etre positif)", () => {
    expect(() => calc(0, 5)).toThrow();
  });

  test("Salaire negatif → erreur Zod", () => {
    expect(() => calc(-1000, 5)).toThrow();
  });

  test("Mois = 12 → erreur Zod (max 11)", () => {
    expect(() =>
      calculerIndemniteRuptureConventionnelle({
        salaireBrutMensuelMoyen: 2000,
        ancienneteAnnees: 1,
        ancienneteMois: 12,
        tauxParAnneeJusqua10ans: 0.25,
        tauxParAnneeAuDela10ans: 1 / 3,
      }),
    ).toThrow();
  });

  test("Annees negatives → erreur Zod", () => {
    expect(() => calc(2000, -1)).toThrow();
  });

  // =====================================================
  // VERIFICATION DU DETAIL
  // =====================================================

  test("Detail — structure correcte pour 15 ans", () => {
    const result = calc(3000, 15);
    expect(result.detail.ancienneteTotaleEnAnnees).toBe(15);
    expect(result.detail.baseCalcul).toBe(3000);
    expect(result.detail.montantPremierTranche).toBeCloseTo(7500, 2);
    expect(result.detail.montantDeuxiemeTranche).toBeCloseTo(5000, 0);
  });

  test("Detail — premiere tranche uniquement pour 8 ans", () => {
    const result = calc(2000, 8);
    expect(result.detail.montantPremierTranche).toBeCloseTo(4000, 2);
    expect(result.detail.montantDeuxiemeTranche).toBe(0);
  });

  test("Detail — base calcul = salaire brut mensuel moyen", () => {
    const result = calc(3456.78, 5);
    expect(result.detail.baseCalcul).toBe(3456.78);
  });
});
