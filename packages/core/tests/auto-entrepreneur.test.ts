import { describe, test, expect } from "vitest";
import { calculerAutoEntrepreneur } from "../src/fiscal/auto-entrepreneur.js";

// Taux 2024
const TAUX = {
  vente: { tauxCotisations: 0.123, tauxAbattementFiscal: 0.71, tauxVersementLiberatoire: 0.01 },
  bic: { tauxCotisations: 0.212, tauxAbattementFiscal: 0.50, tauxVersementLiberatoire: 0.017 },
  bnc: { tauxCotisations: 0.211, tauxAbattementFiscal: 0.34, tauxVersementLiberatoire: 0.022 },
};

function calc(ca: number, activite: "vente" | "prestation_bic" | "prestation_bnc" = "prestation_bnc", vl = false) {
  const t = activite === "vente" ? TAUX.vente : activite === "prestation_bic" ? TAUX.bic : TAUX.bnc;
  return calculerAutoEntrepreneur({
    chiffreAffaires: ca,
    activite,
    ...t,
    versementLiberatoire: vl,
  });
}

describe("calculerAutoEntrepreneur", () => {
  test("BNC 50000 EUR — cotisations ~21.1%", () => {
    const r = calc(50000);
    expect(r.cotisationsSociales).toBeCloseTo(50000 * 0.211, 0);
    expect(r.revenuApresCharges).toBeCloseTo(50000 - 50000 * 0.211, 0);
  });

  test("Vente 100000 EUR — cotisations ~12.3%", () => {
    const r = calc(100000, "vente");
    expect(r.cotisationsSociales).toBeCloseTo(12300, 0);
  });

  test("BIC 30000 EUR — cotisations ~21.2%", () => {
    const r = calc(30000, "prestation_bic");
    expect(r.cotisationsSociales).toBeCloseTo(6360, 0);
  });

  test("Abattement fiscal BNC — 34%", () => {
    const r = calc(50000);
    // Revenu imposable = 50000 - (50000*0.34) = 50000 - 17000 = 33000
    expect(r.revenuImposable).toBeCloseTo(33000, 0);
  });

  test("Abattement fiscal vente — 71%", () => {
    const r = calc(100000, "vente");
    // Revenu imposable = 100000 - (100000*0.71) = 29000
    expect(r.revenuImposable).toBeCloseTo(29000, 0);
  });

  test("Versement liberatoire BNC — 2.2%", () => {
    const r = calc(50000, "prestation_bnc", true);
    expect(r.versementLiberatoireIR).toBeCloseTo(1100, 0);
  });

  test("Sans versement liberatoire → VL = 0", () => {
    const r = calc(50000, "prestation_bnc", false);
    expect(r.versementLiberatoireIR).toBe(0);
  });

  test("CA 0 → tout a 0", () => {
    const r = calc(0);
    expect(r.cotisationsSociales).toBe(0);
    expect(r.revenuApresCharges).toBe(0);
    expect(r.revenuImposable).toBe(0);
  });

  test("Taux charges effectif coherent", () => {
    const r = calc(40000);
    expect(r.tauxChargesEffectif).toBeCloseTo(0.211, 3);
  });

  test("Taux charges effectif avec VL inclut le VL", () => {
    const r = calc(40000, "prestation_bnc", true);
    expect(r.tauxChargesEffectif).toBeCloseTo(0.211 + 0.022, 3);
  });
});
