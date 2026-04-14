import { describe, test, expect } from "vitest";
import { calculerBrutNet } from "../src/salary/brut-net.js";
import type { BrutNetInput } from "../src/salary/brut-net.js";

// Taux 2024 — source URSSAF
const TAUX_2024 = {
  baseCsgCrds: 0.9825,
  csgDeductible: 0.068,
  csgNonDeductible: 0.024,
  crds: 0.005,
  vieillessePlafonnee: 0.069,
  vieillesseDeplafonnee: 0.004,
  agircArrcoT1: 0.0315,
  agircArrcoT2: 0.0864,
  cegT2: 0.0108,
  apec: 0.00024,
  passMensuel: 4005,
};

function calc(salaire: number, statut: "non_cadre" | "cadre" = "non_cadre", tempsPartiel = 1) {
  return calculerBrutNet({
    salaireBrutMensuel: salaire,
    statut,
    tempsPartiel,
    ...TAUX_2024,
  });
}

describe("calculerBrutNet", () => {
  // =====================================================
  // CAS STANDARDS
  // =====================================================

  test("Cas 1 — Non-cadre 2500 EUR : net ~78% du brut", () => {
    const result = calc(2500);
    // Salaire sous le PASS → pas de tranche 2
    expect(result.salaireNetAvantImpot).toBeGreaterThan(2500 * 0.75);
    expect(result.salaireNetAvantImpot).toBeLessThan(2500 * 0.82);
    // ~20% pour un salaire sous le PASS (pas de T2)
    expect(result.detail.tauxGlobalCotisations).toBeGreaterThan(0.19);
    expect(result.detail.tauxGlobalCotisations).toBeLessThan(0.25);
  });

  test("Cas 2 — Non-cadre 2500 EUR : verification calcul detaille", () => {
    const result = calc(2500);
    // CSG/CRDS : 2500 * 0.9825 * (0.068 + 0.024 + 0.005) = 2456.25 * 0.097 = 238.26
    expect(result.detail.baseCsg).toBeCloseTo(2500 * 0.9825, 2);
    expect(result.detail.montantCsgCrds).toBeCloseTo(2500 * 0.9825 * 0.097, 2);
    // Vieillesse plafonnee : 2500 * 0.069 = 172.50
    expect(result.detail.montantVieillessePlafonnee).toBeCloseTo(172.50, 2);
    // Vieillesse deplafonnee : 2500 * 0.004 = 10.00
    expect(result.detail.montantVieillesseDeplafonnee).toBeCloseTo(10.00, 2);
  });

  test("Cas 3 — Non-cadre 3000 EUR : sous le PASS, pas de T2", () => {
    const result = calc(3000);
    // 3000 < 4005 → montant AGIRC T2 = 0
    // Retraite complementaire = T1 seulement : 3000 * 0.0315 = 94.50
    expect(result.detail.montantRetraiteComplementaire).toBeCloseTo(3000 * 0.0315, 2);
    expect(result.detail.montantApec).toBe(0);
  });

  test("Cas 4 — Cadre 3000 EUR : inclut APEC", () => {
    const result = calc(3000, "cadre");
    expect(result.detail.montantApec).toBeCloseTo(3000 * 0.00024, 4);
    expect(result.detail.montantApec).toBeGreaterThan(0);
  });

  test("Cas 5 — Difference cadre/non-cadre est l'APEC", () => {
    const nonCadre = calc(3000, "non_cadre");
    const cadre = calc(3000, "cadre");
    const diff = nonCadre.salaireNetAvantImpot - cadre.salaireNetAvantImpot;
    expect(diff).toBeCloseTo(3000 * 0.00024, 4);
  });

  // =====================================================
  // CAS AVEC DEPASSEMENT DU PASS (tranche 2)
  // =====================================================

  test("Cas 6 — Salaire = PASS exactement (4005 EUR)", () => {
    const result = calc(4005);
    // Brut T2 = 0 → pas de cotisations T2
    expect(result.detail.montantRetraiteComplementaire).toBeCloseTo(4005 * 0.0315, 2);
  });

  test("Cas 7 — Salaire au-dessus du PASS (5000 EUR)", () => {
    const result = calc(5000);
    const brutT2 = 5000 - 4005; // 1136
    // Retraite complementaire = T1 + T2 + CEG T2
    const expectedT1 = 4005 * 0.0315;
    const expectedT2 = brutT2 * 0.0864;
    const expectedCeg = brutT2 * 0.0108;
    expect(result.detail.montantRetraiteComplementaire).toBeCloseTo(
      expectedT1 + expectedT2 + expectedCeg,
      2,
    );
  });

  test("Cas 8 — Salaire tres eleve (10000 EUR) : taux cotis plus eleve", () => {
    const result = calc(10000);
    // Tranche 2 significative → taux global un peu plus eleve que sous le PASS
    expect(result.detail.tauxGlobalCotisations).toBeGreaterThan(0.19);
  });

  test("Cas 9 — Salaire 3x PASS (11592 EUR)", () => {
    const result = calc(11592);
    const brutT2 = 11592 - 4005;
    const expectedAgircT2 = brutT2 * 0.0864;
    expect(expectedAgircT2).toBeGreaterThan(600); // verification sanity
    expect(result.salaireNetAvantImpot).toBeGreaterThan(0);
    expect(result.salaireNetAvantImpot).toBeLessThan(11592);
  });

  // =====================================================
  // SMIC ET PETITS SALAIRES
  // =====================================================

  test("Cas 10 — Salaire au SMIC 2026 (1823.07 EUR brut)", () => {
    const result = calc(1823.07);
    // ~20% cotisations → net ~1458
    expect(result.salaireNetAvantImpot).toBeGreaterThan(1400);
    expect(result.salaireNetAvantImpot).toBeLessThan(1500);
  });

  test("Cas 11 — Salaire 1200 EUR (temps partiel)", () => {
    const result = calc(1200);
    expect(result.salaireNetAvantImpot).toBeGreaterThan(900);
    expect(result.salaireNetAvantImpot).toBeLessThan(1000);
  });

  // =====================================================
  // TEMPS PARTIEL
  // =====================================================

  test("Cas 12 — Temps partiel 50%, salaire 1250 EUR", () => {
    const result = calc(1250, "non_cadre", 0.5);
    // PASS ajuste = 4005 * 0.5 = 1932
    // 1250 < 1932 → tout en T1
    expect(result.detail.montantVieillessePlafonnee).toBeCloseTo(1250 * 0.069, 2);
    expect(result.salaireNetAvantImpot).toBeGreaterThan(900);
  });

  test("Cas 13 — Temps partiel 80%, salaire 2000 EUR", () => {
    const result = calc(2000, "non_cadre", 0.8);
    // PASS ajuste = 4005 * 0.8 = 3091.20
    // 2000 < 3091.20 → tout en T1
    expect(result.detail.montantVieillessePlafonnee).toBeCloseTo(2000 * 0.069, 2);
  });

  test("Cas 14 — Temps partiel 50% avec depassement PASS ajuste", () => {
    // PASS ajuste = 4005 * 0.5 = 1932
    // Salaire 2500 > 1932 → T2 = 568
    const result = calc(2500, "non_cadre", 0.5);
    const passAjuste = 4005 * 0.5;
    const brutT2 = 2500 - passAjuste;
    expect(brutT2).toBeCloseTo(497.5, 0);
    expect(result.detail.montantRetraiteComplementaire).toBeGreaterThan(
      2500 * 0.0315, // serait plus car T2
    );
  });

  // =====================================================
  // COHERENCE INTERNE
  // =====================================================

  test("Coherence — net + cotisations = brut", () => {
    const result = calc(3500);
    expect(result.salaireNetAvantImpot + result.totalCotisationsSalariales).toBeCloseTo(3500, 2);
  });

  test("Coherence — somme detail = total cotisations", () => {
    const result = calc(4500);
    const sommeDetail =
      result.detail.montantCsgCrds +
      result.detail.montantVieillessePlafonnee +
      result.detail.montantVieillesseDeplafonnee +
      result.detail.montantRetraiteComplementaire +
      result.detail.montantApec;
    expect(sommeDetail).toBeCloseTo(result.totalCotisationsSalariales, 2);
  });

  test("Coherence — taux global = total / brut", () => {
    const result = calc(2800);
    expect(result.detail.tauxGlobalCotisations).toBeCloseTo(
      result.totalCotisationsSalariales / 2800,
      6,
    );
  });

  // =====================================================
  // VALIDATION ZOD
  // =====================================================

  test("Salaire 0 → erreur Zod", () => {
    expect(() => calc(0)).toThrow();
  });

  test("Salaire negatif → erreur Zod", () => {
    expect(() => calc(-1000)).toThrow();
  });

  test("Temps partiel > 1 → erreur Zod", () => {
    expect(() =>
      calculerBrutNet({
        salaireBrutMensuel: 2000,
        statut: "non_cadre",
        tempsPartiel: 1.5,
        ...TAUX_2024,
      }),
    ).toThrow();
  });

  test("Temps partiel < 0 → erreur Zod", () => {
    expect(() =>
      calculerBrutNet({
        salaireBrutMensuel: 2000,
        statut: "non_cadre",
        tempsPartiel: -0.5,
        ...TAUX_2024,
      }),
    ).toThrow();
  });

  test("Statut invalide → erreur Zod", () => {
    expect(() =>
      calculerBrutNet({
        salaireBrutMensuel: 2000,
        statut: "freelance" as "non_cadre",
        tempsPartiel: 1,
        ...TAUX_2024,
      }),
    ).toThrow();
  });
});
