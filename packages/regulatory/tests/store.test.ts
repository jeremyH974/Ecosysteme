import { describe, test, expect } from "vitest";
import { getBaremeActif, getBaremesParCategorie, getAllBaremes } from "../src/store.js";

describe("getBaremeActif", () => {
  test("retourne le bareme SMIC actif", () => {
    const smic = getBaremeActif("smic", new Date("2024-06-15"));
    expect(smic.id).toBe("smic_horaire_2024");
    expect(smic.valeur).toBe(11.65);
  });

  test("retourne le bareme rupture conventionnelle actif", () => {
    const rupture = getBaremeActif("rupture_conventionnelle", new Date("2024-06-15"));
    expect(rupture.id).toBe("rupture_conventionnelle_2024");
    expect(rupture.categorie).toBe("rupture_conventionnelle");
  });

  test("leve une erreur pour une categorie sans bareme", () => {
    expect(() => getBaremeActif("baremes_km", new Date("2024-06-15"))).toThrow(
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

  test("retourne un tableau vide pour une categorie vide", () => {
    const baremes = getBaremesParCategorie("baremes_km");
    expect(baremes).toHaveLength(0);
  });
});

describe("getAllBaremes", () => {
  test("retourne au moins 2 baremes (seed data)", () => {
    const all = getAllBaremes();
    expect(all.length).toBeGreaterThanOrEqual(2);
  });
});
