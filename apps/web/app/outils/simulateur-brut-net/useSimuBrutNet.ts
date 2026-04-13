"use client";

import { useState, useCallback } from "react";
import { calculerBrutNet } from "@ecosysteme/core/salary";
import type { BrutNetOutput } from "@ecosysteme/core/salary";
import { getBaremesParCategorie } from "@ecosysteme/regulatory";

export interface BrutNetFormData {
  salaireBrut: string;
  statut: "non_cadre" | "cadre";
  tempsPartiel: number;
}

export interface SimuBrutNetState {
  result: BrutNetOutput | null;
  error: string | null;
}

// Taux par defaut (2024) en cas d'echec lecture bareme
const TAUX_DEFAUT = {
  baseCsgCrds: 0.9825,
  csgDeductible: 0.068,
  csgNonDeductible: 0.024,
  crds: 0.005,
  vieillessePlafonnee: 0.069,
  vieillesseDeplafonnee: 0.004,
  agircArrcoT1: 0.0315,
  agircArrcoT2: 0.0864,
  cegT2: 0.0108,
  apec: 0.00024,
};

const PASS_DEFAUT = 3864;

function loadBaremes() {
  let taux = TAUX_DEFAUT;
  let passMensuel = PASS_DEFAUT;

  try {
    const baremes = getBaremesParCategorie("cotisations_salariales");

    for (const bareme of baremes) {
      const val = bareme.valeur as Record<string, number>;
      if (val.csg_deductible !== undefined) {
        taux = {
          baseCsgCrds: val.base_csg_crds ?? taux.baseCsgCrds,
          csgDeductible: val.csg_deductible ?? taux.csgDeductible,
          csgNonDeductible: val.csg_non_deductible ?? taux.csgNonDeductible,
          crds: val.crds ?? taux.crds,
          vieillessePlafonnee: val.vieillesse_plafonnee ?? taux.vieillessePlafonnee,
          vieillesseDeplafonnee: val.vieillesse_deplafonnee ?? taux.vieillesseDeplafonnee,
          agircArrcoT1: val.agirc_arrco_t1 ?? taux.agircArrcoT1,
          agircArrcoT2: val.agirc_arrco_t2 ?? taux.agircArrcoT2,
          cegT2: val.ceg_t2 ?? taux.cegT2,
          apec: val.apec ?? taux.apec,
        };
      }
      if (val.pass_mensuel !== undefined) {
        passMensuel = val.pass_mensuel;
      }
    }
  } catch {
    // Fallback sur taux par defaut
  }

  return { taux, passMensuel };
}

export function useSimuBrutNet() {
  const [state, setState] = useState<SimuBrutNetState>({
    result: null,
    error: null,
  });

  const calculate = useCallback((formData: BrutNetFormData) => {
    const salaire = parseFloat(formData.salaireBrut);

    if (isNaN(salaire) || salaire <= 0) {
      setState({ result: null, error: "Veuillez saisir un salaire brut valide." });
      return;
    }

    const { taux, passMensuel } = loadBaremes();

    try {
      const result = calculerBrutNet({
        salaireBrutMensuel: salaire,
        statut: formData.statut,
        tempsPartiel: formData.tempsPartiel,
        ...taux,
        passMensuel,
      });

      setState({ result, error: null });
    } catch {
      setState({ result: null, error: "Veuillez verifier les valeurs saisies." });
    }
  }, []);

  const reset = useCallback(() => {
    setState({ result: null, error: null });
  }, []);

  return { ...state, calculate, reset };
}
