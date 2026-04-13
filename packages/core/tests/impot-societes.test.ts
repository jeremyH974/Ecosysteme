import { describe, test, expect } from "vitest";
import { calculerIS } from "../src/fiscal/impot-societes.js";

const TAUX_2024 = {
  tauxReduit: 0.15,
  seuilReduit: 42500,
  tauxNormal: 0.25,
};

function calc(benefice: number, eligible = true) {
  return calculerIS({
    beneficeImposable: benefice,
    ...TAUX_2024,
    eligibleTauxReduit: eligible,
  });
}

describe("calculerIS", () => {
  test("Benefice 0 → IS = 0", () => {
    const result = calc(0);
    expect(result.montantIS).toBe(0);
    expect(result.tauxEffectif).toBe(0);
  });

  test("Benefice 30000 EUR (sous seuil reduit) → 15%", () => {
    // 30000 * 0.15 = 4500
    const result = calc(30000);
    expect(result.montantIS).toBeCloseTo(4500, 2);
    expect(result.tauxEffectif).toBeCloseTo(0.15, 4);
  });

  test("Benefice 42500 EUR (exactement au seuil) → 15%", () => {
    // 42500 * 0.15 = 6375
    const result = calc(42500);
    expect(result.montantIS).toBeCloseTo(6375, 2);
    expect(result.detail.baseTrancheNormale).toBe(0);
  });

  test("Benefice 50000 EUR (deux tranches)", () => {
    // (42500 * 0.15) + (7500 * 0.25) = 6375 + 1875 = 8250
    const result = calc(50000);
    expect(result.montantIS).toBeCloseTo(8250, 2);
    expect(result.detail.montantTrancheReduite).toBeCloseTo(6375, 2);
    expect(result.detail.montantTrancheNormale).toBeCloseTo(1875, 2);
  });

  test("Benefice 100000 EUR → taux effectif entre 15% et 25%", () => {
    const result = calc(100000);
    expect(result.tauxEffectif).toBeGreaterThan(0.15);
    expect(result.tauxEffectif).toBeLessThan(0.25);
  });

  test("Non eligible au taux reduit → tout a 25%", () => {
    // 30000 * 0.25 = 7500
    const result = calc(30000, false);
    expect(result.montantIS).toBeCloseTo(7500, 2);
    expect(result.tauxEffectif).toBeCloseTo(0.25, 4);
    expect(result.detail.baseTrancheReduite).toBe(0);
  });

  test("Benefice tres eleve (1M) → taux effectif proche de 25%", () => {
    const result = calc(1000000);
    expect(result.tauxEffectif).toBeGreaterThan(0.24);
    expect(result.tauxEffectif).toBeLessThan(0.26);
  });

  test("Detail coherent : somme tranches = total", () => {
    const result = calc(80000);
    expect(result.detail.montantTrancheReduite + result.detail.montantTrancheNormale).toBeCloseTo(
      result.montantIS,
      2,
    );
  });
});
