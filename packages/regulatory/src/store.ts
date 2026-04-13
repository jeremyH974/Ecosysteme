import { BaremeSchema, type Bareme, type BaremeCategorie } from "./bareme.js";
import baremesData from "../data/baremes.json" with { type: "json" };

const baremes: Bareme[] = [];

for (const entry of baremesData.baremes) {
  const parsed = BaremeSchema.parse(entry);
  baremes.push(parsed);
}

/**
 * Retourne le bareme actif pour une categorie donnee a une date donnee.
 * Leve une erreur explicite si aucun bareme n'est trouve.
 */
export function getBaremeActif(
  categorie: BaremeCategorie,
  date: Date = new Date(),
): Bareme {
  const dateISO = date.toISOString();

  const actif = baremes.find(
    (b) =>
      b.categorie === categorie &&
      b.date_debut <= dateISO &&
      (b.date_fin === null || b.date_fin > dateISO),
  );

  if (!actif) {
    throw new Error(
      `BAREME_INTROUVABLE: Aucun bareme actif pour la categorie "${categorie}" ` +
        `a la date ${date.toISOString().split("T")[0]}. ` +
        `Verifiez que le fichier baremes.json contient un bareme valide pour cette periode.`,
    );
  }

  return actif;
}

/**
 * Retourne tous les baremes d'une categorie donnee.
 */
export function getBaremesParCategorie(categorie: BaremeCategorie): Bareme[] {
  return baremes.filter((b) => b.categorie === categorie);
}

/**
 * Retourne tous les baremes charges.
 */
export function getAllBaremes(): Bareme[] {
  return [...baremes];
}
