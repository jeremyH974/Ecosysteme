"use client";

import { useEffect, useState, useCallback } from "react";
import { ToolLayout, TrustFooter, FAQ } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { calculerRetraite } from "@ecosysteme/core/salary";
import type { RetraiteOutput } from "@ecosysteme/core/salary";
import { NextStepBlock } from "../../lib/NextStepBlock";
import { ExportPDFButton } from "../../lib/ExportPDFButton";
import { FAQ_RETRAITE } from "../../lib/faq-data";
import { RetraiteContent } from "./RetraiteContent";

function fmt(n: number): string {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
}

function fmt2(n: number): string {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

function fmtPct(n: number): string {
  return (n * 100).toFixed(1) + "%";
}

export function SimulateurRetraitePage() {
  const [salaire, setSalaire] = useState("");
  const [ageActuel, setAgeActuel] = useState("");
  const [ageDepart, setAgeDepart] = useState("64");
  const [trimestres, setTrimestres] = useState("");
  const [result, setResult] = useState<RetraiteOutput | null>(null);

  useEffect(() => {
    track({ name: "tool_start", props: { tool: "simulateur-retraite" } });
  }, []);

  const calculate = useCallback(() => {
    const s = parseFloat(salaire);
    const aa = parseInt(ageActuel, 10);
    const ad = parseInt(ageDepart, 10);
    const t = parseInt(trimestres, 10);
    if (!salaire || isNaN(s) || s <= 0 || !ageActuel || isNaN(aa) || aa < 18 || !trimestres || isNaN(t) || t < 0) {
      setResult(null);
      return;
    }

    try {
      const r = calculerRetraite({
        salaireNetMensuelActuel: s,
        ageActuel: aa,
        ageDepart: ad,
        trimestresValides: t,
        trimestresRequis: 172,
        tauxPlein: 0.50,
        decoteParTrimestre: 0.00625,
        surcoteParTrimestre: 0.0125,
        tauxComplementaire: 0.30,
      });
      setResult(r);
      track({ name: "tool_complete", props: { tool: "simulateur-retraite", completion_pct: 100 } });
    } catch {
      setResult(null);
    }
  }, [salaire, ageActuel, ageDepart, trimestres]);

  useEffect(() => {
    const timer = setTimeout(calculate, 200);
    return () => clearTimeout(timer);
  }, [calculate]);

  return (
    <ToolLayout
      title="Simulateur retraite — Estimez votre pension"
      description="Estimation indicative de votre future pension de retraite (base + complementaire AGIRC-ARRCO)"
      footer={
        <TrustFooter
          baremeNom="Reforme retraites 2023 — parametres 2024"
          dateBareme="1er septembre 2023"
          sources={[{ label: "Info-Retraite.fr — Estimation pension", url: "https://www.info-retraite.fr" }]}
          verifieLe="15 janvier 2024"
          casCouverts="les salaries du secteur prive, reforme 2023 (generation 1965+)"
          casNonCouverts="les fonctionnaires, les independants, les regimes speciaux, les carrieres longues. Le SAM est estime a partir du salaire actuel (pas des 25 meilleures annees reelles). Estimation a +/-20%. Consultez votre releve de carriere sur info-retraite.fr pour une simulation personnalisee"
        />
      }
    >
      {/* Saisie */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Salaire net mensuel actuel
          </label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              placeholder="Ex: 2 500"
              value={salaire}
              onChange={(e) => setSalaire(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface-card px-3 py-2.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              min={0}
              step="any"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">EUR</span>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Age actuel
          </label>
          <input
            type="number"
            inputMode="numeric"
            placeholder="Ex: 45"
            value={ageActuel}
            onChange={(e) => setAgeActuel(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface-card px-3 py-2.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            min={18}
            max={66}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Age de depart souhaite
          </label>
          <select
            value={ageDepart}
            onChange={(e) => setAgeDepart(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface-card px-3 py-2.5 text-sm text-foreground shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {Array.from({ length: 9 }, (_, i) => 62 + i).map((a) => (
              <option key={a} value={a}>{a} ans{a === 64 ? " (age legal)" : a === 67 ? " (taux plein auto)" : ""}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Trimestres valides
          </label>
          <input
            type="number"
            inputMode="numeric"
            placeholder="Ex: 120"
            value={trimestres}
            onChange={(e) => setTrimestres(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface-card px-3 py-2.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            min={0}
          />
        </div>
      </div>

      {/* Resultat */}
      {result && (
        <div className="mt-8 space-y-6">
          {/* Pension principale */}
          <div className="rounded-xl border border-border bg-surface-card p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Pension mensuelle estimee</p>
            <p className="mt-2 text-3xl font-extrabold text-primary sm:text-4xl">
              {fmt(result.pensionMensuelleEstimee)} EUR
            </p>
            <p className="mt-1 text-sm text-muted">
              Taux de remplacement : {fmtPct(result.tauxRemplacement)} de votre salaire net actuel
            </p>
          </div>

          {/* Decote / Surcote */}
          <div className={`rounded-xl border p-4 text-center ${
            result.trimestresManquants > 0
              ? "border-orange-200 bg-orange-50"
              : result.tauxApplique > 0.50
                ? "border-green-200 bg-green-50"
                : "border-primary/20 bg-primary-light"
          }`}>
            <p className={`text-sm font-semibold ${
              result.trimestresManquants > 0 ? "text-orange-700" : result.tauxApplique > 0.50 ? "text-green-700" : "text-primary"
            }`}>
              {result.decoteSurcote}
            </p>
            <p className="mt-0.5 text-xs text-muted">
              Taux applique : {fmtPct(result.tauxApplique)} (taux plein = 50%)
            </p>
          </div>

          {/* Indicateurs */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface-card p-4 text-center">
              <p className="text-[10px] font-medium text-muted">Pension de base</p>
              <p className="mt-1 text-xl font-bold text-foreground">{fmt(result.pensionBase)} EUR</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-card p-4 text-center">
              <p className="text-[10px] font-medium text-muted">Complementaire AGIRC-ARRCO</p>
              <p className="mt-1 text-xl font-bold text-foreground">{fmt(result.pensionComplementaire)} EUR</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-card p-4 text-center">
              <p className="text-[10px] font-medium text-muted">Trimestres projetes au depart</p>
              <p className="mt-1 text-xl font-bold text-foreground">{result.detail.trimestresProjetesAuDepart}</p>
              <p className="mt-0.5 text-[10px] text-muted">sur 172 requis</p>
            </div>
          </div>

          {/* Detail */}
          <div className="overflow-hidden rounded-xl border border-border bg-surface-card shadow-sm">
            <div className="border-b border-border/60 bg-primary-light px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Detail de l&apos;estimation</p>
            </div>
            <div className="divide-y divide-border/40 text-sm">
              <div className="flex justify-between px-5 py-2.5">
                <span className="text-muted">Salaire brut reconstitue (SAM approx.)</span>
                <span className="font-semibold text-foreground">{fmt2(result.detail.salaireBrutReconstitue)} EUR</span>
              </div>
              <div className="flex justify-between px-5 py-2.5">
                <span className="text-muted">Annees de cotisation projetees</span>
                <span className="font-semibold text-foreground">{fmt2(result.detail.anneesCotisees)} ans</span>
              </div>
              <div className="flex justify-between px-5 py-2.5">
                <span className="text-muted">Trimestres manquants</span>
                <span className="font-semibold text-foreground">{result.trimestresManquants}</span>
              </div>
              <div className="flex justify-between px-5 py-2.5">
                <span className="text-muted">Taux applique</span>
                <span className="font-semibold text-foreground">{fmtPct(result.tauxApplique)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <ExportPDFButton toolSlug="simulateur-retraite" templateData={{
              title: "Simulation retraite", toolName: "Simulateur retraite",
              generatedAt: new Date().toLocaleDateString("fr-FR"),
              sections: [{ heading: "Resultat", rows: [
                { label: "Pension mensuelle estimee", value: `${fmt(result.pensionMensuelleEstimee)} EUR` },
                { label: "Pension de base", value: `${fmt(result.pensionBase)} EUR` },
                { label: "Pension complementaire", value: `${fmt(result.pensionComplementaire)} EUR` },
                { label: "Taux de remplacement", value: fmtPct(result.tauxRemplacement) },
                { label: "Decote / Surcote", value: result.decoteSurcote },
                { label: "Trimestres projetes", value: `${result.detail.trimestresProjetesAuDepart} / 172` },
              ]}],
              sources: [{ label: "Info-Retraite.fr", url: "https://www.info-retraite.fr" }],
              disclaimer: "Estimation indicative. Le calcul reel depend de votre carriere complete et des revalorisations futures.",
            }} />
          </div>

          <NextStepBlock currentToolSlug="simulateur-retraite" />
        </div>
      )}

      <RetraiteContent />
      <FAQ items={FAQ_RETRAITE} />
    </ToolLayout>
  );
}
