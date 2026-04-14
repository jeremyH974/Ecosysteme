import { describe, test, expect } from "vitest";
import { calculerRevisionLoyer } from "../src/property/revision-loyer.js";

// IRL reels INSEE
const IRL = {
  T4_2023: 142.06,
  T1_2024: 143.46,
  T2_2024: 145.17,
  T3_2024: 144.51,
  T4_2024: 144.64,
};

function calc(loyer: number, ancien: number, nouveau: number) {
  return calculerRevisionLoyer({
    loyerActuel: loyer,
    irlAncien: ancien,
    irlNouveau: nouveau,
  });
}

describe("calculerRevisionLoyer", () => {
  // =====================================================
  // CAS STANDARDS AVEC IRL REELS
  // =====================================================

  test("Cas 1 — Loyer 800 EUR, IRL T4 2023 → T4 2024", () => {
    const result = calc(800, IRL.T4_2023, IRL.T4_2024);
    // 800 * (144.64 / 142.06) = 800 * 1.024004 = 819.20
    expect(result.nouveauLoyer).toBeCloseTo(800 * (IRL.T4_2024 / IRL.T4_2023), 2);
    expect(result.augmentationMontant).toBeGreaterThan(0);
    // 144.64/142.06 - 1 = ~1.82%
    expect(result.augmentationPourcentage).toBeCloseTo(1.82, 0);
  });

  test("Cas 2 — Loyer 1200 EUR, IRL T1 2024 → T1 suivant (utilise T1 2024 comme nouveau)", () => {
    // Simulation : ancien T4 2023, nouveau T1 2024
    const result = calc(1200, IRL.T4_2023, IRL.T1_2024);
    expect(result.nouveauLoyer).toBeCloseTo(1200 * (IRL.T1_2024 / IRL.T4_2023), 2);
    expect(result.augmentationMontant).toBeGreaterThan(0);
  });

  test("Cas 3 — Loyer 650 EUR, IRL T2 2024 → T3 2024 (variation negative)", () => {
    const result = calc(650, IRL.T2_2024, IRL.T3_2024);
    // T3 (144.51) < T2 (145.17) → baisse
    expect(result.augmentationPourcentage).toBeLessThan(0);
    expect(result.augmentationMontant).toBeLessThan(0);
  });

  test("Cas 4 — Loyer 950 EUR, memes IRL T4 2023 → T4 2024", () => {
    const result = calc(950, IRL.T4_2023, IRL.T4_2024);
    expect(result.nouveauLoyer).toBeGreaterThan(950);
    expect(result.nouveauLoyer).toBeLessThan(1000);
  });

  test("Cas 5 — Loyer 2500 EUR (loyer eleve)", () => {
    const result = calc(2500, IRL.T4_2023, IRL.T4_2024);
    // ~1.82% de 2500 = ~45.40
    expect(result.augmentationMontant).toBeGreaterThan(40);
    expect(result.augmentationMontant).toBeLessThan(60);
  });

  // =====================================================
  // CAS LIMITES
  // =====================================================

  test("IRL identiques → loyer inchange", () => {
    const result = calc(800, 142.06, 142.06);
    expect(result.nouveauLoyer).toBeCloseTo(800, 2);
    expect(result.augmentationMontant).toBeCloseTo(0, 2);
    expect(result.augmentationPourcentage).toBeCloseTo(0, 4);
  });

  test("IRL en baisse → loyer diminue", () => {
    const result = calc(800, 145.00, 143.00);
    expect(result.nouveauLoyer).toBeLessThan(800);
    expect(result.augmentationMontant).toBeLessThan(0);
    expect(result.augmentationPourcentage).toBeLessThan(0);
  });

  test("Loyer petit (400 EUR)", () => {
    const result = calc(400, IRL.T4_2023, IRL.T4_2024);
    expect(result.nouveauLoyer).toBeGreaterThan(400);
    expect(result.nouveauLoyer).toBeLessThan(420);
  });

  test("Loyer tres eleve (3000 EUR)", () => {
    const result = calc(3000, IRL.T4_2023, IRL.T4_2024);
    expect(result.nouveauLoyer).toBeGreaterThan(3000);
  });

  // =====================================================
  // COHERENCE INTERNE
  // =====================================================

  test("Coherence — augmentation montant = nouveau - ancien", () => {
    const result = calc(800, IRL.T4_2023, IRL.T4_2024);
    expect(result.augmentationMontant).toBeCloseTo(result.nouveauLoyer - 800, 6);
  });

  test("Coherence — augmentation % = (ratio - 1) * 100", () => {
    const result = calc(800, IRL.T4_2023, IRL.T4_2024);
    const expectedPct = (IRL.T4_2024 / IRL.T4_2023 - 1) * 100;
    expect(result.augmentationPourcentage).toBeCloseTo(expectedPct, 4);
  });

  test("Coherence — detail contient les valeurs d'entree", () => {
    const result = calc(800, 142.06, 144.64);
    expect(result.detail.loyerActuel).toBe(800);
    expect(result.detail.irlAncien).toBe(142.06);
    expect(result.detail.irlNouveau).toBe(144.64);
  });

  test("Coherence — ratio IRL = nouveau / ancien", () => {
    const result = calc(800, 142.06, 144.64);
    expect(result.detail.ratioIRL).toBeCloseTo(144.64 / 142.06, 6);
  });

  // =====================================================
  // VALIDATION ZOD
  // =====================================================

  test("Loyer 0 → erreur Zod", () => {
    expect(() => calc(0, 142.06, 144.64)).toThrow();
  });

  test("Loyer negatif → erreur Zod", () => {
    expect(() => calc(-800, 142.06, 144.64)).toThrow();
  });

  test("IRL ancien 0 → erreur Zod", () => {
    expect(() => calc(800, 0, 144.64)).toThrow();
  });

  test("IRL nouveau negatif → erreur Zod", () => {
    expect(() => calc(800, 142.06, -1)).toThrow();
  });

  // =====================================================
  // PRECISION
  // =====================================================

  test("Precision decimale — 750.50 EUR, IRL precis", () => {
    const result = calc(750.50, 142.06, 143.46);
    const expected = 750.50 * (143.46 / 142.06);
    expect(result.nouveauLoyer).toBeCloseTo(expected, 2);
  });

  test("Grande variation IRL theorique (10%)", () => {
    const result = calc(1000, 100, 110);
    expect(result.nouveauLoyer).toBeCloseTo(1100, 2);
    expect(result.augmentationPourcentage).toBeCloseTo(10, 4);
  });
});
