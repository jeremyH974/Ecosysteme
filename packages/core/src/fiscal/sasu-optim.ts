import { z } from "zod";
import { calculerIR } from "./impot-revenu.js";
import { calculerIS } from "./impot-societes.js";
import { calculerPFU } from "./pfu.js";

const TrancheIRSchema = z.object({
  de: z.number().min(0),
  jusqu_a: z.number().nullable(),
  taux: z.number().min(0).max(1),
});

export const SASUOptimInputSchema = z.object({
  beneficeAvantRemuneration: z.number().positive(),
  nbPartsFiscales: z.number().min(1).default(1),
  autresRevenus: z.number().min(0).default(0),
  // Taux cotisations sociales (president assimile salarie)
  tauxCotisationsPatronales: z.number(), // ~0.42
  tauxCotisationsSalariales: z.number(), // ~0.22
  // Taux IS
  tauxISReduit: z.number(), // 0.15
  seuilISReduit: z.number(), // 42500
  tauxISNormal: z.number(), // 0.25
  eligibleTauxReduit: z.boolean().default(true),
  // Taux PFU
  tauxPFU_IR: z.number().default(0.128),
  tauxPFU_PS: z.number().default(0.172),
  // Tranches IR
  tranchesIR: z.array(TrancheIRSchema).min(1),
  // Pas d'optimisation (precision)
  pasOptimisation: z.number().default(500),
});

const ScenarioSchema = z.object({
  label: z.string(),
  salaireBrut: z.number(),
  salaireNet: z.number(),
  coutSalairePourSociete: z.number(),
  beneficeApresRemuneration: z.number(),
  montantIS: z.number(),
  dividendesBruts: z.number(),
  dividendesNets: z.number(),
  montantPFU: z.number(),
  revenuImposableIR: z.number(),
  montantIR: z.number(),
  netTotal: z.number(),
});

export type ScenarioComparatif = z.infer<typeof ScenarioSchema>;

export const SASUOptimOutputSchema = z.object({
  optimal: ScenarioSchema,
  scenario100Salaire: ScenarioSchema,
  scenario100Dividendes: ScenarioSchema,
  gainOptimisation: z.number(),
});

export type SASUOptimInput = z.infer<typeof SASUOptimInputSchema>;
export type SASUOptimOutput = z.infer<typeof SASUOptimOutputSchema>;

function calculerScenario(
  salaireBrut: number,
  label: string,
  v: SASUOptimInput,
): ScenarioComparatif {
  // 1. Cout du salaire pour la societe
  const coutSalairePourSociete = salaireBrut * (1 + v.tauxCotisationsPatronales);

  // 2. Benefice restant apres remuneration
  const beneficeApresRemuneration = Math.max(0, v.beneficeAvantRemuneration - coutSalairePourSociete);

  // 3. IS sur le benefice restant
  const is = calculerIS({
    beneficeImposable: beneficeApresRemuneration,
    tauxReduit: v.tauxISReduit,
    seuilReduit: v.seuilISReduit,
    tauxNormal: v.tauxISNormal,
    eligibleTauxReduit: v.eligibleTauxReduit,
  });

  // 4. Dividendes distribuables
  const dividendesBruts = Math.max(0, beneficeApresRemuneration - is.montantIS);

  // 5. PFU sur dividendes
  const pfu = calculerPFU({
    montantDividendes: dividendesBruts,
    tauxIR: v.tauxPFU_IR,
    tauxPrelevementsSociaux: v.tauxPFU_PS,
  });

  // 6. Salaire net (apres cotisations salariales)
  const salaireNet = salaireBrut * (1 - v.tauxCotisationsSalariales);

  // 7. IR sur le revenu (salaire net imposable + autres revenus)
  // Avec PFU, les dividendes ne sont pas soumis au bareme IR
  const revenuImposableIR = salaireNet + v.autresRevenus;
  const ir = calculerIR({
    revenuNetImposable: revenuImposableIR,
    nbParts: v.nbPartsFiscales,
    tranches: v.tranchesIR,
  });

  // 8. Net total = salaire net + dividendes nets - IR
  const netTotal = salaireNet + pfu.netApresPFU - ir.montantIR;

  return {
    label,
    salaireBrut,
    salaireNet,
    coutSalairePourSociete,
    beneficeApresRemuneration,
    montantIS: is.montantIS,
    dividendesBruts,
    dividendesNets: pfu.netApresPFU,
    montantPFU: pfu.montantPFU,
    revenuImposableIR,
    montantIR: ir.montantIR,
    netTotal,
  };
}

/**
 * Optimise la repartition salaire/dividendes pour un president de SASU.
 * Teste tous les niveaux de salaire brut par pas et retourne le split optimal.
 *
 * Fonction PURE : tous les taux sont passes en parametres.
 */
export function optimiserRemunerationSASU(input: SASUOptimInput): SASUOptimOutput {
  const v = SASUOptimInputSchema.parse(input);

  // Salaire brut max = benefice / (1 + taux patronales)
  const salaireBrutMax = v.beneficeAvantRemuneration / (1 + v.tauxCotisationsPatronales);

  // Scenario 100% dividendes (0 salaire)
  const scenario100Dividendes = calculerScenario(0, "100% dividendes", v);

  // Scenario 100% salaire (max possible)
  const scenario100Salaire = calculerScenario(salaireBrutMax, "100% salaire", v);

  // Recherche du split optimal par iteration
  let meilleurScenario = scenario100Dividendes;

  for (let brut = 0; brut <= salaireBrutMax; brut += v.pasOptimisation) {
    const scenario = calculerScenario(brut, "optimal", v);
    if (scenario.netTotal > meilleurScenario.netTotal) {
      meilleurScenario = scenario;
    }
  }

  // Tester aussi le max exact
  const scenarioMax = calculerScenario(salaireBrutMax, "optimal", v);
  if (scenarioMax.netTotal > meilleurScenario.netTotal) {
    meilleurScenario = scenarioMax;
  }

  const optimal = { ...meilleurScenario, label: "Repartition optimale" };

  const gainOptimisation =
    optimal.netTotal - Math.max(scenario100Salaire.netTotal, scenario100Dividendes.netTotal);

  return SASUOptimOutputSchema.parse({
    optimal,
    scenario100Salaire,
    scenario100Dividendes,
    gainOptimisation,
  });
}
