import { describe, test, expect } from "vitest";
import { calculerIR } from "../src/fiscal/impot-revenu.js";

// Tranches IR 2024 (revenus 2023)
const TRANCHES_2024 = [
  { de: 0, jusqu_a: 11293, taux: 0.00 },
  { de: 11294, jusqu_a: 28797, taux: 0.11 },
  { de: 28798, jusqu_a: 82341, taux: 0.30 },
  { de: 82342, jusqu_a: 177106, taux: 0.41 },
  { de: 177107, jusqu_a: null, taux: 0.45 },
];

function calc(revenu: number, parts = 1) {
  return calculerIR({
    revenuNetImposable: revenu,
    nbParts: parts,
    tranches: TRANCHES_2024,
  });
}

describe("calculerIR", () => {
  test("Revenu 0 → IR = 0", () => {
    const result = calc(0);
    expect(result.montantIR).toBe(0);
    expect(result.tauxMoyen).toBe(0);
  });

  test("Revenu dans la tranche a 0% (10000 EUR, celibataire)", () => {
    const result = calc(10000);
    expect(result.montantIR).toBe(0);
    expect(result.tauxMarginal).toBe(0);
  });

  test("Revenu 20000 EUR celibataire → TMI 11%", () => {
    // Tranche 0% : 11293 * 0 = 0
    // Tranche 11% : (20000 - 11294) * 0.11 = 8706 * 0.11 = 957.66
    const result = calc(20000);
    expect(result.montantIR).toBeCloseTo(957.66, 0);
    expect(result.tauxMarginal).toBe(0.11);
  });

  test("Revenu 30000 EUR celibataire → TMI 30%", () => {
    // Tranche 0% : 0
    // Tranche 11% : (28797 - 11294) * 0.11 = 17503 * 0.11 = 1925.33
    // Tranche 30% : (30000 - 28798) * 0.30 = 1202 * 0.30 = 360.60
    // Total = 2285.93
    const result = calc(30000);
    expect(result.montantIR).toBeCloseTo(2285.93, 0);
    expect(result.tauxMarginal).toBe(0.30);
  });

  test("Revenu 50000 EUR celibataire → TMI 30%", () => {
    const result = calc(50000);
    expect(result.tauxMarginal).toBe(0.30);
    expect(result.montantIR).toBeGreaterThan(5000);
    expect(result.montantIR).toBeLessThan(15000);
  });

  test("Revenu 100000 EUR celibataire → TMI 41%", () => {
    const result = calc(100000);
    expect(result.tauxMarginal).toBe(0.41);
  });

  test("Revenu 200000 EUR celibataire → TMI 45%", () => {
    const result = calc(200000);
    expect(result.tauxMarginal).toBe(0.45);
  });

  test("Quotient familial 2 parts (couple) reduit l'impot", () => {
    const celibataire = calc(60000, 1);
    const couple = calc(60000, 2);
    expect(couple.montantIR).toBeLessThan(celibataire.montantIR);
  });

  test("Couple 60000 EUR, 2 parts → chacun est a 30000", () => {
    const couple = calc(60000, 2);
    // Chaque part : 30000 EUR → meme IR que celibataire a 30000, * 2
    const celibataire30k = calc(30000, 1);
    expect(couple.montantIR).toBeCloseTo(celibataire30k.montantIR * 2, 0);
  });

  test("Taux moyen coherent", () => {
    const result = calc(50000);
    expect(result.tauxMoyen).toBeCloseTo(result.montantIR / 50000, 6);
  });

  test("Detail par tranche : somme = total", () => {
    const result = calc(50000);
    const somme = result.detailParTranche.reduce((acc, t) => acc + t.montantImpot, 0);
    expect(somme).toBeCloseTo(result.montantIR, 2);
  });

  test("2.5 parts (couple + 1 enfant)", () => {
    const result = calc(60000, 2.5);
    expect(result.montantIR).toBeLessThan(calc(60000, 2).montantIR);
  });
});
