import { describe, test, expect } from "vitest";
import { calculerFraisNotaire } from "../src/property/frais-notaire.js";

const TAUX = {
  tauxDroitsMutationAncien: 0.058,
  tauxDroitsMutationNeuf: 0.00715,
  tauxEmolumentsNotaire: 0.01,
  fraisDivers: 1200,
};

function calc(prix: number, type: "ancien" | "neuf" = "ancien") {
  return calculerFraisNotaire({ prixAchat: prix, typeAchat: type, ...TAUX });
}

describe("calculerFraisNotaire", () => {
  test("Ancien 200000 EUR → ~7-8%", () => {
    const r = calc(200000);
    expect(r.pourcentageDuPrix).toBeGreaterThan(7);
    expect(r.pourcentageDuPrix).toBeLessThan(8);
  });

  test("Ancien 200000 EUR — detail droits mutation", () => {
    const r = calc(200000);
    expect(r.detail.droitsMutation).toBeCloseTo(11600, 0);
    expect(r.detail.emolumentsNotaire).toBeCloseTo(2000, 0);
    expect(r.detail.fraisDivers).toBe(1200);
  });

  test("Neuf 200000 EUR → ~2-3%", () => {
    const r = calc(200000, "neuf");
    expect(r.pourcentageDuPrix).toBeGreaterThan(1.5);
    expect(r.pourcentageDuPrix).toBeLessThan(3);
  });

  test("Neuf beaucoup moins cher que ancien", () => {
    const ancien = calc(300000, "ancien");
    const neuf = calc(300000, "neuf");
    expect(neuf.totalFraisNotaire).toBeLessThan(ancien.totalFraisNotaire);
  });

  test("Coherence — total = droits + emoluments + divers", () => {
    const r = calc(250000);
    expect(r.totalFraisNotaire).toBeCloseTo(
      r.detail.droitsMutation + r.detail.emolumentsNotaire + r.detail.fraisDivers, 2,
    );
  });

  test("Prix 0 → erreur Zod", () => {
    expect(() => calc(0)).toThrow();
  });

  test("Petit prix (50000 EUR ancien)", () => {
    const r = calc(50000);
    expect(r.totalFraisNotaire).toBeGreaterThan(3000);
  });

  test("Gros prix (1M ancien)", () => {
    const r = calc(1000000);
    expect(r.totalFraisNotaire).toBeGreaterThan(60000);
  });
});
