"use client";

import { ResultCard } from "@ecosysteme/ui";
import type { BrutNetOutput } from "@ecosysteme/core/salary";
import { track } from "@ecosysteme/analytics";

interface SimuBrutNetResultProps {
  result: BrutNetOutput;
  salaireBrut: number;
}

function formatEuros(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatPct(value: number): string {
  return (value * 100).toFixed(1) + "%";
}

export function SimuBrutNetResult({ result, salaireBrut }: SimuBrutNetResultProps) {
  const d = result.detail;

  return (
    <ResultCard
      label="Votre salaire net avant impot sur le revenu"
      value={formatEuros(result.salaireNetAvantImpot)}
      unit="EUR"
      interpretation={`Sur votre salaire brut de ${formatEuros(salaireBrut)} EUR, ${formatEuros(result.totalCotisationsSalariales)} EUR de cotisations salariales sont prelevees (${formatPct(d.tauxGlobalCotisations)} du brut).`}
      detail={
        <div
          className="space-y-3"
          onClick={() => track({ name: "detail_expanded", props: { tool: "simu-brut-net" } })}
        >
          <h4 className="font-medium text-gray-700">Decomposition des cotisations</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
            <span className="text-gray-500">CSG + CRDS</span>
            <span className="text-right font-medium">{formatEuros(d.montantCsgCrds)} EUR</span>

            <span className="pl-3 text-xs text-gray-400">
              (base : {formatEuros(d.baseCsg)} EUR = 98,25% du brut)
            </span>
            <span />

            <span className="text-gray-500">Assurance vieillesse (plafonnee)</span>
            <span className="text-right font-medium">
              {formatEuros(d.montantVieillessePlafonnee)} EUR
            </span>

            <span className="text-gray-500">Assurance vieillesse (deplafonnee)</span>
            <span className="text-right font-medium">
              {formatEuros(d.montantVieillesseDeplafonnee)} EUR
            </span>

            <span className="text-gray-500">Retraite complementaire</span>
            <span className="text-right font-medium">
              {formatEuros(d.montantRetraiteComplementaire)} EUR
            </span>

            {d.montantApec > 0 && (
              <>
                <span className="text-gray-500">APEC (cadre)</span>
                <span className="text-right font-medium">{formatEuros(d.montantApec)} EUR</span>
              </>
            )}

            <span className="border-t border-gray-200 pt-1.5 font-medium text-gray-900">
              Total cotisations
            </span>
            <span className="border-t border-gray-200 pt-1.5 text-right font-bold text-gray-900">
              {formatEuros(result.totalCotisationsSalariales)} EUR
            </span>

            <span className="font-medium text-emerald-700">Salaire net</span>
            <span className="text-right font-bold text-emerald-700">
              {formatEuros(result.salaireNetAvantImpot)} EUR
            </span>
          </div>
        </div>
      }
    />
  );
}
