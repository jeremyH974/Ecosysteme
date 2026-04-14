import { z } from "zod";

// --- Types ---

export interface JourFerie {
  date: Date;
  nom: string;
  fixe: boolean;
}

export const JoursOuvresInputSchema = z.object({
  dateDebut: z.coerce.date(),
  dateFin: z.coerce.date(),
  inclureDebut: z.boolean().default(true),
  inclureFin: z.boolean().default(false),
  mode: z.enum(["ouvres", "ouvrables"]),
  joursExclus: z.array(z.coerce.date()).optional(),
});

export const JoursOuvresOutputSchema = z.object({
  total: z.number(),
  detail: z.object({
    joursCalendaires: z.number(),
    samedis: z.number(),
    dimanches: z.number(),
    feriesHorsSemaine: z.number(),
    joursExclus: z.number(),
  }),
  feriesInclus: z.array(z.object({
    date: z.coerce.date(),
    nom: z.string(),
    fixe: z.boolean(),
  })),
});

export type JoursOuvresInput = z.infer<typeof JoursOuvresInputSchema>;
export type JoursOuvresOutput = z.infer<typeof JoursOuvresOutputSchema>;

// --- Algorithme de Paques (Meeus/Jones/Butcher) ---
// Source: https://fr.wikipedia.org/wiki/Calcul_de_la_date_de_P%C3%A2ques#Algorithme_de_Meeus

export function calculerPaques(annee: number): Date {
  const a = annee % 19;
  const b = Math.floor(annee / 100);
  const c = annee % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mois = Math.floor((h + l - 7 * m + 114) / 31);
  const jour = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(annee, mois - 1, jour);
}

// --- Jours feries francais ---

export interface JoursFeriesConfig {
  fixes: Array<{ mois: number; jour: number; nom: string }>;
  mobiles: string[];
}

export function getJoursFeries(annee: number, config: JoursFeriesConfig): JourFerie[] {
  const feries: JourFerie[] = [];

  // Jours fixes
  for (const f of config.fixes) {
    feries.push({
      date: new Date(annee, f.mois - 1, f.jour),
      nom: f.nom,
      fixe: true,
    });
  }

  // Jours mobiles bases sur Paques
  if (config.mobiles.length > 0) {
    const paques = calculerPaques(annee);

    for (const mobile of config.mobiles) {
      if (mobile === "paques") {
        feries.push({ date: new Date(paques), nom: "Dimanche de Paques", fixe: false });
      } else if (mobile === "lundi_paques") {
        const d = new Date(paques);
        d.setDate(d.getDate() + 1);
        feries.push({ date: d, nom: "Lundi de Paques", fixe: false });
      } else if (mobile === "ascension") {
        const d = new Date(paques);
        d.setDate(d.getDate() + 39);
        feries.push({ date: d, nom: "Ascension", fixe: false });
      } else if (mobile === "lundi_pentecote") {
        const d = new Date(paques);
        d.setDate(d.getDate() + 50);
        feries.push({ date: d, nom: "Lundi de Pentecote", fixe: false });
      }
    }
  }

  return feries;
}

// Config par defaut (France metropolitaine)
const CONFIG_DEFAUT: JoursFeriesConfig = {
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
};

// --- Helpers ---

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isInList(date: Date, list: Date[]): boolean {
  return list.some((d) => isSameDay(date, d));
}

// --- Fonction principale ---

/**
 * Calcule le nombre de jours ouvres ou ouvrables entre deux dates.
 *
 * Mode ouvres  : hors samedi, dimanche, jours feries
 * Mode ouvrables : hors dimanche et jours feries (samedi compte)
 *
 * Les jours feries qui tombent un weekend ne sont pas comptes deux fois.
 */
export function calculerJoursOuvres(
  input: JoursOuvresInput,
  config: JoursFeriesConfig = CONFIG_DEFAUT,
): JoursOuvresOutput {
  const v = JoursOuvresInputSchema.parse(input);

  if (v.dateFin < v.dateDebut) {
    throw new Error("DATE_INVALIDE: La date de fin doit etre posterieure ou egale a la date de debut.");
  }

  // Collecter les feries sur toutes les annees de la periode
  const anneeDebut = v.dateDebut.getFullYear();
  const anneeFin = v.dateFin.getFullYear();
  const tousFeries: JourFerie[] = [];
  for (let a = anneeDebut; a <= anneeFin; a++) {
    tousFeries.push(...getJoursFeries(a, config));
  }

  const joursExclus = v.joursExclus ?? [];

  let joursCalendaires = 0;
  let samedis = 0;
  let dimanches = 0;
  let feriesHorsSemaine = 0;
  let joursExclusCount = 0;
  const feriesInclus: JourFerie[] = [];

  const cursor = new Date(v.dateDebut);
  const fin = new Date(v.dateFin);

  // Ajuster selon inclureDebut/inclureFin
  if (!v.inclureDebut) cursor.setDate(cursor.getDate() + 1);
  if (v.inclureFin) fin.setDate(fin.getDate() + 1);

  while (cursor < fin) {
    joursCalendaires++;
    const dow = cursor.getDay(); // 0=dim, 6=sam

    const isSam = dow === 6;
    const isDim = dow === 0;
    const isFerie = tousFeries.some((f) => isSameDay(cursor, f.date));
    const isExclu = isInList(cursor, joursExclus);

    if (isDim) dimanches++;
    if (isSam) samedis++;

    // Un ferie hors weekend
    if (isFerie && !isSam && !isDim) {
      feriesHorsSemaine++;
      const ferie = tousFeries.find((f) => isSameDay(cursor, f.date));
      if (ferie && !feriesInclus.some((fi) => isSameDay(fi.date, ferie.date))) {
        feriesInclus.push(ferie);
      }
    }

    // Jour exclu personnalise (hors weekend et ferie deja compte)
    if (isExclu && !isSam && !isDim && !isFerie) {
      joursExclusCount++;
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  let total: number;
  if (v.mode === "ouvres") {
    // Hors samedi, dimanche, feries hors weekend, exclus
    total = joursCalendaires - samedis - dimanches - feriesHorsSemaine - joursExclusCount;
  } else {
    // Ouvrables : hors dimanche et feries hors weekend (samedi compte)
    total = joursCalendaires - dimanches - feriesHorsSemaine - joursExclusCount;
  }

  total = Math.max(0, total);

  return JoursOuvresOutputSchema.parse({
    total,
    detail: {
      joursCalendaires,
      samedis,
      dimanches,
      feriesHorsSemaine,
      joursExclus: joursExclusCount,
    },
    feriesInclus,
  });
}
