/**
 * Script d'audit des baremes reglementaires.
 *
 * Execute : npx tsx scripts/audit-baremes.ts
 *
 * Verifie :
 * 1. Que chaque bareme a une source_url valide
 * 2. Que la date de verification est < 90 jours
 * 3. Que les baremes attendus sont presents
 * 4. Liste les baremes a reverifier bientot
 */

import baremes from "../packages/regulatory/data/baremes.json" with { type: "json" };

const JOURS_ALERTE = 90;
const NOW = new Date();

interface AuditResult {
  ok: boolean;
  warnings: string[];
  errors: string[];
}

function audit(): AuditResult {
  const warnings: string[] = [];
  const errors: string[] = [];

  console.log("=== AUDIT DES BAREMES ===\n");
  console.log(`Date : ${NOW.toISOString().split("T")[0]}`);
  console.log(`Nombre de baremes : ${baremes.baremes.length}\n`);

  // Categories attendues
  const categoriesAttendues = [
    "rupture_conventionnelle",
    "smic",
    "cotisations_salariales",
    "tranches_ir",
    "taux_is",
    "indices_loyers",
    "baremes_km",
  ];

  const categoriesPresentes = new Set(baremes.baremes.map((b) => b.categorie));
  for (const cat of categoriesAttendues) {
    if (!categoriesPresentes.has(cat)) {
      errors.push(`CATEGORIE MANQUANTE : ${cat}`);
    }
  }

  for (const b of baremes.baremes) {
    // Source URL
    if (!b.source_url || !b.source_url.startsWith("http")) {
      errors.push(`${b.id} : source_url manquante ou invalide`);
    }

    // Date de verification
    const verifieLe = new Date(b.verifie_le);
    const diffJours = Math.floor((NOW.getTime() - verifieLe.getTime()) / (1000 * 60 * 60 * 24));

    if (diffJours > JOURS_ALERTE) {
      warnings.push(`${b.id} : verifie il y a ${diffJours} jours (> ${JOURS_ALERTE}j) — reverifier`);
    }

    // Verificateur
    if (!b.verifie_par || b.verifie_par === "INIT") {
      warnings.push(`${b.id} : verifie_par = "${b.verifie_par}" — devrait etre AUDIT apres verification`);
    }

    console.log(`  [${diffJours <= JOURS_ALERTE ? "OK" : "!!"}] ${b.id} — verifie le ${b.verifie_le.split("T")[0]} (${diffJours}j)`);
  }

  console.log("\n=== RESUME ===\n");

  if (errors.length > 0) {
    console.log("ERREURS :");
    for (const e of errors) console.log(`  [x] ${e}`);
  }

  if (warnings.length > 0) {
    console.log("AVERTISSEMENTS :");
    for (const w of warnings) console.log(`  [!] ${w}`);
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log("Tous les baremes sont a jour et correctement documentes.");
  }

  console.log(`\nErreurs: ${errors.length} | Avertissements: ${warnings.length}`);

  return { ok: errors.length === 0, warnings, errors };
}

const result = audit();
process.exit(result.ok ? 0 : 1);
