import { describe, test, expect } from "vitest";
import { calculerPFU } from "../src/fiscal/pfu.js";

describe("calculerPFU", () => {
  test("Dividendes 0 → PFU = 0", () => {
    const result = calculerPFU({ montantDividendes: 0 });
    expect(result.montantPFU).toBe(0);
    expect(result.netApresPFU).toBe(0);
  });

  test("Dividendes 10000 EUR → PFU = 3000 EUR (30%)", () => {
    const result = calculerPFU({ montantDividendes: 10000 });
    expect(result.montantPFU).toBeCloseTo(3000, 2);
    expect(result.netApresPFU).toBeCloseTo(7000, 2);
    expect(result.tauxEffectif).toBeCloseTo(0.30, 4);
  });

  test("Decomposition : IR 12.8% + PS 17.2%", () => {
    const result = calculerPFU({ montantDividendes: 10000 });
    expect(result.montantIR).toBeCloseTo(1280, 2);
    expect(result.montantPrelevementsSociaux).toBeCloseTo(1720, 2);
  });

  test("Dividendes 50000 EUR", () => {
    const result = calculerPFU({ montantDividendes: 50000 });
    expect(result.montantPFU).toBeCloseTo(15000, 2);
    expect(result.netApresPFU).toBeCloseTo(35000, 2);
  });

  test("Coherence : PFU + net = dividendes bruts", () => {
    const result = calculerPFU({ montantDividendes: 25000 });
    expect(result.montantPFU + result.netApresPFU).toBeCloseTo(25000, 2);
  });

  test("Taux effectif toujours 30%", () => {
    for (const montant of [1000, 5000, 20000, 100000]) {
      const result = calculerPFU({ montantDividendes: montant });
      expect(result.tauxEffectif).toBeCloseTo(0.30, 4);
    }
  });

  test("Taux personnalises", () => {
    const result = calculerPFU({
      montantDividendes: 10000,
      tauxIR: 0.15,
      tauxPrelevementsSociaux: 0.20,
    });
    expect(result.montantPFU).toBeCloseTo(3500, 2);
    expect(result.tauxEffectif).toBeCloseTo(0.35, 4);
  });
});
