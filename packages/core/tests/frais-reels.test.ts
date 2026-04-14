import { describe, test, expect } from "vitest";
import { calculerFraisReels } from "../src/fiscal/frais-reels.js";

const BAREME_KM = [
  { puissance: "3", t1_coeff: 0.529, t1_ajout: 0, t2_coeff: 0.316, t2_ajout: 1065, t3_coeff: 0.407, t3_ajout: 0 },
  { puissance: "4", t1_coeff: 0.606, t1_ajout: 0, t2_coeff: 0.340, t2_ajout: 1330, t3_coeff: 0.407, t3_ajout: 0 },
  { puissance: "5", t1_coeff: 0.657, t1_ajout: 0, t2_coeff: 0.357, t2_ajout: 1395, t3_coeff: 0.407, t3_ajout: 0 },
  { puissance: "6", t1_coeff: 0.665, t1_ajout: 0, t2_coeff: 0.374, t2_ajout: 1435, t3_coeff: 0.407, t3_ajout: 0 },
  { puissance: "7+", t1_coeff: 0.661, t1_ajout: 0, t2_coeff: 0.374, t2_ajout: 1435, t3_coeff: 0.407, t3_ajout: 0 },
];

const BASE_INPUT = {
  joursDeplacementAn: 220,
  distanceAllerKm: 25,
  puissanceFiscale: "5" as const,
  nbRepasHorsDomicile: 200,
  valeurRepasActuel: 10,
  valeurRepasDomicile: 5.20,
  autresFrais: 0,
  salaireBrutAnnuel: 30000,
  baremeKm: BAREME_KM,
};

describe("calculerFraisReels", () => {
  test("cas standard 5CV, 25km aller, 30k brut — frais reels favorables", () => {
    const r = calculerFraisReels(BASE_INPUT);
    // distance AR = 25*2*220 = 11000 km => tranche 2 => 11000*0.357+1395 = 5322
    expect(r.detail.distanceAnnuelleAR).toBe(11000);
    expect(r.detail.fraisTransport).toBeCloseTo(5322, 0);
    // repas : (10-5.20)*200 = 960
    expect(r.detail.fraisRepas).toBeCloseTo(960, 0);
    expect(r.totalFraisReels).toBeCloseTo(5322 + 960, 0);
    expect(r.deductionForfaitaire10).toBeCloseTo(3000, 0);
    expect(r.plusFavorable).toBe("frais_reels");
    expect(r.economie).toBeCloseTo(5322 + 960 - 3000, 0);
  });

  test("petit trajet, haut salaire — forfait favorable", () => {
    const r = calculerFraisReels({
      ...BASE_INPUT,
      distanceAllerKm: 5,
      nbRepasHorsDomicile: 0,
      salaireBrutAnnuel: 60000,
    });
    // distance AR = 5*2*220 = 2200 km => tranche 1 => 2200*0.657 = 1445.4
    expect(r.detail.distanceAnnuelleAR).toBe(2200);
    expect(r.detail.fraisTransport).toBeCloseTo(1445.4, 0);
    expect(r.deductionForfaitaire10).toBeCloseTo(6000, 0);
    expect(r.plusFavorable).toBe("forfait");
  });

  test("repas plafonnes a 20.20 - domicile", () => {
    const r = calculerFraisReels({
      ...BASE_INPUT,
      valeurRepasActuel: 30, // au-dessus du plafond
      nbRepasHorsDomicile: 100,
    });
    // plafond par repas = 20.20 - 5.20 = 15 EUR
    // cout reel - domicile = 30 - 5.20 = 24.80, mais plafonne a 15
    expect(r.detail.fraisRepas).toBeCloseTo(15 * 100, 0);
  });

  test("repas gratuits (valeur actuelle < domicile) — pas de frais repas", () => {
    const r = calculerFraisReels({
      ...BASE_INPUT,
      valeurRepasActuel: 3, // moins que la valeur domicile
      nbRepasHorsDomicile: 200,
    });
    expect(r.detail.fraisRepas).toBe(0);
  });

  test("0 jours de deplacement — uniquement repas et autres frais", () => {
    const r = calculerFraisReels({
      ...BASE_INPUT,
      joursDeplacementAn: 0,
      distanceAllerKm: 0,
      autresFrais: 500,
    });
    expect(r.detail.fraisTransport).toBe(0);
    expect(r.detail.distanceAnnuelleAR).toBe(0);
    expect(r.totalFraisReels).toBeCloseTo(960 + 500, 0);
  });

  test("autres frais inclus dans le total", () => {
    const r = calculerFraisReels({
      ...BASE_INPUT,
      autresFrais: 1500,
    });
    expect(r.detail.autresFrais).toBe(1500);
    expect(r.totalFraisReels).toBeCloseTo(5322 + 960 + 1500, 0);
  });

  test("grande distance (tranche 3 > 20000 km)", () => {
    const r = calculerFraisReels({
      ...BASE_INPUT,
      distanceAllerKm: 60,
      joursDeplacementAn: 220,
      puissanceFiscale: "4",
    });
    // distance AR = 60*2*220 = 26400 km => tranche 3 => 26400*0.407 = 10744.8
    expect(r.detail.distanceAnnuelleAR).toBe(26400);
    expect(r.detail.fraisTransport).toBeCloseTo(10744.8, 0);
  });

  test("puissance fiscale invalide — erreur", () => {
    expect(() =>
      calculerFraisReels({
        ...BASE_INPUT,
        puissanceFiscale: "99" as "3",
      }),
    ).toThrow();
  });

  test("puissance 7+ fonctionne correctement", () => {
    const r = calculerFraisReels({
      ...BASE_INPUT,
      puissanceFiscale: "7+",
      distanceAllerKm: 15,
      joursDeplacementAn: 220,
    });
    // distance AR = 15*2*220 = 6600 km => tranche 2 => 6600*0.374+1435 = 3903.4
    expect(r.detail.distanceAnnuelleAR).toBe(6600);
    expect(r.detail.fraisTransport).toBeCloseTo(3903.4, 0);
  });

  test("egalite parfaite — forfait retenu", () => {
    // Chercher un cas ou frais reels = forfait exactement
    const r = calculerFraisReels({
      ...BASE_INPUT,
      joursDeplacementAn: 0,
      distanceAllerKm: 0,
      nbRepasHorsDomicile: 0,
      autresFrais: 3000, // = 10% de 30000
      salaireBrutAnnuel: 30000,
    });
    expect(r.totalFraisReels).toBeCloseTo(3000, 0);
    expect(r.deductionForfaitaire10).toBeCloseTo(3000, 0);
    // When equal, forfait is retained (not strictly greater)
    expect(r.plusFavorable).toBe("forfait");
    expect(r.economie).toBeCloseTo(0, 0);
  });
});
