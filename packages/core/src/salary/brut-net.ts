import { z } from "zod";

export const BrutNetInputSchema = z.object({
  salaireBrutMensuel: z.number().positive(),
  statut: z.enum(["non_cadre", "cadre"]),
  tempsPartiel: z.number().min(0).max(1).default(1),
  // Taux CSG/CRDS (appliques sur 98.25% du brut)
  baseCsgCrds: z.number(), // 0.9825
  csgDeductible: z.number(), // 0.068
  csgNonDeductible: z.number(), // 0.024
  crds: z.number(), // 0.005
  // Cotisations sur brut
  vieillessePlafonnee: z.number(), // 0.069
  vieillesseDeplafonnee: z.number(), // 0.004
  agircArrcoT1: z.number(), // 0.0315
  agircArrcoT2: z.number(), // 0.0864
  cegT2: z.number(), // 0.0108
  apec: z.number(), // 0.00024 (cadres uniquement)
  // Plafond
  passMensuel: z.number().positive(), // 3864
});

export const BrutNetOutputSchema = z.object({
  salaireNetAvantImpot: z.number(),
  totalCotisationsSalariales: z.number(),
  detail: z.object({
    baseCsg: z.number(),
    montantCsgCrds: z.number(),
    montantVieillessePlafonnee: z.number(),
    montantVieillesseDeplafonnee: z.number(),
    montantRetraiteComplementaire: z.number(),
    montantApec: z.number(),
    tauxGlobalCotisations: z.number(),
  }),
});

export type BrutNetInput = z.infer<typeof BrutNetInputSchema>;
export type BrutNetOutput = z.infer<typeof BrutNetOutputSchema>;

/**
 * Calcule le salaire net avant impot a partir du brut mensuel.
 *
 * Fonction PURE : recoit tous les taux en parametre.
 * Aucun arrondi silencieux — precision complete.
 *
 * @throws ZodError si les inputs sont invalides
 */
export function calculerBrutNet(input: BrutNetInput): BrutNetOutput {
  const v = BrutNetInputSchema.parse(input);

  const brut = v.salaireBrutMensuel;
  const passAjuste = v.passMensuel * v.tempsPartiel;

  // 1. CSG/CRDS sur 98.25% du brut
  const baseCsg = brut * v.baseCsgCrds;
  const montantCsgCrds = baseCsg * (v.csgDeductible + v.csgNonDeductible + v.crds);

  // 2. Vieillesse plafonnee (tranche 1 : jusqu'au PASS)
  const brutPlafonneT1 = Math.min(brut, passAjuste);
  const montantVieillessePlafonnee = brutPlafonneT1 * v.vieillessePlafonnee;

  // 3. Vieillesse deplafonnee (sur totalite du brut)
  const montantVieillesseDeplafonnee = brut * v.vieillesseDeplafonnee;

  // 4. Retraite complementaire AGIRC-ARRCO
  const montantAgircT1 = brutPlafonneT1 * v.agircArrcoT1;
  const brutT2 = Math.max(0, brut - passAjuste);
  const montantAgircT2 = brutT2 * v.agircArrcoT2;
  const montantCegT2 = brutT2 * v.cegT2;
  const montantRetraiteComplementaire = montantAgircT1 + montantAgircT2 + montantCegT2;

  // 5. APEC (cadres uniquement)
  const montantApec = v.statut === "cadre" ? brut * v.apec : 0;

  // Total
  const totalCotisationsSalariales =
    montantCsgCrds +
    montantVieillessePlafonnee +
    montantVieillesseDeplafonnee +
    montantRetraiteComplementaire +
    montantApec;

  const salaireNetAvantImpot = brut - totalCotisationsSalariales;

  const tauxGlobalCotisations = totalCotisationsSalariales / brut;

  return BrutNetOutputSchema.parse({
    salaireNetAvantImpot,
    totalCotisationsSalariales,
    detail: {
      baseCsg,
      montantCsgCrds,
      montantVieillessePlafonnee,
      montantVieillesseDeplafonnee,
      montantRetraiteComplementaire,
      montantApec,
      tauxGlobalCotisations,
    },
  });
}
