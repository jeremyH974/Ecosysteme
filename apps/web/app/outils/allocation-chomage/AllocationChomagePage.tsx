"use client";

import { useEffect, useState, useCallback } from "react";
import { ToolLayout, TrustFooter, FAQ } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { calculerAllocationChomage } from "@ecosysteme/core/salary";
import type { AllocationChomageOutput } from "@ecosysteme/core/salary";
import { ToolRecommendations } from "../../lib/ToolRecommendations";
import { ExportPDFButton } from "../../lib/ExportPDFButton";
import { FAQ_CHOMAGE } from "../../lib/faq-data";

function fmt(n: number): string {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

function fmtPct(n: number): string {
  return (n * 100).toFixed(1) + "%";
}

export function AllocationChomagePage() {
  const [salaireBrut, setSalaireBrut] = useState("");
  const [anciennete, setAnciennete] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState<AllocationChomageOutput | null>(null);

  useEffect(() => {
    track({ name: "tool_start", props: { tool: "allocation-chomage" } });
  }, []);

  const calculate = useCallback(() => {
    const s = parseFloat(salaireBrut);
    const a = parseInt(anciennete, 10);
    const ag = parseInt(age, 10);
    if (!salaireBrut || isNaN(s) || s <= 0 || !anciennete || isNaN(a) || a < 0 || !age || isNaN(ag) || ag < 16) {
      setResult(null);
      return;
    }

    try {
      const r = calculerAllocationChomage({
        salaireBrutMensuelMoyen: s,
        ancienneteJours: a,
        age: ag,
        tauxJournalier57: 0.57,
        tauxJournalier405: 0.405,
        partFixeJournaliere: 12.95,
        plancher: 31.59,
        plafond: 274.80,
      });
      setResult(r);
      track({ name: "tool_complete", props: { tool: "allocation-chomage", completion_pct: 100 } });
    } catch {
      setResult(null);
    }
  }, [salaireBrut, anciennete, age]);

  useEffect(() => {
    const timer = setTimeout(calculate, 200);
    return () => clearTimeout(timer);
  }, [calculate]);

  return (
    <ToolLayout
      title="Simulateur allocations chomage (ARE)"
      description="Estimez votre allocation chomage en fonction de votre salaire, anciennete et age"
      footer={
        <TrustFooter
          baremeNom="Regles ARE — France Travail 2024"
          dateBareme="1er juillet 2024"
          sources={[{ label: "France Travail — Calcul de l'allocation ARE", url: "https://www.francetravail.fr/candidat/mes-droits-aux-aides-et-allegements/a-chaque-situation-son-allocatio/quelle-est-ma-situation-professi/allocation-d-aide-au-retour-a-l-.html" }]}
          verifieLe="15 janvier 2024"
          casCouverts="les salaries du secteur prive involontairement prives d'emploi (licenciement, rupture conventionnelle, fin de CDD)"
          casNonCouverts="les demissions (sauf legitimes), les fonctionnaires, les independants"
        />
      }
    >
      {/* Saisie */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Salaire brut mensuel moyen
          </label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              placeholder="Ex: 2 500"
              value={salaireBrut}
              onChange={(e) => setSalaireBrut(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface-card px-3 py-2.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              min={0}
              step="any"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">EUR</span>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Jours travailles (24 mois)
          </label>
          <input
            type="number"
            inputMode="numeric"
            placeholder="Ex: 450"
            value={anciennete}
            onChange={(e) => setAnciennete(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface-card px-3 py-2.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            min={0}
          />
          <p className="mt-1 text-[10px] text-muted">Nombre de jours travailles sur les 24 derniers mois</p>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Age
          </label>
          <input
            type="number"
            inputMode="numeric"
            placeholder="Ex: 35"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface-card px-3 py-2.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            min={16}
            max={67}
          />
        </div>
      </div>

      {/* Resultat */}
      {result && (
        <div className="mt-8 space-y-6">
          {!result.eligible ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center">
              <p className="text-sm font-semibold text-red-700">Non eligible</p>
              <p className="mt-1 text-sm text-red-600">{result.motifNonEligible}</p>
            </div>
          ) : (
            <>
              {/* Montant principal */}
              <div className="rounded-xl border border-border bg-surface-card p-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Allocation mensuelle estimee</p>
                <p className="mt-2 text-3xl font-extrabold text-primary sm:text-4xl">
                  {fmt(result.allocationMensuelle)} EUR
                </p>
                <p className="mt-1 text-sm text-muted">
                  soit {fmt(result.allocationJournaliere)} EUR / jour pendant {result.dureeMaxMois} mois max
                </p>
              </div>

              {/* Indicateurs */}
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-surface-card p-4 text-center">
                  <p className="text-[10px] font-medium text-muted">Taux de remplacement</p>
                  <p className="mt-1 text-xl font-bold text-foreground">{fmtPct(result.tauxRemplacement)}</p>
                  <p className="mt-0.5 text-[10px] text-muted">du salaire net approx.</p>
                </div>
                <div className="rounded-xl border border-border bg-surface-card p-4 text-center">
                  <p className="text-[10px] font-medium text-muted">Duree maximale</p>
                  <p className="mt-1 text-xl font-bold text-foreground">{result.dureeMaxMois} mois</p>
                  <p className="mt-0.5 text-[10px] text-muted">{result.dureeMaxJours} jours</p>
                </div>
                <div className="rounded-xl border border-border bg-surface-card p-4 text-center">
                  <p className="text-[10px] font-medium text-muted">Methode retenue</p>
                  <p className="mt-1 text-sm font-bold text-foreground">{result.detail.methodeRetenue}</p>
                </div>
              </div>

              {/* Detail calcul */}
              <div className="overflow-hidden rounded-xl border border-border bg-surface-card shadow-sm">
                <div className="border-b border-border/60 bg-primary-light px-5 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">Detail du calcul</p>
                </div>
                <div className="divide-y divide-border/40 text-sm">
                  <div className="flex justify-between px-5 py-2.5">
                    <span className="text-muted">Salaire Journalier de Reference (SJR)</span>
                    <span className="font-semibold text-foreground">{fmt(result.detail.salaireJournalierReference)} EUR</span>
                  </div>
                  <div className="flex justify-between px-5 py-2.5">
                    <span className="text-muted">Methode 1 (40,4% SJR + 12,95 EUR)</span>
                    <span className="font-semibold text-foreground">{fmt(result.detail.methode1)} EUR/j</span>
                  </div>
                  <div className="flex justify-between px-5 py-2.5">
                    <span className="text-muted">Methode 2 (57% SJR)</span>
                    <span className="font-semibold text-foreground">{fmt(result.detail.methode2)} EUR/j</span>
                  </div>
                  <div className="flex justify-between px-5 py-2.5 bg-surface">
                    <span className="font-medium text-foreground">Allocation journaliere retenue</span>
                    <span className="font-bold text-primary">{fmt(result.allocationJournaliere)} EUR/j</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <ExportPDFButton toolSlug="allocation-chomage" templateData={{
                  title: "Simulation allocation chomage (ARE)", toolName: "Allocations chomage",
                  generatedAt: new Date().toLocaleDateString("fr-FR"),
                  sections: [{ heading: "Resultat", rows: [
                    { label: "Allocation journaliere", value: `${fmt(result.allocationJournaliere)} EUR` },
                    { label: "Allocation mensuelle", value: `${fmt(result.allocationMensuelle)} EUR` },
                    { label: "Duree maximale", value: `${result.dureeMaxMois} mois (${result.dureeMaxJours} jours)` },
                    { label: "Taux de remplacement", value: fmtPct(result.tauxRemplacement) },
                    { label: "SJR", value: `${fmt(result.detail.salaireJournalierReference)} EUR` },
                    { label: "Methode retenue", value: result.detail.methodeRetenue },
                  ]}],
                  sources: [{ label: "France Travail — Allocation ARE", url: "https://www.francetravail.fr" }],
                  disclaimer: "Resultats indicatifs. Le montant reel peut varier selon votre situation individuelle.",
                }} />
              </div>

              <ToolRecommendations currentToolSlug="allocation-chomage" />
            </>
          )}
        </div>
      )}

      <FAQ items={FAQ_CHOMAGE} />
    </ToolLayout>
  );
}
