"use client";

import { useEffect, useState, useCallback } from "react";
import { ToolLayout, TrustFooter, FAQ } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { calculerNiveauRichesse } from "@ecosysteme/core/salary";
import type { NiveauRichesseOutput } from "@ecosysteme/core/salary";
import { ToolRecommendations } from "../../lib/ToolRecommendations";
import { ExportPDFButton } from "../../lib/ExportPDFButton";
import { FAQ_RICHESSE } from "../../lib/faq-data";

const STATS = {
  smicNet: 1427,
  salaireMoyen: 2735,
  salaireMedian: 2183,
  seuilPauvrete: 1158,
  seuil10PctSuperieurs: 4000,
  seuil1PctSuperieurs: 8000,
};

function fmt(n: number): string {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
}

function fmtRatio(n: number): string {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

function fmtPct(n: number): string {
  return (n * 100).toFixed(0) + "%";
}

const NIVEAU_COLORS: Record<string, string> = {
  sous_seuil_pauvrete: "text-red-600",
  modeste: "text-orange-500",
  median: "text-yellow-600",
  aise: "text-blue-500",
  top_10: "text-primary",
  top_1: "text-purple-600",
};

export function NiveauRichessePage() {
  const [salaire, setSalaire] = useState("");
  const [result, setResult] = useState<NiveauRichesseOutput | null>(null);

  useEffect(() => {
    track({ name: "tool_start", props: { tool: "niveau-richesse" } });
  }, []);

  const calculate = useCallback(() => {
    const val = parseFloat(salaire);
    if (!salaire || isNaN(val) || val < 0) { setResult(null); return; }

    try {
      const r = calculerNiveauRichesse({ salaireNetMensuel: val, ...STATS });
      setResult(r);
      track({ name: "tool_complete", props: { tool: "niveau-richesse", completion_pct: 100 } });
    } catch {
      setResult(null);
    }
  }, [salaire]);

  useEffect(() => {
    const timer = setTimeout(calculate, 200);
    return () => clearTimeout(timer);
  }, [calculate]);

  return (
    <ToolLayout
      title="Niveau de richesse — Ou vous situez-vous ?"
      description="Comparez votre salaire net mensuel aux statistiques nationales INSEE"
      footer={
        <TrustFooter
          baremeNom="Statistiques salariales INSEE 2024"
          dateBareme="2024"
          sources={[{ label: "INSEE — Salaires dans le secteur prive", url: "https://www.insee.fr/fr/statistiques/6436313" }]}
          verifieLe="15 janvier 2024"
          casCouverts="les salaries du secteur prive et public, tous niveaux de revenus"
          casNonCouverts="les revenus du patrimoine, les prestations sociales, les revenus mixtes (independants)"
        />
      }
    >
      {/* Saisie */}
      <div className="mx-auto max-w-md">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
          Votre salaire net mensuel
        </label>
        <div className="relative">
          <input
            type="number"
            inputMode="decimal"
            placeholder="Ex: 2 500"
            value={salaire}
            onChange={(e) => setSalaire(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface-card px-3 py-3 text-lg text-foreground shadow-sm transition-colors placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            min={0}
            step="any"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">EUR / mois</span>
        </div>
      </div>

      {/* Resultat */}
      {result && (
        <div className="mt-8 space-y-6">
          {/* Niveau */}
          <div className="rounded-xl border border-border bg-surface-card p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Votre niveau</p>
            <p className={`mt-2 text-2xl font-extrabold sm:text-3xl ${NIVEAU_COLORS[result.niveau] ?? "text-foreground"}`}>
              {result.niveauLabel}
            </p>
            <p className="mt-1 text-sm text-muted">
              Vous etes au-dessus d&apos;environ {result.percentile}% des salaries francais
            </p>
          </div>

          {/* Jauge visuelle */}
          <div className="rounded-xl border border-border bg-surface-card p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Position sur l&apos;echelle des salaires</p>
            <div className="relative h-4 w-full rounded-full bg-gradient-to-r from-red-200 via-yellow-200 via-blue-200 to-purple-200">
              <div
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${Math.min(result.percentile, 100)}%` }}
              >
                <div className="h-6 w-6 rounded-full border-2 border-white bg-primary shadow-md" />
              </div>
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-muted">
              <span>Seuil pauvrete</span>
              <span>Median</span>
              <span>Moyen</span>
              <span>Top 10%</span>
              <span>Top 1%</span>
            </div>
          </div>

          {/* Comparaisons */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "vs SMIC", ratio: result.comparaisons.vsSmic, ref: `${fmt(STATS.smicNet)} EUR` },
              { label: "vs Moyen", ratio: result.comparaisons.vsMoyen, ref: `${fmt(STATS.salaireMoyen)} EUR` },
              { label: "vs Median", ratio: result.comparaisons.vsMedian, ref: `${fmt(STATS.salaireMedian)} EUR` },
              { label: "vs Seuil pauvrete", ratio: result.comparaisons.vsSeuilPauvrete, ref: `${fmt(STATS.seuilPauvrete)} EUR` },
            ].map((c) => (
              <div key={c.label} className="rounded-xl border border-border bg-surface-card p-4 text-center">
                <p className="text-[10px] font-medium text-muted">{c.label}</p>
                <p className="mt-1 text-xl font-bold text-foreground">{fmtRatio(c.ratio)}x</p>
                <p className="mt-0.5 text-[10px] text-muted">ref: {c.ref}</p>
              </div>
            ))}
          </div>

          {/* Detail */}
          <div className="overflow-hidden rounded-xl border border-border bg-surface-card shadow-sm">
            <div className="border-b border-border/60 bg-primary-light px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Detail</p>
            </div>
            <div className="divide-y divide-border/40 text-sm">
              <div className="flex justify-between px-5 py-2.5">
                <span className="text-muted">Salaire net mensuel</span>
                <span className="font-semibold text-foreground">{fmt(result.detail.salaireNetMensuel)} EUR</span>
              </div>
              <div className="flex justify-between px-5 py-2.5">
                <span className="text-muted">Salaire net annuel</span>
                <span className="font-semibold text-foreground">{fmt(result.detail.salaireNetAnnuel)} EUR</span>
              </div>
              <div className="flex justify-between px-5 py-2.5">
                <span className="text-muted">Ratio vs salaire moyen</span>
                <span className="font-semibold text-foreground">{fmtPct(result.comparaisons.vsMoyen)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <ExportPDFButton toolSlug="niveau-richesse" templateData={{
              title: "Niveau de richesse", toolName: "Niveau de richesse",
              generatedAt: new Date().toLocaleDateString("fr-FR"),
              sections: [{ heading: "Resultat", rows: [
                { label: "Salaire net mensuel", value: `${fmt(result.detail.salaireNetMensuel)} EUR` },
                { label: "Niveau", value: result.niveauLabel },
                { label: "Percentile", value: `Top ${100 - result.percentile}%` },
                { label: "Ratio vs SMIC", value: `${fmtRatio(result.comparaisons.vsSmic)}x` },
                { label: "Ratio vs moyen", value: `${fmtRatio(result.comparaisons.vsMoyen)}x` },
                { label: "Ratio vs median", value: `${fmtRatio(result.comparaisons.vsMedian)}x` },
              ]}],
              sources: [{ label: "INSEE — Statistiques salariales", url: "https://www.insee.fr/fr/statistiques/6436313" }],
              disclaimer: "Resultats indicatifs bases sur les statistiques INSEE 2024.",
            }} />
          </div>

          <ToolRecommendations currentToolSlug="niveau-richesse" />
        </div>
      )}

      <FAQ items={FAQ_RICHESSE} />
    </ToolLayout>
  );
}
