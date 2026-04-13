import { describe, test, expect } from "vitest";
import { BaremeSchema } from "../src/bareme.js";

describe("BaremeSchema", () => {
  const validBareme = {
    id: "test_bareme_001",
    nom: "Test Bareme",
    categorie: "smic",
    valeur: 11.65,
    date_debut: "2024-01-01T00:00:00Z",
    date_fin: null,
    source_url: "https://www.legifrance.gouv.fr/test",
    source_label: "Test Source",
    verifie_le: "2024-01-15T00:00:00Z",
    verifie_par: "TEST",
  };

  test("accepte un bareme valide avec valeur numerique", () => {
    const result = BaremeSchema.safeParse(validBareme);
    expect(result.success).toBe(true);
  });

  test("accepte un bareme valide avec valeur objet", () => {
    const result = BaremeSchema.safeParse({
      ...validBareme,
      categorie: "rupture_conventionnelle",
      valeur: { tranches: [{ taux: 0.25 }] },
    });
    expect(result.success).toBe(true);
  });

  test("accepte un bareme valide avec valeur tableau", () => {
    const result = BaremeSchema.safeParse({
      ...validBareme,
      valeur: [1, 2, 3],
    });
    expect(result.success).toBe(true);
  });

  test("rejette un bareme sans id", () => {
    const { id: _, ...sansId } = validBareme;
    const result = BaremeSchema.safeParse(sansId);
    expect(result.success).toBe(false);
  });

  test("rejette une categorie invalide", () => {
    const result = BaremeSchema.safeParse({
      ...validBareme,
      categorie: "categorie_inexistante",
    });
    expect(result.success).toBe(false);
  });

  test("rejette une source_url invalide", () => {
    const result = BaremeSchema.safeParse({
      ...validBareme,
      source_url: "pas-une-url",
    });
    expect(result.success).toBe(false);
  });

  test("rejette une date_debut invalide", () => {
    const result = BaremeSchema.safeParse({
      ...validBareme,
      date_debut: "pas-une-date",
    });
    expect(result.success).toBe(false);
  });

  test("accepte date_fin null", () => {
    const result = BaremeSchema.safeParse(validBareme);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.date_fin).toBeNull();
    }
  });

  test("accepte notes optionnel", () => {
    const result = BaremeSchema.safeParse({
      ...validBareme,
      notes: "Note de test",
    });
    expect(result.success).toBe(true);
  });
});
