import { describe, test, expect } from "vitest";
import { calculerRendementLocatif } from "../src/property/rendement-locatif.js";

function calc(prix: number, loyer: number, charges = 0, fraisNotaire = 0, vacance = 1) {
  return calculerRendementLocatif({
    prixAchat: prix,
    loyerMensuel: loyer,
    chargesAnnuelles: charges,
    fraisNotaire,
    vacanceLocativeMois: vacance,
  });
}

describe("calculerRendementLocatif", () => {
  test("Rendement brut standard — 200k, loyer 800", () => {
    // (800*12/200000)*100 = 4.8%
    const r = calc(200000, 800);
    expect(r.rendementBrut).toBeCloseTo(4.8, 1);
  });

  test("Rendement net inferieur au brut", () => {
    const r = calc(200000, 800, 2000, 15000);
    expect(r.rendementNet).toBeLessThan(r.rendementBrut);
  });

  test("Vacance locative reduit le rendement net", () => {
    const sansVacance = calc(200000, 800, 0, 0, 0);
    const avecVacance = calc(200000, 800, 0, 0, 2);
    expect(avecVacance.rendementNet).toBeLessThan(sansVacance.rendementNet);
  });

  test("Cout total = prix + frais notaire", () => {
    const r = calc(200000, 800, 0, 15000);
    expect(r.coutTotalAcquisition).toBe(215000);
  });

  test("Detail — loyer annuel = loyer * 12", () => {
    const r = calc(200000, 800);
    expect(r.detail.loyerAnnuel).toBe(9600);
  });

  test("Detail — loyer effectif tient compte vacance", () => {
    const r = calc(200000, 800, 0, 0, 2);
    expect(r.detail.loyerEffectif).toBe(800 * 10);
  });

  test("Prix 0 → erreur Zod", () => {
    expect(() => calc(0, 800)).toThrow();
  });

  test("Loyer 0 → erreur Zod", () => {
    expect(() => calc(200000, 0)).toThrow();
  });

  test("Rendement eleve (petit prix, loyer eleve)", () => {
    const r = calc(80000, 600);
    expect(r.rendementBrut).toBeGreaterThan(8);
  });

  test("Rendement faible (gros prix, petit loyer)", () => {
    const r = calc(500000, 1000);
    expect(r.rendementBrut).toBeLessThan(3);
  });
});
