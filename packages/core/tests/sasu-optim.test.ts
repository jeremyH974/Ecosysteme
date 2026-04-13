import { describe, test, expect } from "vitest";
import { optimiserRemunerationSASU } from "../src/fiscal/sasu-optim.js";

const TRANCHES_IR_2024 = [
  { de: 0, jusqu_a: 11293, taux: 0.00 },
  { de: 11294, jusqu_a: 28797, taux: 0.11 },
  { de: 28798, jusqu_a: 82341, taux: 0.30 },
  { de: 82342, jusqu_a: 177106, taux: 0.41 },
  { de: 177107, jusqu_a: null, taux: 0.45 },
];

const BASE_INPUT = {
  nbPartsFiscales: 1,
  autresRevenus: 0,
  tauxCotisationsPatronales: 0.42,
  tauxCotisationsSalariales: 0.22,
  tauxISReduit: 0.15,
  seuilISReduit: 42500,
  tauxISNormal: 0.25,
  eligibleTauxReduit: true,
  tauxPFU_IR: 0.128,
  tauxPFU_PS: 0.172,
  tranchesIR: TRANCHES_IR_2024,
  pasOptimisation: 500,
};

function optim(benefice: number, parts = 1) {
  return optimiserRemunerationSASU({
    ...BASE_INPUT,
    beneficeAvantRemuneration: benefice,
    nbPartsFiscales: parts,
  });
}

describe("optimiserRemunerationSASU", () => {
  // =====================================================
  // COHERENCE DES SCENARIOS
  // =====================================================

  test("Benefice 50000 EUR — les 3 scenarios sont calcules", () => {
    const result = optim(50000);
    expect(result.optimal).toBeDefined();
    expect(result.scenario100Salaire).toBeDefined();
    expect(result.scenario100Dividendes).toBeDefined();
  });

  test("100% dividendes → salaire brut = 0", () => {
    const result = optim(50000);
    expect(result.scenario100Dividendes.salaireBrut).toBe(0);
    expect(result.scenario100Dividendes.salaireNet).toBe(0);
    expect(result.scenario100Dividendes.dividendesBruts).toBeGreaterThan(0);
  });

  test("100% salaire → dividendes = 0", () => {
    const result = optim(50000);
    expect(result.scenario100Salaire.dividendesBruts).toBeCloseTo(0, 0);
  });

  test("Optimal net >= max(100% salaire, 100% dividendes)", () => {
    const result = optim(50000);
    expect(result.optimal.netTotal).toBeGreaterThanOrEqual(
      Math.max(result.scenario100Salaire.netTotal, result.scenario100Dividendes.netTotal) - 1,
    );
  });

  test("Gain optimisation >= 0", () => {
    const result = optim(50000);
    expect(result.gainOptimisation).toBeGreaterThanOrEqual(-1); // tolerance arrondi
  });

  // =====================================================
  // DIFFERENTS NIVEAUX DE BENEFICE
  // =====================================================

  test("Benefice 30000 EUR — petit benefice", () => {
    const result = optim(30000);
    expect(result.optimal.netTotal).toBeGreaterThan(0);
    expect(result.optimal.netTotal).toBeLessThan(30000);
  });

  test("Benefice 100000 EUR — benefice moyen", () => {
    const result = optim(100000);
    expect(result.optimal.netTotal).toBeGreaterThan(50000);
    expect(result.optimal.netTotal).toBeLessThan(100000);
  });

  test("Benefice 200000 EUR — gros benefice", () => {
    const result = optim(200000);
    expect(result.optimal.netTotal).toBeGreaterThan(100000);
  });

  // =====================================================
  // COHERENCE COMPTABLE
  // =====================================================

  test("Cout salaire + benefice restant = benefice initial", () => {
    const result = optim(80000);
    const s = result.optimal;
    expect(s.coutSalairePourSociete + s.beneficeApresRemuneration).toBeCloseTo(80000, 0);
  });

  test("Dividendes bruts = benefice restant - IS", () => {
    const result = optim(80000);
    const s = result.optimal;
    expect(s.dividendesBruts).toBeCloseTo(s.beneficeApresRemuneration - s.montantIS, 0);
  });

  test("Net total = salaire net + dividendes nets - IR", () => {
    const result = optim(80000);
    const s = result.optimal;
    expect(s.netTotal).toBeCloseTo(s.salaireNet + s.dividendesNets - s.montantIR, 0);
  });

  // =====================================================
  // QUOTIENT FAMILIAL
  // =====================================================

  test("2 parts (couple) → net total superieur a 1 part", () => {
    const seul = optim(80000, 1);
    const couple = optim(80000, 2);
    expect(couple.optimal.netTotal).toBeGreaterThanOrEqual(seul.optimal.netTotal - 1);
  });

  // =====================================================
  // VALIDATION
  // =====================================================

  test("Benefice negatif → erreur Zod", () => {
    expect(() =>
      optimiserRemunerationSASU({
        ...BASE_INPUT,
        beneficeAvantRemuneration: -1000,
      }),
    ).toThrow();
  });

  test("0 parts → erreur Zod", () => {
    expect(() =>
      optimiserRemunerationSASU({
        ...BASE_INPUT,
        beneficeAvantRemuneration: 50000,
        nbPartsFiscales: 0,
      }),
    ).toThrow();
  });
});
