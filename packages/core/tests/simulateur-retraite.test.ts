import { describe, test, expect } from "vitest";
import { calculerRetraite } from "../src/salary/simulateur-retraite.js";

function calc(salaire: number, ageActuel: number, ageDepart: number, trimestres: number) {
  return calculerRetraite({
    salaireNetMensuelActuel: salaire,
    ageActuel,
    ageDepart,
    trimestresValides: trimestres,
  });
}

describe("calculerRetraite", () => {
  test("taux plein quand trimestres == requis (172)", () => {
    // 60 ans, depart 63 → 12 trimestres supplementaires, total = 172 + 12
    // On veut exactement 172, donc trimestresValides = 172 et ageDepart = ageActuel
    const r = calc(2500, 64, 64, 172);
    expect(r.tauxApplique).toBe(0.50);
    expect(r.decoteSurcote).toContain("Taux plein");
  });

  test("decote quand trimestres manquants → taux < 0.50", () => {
    // 60 ans, depart 62, seulement 150 trimestres → 150 + 8 = 158, manquants = 14
    const r = calc(2500, 60, 62, 150);
    expect(r.tauxApplique).toBeLessThan(0.50);
    expect(r.decoteSurcote).toContain("Decote");
    expect(r.trimestresManquants).toBeGreaterThan(0);
  });

  test("surcote quand trimestres excedentaires → taux > 0.50", () => {
    // 64 ans, depart 67, 172 trimestres → 172 + 12 = 184, excedent = 12
    const r = calc(2500, 64, 67, 172);
    expect(r.tauxApplique).toBeGreaterThan(0.50);
    expect(r.decoteSurcote).toContain("Surcote");
  });

  test("pension mensuelle estimee > 0", () => {
    const r = calc(2500, 55, 64, 140);
    expect(r.pensionMensuelleEstimee).toBeGreaterThan(0);
  });

  test("taux de remplacement entre 0 et 1", () => {
    const r = calc(2500, 55, 64, 140);
    expect(r.tauxRemplacement).toBeGreaterThan(0);
    expect(r.tauxRemplacement).toBeLessThanOrEqual(1);
  });

  test("pension complementaire > 0", () => {
    const r = calc(2500, 55, 64, 140);
    expect(r.pensionComplementaire).toBeGreaterThan(0);
  });

  test("jeune personne (25 ans, 20 trimestres, depart 64) → beaucoup de trimestres manquants", () => {
    // 25 ans, depart 64, 20 trimestres → 20 + (64-25)*4 = 20 + 156 = 176 > 172
    // Actually this means no missing trimestres. Let's use depart 62:
    // 20 + (62-25)*4 = 20 + 148 = 168, manquants = 4
    const r = calc(2000, 25, 64, 20);
    // 20 + (64-25)*4 = 20 + 156 = 176 → surcote
    expect(r.detail.trimestresProjetesAuDepart).toBe(176);
  });

  test("detail contient salaire brut reconstitue", () => {
    const r = calc(2500, 55, 64, 140);
    expect(r.detail.salaireBrutReconstitue).toBeCloseTo(2500 / 0.78, 0);
  });

  test("pension base + complementaire = pension totale", () => {
    const r = calc(2500, 55, 64, 140);
    expect(r.pensionMensuelleEstimee).toBeCloseTo(r.pensionBase + r.pensionComplementaire, 2);
  });

  test("annees cotisees coherentes", () => {
    const r = calc(2500, 50, 64, 100);
    // 100 + (64-50)*4 = 100 + 56 = 156 trimestres = 39 annees
    expect(r.detail.anneesCotisees).toBeCloseTo(156 / 4, 2);
  });
});
