"use client";

import { useState, useCallback } from "react";
import { calculerRevisionLoyer } from "@ecosysteme/core/property";
import type { RevisionLoyerOutput } from "@ecosysteme/core/property";
import { getBaremesParCategorie } from "@ecosysteme/regulatory";

export interface RevisionLoyerFormData {
  loyerActuel: string;
  irlAncien: string;
  irlNouveau: string;
}

export interface RevisionLoyerState {
  result: RevisionLoyerOutput | null;
  error: string | null;
}

export interface IRLOption {
  label: string;
  value: number;
}

function loadIRLOptions(): IRLOption[] {
  try {
    const baremes = getBaremesParCategorie("indices_loyers");
    return baremes
      .map((b) => {
        const val = b.valeur as { trimestre: string; annee: number; indice: number };
        return {
          label: `${val.trimestre} ${String(val.annee)} — ${String(val.indice)}`,
          value: val.indice,
        };
      })
      .sort((a, b) => a.value - b.value);
  } catch {
    return [
      { label: "T4 2023 — 142.06", value: 142.06 },
      { label: "T1 2024 — 143.46", value: 143.46 },
      { label: "T2 2024 — 145.17", value: 145.17 },
      { label: "T3 2024 — 144.51", value: 144.51 },
      { label: "T4 2024 — 144.64", value: 144.64 },
    ];
  }
}

export function useRevisionLoyer() {
  const [state, setState] = useState<RevisionLoyerState>({
    result: null,
    error: null,
  });

  const irlOptions = loadIRLOptions();

  const calculate = useCallback((formData: RevisionLoyerFormData) => {
    const loyer = parseFloat(formData.loyerActuel);
    const irlAncien = parseFloat(formData.irlAncien);
    const irlNouveau = parseFloat(formData.irlNouveau);

    if (isNaN(loyer) || loyer <= 0) {
      setState({ result: null, error: "Veuillez saisir un loyer valide." });
      return;
    }

    if (isNaN(irlAncien) || irlAncien <= 0 || isNaN(irlNouveau) || irlNouveau <= 0) {
      setState({ result: null, error: "Veuillez selectionner les deux IRL." });
      return;
    }

    try {
      const result = calculerRevisionLoyer({
        loyerActuel: loyer,
        irlAncien,
        irlNouveau,
      });
      setState({ result, error: null });
    } catch {
      setState({ result: null, error: "Veuillez verifier les valeurs saisies." });
    }
  }, []);

  return { ...state, calculate, irlOptions };
}
