import { describe, test, expect } from "vitest";
import { calculerNiveauRichesse } from "../src/salary/niveau-richesse.js";

const STATS = {
  smicNet: 1427,
  salaireMoyen: 2735,
  salaireMedian: 2183,
  seuilPauvrete: 1158,
  seuil10PctSuperieurs: 4000,
  seuil1PctSuperieurs: 8000,
};

function calc(salaire: number) {
  return calculerNiveauRichesse({ salaireNetMensuel: salaire, ...STATS });
}

describe("calculerNiveauRichesse", () => {
  test("SMIC level (1427 EUR) → modeste", () => {
    const r = calc(1427);
    expect(r.niveau).toBe("modeste");
    expect(r.niveauLabel).toContain("modeste");
  });

  test("2500 EUR → median (entre median et moyen)", () => {
    const r = calc(2500);
    expect(r.niveau).toBe("median");
  });

  test("3000 EUR → aise (au-dessus de la moyenne)", () => {
    const r = calc(3000);
    expect(r.niveau).toBe("aise");
  });

  test("5000 EUR → top 10%", () => {
    const r = calc(5000);
    expect(r.niveau).toBe("top_10");
  });

  test("10000 EUR → top 1%", () => {
    const r = calc(10000);
    expect(r.niveau).toBe("top_1");
  });

  test("1000 EUR → sous seuil de pauvrete", () => {
    const r = calc(1000);
    expect(r.niveau).toBe("sous_seuil_pauvrete");
  });

  test("comparaisons ratios sont corrects", () => {
    const r = calc(2735);
    expect(r.comparaisons.vsSmic).toBeCloseTo(2735 / 1427, 4);
    expect(r.comparaisons.vsMoyen).toBeCloseTo(2735 / 2735, 4);
    expect(r.comparaisons.vsMedian).toBeCloseTo(2735 / 2183, 4);
    expect(r.comparaisons.vsSeuilPauvrete).toBeCloseTo(2735 / 1158, 4);
  });

  test("0 EUR → accepte (minimum 0)", () => {
    const r = calc(0);
    expect(r.niveau).toBe("sous_seuil_pauvrete");
    expect(r.detail.salaireNetMensuel).toBe(0);
    expect(r.detail.salaireNetAnnuel).toBe(0);
  });

  test("detail contient salaire mensuel et annuel", () => {
    const r = calc(3000);
    expect(r.detail.salaireNetMensuel).toBe(3000);
    expect(r.detail.salaireNetAnnuel).toBe(36000);
  });

  test("percentile augmente avec le salaire", () => {
    const r1 = calc(1000);
    const r2 = calc(2000);
    const r3 = calc(5000);
    expect(r1.percentile).toBeLessThan(r2.percentile);
    expect(r2.percentile).toBeLessThan(r3.percentile);
  });
});
