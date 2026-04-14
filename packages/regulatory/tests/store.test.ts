import { describe, test, expect } from "vitest";
import { getBaremeActif, getBaremesParCategorie, getAllBaremes } from "../src/store.js";

describe("getBaremeActif", () => {
  test("retourne le bareme SMIC actif", () => {
    const smic = getBaremeActif("smic", new Date("2026-04-01"));
    expect(smic.id).toBe("smic_2026");
    expect(smic.valeur).toBe(12.02);
  });

  test("retourne le bareme rupture conventionnelle actif", () => {
    const rupture = getBaremeActif("rupture_conventionnelle", new Date("2026-04-01"));
    expect(rupture.id).toBe("rupture_conventionnelle");
    expect(rupture.categorie).toBe("rupture_conventionnelle");
  });

  test("retourne le bareme kilometrique actif", () => {
    const km = getBaremeActif("baremes_km", new Date("2026-04-01"));
    expect(km.id).toBe("bareme_km_2025");
  });

  test("leve une erreur pour une categorie sans bareme", () => {
    expect(() => getBaremeActif("abattements_immo", new Date("2026-04-01"))).toThrow(
      "BAREME_INTROUVABLE",
    );
  });

  test("leve une erreur pour une date avant le debut du bareme", () => {
    expect(() => getBaremeActif("smic", new Date("2020-01-01"))).toThrow("BAREME_INTROUVABLE");
  });
});

describe("getBaremesParCategorie", () => {
  test("retourne les baremes SMIC", () => {
    const baremes = getBaremesParCategorie("smic");
    expect(baremes.length).toBeGreaterThanOrEqual(1);
    expect(baremes[0]?.categorie).toBe("smic");
  });

  test("retourne les baremes kilometriques", () => {
    const baremes = getBaremesParCategorie("baremes_km");
    expect(baremes.length).toBeGreaterThanOrEqual(1);
  });

  test("retourne un tableau vide pour une categorie inexistante", () => {
    const baremes = getBaremesParCategorie("abattements_immo");
    expect(baremes).toHaveLength(0);
  });
});

describe("getAllBaremes", () => {
  test("retourne au moins 15 baremes", () => {
    const all = getAllBaremes();
    expect(all.length).toBeGreaterThanOrEqual(15);
  });
});
