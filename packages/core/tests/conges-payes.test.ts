import { describe, test, expect } from "vitest";
import { calculerCongesPayes } from "../src/salary/conges-payes.js";

function calc(salaireBrut: number, joursAcquis: number, joursPris: number) {
  return calculerCongesPayes({
    salaireBrutMensuel: salaireBrut,
    joursAcquis,
    joursPris,
  });
}

describe("calculerCongesPayes", () => {
  test("25 jours acquis, 10 pris, 2500 brut — indemnite > 0", () => {
    const result = calc(2500, 25, 10);
    expect(result.indemniteConges).toBeGreaterThan(0);
  });

  test("Jours restants = acquis - pris", () => {
    const result = calc(2500, 25, 10);
    expect(result.joursRestants).toBe(15);
  });

  test("Methode maintien vs dixieme (compare les deux)", () => {
    const result = calc(2500, 25, 10);
    // Les deux methodes doivent etre calculees
    expect(result.detail.maintienSalaire).toBeGreaterThan(0);
    expect(result.detail.dixiemeBrut).toBeGreaterThan(0);
    // L'indemnite retenue est la plus favorable
    expect(result.indemniteConges).toBe(
      Math.max(result.detail.maintienSalaire, result.detail.dixiemeBrut)
    );
  });

  test("0 jours pris — indemnite = 0", () => {
    const result = calc(2500, 25, 0);
    expect(result.indemniteConges).toBe(0);
  });

  test("Salaire 0 — error Zod", () => {
    expect(() => calc(0, 25, 10)).toThrow();
  });

  test("indemnite = max(maintien, dixieme)", () => {
    const result = calc(3000, 25, 15);
    const expected = Math.max(result.detail.maintienSalaire, result.detail.dixiemeBrut);
    expect(result.indemniteConges).toBeCloseTo(expected, 2);
  });

  test("25 jours acquis, 25 pris — joursRestants = 0", () => {
    const result = calc(2500, 25, 25);
    expect(result.joursRestants).toBe(0);
  });

  test("detail.maintienSalaire > 0 when joursPris > 0", () => {
    const result = calc(2500, 25, 5);
    expect(result.detail.maintienSalaire).toBeGreaterThan(0);
  });
});
