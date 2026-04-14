"use client";

import { useEffect, useState, useCallback } from "react";
import { ToolLayout, TrustFooter, FAQ } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { calculerCongesPayes } from "@ecosysteme/core/salary";
import type { CongesPayesOutput } from "@ecosysteme/core/salary";
import { ToolRecommendations } from "../../lib/ToolRecommendations";
import { ExportPDFButton } from "../../lib/ExportPDFButton";
import { FAQ_CONGES } from "../../lib/faq-data";
import { CongesPayesContent } from "./CongesPayesContent";

function fmt(n: number): string {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

export function CongesPayesPage() {
  const [salaireBrut, setSalaireBrut] = useState("");
  const [joursAcquis, setJoursAcquis] = useState("25");
  const [joursPris, setJoursPris] = useState("");
  const [result, setResult] = useState<CongesPayesOutput | null>(null);

  useEffect(() => {
    track({ name: "tool_start", props: { tool: "conges-payes" } });
  }, []);

  const calculate = useCallback(() => {
    const s = parseFloat(salaireBrut);
    const ja = parseInt(joursAcquis, 10);
    const jp = parseInt(joursPris, 10);
    if (!salaireBrut || isNaN(s) || s <= 0 || isNaN(ja) || ja < 0 || !joursPris || isNaN(jp) || jp < 0) {
      setResult(null);
      return;
    }

    try {
      const r = calculerCongesPayes({
        salaireBrutMensuel: s,
        joursAcquis: ja,
        joursPris: jp,
        methode: "maintien" as const,
      });
      setResult(r);
      track({ name: "tool_complete", props: { tool: "conges-payes", completion_pct: 100 } });
    } catch {
      setResult(null);
    }
  }, [salaireBrut, joursAcquis, joursPris]);

  useEffect(() => {
    const timer = setTimeout(calculate, 200);
    return () => clearTimeout(timer);
  }, [calculate]);

  return (
    <ToolLayout
      title="Calculateur conges payes"
      description="Calculez votre indemnite de conges payes et comparez les deux methodes legales"
      footer={
        <TrustFooter
          baremeNom="Conges payes — Art. L3141-1 et suivants du Code du travail"
          dateBareme="1er janvier 2026"
          sources={[{ label: "Code du travail — Art. L3141-24", url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033020675" }]}
          verifieLe="14 avril 2026"
          casCouverts="les salaries a temps plein en CDI ou CDD, avec un salaire brut mensuel fixe"
          casNonCouverts="les temps partiels (proratisation necessaire), les primes exceptionnelles, les heures supplementaires regulieres, les conventions collectives specifiques prevoyant des jours supplementaires"
        />
      }
    >
      {/* Saisie */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Salaire brut mensuel
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
            Jours acquis
          </label>
          <input
            type="number"
            inputMode="numeric"
            placeholder="25"
            value={joursAcquis}
            onChange={(e) => setJoursAcquis(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface-card px-3 py-2.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            min={0}
            max={30}
          />
          <p className="mt-1 text-[10px] text-muted">Jours ouvres (25 = 5 semaines)</p>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Jours pris
          </label>
          <input
            type="number"
            inputMode="numeric"
            placeholder="Ex: 10"
            value={joursPris}
            onChange={(e) => setJoursPris(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface-card px-3 py-2.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            min={0}
            max={30}
          />
        </div>
      </div>

      {/* Resultat */}
      {result && (
        <div className="mt-8 space-y-6">
          {/* Montant principal */}
          <div className="rounded-xl border border-border bg-surface-card p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Indemnite de conges payes</p>
            <p className="mt-2 text-3xl font-extrabold text-primary sm:text-4xl">
              {fmt(result.indemniteConges)} EUR
            </p>
            <p className="mt-1 text-sm text-muted">
              {result.methodeRetenue}
            </p>
          </div>

          {/* Indicateurs */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface-card p-4 text-center">
              <p className="text-[10px] font-medium text-muted">Jours restants</p>
              <p className="mt-1 text-xl font-bold text-foreground">{result.joursRestants}</p>
              <p className="mt-0.5 text-[10px] text-muted">jours ouvres</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-card p-4 text-center">
              <p className="text-[10px] font-medium text-muted">Methode maintien</p>
              <p className="mt-1 text-lg font-bold text-foreground">{fmt(result.detail.maintienSalaire)} EUR</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-card p-4 text-center">
              <p className="text-[10px] font-medium text-muted">Methode 1/10e</p>
              <p className="mt-1 text-lg font-bold text-foreground">{fmt(result.detail.dixiemeBrut)} EUR</p>
            </div>
          </div>

          {/* Detail calcul */}
          <div className="overflow-hidden rounded-xl border border-border bg-surface-card shadow-sm">
            <div className="border-b border-border/60 bg-primary-light px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Comparaison des methodes</p>
            </div>
            <div className="divide-y divide-border/40 text-sm">
              <div className="flex justify-between px-5 py-2.5">
                <span className="text-muted">Maintien de salaire (salaire journalier x jours pris)</span>
                <span className="font-semibold text-foreground">{fmt(result.detail.maintienSalaire)} EUR</span>
              </div>
              <div className="flex justify-between px-5 py-2.5">
                <span className="text-muted">1/10e du brut annuel (prorata jours pris)</span>
                <span className="font-semibold text-foreground">{fmt(result.detail.dixiemeBrut)} EUR</span>
              </div>
              <div className="flex justify-between px-5 py-2.5 bg-surface">
                <span className="font-medium text-foreground">Methode retenue (la plus favorable)</span>
                <span className="font-bold text-primary">{fmt(result.indemniteConges)} EUR</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <ExportPDFButton toolSlug="conges-payes" templateData={{
              title: "Calcul indemnite de conges payes", toolName: "Conges payes",
              generatedAt: new Date().toLocaleDateString("fr-FR"),
              sections: [{ heading: "Resultat", rows: [
                { label: "Indemnite conges payes", value: `${fmt(result.indemniteConges)} EUR` },
                { label: "Methode retenue", value: result.methodeRetenue },
                { label: "Jours restants", value: `${result.joursRestants} jours` },
                { label: "Maintien de salaire", value: `${fmt(result.detail.maintienSalaire)} EUR` },
                { label: "1/10e du brut annuel", value: `${fmt(result.detail.dixiemeBrut)} EUR` },
              ]}],
              sources: [{ label: "Code du travail — Art. L3141-24", url: "https://www.legifrance.gouv.fr" }],
              disclaimer: "Resultats indicatifs bases sur un salaire brut mensuel fixe. Le calcul reel peut varier selon les primes et heures supplementaires.",
            }} />
          </div>

          <ToolRecommendations currentToolSlug="conges-payes" />
        </div>
      )}

      <CongesPayesContent />
      <FAQ items={FAQ_CONGES} />
    </ToolLayout>
  );
}
