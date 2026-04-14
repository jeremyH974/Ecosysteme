import { describe, test, expect } from "vitest";
import { calculerAllocationChomage } from "../src/salary/allocation-chomage.js";

function calc(salaireBrut: number, ancienneteJours: number, age: number) {
  return calculerAllocationChomage({
    salaireBrutMensuelMoyen: salaireBrut,
    ancienneteJours,
    age,
  });
}

describe("calculerAllocationChomage", () => {
  test("non eligible si anciennete < 130 jours", () => {
    const r = calc(2500, 100, 35);
    expect(r.eligible).toBe(false);
    expect(r.motifNonEligible).toBeDefined();
    expect(r.allocationJournaliere).toBe(0);
    expect(r.allocationMensuelle).toBe(0);
  });

  test("eligible avec 2500 EUR brut, 200 jours, 35 ans → allocation positive", () => {
    const r = calc(2500, 200, 35);
    expect(r.eligible).toBe(true);
    expect(r.allocationJournaliere).toBeGreaterThan(0);
    expect(r.allocationMensuelle).toBeGreaterThan(0);
  });

  test("ARE entre plancher (31.59) et plafond", () => {
    const r = calc(2500, 200, 35);
    expect(r.allocationJournaliere).toBeGreaterThanOrEqual(31.59);
    // Plafond = 75% du SJR
    const sjr = (2500 * 12) / 365;
    expect(r.allocationJournaliere).toBeLessThanOrEqual(sjr * 0.75);
  });

  test("duree max < 53 ans : max 730 jours", () => {
    const r = calc(2500, 900, 40);
    expect(r.dureeMaxJours).toBeLessThanOrEqual(730);
  });

  test("duree max 53-55 ans : max 913 jours", () => {
    const r = calc(2500, 1000, 54);
    expect(r.dureeMaxJours).toBeLessThanOrEqual(913);
  });

  test("duree max 55+ ans : max 1095 jours", () => {
    const r = calc(2500, 1200, 58);
    expect(r.dureeMaxJours).toBeLessThanOrEqual(1095);
  });

  test("taux de remplacement > 0", () => {
    const r = calc(2500, 200, 35);
    expect(r.tauxRemplacement).toBeGreaterThan(0);
  });

  test("methodeRetenue est une chaine non vide", () => {
    const r = calc(2500, 200, 35);
    expect(r.detail.methodeRetenue).toBeTruthy();
    expect(typeof r.detail.methodeRetenue).toBe("string");
    expect(r.detail.methodeRetenue.length).toBeGreaterThan(0);
  });

  test("SJR est positif quand eligible", () => {
    const r = calc(3000, 300, 45);
    expect(r.detail.salaireJournalierReference).toBeGreaterThan(0);
  });

  test("duree ne depasse pas l'anciennete", () => {
    const r = calc(2500, 200, 35);
    expect(r.dureeMaxJours).toBeLessThanOrEqual(200);
  });
});
