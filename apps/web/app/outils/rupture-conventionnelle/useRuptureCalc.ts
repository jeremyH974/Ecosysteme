"use client";

import { useState, useCallback } from "react";
import { calculerIndemniteRuptureConventionnelle } from "@ecosysteme/core/salary";
import type { RuptureOutput } from "@ecosysteme/core/salary";
import { getBaremeActif } from "@ecosysteme/regulatory";

export interface RuptureFormData {
  salaireBrut: string;
  ancienneteAnnees: string;
  ancienneteMois: string;
}

export interface RuptureCalcState {
  result: RuptureOutput | null;
  error: string | null;
  warning: string | null;
}

const SMIC_MENSUEL_BRUT = 11.65 * 151.67; // ~1766.95 EUR

export function useRuptureCalc() {
  const [state, setState] = useState<RuptureCalcState>({
    result: null,
    error: null,
    warning: null,
  });

  const calculate = useCallback((formData: RuptureFormData) => {
    const salaire = parseFloat(formData.salaireBrut);
    const annees = parseInt(formData.ancienneteAnnees, 10) || 0;
    const mois = parseInt(formData.ancienneteMois, 10) || 0;

    // Validation basique
    if (isNaN(salaire) || salaire <= 0) {
      setState({ result: null, error: "Veuillez saisir un salaire brut valide.", warning: null });
      return;
    }

    // Warning si salaire < SMIC
    let warning: string | null = null;
    if (salaire < SMIC_MENSUEL_BRUT) {
      warning =
        "Ce salaire est inferieur au SMIC legal. Le calcul reste indicatif mais verifiez votre salaire de reference.";
    }

    // Recuperer les taux du bareme
    let tauxJusqua10: number;
    let tauxAuDela10: number;
    try {
      const bareme = getBaremeActif("rupture_conventionnelle");
      const valeur = bareme.valeur as {
        tranches: Array<{ fraction_par_annee: number }>;
      };
      tauxJusqua10 = valeur.tranches[0]?.fraction_par_annee ?? 0.25;
      tauxAuDela10 = valeur.tranches[1]?.fraction_par_annee ?? 1 / 3;
    } catch {
      // Fallback sur les taux legaux standard
      tauxJusqua10 = 0.25;
      tauxAuDela10 = 1 / 3;
    }

    try {
      const result = calculerIndemniteRuptureConventionnelle({
        salaireBrutMensuelMoyen: salaire,
        ancienneteAnnees: annees,
        ancienneteMois: mois,
        tauxParAnneeJusqua10ans: tauxJusqua10,
        tauxParAnneeAuDela10ans: tauxAuDela10,
      });

      setState({ result, error: null, warning });
    } catch (err) {
      if (err instanceof Error && err.message.startsWith("ANCIENNETE_INSUFFISANTE")) {
        setState({
          result: null,
          error: null,
          warning:
            "Le calcul legal s'applique a partir de 8 mois d'anciennete. " +
            "Pour une anciennete inferieure, les regles peuvent differer selon votre contrat.",
        });
      } else {
        setState({
          result: null,
          error: "Veuillez verifier les valeurs saisies.",
          warning: null,
        });
      }
    }
  }, []);

  const reset = useCallback(() => {
    setState({ result: null, error: null, warning: null });
  }, []);

  return { ...state, calculate, reset };
}
