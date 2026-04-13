"use client";

import { ResultCard } from "@ecosysteme/ui";
import type { RevisionLoyerOutput } from "@ecosysteme/core/property";
import { track } from "@ecosysteme/analytics";

interface RevisionLoyerResultProps {
  result: RevisionLoyerOutput;
}

function formatEuros(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function RevisionLoyerResult({ result }: RevisionLoyerResultProps) {
  const d = result.detail;
  const hausse = result.augmentationMontant >= 0;

  return (
    <ResultCard
      label="Nouveau loyer apres revision"
      value={formatEuros(result.nouveauLoyer)}
      unit="EUR / mois"
      interpretation={
        hausse
          ? `Votre loyer ${result.augmentationMontant > 0 ? "augmente" : "reste inchange"} de ${formatEuros(Math.abs(result.augmentationMontant))} EUR par mois (${result.augmentationPourcentage >= 0 ? "+" : ""}${result.augmentationPourcentage.toFixed(2)}%). Votre bailleur doit vous notifier cette revision par courrier.`
          : `Votre loyer diminue de ${formatEuros(Math.abs(result.augmentationMontant))} EUR par mois (${result.augmentationPourcentage.toFixed(2)}%). L'IRL a baisse sur la periode.`
      }
      detail={
        <div
          className="space-y-2"
          onClick={() => track({ name: "detail_expanded", props: { tool: "revision-loyer" } })}
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
            <span className="text-gray-500">Loyer actuel</span>
            <span className="text-right font-medium">{formatEuros(d.loyerActuel)} EUR</span>

            <span className="text-gray-500">IRL de reference (ancien)</span>
            <span className="text-right font-medium">{d.irlAncien.toFixed(2)}</span>

            <span className="text-gray-500">IRL actuel (nouveau)</span>
            <span className="text-right font-medium">{d.irlNouveau.toFixed(2)}</span>

            <span className="text-gray-500">Variation IRL</span>
            <span className="text-right font-medium">
              {result.augmentationPourcentage >= 0 ? "+" : ""}
              {result.augmentationPourcentage.toFixed(2)}%
            </span>

            <span className="col-span-2 border-t border-gray-200 pt-2 text-xs text-gray-400">
              Formule : {formatEuros(d.loyerActuel)} x ({d.irlNouveau.toFixed(2)} /{" "}
              {d.irlAncien.toFixed(2)}) = {formatEuros(result.nouveauLoyer)} EUR
            </span>
          </div>
        </div>
      }
    />
  );
}
