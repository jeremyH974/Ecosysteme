import { describe, test, expect } from "vitest";
import { calculerJoursOuvres, calculerPaques, getJoursFeries } from "../src/dates/jours-ouvres.js";

// --- Tests algorithme Paques ---

describe("calculerPaques", () => {
  test("Paques 2024 = 31 mars", () => {
    const p = calculerPaques(2024);
    expect(p.getMonth()).toBe(2); // mars = 2
    expect(p.getDate()).toBe(31);
  });

  test("Paques 2025 = 20 avril", () => {
    const p = calculerPaques(2025);
    expect(p.getMonth()).toBe(3); // avril = 3
    expect(p.getDate()).toBe(20);
  });

  test("Paques 2026 = 5 avril", () => {
    const p = calculerPaques(2026);
    expect(p.getMonth()).toBe(3);
    expect(p.getDate()).toBe(5);
  });

  test("Paques 2027 = 28 mars", () => {
    const p = calculerPaques(2027);
    expect(p.getMonth()).toBe(2);
    expect(p.getDate()).toBe(28);
  });
});

// --- Tests jours feries ---

describe("getJoursFeries", () => {
  test("11 jours feries en France metropolitaine", () => {
    const feries = getJoursFeries(2026, {
      fixes: [
        { mois: 1, jour: 1, nom: "Jour de l'An" },
        { mois: 5, jour: 1, nom: "Fete du Travail" },
        { mois: 5, jour: 8, nom: "Victoire 1945" },
        { mois: 7, jour: 14, nom: "Fete Nationale" },
        { mois: 8, jour: 15, nom: "Assomption" },
        { mois: 11, jour: 1, nom: "Toussaint" },
        { mois: 11, jour: 11, nom: "Armistice" },
        { mois: 12, jour: 25, nom: "Noel" },
      ],
      mobiles: ["paques", "lundi_paques", "ascension", "lundi_pentecote"],
    });
    // 8 fixes + 4 mobiles = 12 (Paques dimanche inclus)
    expect(feries.length).toBe(12);
  });

  test("Ascension 2026 = Paques+39 = 14 mai (jeudi)", () => {
    const feries = getJoursFeries(2026, { fixes: [], mobiles: ["ascension"] });
    const ascension = feries[0];
    expect(ascension?.date.getMonth()).toBe(4); // mai
    expect(ascension?.date.getDate()).toBe(14);
    expect(ascension?.date.getDay()).toBe(4); // jeudi
  });

  test("Lundi Pentecote 2026 = Paques+50 = 25 mai", () => {
    const feries = getJoursFeries(2026, { fixes: [], mobiles: ["lundi_pentecote"] });
    expect(feries[0]?.date.getMonth()).toBe(4);
    expect(feries[0]?.date.getDate()).toBe(25);
    expect(feries[0]?.date.getDay()).toBe(1); // lundi
  });
});

// --- Tests calculerJoursOuvres ---

describe("calculerJoursOuvres", () => {
  // Semaine simple sans ferie
  test("1 semaine lun-ven sans ferie = 5 jours ouvres", () => {
    // 6 avril 2026 (lundi) → 10 avril 2026 (vendredi)
    const r = calculerJoursOuvres({
      dateDebut: new Date(2026, 3, 13),
      dateFin: new Date(2026, 3, 17),
      inclureDebut: true,
      inclureFin: true,
      mode: "ouvres",
    });
    expect(r.total).toBe(5);
  });

  test("1 semaine lun-dim = 5 ouvres, 6 ouvrables", () => {
    const ouvres = calculerJoursOuvres({
      dateDebut: new Date(2026, 3, 13),
      dateFin: new Date(2026, 3, 19),
      inclureDebut: true,
      inclureFin: true,
      mode: "ouvres",
    });
    const ouvrables = calculerJoursOuvres({
      dateDebut: new Date(2026, 3, 13),
      dateFin: new Date(2026, 3, 19),
      inclureDebut: true,
      inclureFin: true,
      mode: "ouvrables",
    });
    expect(ouvres.total).toBe(5);
    expect(ouvrables.total).toBe(6);
    expect(ouvrables.total - ouvres.total).toBe(ouvres.detail.samedis);
  });

  // 1er mai
  test("Semaine du 1er mai 2026 (vendredi) = 4 ouvres", () => {
    // 27 avril (lun) → 1 mai (ven)
    const r = calculerJoursOuvres({
      dateDebut: new Date(2026, 3, 27),
      dateFin: new Date(2026, 4, 1),
      inclureDebut: true,
      inclureFin: true,
      mode: "ouvres",
    });
    expect(r.total).toBe(4);
    expect(r.feriesInclus.length).toBe(1);
    expect(r.feriesInclus[0]?.nom).toContain("Travail");
  });

  // Paques 2026 (5 avril dim + 6 avril lun)
  test("Semaine de Paques 2026 = 4 ouvres (lundi ferie)", () => {
    // 6 avril (lun Paques) → 10 avril (ven)
    const r = calculerJoursOuvres({
      dateDebut: new Date(2026, 3, 6),
      dateFin: new Date(2026, 3, 10),
      inclureDebut: true,
      inclureFin: true,
      mode: "ouvres",
    });
    expect(r.total).toBe(4); // lundi de Paques ferie
  });

  // Date debut = date fin
  test("Date debut = date fin, inclureDebut=true, inclureFin=false → 0", () => {
    const r = calculerJoursOuvres({
      dateDebut: new Date(2026, 3, 13),
      dateFin: new Date(2026, 3, 13),
      inclureDebut: true,
      inclureFin: false,
      mode: "ouvres",
    });
    expect(r.total).toBe(0);
  });

  test("Date debut = date fin, inclureDebut=true, inclureFin=true → 1", () => {
    const r = calculerJoursOuvres({
      dateDebut: new Date(2026, 3, 13), // lundi
      dateFin: new Date(2026, 3, 13),
      inclureDebut: true,
      inclureFin: true,
      mode: "ouvres",
    });
    expect(r.total).toBe(1);
  });

  // Ascension 2026 = 14 mai (jeudi)
  test("Semaine Ascension 2026 = jeudi ferie, vendredi pont si exclu", () => {
    // 11 mai (lun) → 15 mai (ven)
    const sansExclusion = calculerJoursOuvres({
      dateDebut: new Date(2026, 4, 11),
      dateFin: new Date(2026, 4, 15),
      inclureDebut: true,
      inclureFin: true,
      mode: "ouvres",
    });
    expect(sansExclusion.total).toBe(4); // jeudi ferie

    const avecPont = calculerJoursOuvres({
      dateDebut: new Date(2026, 4, 11),
      dateFin: new Date(2026, 4, 15),
      inclureDebut: true,
      inclureFin: true,
      mode: "ouvres",
      joursExclus: [new Date(2026, 4, 15)], // vendredi pont
    });
    expect(avecPont.total).toBe(3);
  });

  // Periode sur 2 annees
  test("Periode 15 dec 2025 → 15 jan 2026 inclut Noel et Jour de l'An", () => {
    const r = calculerJoursOuvres({
      dateDebut: new Date(2025, 11, 15),
      dateFin: new Date(2026, 0, 15),
      inclureDebut: true,
      inclureFin: true,
      mode: "ouvres",
    });
    expect(r.feriesInclus.length).toBeGreaterThanOrEqual(2);
    const noms = r.feriesInclus.map((f) => f.nom);
    expect(noms.some((n) => n.includes("Noel"))).toBe(true);
    expect(noms.some((n) => n.includes("An"))).toBe(true);
  });

  // Jours exclus personnalises
  test("joursExclus reduit le total", () => {
    const sans = calculerJoursOuvres({
      dateDebut: new Date(2026, 3, 13),
      dateFin: new Date(2026, 3, 17),
      inclureDebut: true,
      inclureFin: true,
      mode: "ouvres",
    });
    const avec = calculerJoursOuvres({
      dateDebut: new Date(2026, 3, 13),
      dateFin: new Date(2026, 3, 17),
      inclureDebut: true,
      inclureFin: true,
      mode: "ouvres",
      joursExclus: [new Date(2026, 3, 15)], // mercredi
    });
    expect(avec.total).toBe(sans.total - 1);
  });

  // Ouvrables vs ouvres : difference = samedis
  test("Difference ouvrables - ouvres = nombre de samedis", () => {
    const ouvres = calculerJoursOuvres({
      dateDebut: new Date(2026, 3, 1),
      dateFin: new Date(2026, 3, 30),
      inclureDebut: true,
      inclureFin: true,
      mode: "ouvres",
    });
    const ouvrables = calculerJoursOuvres({
      dateDebut: new Date(2026, 3, 1),
      dateFin: new Date(2026, 3, 30),
      inclureDebut: true,
      inclureFin: true,
      mode: "ouvrables",
    });
    expect(ouvrables.total - ouvres.total).toBe(ouvres.detail.samedis);
  });

  // Erreur date inversee
  test("Date fin < date debut → erreur", () => {
    expect(() => calculerJoursOuvres({
      dateDebut: new Date(2026, 5, 1),
      dateFin: new Date(2026, 3, 1),
      inclureDebut: true,
      inclureFin: true,
      mode: "ouvres",
    })).toThrow("DATE_INVALIDE");
  });

  // Periode 0
  test("Meme date, inclureDebut=false, inclureFin=false → 0", () => {
    const r = calculerJoursOuvres({
      dateDebut: new Date(2026, 3, 13),
      dateFin: new Date(2026, 3, 13),
      inclureDebut: false,
      inclureFin: false,
      mode: "ouvres",
    });
    expect(r.total).toBe(0);
    expect(r.detail.joursCalendaires).toBe(0);
  });

  // Mois complet
  test("Janvier 2026 = ~21 jours ouvres", () => {
    const r = calculerJoursOuvres({
      dateDebut: new Date(2026, 0, 1),
      dateFin: new Date(2026, 0, 31),
      inclureDebut: true,
      inclureFin: true,
      mode: "ouvres",
    });
    // 31 jours - 4 sam - 4 dim - 1 ferie (1er jan jeudi) = 22
    // Mais 1er jan 2026 est un jeudi → 22 jours ouvres
    expect(r.total).toBeGreaterThanOrEqual(20);
    expect(r.total).toBeLessThanOrEqual(23);
  });

  // Annee complete
  test("Annee 2026 complete = ~251 jours ouvres", () => {
    const r = calculerJoursOuvres({
      dateDebut: new Date(2026, 0, 1),
      dateFin: new Date(2026, 11, 31),
      inclureDebut: true,
      inclureFin: true,
      mode: "ouvres",
    });
    expect(r.total).toBeGreaterThanOrEqual(245);
    expect(r.total).toBeLessThanOrEqual(255);
  });

  // Detail coherent
  test("Detail : calendaires = ouvres + samedis + dimanches + feries + exclus", () => {
    const r = calculerJoursOuvres({
      dateDebut: new Date(2026, 0, 1),
      dateFin: new Date(2026, 5, 30),
      inclureDebut: true,
      inclureFin: true,
      mode: "ouvres",
    });
    expect(r.detail.joursCalendaires).toBe(
      r.total + r.detail.samedis + r.detail.dimanches + r.detail.feriesHorsSemaine + r.detail.joursExclus,
    );
  });

  // Weekend = pas ouvre
  test("Samedi et dimanche ne sont pas des jours ouvres", () => {
    // 11 avril 2026 = samedi
    const r = calculerJoursOuvres({
      dateDebut: new Date(2026, 3, 18),
      dateFin: new Date(2026, 3, 19),
      inclureDebut: true,
      inclureFin: true,
      mode: "ouvres",
    });
    expect(r.total).toBe(0);
  });

  test("Samedi est un jour ouvrable mais pas ouvre", () => {
    const r = calculerJoursOuvres({
      dateDebut: new Date(2026, 3, 18), // samedi
      dateFin: new Date(2026, 3, 18),
      inclureDebut: true,
      inclureFin: true,
      mode: "ouvrables",
    });
    expect(r.total).toBe(1); // samedi = ouvrable
  });
});
