"use client";

import { useState, useCallback } from "react";
import { calculerIR } from "@ecosysteme/core/fiscal";
import type { IROutput } from "@ecosysteme/core/fiscal";
import { getBaremeActif } from "@ecosysteme/regulatory";

export interface TMIFormData {
  revenuNetImposable: string;
  nbParts: string;
}

const TRANCHES_DEFAUT = [
  { de: 0, jusqu_a: 11600, taux: 0.00 },
  { de: 11601, jusqu_a: 29579, taux: 0.11 },
  { de: 29580, jusqu_a: 84577, taux: 0.30 },
  { de: 84578, jusqu_a: 181917, taux: 0.41 },
  { de: 181918, jusqu_a: null, taux: 0.45 },
];

export function useTMI() {
  const [result, setResult] = useState<IROutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback((formData: TMIFormData) => {
    const revenu = parseFloat(formData.revenuNetImposable);
    const nbParts = parseFloat(formData.nbParts);

    if (isNaN(revenu) || revenu < 0) {
      setResult(null);
      setError("Veuillez saisir un revenu net imposable valide.");
      return;
    }

    let tranches = TRANCHES_DEFAUT;
    try {
      const bareme = getBaremeActif("tranches_ir");
      const val = bareme.valeur as { tranches: typeof TRANCHES_DEFAUT };
      if (val.tranches) tranches = val.tranches;
    } catch {
      // fallback
    }

    try {
      const r = calculerIR({ revenuNetImposable: revenu, nbParts, tranches });
      setResult(r);
      setError(null);
    } catch {
      setResult(null);
      setError("Veuillez verifier les valeurs saisies.");
    }
  }, []);

  return { result, error, calculate };
}
