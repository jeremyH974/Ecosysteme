"use client";

import { ResultCard } from "@ecosysteme/ui";
import type { RevisionLoyerOutput } from "@ecosysteme/core/property";
import { track } from "@ecosysteme/analytics";
import { ExportPDFButton } from "../../lib/ExportPDFButton";

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
    <>
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
            <span className="text-muted">Loyer actuel</span>
            <span className="text-right font-medium">{formatEuros(d.loyerActuel)} EUR</span>

            <span className="text-muted">IRL de reference (ancien)</span>
            <span className="text-right font-medium">{d.irlAncien.toFixed(2)}</span>

            <span className="text-muted">IRL actuel (nouveau)</span>
            <span className="text-right font-medium">{d.irlNouveau.toFixed(2)}</span>

            <span className="text-muted">Variation IRL</span>
            <span className="text-right font-medium">
              {result.augmentationPourcentage >= 0 ? "+" : ""}
              {result.augmentationPourcentage.toFixed(2)}%
            </span>

            <span className="col-span-2 border-t border-border pt-2 text-xs text-muted-light">
              Formule : {formatEuros(d.loyerActuel)} x ({d.irlNouveau.toFixed(2)} /{" "}
              {d.irlAncien.toFixed(2)}) = {formatEuros(result.nouveauLoyer)} EUR
            </span>
          </div>
        </div>
      }
    />
    <div className="mt-4">
      <ExportPDFButton toolSlug="revision-loyer" templateData={{
        title: "Revision de loyer (IRL)", toolName: "Revision loyer",
        generatedAt: new Date().toLocaleDateString("fr-FR"),
        sections: [{ heading: "Resultat", rows: [
          { label: "Loyer actuel", value: `${formatEuros(d.loyerActuel)} EUR` },
          { label: "IRL ancien", value: d.irlAncien.toFixed(2) },
          { label: "IRL nouveau", value: d.irlNouveau.toFixed(2) },
          { label: "Variation", value: `${result.augmentationPourcentage >= 0 ? "+" : ""}${result.augmentationPourcentage.toFixed(2)}%` },
          { label: "Nouveau loyer", value: `${formatEuros(result.nouveauLoyer)} EUR` },
          { label: "Augmentation mensuelle", value: `${result.augmentationMontant >= 0 ? "+" : ""}${formatEuros(result.augmentationMontant)} EUR` },
        ]}],
        sources: [{ label: "INSEE — IRL", url: "https://www.insee.fr/fr/statistiques/serie/001515333" }],
        disclaimer: "Les resultats sont fournis a titre indicatif.",
      }} />
    </div>
    </>
  );
}
