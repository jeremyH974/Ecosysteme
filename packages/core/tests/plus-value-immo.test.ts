import { describe, test, expect } from "vitest";
import { calculerPlusValueImmo } from "../src/property/plus-value-immo.js";

function calc(achat: number, vente: number, duree: number, rp = false) {
  return calculerPlusValueImmo({
    prixAchat: achat,
    prixVente: vente,
    dureeDetentionAnnees: duree,
    residencePrincipale: rp,
  });
}

describe("calculerPlusValueImmo", () => {
  test("Residence principale → exoneree", () => {
    const r = calc(200000, 300000, 5, true);
    expect(r.exonere).toBe(true);
    expect(r.totalImposition).toBe(0);
    expect(r.netApresImpot).toBe(100000);
  });

  test("Detention < 5 ans → pas d'abattement", () => {
    const r = calc(200000, 300000, 3);
    expect(r.detail.abattementIR).toBe(0);
    expect(r.detail.abattementPS).toBe(0);
    expect(r.impotIR).toBeGreaterThan(0);
  });

  test("Detention 10 ans → abattement IR partiel", () => {
    const r = calc(200000, 300000, 10);
    expect(r.detail.abattementIR).toBeGreaterThan(0);
    expect(r.detail.abattementIR).toBeLessThan(1);
  });

  test("Detention 22 ans → exonere IR", () => {
    const r = calc(200000, 300000, 22);
    expect(r.detail.abattementIR).toBeCloseTo(1, 1);
    expect(r.impotIR).toBeCloseTo(0, 0);
  });

  test("Detention 30 ans → exonere total", () => {
    const r = calc(200000, 300000, 30);
    expect(r.exonere).toBe(true);
    expect(r.totalImposition).toBeCloseTo(0, 0);
  });

  test("Pas de plus-value (vente < achat corrige) → 0", () => {
    const r = calc(300000, 250000, 5);
    expect(r.plusValueBrute).toBe(0);
    expect(r.totalImposition).toBe(0);
  });

  test("IR = 19% de la PV nette IR", () => {
    const r = calc(200000, 300000, 3);
    expect(r.impotIR).toBeCloseTo(r.plusValueNetteIR * 0.19, 0);
  });

  test("PS = 17.2% de la PV nette PS", () => {
    const r = calc(200000, 300000, 3);
    expect(r.prelevementsSociaux).toBeCloseTo(r.plusValueNettePV * 0.172, 0);
  });

  test("Total imposition = IR + PS", () => {
    const r = calc(200000, 350000, 8);
    expect(r.totalImposition).toBeCloseTo(r.impotIR + r.prelevementsSociaux, 2);
  });

  test("Net = PV brute - imposition", () => {
    const r = calc(200000, 350000, 8);
    expect(r.netApresImpot).toBeCloseTo(r.plusValueBrute - r.totalImposition, 2);
  });
});
