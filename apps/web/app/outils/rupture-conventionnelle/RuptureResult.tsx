"use client";

import { ResultCard } from "@ecosysteme/ui";
import type { RuptureOutput } from "@ecosysteme/core/salary";
import { track } from "@ecosysteme/analytics";
import { ExportPDFButton } from "../../lib/ExportPDFButton";

interface RuptureResultProps {
  result: RuptureOutput;
  conventionCollective?: string;
}

function formatEuros(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatAnciennete(annees: number): string {
  const ans = Math.floor(annees);
  const mois = Math.round((annees - ans) * 12);
  const parts: string[] = [];
  if (ans > 0) parts.push(`${String(ans)} an${ans > 1 ? "s" : ""}`);
  if (mois > 0) parts.push(`${String(mois)} mois`);
  return parts.join(" et ") || "0 mois";
}

export function RuptureResult({ result, conventionCollective }: RuptureResultProps) {
  const detail = result.detail;

  return (
    <div className="space-y-6">
      <ResultCard
        label="Votre indemnite minimale legale de rupture conventionnelle"
        value={formatEuros(result.montantMinimalLegal)}
        unit="EUR"
        interpretation="Votre employeur ne peut pas vous proposer legalement moins que ce montant. Vous avez 15 jours calendaires pour vous retracter apres la signature."
        detail={
          <div
            className="space-y-2"
            onClick={() => track({ name: "detail_expanded", props: { tool: "rupture-calc" } })}
          >
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <span className="text-gray-500">Salaire de reference retenu</span>
              <span className="text-right font-medium">{formatEuros(detail.baseCalcul)} EUR/mois</span>

              <span className="text-gray-500">Anciennete prise en compte</span>
              <span className="text-right font-medium">
                {formatAnciennete(detail.ancienneteTotaleEnAnnees)}
              </span>

              {detail.montantPremierTranche > 0 && (
                <>
                  <span className="text-gray-500">Tranche 1 (jusqu&apos;a 10 ans)</span>
                  <span className="text-right font-medium">
                    {formatEuros(detail.montantPremierTranche)} EUR
                  </span>
                </>
              )}

              {detail.montantDeuxiemeTranche > 0 && (
                <>
                  <span className="text-gray-500">Tranche 2 (au-dela de 10 ans)</span>
                  <span className="text-right font-medium">
                    {formatEuros(detail.montantDeuxiemeTranche)} EUR
                  </span>
                </>
              )}

              <span className="border-t border-gray-200 pt-1 font-medium text-gray-900">
                Total minimum legal
              </span>
              <span className="border-t border-gray-200 pt-1 text-right font-bold text-gray-900">
                {formatEuros(result.montantMinimalLegal)} EUR
              </span>
            </div>
          </div>
        }
      />

      <ExportPDFButton
        toolSlug="rupture-conventionnelle"
        templateData={{
          title: "Calcul indemnite rupture conventionnelle",
          toolName: "Rupture conventionnelle",
          generatedAt: new Date().toLocaleDateString("fr-FR"),
          sections: [
            {
              heading: "Resultat",
              rows: [
                { label: "Salaire de reference", value: `${formatEuros(detail.baseCalcul)} EUR/mois` },
                { label: "Anciennete", value: formatAnciennete(detail.ancienneteTotaleEnAnnees) },
                { label: "Tranche 1 (jusqu'a 10 ans)", value: `${formatEuros(detail.montantPremierTranche)} EUR` },
                { label: "Tranche 2 (au-dela de 10 ans)", value: `${formatEuros(detail.montantDeuxiemeTranche)} EUR` },
                { label: "Indemnite minimale legale", value: `${formatEuros(result.montantMinimalLegal)} EUR` },
              ],
            },
          ],
          sources: [{ label: "Code du travail — Art. L1237-19-1", url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036761986" }],
          disclaimer: "Les resultats sont fournis a titre indicatif. Consultez un professionnel pour toute decision.",
        }}
      />

      {!conventionCollective && (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800">
            Votre convention collective peut prevoir une indemnite superieure a ce minimum legal.
            Verifiez sur votre bulletin de paie ou contactez votre delegue syndical.
          </p>
        </div>
      )}
    </div>
  );
}
