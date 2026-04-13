"use client";

import type { SASUOptimOutput, ScenarioComparatif } from "@ecosysteme/core/fiscal";
import { track } from "@ecosysteme/analytics";

interface SASUOptimResultProps {
  result: SASUOptimOutput;
}

function formatEuros(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

function ScenarioRow({ scenario, highlight }: { scenario: ScenarioComparatif; highlight?: boolean }) {
  return (
    <tr className={highlight ? "bg-emerald-50 font-medium" : ""}>
      <td className="px-3 py-2 text-sm">{scenario.label}</td>
      <td className="px-3 py-2 text-right text-sm">{formatEuros(scenario.salaireBrut)} EUR</td>
      <td className="px-3 py-2 text-right text-sm">{formatEuros(scenario.dividendesBruts)} EUR</td>
      <td className="px-3 py-2 text-right text-sm">{formatEuros(scenario.montantIS)} EUR</td>
      <td className="px-3 py-2 text-right text-sm">{formatEuros(scenario.montantIR)} EUR</td>
      <td className={`px-3 py-2 text-right text-sm font-bold ${highlight ? "text-emerald-700" : ""}`}>
        {formatEuros(scenario.netTotal)} EUR
      </td>
    </tr>
  );
}

export function SASUOptimResult({ result }: SASUOptimResultProps) {
  const o = result.optimal;

  return (
    <div className="space-y-6">
      {/* Resultat principal */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Revenu net optimise</p>
        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
          {formatEuros(o.netTotal)} <span className="text-lg text-gray-500">EUR / an</span>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          La repartition optimale pour votre SASU est de{" "}
          <strong>{formatEuros(o.salaireBrut)} EUR</strong> de salaire brut annuel et{" "}
          <strong>{formatEuros(o.dividendesBruts)} EUR</strong> de dividendes.
          {result.gainOptimisation > 100 && (
            <> Cela vous fait gagner <strong>{formatEuros(result.gainOptimisation)} EUR</strong> par rapport au scenario le moins favorable.</>
          )}
        </p>
      </div>

      {/* Tableau comparatif */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div
          className="border-b border-gray-200 px-4 py-3"
          onClick={() => track({ name: "detail_expanded", props: { tool: "sasu-optim" } })}
        >
          <h3 className="text-sm font-semibold text-gray-900">Comparaison des scenarios</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-500">
                <th className="px-3 py-2">Scenario</th>
                <th className="px-3 py-2 text-right">Salaire brut</th>
                <th className="px-3 py-2 text-right">Dividendes</th>
                <th className="px-3 py-2 text-right">IS</th>
                <th className="px-3 py-2 text-right">IR</th>
                <th className="px-3 py-2 text-right">Net total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <ScenarioRow scenario={result.optimal} highlight />
              <ScenarioRow scenario={result.scenario100Salaire} />
              <ScenarioRow scenario={result.scenario100Dividendes} />
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail du scenario optimal */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900">Detail du scenario optimal</h3>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <span className="text-gray-500">Salaire brut president</span>
          <span className="text-right font-medium">{formatEuros(o.salaireBrut)} EUR</span>

          <span className="text-gray-500">Cotisations salariales</span>
          <span className="text-right font-medium">-{formatEuros(o.salaireBrut - o.salaireNet)} EUR</span>

          <span className="text-gray-500">Salaire net</span>
          <span className="text-right font-medium">{formatEuros(o.salaireNet)} EUR</span>

          <span className="col-span-2 border-t border-gray-100 pt-2" />

          <span className="text-gray-500">Benefice imposable (apres remuneration)</span>
          <span className="text-right font-medium">{formatEuros(o.beneficeApresRemuneration)} EUR</span>

          <span className="text-gray-500">Impot sur les societes (IS)</span>
          <span className="text-right font-medium">-{formatEuros(o.montantIS)} EUR</span>

          <span className="text-gray-500">Dividendes distribuables</span>
          <span className="text-right font-medium">{formatEuros(o.dividendesBruts)} EUR</span>

          <span className="text-gray-500">PFU (flat tax 30%)</span>
          <span className="text-right font-medium">-{formatEuros(o.montantPFU)} EUR</span>

          <span className="text-gray-500">Dividendes nets</span>
          <span className="text-right font-medium">{formatEuros(o.dividendesNets)} EUR</span>

          <span className="col-span-2 border-t border-gray-100 pt-2" />

          <span className="text-gray-500">Impot sur le revenu (IR)</span>
          <span className="text-right font-medium">-{formatEuros(o.montantIR)} EUR</span>

          <span className="border-t border-gray-200 pt-2 font-semibold text-emerald-700">
            Revenu net total
          </span>
          <span className="border-t border-gray-200 pt-2 text-right font-bold text-emerald-700">
            {formatEuros(o.netTotal)} EUR
          </span>
        </div>
      </div>
    </div>
  );
}
