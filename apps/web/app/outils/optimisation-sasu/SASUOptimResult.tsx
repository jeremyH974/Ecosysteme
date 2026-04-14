"use client";

import type { SASUOptimOutput, ScenarioComparatif } from "@ecosysteme/core/fiscal";
import { track } from "@ecosysteme/analytics";
import { ExportPDFButton } from "../../lib/ExportPDFButton";

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
    <tr className={highlight ? "bg-primary-light font-medium" : ""}>
      <td className="px-3 py-2 text-sm">{scenario.label}</td>
      <td className="px-3 py-2 text-right text-sm">{formatEuros(scenario.salaireBrut)} EUR</td>
      <td className="px-3 py-2 text-right text-sm">{formatEuros(scenario.dividendesBruts)} EUR</td>
      <td className="px-3 py-2 text-right text-sm">{formatEuros(scenario.montantIS)} EUR</td>
      <td className="px-3 py-2 text-right text-sm">{formatEuros(scenario.montantIR)} EUR</td>
      <td className={`px-3 py-2 text-right text-sm font-bold ${highlight ? "text-primary" : ""}`}>
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
      <div className="rounded-lg border border-border bg-surface-card p-6 shadow-sm">
        <p className="text-sm font-medium text-muted">Revenu net optimise</p>
        <p className="mt-2 text-4xl font-bold tracking-tight text-foreground">
          {formatEuros(o.netTotal)} <span className="text-lg text-muted">EUR / an</span>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-foreground">
          La repartition optimale pour votre SASU est de{" "}
          <strong>{formatEuros(o.salaireBrut)} EUR</strong> de salaire brut annuel et{" "}
          <strong>{formatEuros(o.dividendesBruts)} EUR</strong> de dividendes.
          {result.gainOptimisation > 100 && (
            <> Cela vous fait gagner <strong>{formatEuros(result.gainOptimisation)} EUR</strong> par rapport au scenario le moins favorable.</>
          )}
        </p>
      </div>

      {/* Tableau comparatif */}
      <div className="rounded-lg border border-border bg-surface-card shadow-sm">
        <div
          className="border-b border-border px-4 py-3"
          onClick={() => track({ name: "detail_expanded", props: { tool: "sasu-optim" } })}
        >
          <h3 className="text-sm font-semibold text-foreground">Comparaison des scenarios</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border/50 text-xs text-muted">
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
      <div className="rounded-lg border border-border bg-surface-card p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-foreground">Detail du scenario optimal</h3>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <span className="text-muted">Salaire brut president</span>
          <span className="text-right font-medium">{formatEuros(o.salaireBrut)} EUR</span>

          <span className="text-muted">Cotisations salariales</span>
          <span className="text-right font-medium">-{formatEuros(o.salaireBrut - o.salaireNet)} EUR</span>

          <span className="text-muted">Salaire net</span>
          <span className="text-right font-medium">{formatEuros(o.salaireNet)} EUR</span>

          <span className="col-span-2 border-t border-border/50 pt-2" />

          <span className="text-muted">Benefice imposable (apres remuneration)</span>
          <span className="text-right font-medium">{formatEuros(o.beneficeApresRemuneration)} EUR</span>

          <span className="text-muted">Impot sur les societes (IS)</span>
          <span className="text-right font-medium">-{formatEuros(o.montantIS)} EUR</span>

          <span className="text-muted">Dividendes distribuables</span>
          <span className="text-right font-medium">{formatEuros(o.dividendesBruts)} EUR</span>

          <span className="text-muted">PFU (flat tax 30%)</span>
          <span className="text-right font-medium">-{formatEuros(o.montantPFU)} EUR</span>

          <span className="text-muted">Dividendes nets</span>
          <span className="text-right font-medium">{formatEuros(o.dividendesNets)} EUR</span>

          <span className="col-span-2 border-t border-border/50 pt-2" />

          <span className="text-muted">Impot sur le revenu (IR)</span>
          <span className="text-right font-medium">-{formatEuros(o.montantIR)} EUR</span>

          <span className="border-t border-border pt-2 font-semibold text-primary">
            Revenu net total
          </span>
          <span className="border-t border-border pt-2 text-right font-bold text-primary">
            {formatEuros(o.netTotal)} EUR
          </span>
        </div>
      </div>

      <div className="mt-4">
        <ExportPDFButton toolSlug="optimisation-sasu" templateData={{
          title: "Optimisation remuneration SASU", toolName: "Optimisation SASU",
          generatedAt: new Date().toLocaleDateString("fr-FR"),
          sections: [
            { heading: "Repartition optimale", rows: [
              { label: "Salaire brut president", value: `${formatEuros(o.salaireBrut)} EUR` },
              { label: "Salaire net", value: `${formatEuros(o.salaireNet)} EUR` },
              { label: "Dividendes bruts", value: `${formatEuros(o.dividendesBruts)} EUR` },
              { label: "Dividendes nets (apres PFU)", value: `${formatEuros(o.dividendesNets)} EUR` },
            ]},
            { heading: "Fiscalite", rows: [
              { label: "Impot sur les societes (IS)", value: `${formatEuros(o.montantIS)} EUR` },
              { label: "PFU sur dividendes", value: `${formatEuros(o.montantPFU)} EUR` },
              { label: "Impot sur le revenu (IR)", value: `${formatEuros(o.montantIR)} EUR` },
              { label: "Revenu net total optimise", value: `${formatEuros(o.netTotal)} EUR` },
            ]},
          ],
          sources: [
            { label: "Service-Public.fr — Bareme IR", url: "https://www.service-public.fr/particuliers/vosdroits/F1419" },
            { label: "Service-Public — IS", url: "https://entreprendre.service-public.fr/vosdroits/F23575" },
          ],
          disclaimer: "Les resultats sont fournis a titre indicatif. Consultez un expert-comptable pour toute decision.",
        }} />
      </div>
    </div>
  );
}
