import { describe, test, expect } from "vitest";
import { comparerStatuts } from "../src/fiscal/comparateur-statuts.js";

const TRANCHES_IR = [
  { de: 0, jusqu_a: 11293, taux: 0.00 },
  { de: 11294, jusqu_a: 28797, taux: 0.11 },
  { de: 28798, jusqu_a: 82341, taux: 0.30 },
  { de: 82342, jusqu_a: 177106, taux: 0.41 },
  { de: 177107, jusqu_a: null, taux: 0.45 },
];

function compare(ca: number, activite: "vente" | "prestation_bic" | "prestation_bnc" = "prestation_bnc", charges = 0) {
  const taux = activite === "vente" ? { c: 0.123, a: 0.71 } : activite === "prestation_bic" ? { c: 0.212, a: 0.50 } : { c: 0.211, a: 0.34 };
  return comparerStatuts({
    chiffreAffaires: ca,
    chargesReelles: charges,
    activite,
    tauxCotisationsAE: taux.c,
    tauxAbattementAE: taux.a,
    tranchesIR: TRANCHES_IR,
  });
}

describe("comparerStatuts", () => {
  test("Les deux statuts ont un revenu positif pour 50k CA", () => {
    const r = compare(50000);
    expect(r.autoEntrepreneur.revenuNet).toBeGreaterThan(0);
    expect(r.sasu.revenuNet).toBeGreaterThan(0);
  });

  test("AE a moins de charges sociales que SASU", () => {
    const r = compare(50000);
    expect(r.autoEntrepreneur.chargesSociales).toBeLessThan(r.sasu.chargesSociales);
  });

  test("SASU a meilleure protection sociale", () => {
    const r = compare(50000);
    expect(r.sasu.protectionSociale).toContain("Complete");
    expect(r.autoEntrepreneur.protectionSociale).toContain("Basique");
  });

  test("Ecart en euros est coherent", () => {
    const r = compare(50000);
    expect(r.ecart).toBeCloseTo(r.autoEntrepreneur.revenuNet - r.sasu.revenuNet, 0);
  });

  test("Recommandation est non-vide", () => {
    const r = compare(50000);
    expect(r.recommandation.length).toBeGreaterThan(10);
  });

  test("Petit CA (15k) → AE generalement plus avantageux", () => {
    const r = compare(15000);
    expect(r.autoEntrepreneur.revenuNet).toBeGreaterThan(r.sasu.revenuNet);
  });

  test("Vente a des cotisations AE plus basses", () => {
    const rVente = compare(50000, "vente");
    const rBnc = compare(50000, "prestation_bnc");
    expect(rVente.autoEntrepreneur.chargesSociales).toBeLessThan(rBnc.autoEntrepreneur.chargesSociales);
  });

  test("Charges reelles reduisent le benefice SASU", () => {
    const sansCharges = compare(50000, "prestation_bnc", 0);
    const avecCharges = compare(50000, "prestation_bnc", 10000);
    expect(avecCharges.sasu.revenuNet).toBeLessThan(sansCharges.sasu.revenuNet);
  });
});
