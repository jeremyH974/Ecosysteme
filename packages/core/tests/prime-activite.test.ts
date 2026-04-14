import { describe, test, expect } from "vitest";
import { calculerPrimeActivite } from "../src/salary/prime-activite.js";

function calc(salaire: number, nbPersonnes = 1, nbEnfants = 0, autresRevenus = 0) {
  return calculerPrimeActivite({
    salaireNetMensuel: salaire,
    nbPersonnesFoyer: nbPersonnes,
    nbEnfants,
    autresRevenus,
  });
}

describe("calculerPrimeActivite", () => {
  test("SMIC net (1443 EUR) celibataire — prime > 0", () => {
    const result = calc(1443);
    expect(result.montantEstime).toBeGreaterThan(0);
    expect(result.eligible).toBe(true);
  });

  test("Salaire 0 — non eligible", () => {
    const result = calc(0);
    expect(result.eligible).toBe(false);
  });

  test("Couple sans enfant — forfaitaire plus eleve", () => {
    const solo = calc(1443, 1, 0);
    const couple = calc(1443, 2, 0);
    expect(couple.detail.forfaitaire).toBeGreaterThan(solo.detail.forfaitaire);
  });

  test("Couple avec 2 enfants — forfaitaire encore plus eleve", () => {
    const couple = calc(1443, 2, 0);
    const coupleEnfants = calc(1443, 2, 2);
    expect(coupleEnfants.detail.forfaitaire).toBeGreaterThan(couple.detail.forfaitaire);
  });

  test("Salaire eleve (3000 EUR) — prime = 0 (non eligible)", () => {
    const result = calc(3000);
    expect(result.montantEstime).toBe(0);
    expect(result.eligible).toBe(false);
  });

  test("Bonification max quand salaire >= SMIC", () => {
    const result = calc(1443);
    // salaire >= plafondBonification (1264.32) => bonification = bonification max (173.22)
    expect(result.detail.bonification).toBeCloseTo(173.22, 1);
  });

  test("montantEstime >= 0 always", () => {
    const salaires = [0, 500, 1000, 1443, 2000, 3000, 5000];
    for (const s of salaires) {
      const result = calc(s);
      expect(result.montantEstime).toBeGreaterThanOrEqual(0);
    }
  });

  test("detail.forfaitaire > 0", () => {
    const result = calc(1443);
    expect(result.detail.forfaitaire).toBeGreaterThan(0);
  });
});
