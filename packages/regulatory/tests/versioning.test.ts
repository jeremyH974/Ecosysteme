import { describe, test, expect } from "vitest";
import { isBaremeActif, needsVerification } from "../src/versioning.js";
import type { Bareme } from "../src/bareme.js";

const makeBareme = (overrides: Partial<Bareme> = {}): Bareme => ({
  id: "test",
  nom: "Test",
  categorie: "smic",
  valeur: 11.65,
  date_debut: "2024-01-01T00:00:00Z",
  date_fin: null,
  source_url: "https://example.com",
  source_label: "Test",
  verifie_le: "2024-01-15T00:00:00Z",
  verifie_par: "TEST",
  ...overrides,
});

describe("isBaremeActif", () => {
  test("retourne true pour un bareme sans date_fin dans la periode", () => {
    const bareme = makeBareme();
    expect(isBaremeActif(bareme, new Date("2024-06-15"))).toBe(true);
  });

  test("retourne false avant la date de debut", () => {
    const bareme = makeBareme();
    expect(isBaremeActif(bareme, new Date("2023-12-31"))).toBe(false);
  });

  test("retourne false apres la date de fin", () => {
    const bareme = makeBareme({ date_fin: "2024-06-01T00:00:00Z" });
    expect(isBaremeActif(bareme, new Date("2024-07-01"))).toBe(false);
  });

  test("retourne true pendant la periode avec date_fin", () => {
    const bareme = makeBareme({ date_fin: "2024-12-31T00:00:00Z" });
    expect(isBaremeActif(bareme, new Date("2024-06-15"))).toBe(true);
  });
});

describe("needsVerification", () => {
  test("retourne false si verification recente (< 30 jours)", () => {
    const bareme = makeBareme({ verifie_le: "2024-06-01T00:00:00Z" });
    expect(needsVerification(bareme, new Date("2024-06-15"))).toBe(false);
  });

  test("retourne true si verification ancienne (> 30 jours)", () => {
    const bareme = makeBareme({ verifie_le: "2024-01-01T00:00:00Z" });
    expect(needsVerification(bareme, new Date("2024-06-15"))).toBe(true);
  });
});
