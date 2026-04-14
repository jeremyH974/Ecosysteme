"use client";

import { useState, useCallback } from "react";
import { optimiserRemunerationSASU } from "@ecosysteme/core/fiscal";
import type { SASUOptimOutput } from "@ecosysteme/core/fiscal";
import { getBaremeActif } from "@ecosysteme/regulatory";

export interface SASUFormData {
  benefice: string;
  nbParts: string;
  autresRevenus: string;
}

export interface SASUOptimState {
  result: SASUOptimOutput | null;
  error: string | null;
}

// Taux par defaut
const TRANCHES_IR_DEFAUT = [
  { de: 0, jusqu_a: 11600, taux: 0.00 },
  { de: 11601, jusqu_a: 29579, taux: 0.11 },
  { de: 29580, jusqu_a: 84577, taux: 0.30 },
  { de: 84578, jusqu_a: 181917, taux: 0.41 },
  { de: 181918, jusqu_a: null, taux: 0.45 },
];

const IS_DEFAUT = { tauxReduit: 0.15, seuilReduit: 42500, tauxNormal: 0.25 };

export function useSASUOptim() {
  const [state, setState] = useState<SASUOptimState>({
    result: null,
    error: null,
  });

  const calculate = useCallback((formData: SASUFormData) => {
    const benefice = parseFloat(formData.benefice);
    const nbParts = parseFloat(formData.nbParts);
    const autresRevenus = parseFloat(formData.autresRevenus) || 0;

    if (isNaN(benefice) || benefice <= 0) {
      setState({ result: null, error: "Veuillez saisir un benefice valide." });
      return;
    }

    // Lecture baremes
    let tranchesIR = TRANCHES_IR_DEFAUT;
    let is = IS_DEFAUT;

    try {
      const baremeIR = getBaremeActif("tranches_ir");
      const valIR = baremeIR.valeur as { tranches: typeof TRANCHES_IR_DEFAUT };
      if (valIR.tranches) tranchesIR = valIR.tranches;
    } catch {
      // fallback
    }

    try {
      const baremeIS = getBaremeActif("taux_is");
      const valIS = baremeIS.valeur as Record<string, number>;
      if (valIS.taux_reduit !== undefined) {
        is = {
          tauxReduit: valIS.taux_reduit ?? 0.15,
          seuilReduit: valIS.seuil_reduit ?? 42500,
          tauxNormal: valIS.taux_normal ?? 0.25,
        };
      }
    } catch {
      // fallback
    }

    try {
      const result = optimiserRemunerationSASU({
        beneficeAvantRemuneration: benefice,
        nbPartsFiscales: nbParts,
        autresRevenus,
        tauxCotisationsPatronales: 0.42,
        tauxCotisationsSalariales: 0.22,
        tauxISReduit: is.tauxReduit,
        seuilISReduit: is.seuilReduit,
        tauxISNormal: is.tauxNormal,
        eligibleTauxReduit: true,
        tauxPFU_IR: 0.128,
        tauxPFU_PS: 0.172,
        tranchesIR,
        pasOptimisation: 500,
      });

      setState({ result, error: null });
    } catch {
      setState({ result: null, error: "Veuillez verifier les valeurs saisies." });
    }
  }, []);

  return { ...state, calculate };
}
