import { describe, test, expect } from "vitest";
import { calculerIndemnitesKm } from "../src/fiscal/indemnites-km.js";

// Bareme km 2025-2026 officiel (source BOFIP BOI-BAREME-000001)
const BAREME_KM = [
  { puissance: "3", jusqu_a_5000: { coeff: 0.529, ajout: 0 }, de_5001_a_20000: { coeff: 0.316, ajout: 1065 }, au_dela_20000: { coeff: 0.407, ajout: 0 } },
  { puissance: "4", jusqu_a_5000: { coeff: 0.606, ajout: 0 }, de_5001_a_20000: { coeff: 0.340, ajout: 1330 }, au_dela_20000: { coeff: 0.407, ajout: 0 } },
  { puissance: "5", jusqu_a_5000: { coeff: 0.657, ajout: 0 }, de_5001_a_20000: { coeff: 0.357, ajout: 1395 }, au_dela_20000: { coeff: 0.407, ajout: 0 } },
  { puissance: "6", jusqu_a_5000: { coeff: 0.665, ajout: 0 }, de_5001_a_20000: { coeff: 0.374, ajout: 1435 }, au_dela_20000: { coeff: 0.407, ajout: 0 } },
  { puissance: "7+", jusqu_a_5000: { coeff: 0.661, ajout: 0 }, de_5001_a_20000: { coeff: 0.374, ajout: 1435 }, au_dela_20000: { coeff: 0.407, ajout: 0 } },
];

function calc(km: number, puissance: "3" | "4" | "5" | "6" | "7+" = "5") {
  return calculerIndemnitesKm({ distanceAnnuelle: km, puissanceFiscale: puissance, bareme: BAREME_KM });
}

describe("calculerIndemnitesKm", () => {
  test("3000 km, 5 CV → tranche 1", () => {
    const r = calc(3000, "5");
    expect(r.montantTotal).toBeCloseTo(3000 * 0.657, 0);
    expect(r.detail.tranche).toContain("5 000");
  });

  test("10000 km, 5 CV → tranche 2", () => {
    const r = calc(10000, "5");
    expect(r.montantTotal).toBeCloseTo(10000 * 0.357 + 1395, 0);
  });

  test("25000 km, 5 CV → tranche 3", () => {
    const r = calc(25000, "5");
    expect(r.montantTotal).toBeCloseTo(25000 * 0.407, 0);
  });

  test("montant mensuel = total / 12", () => {
    const r = calc(12000);
    expect(r.montantMensuel).toBeCloseTo(r.montantTotal / 12, 2);
  });

  test("puissance 3 CV moins cher que 5 CV en tranche 1", () => {
    const r3 = calc(3000, "3");
    const r5 = calc(3000, "5");
    expect(r3.montantTotal).toBeLessThan(r5.montantTotal);
  });

  test("tranche 3 : meme taux pour toutes les puissances (0.407)", () => {
    const r3 = calc(25000, "3");
    const r7 = calc(25000, "7+");
    expect(r3.montantTotal).toBeCloseTo(r7.montantTotal, 0);
  });

  test("0 km → erreur Zod", () => {
    expect(() => calc(0)).toThrow();
  });

  test("detail contient la formule", () => {
    const r = calc(8000, "4");
    expect(r.detail.formule).toContain("8000");
  });
});
