"use client";

import { type FormEvent, useEffect, useState } from "react";
import { ToolLayout, TrustFooter, FAQ } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { calculerJoursOuvres } from "@ecosysteme/core/dates";
import type { JoursOuvresOutput } from "@ecosysteme/core/dates";
import { NextStepBlock } from "../../lib/NextStepBlock";
import { ExportPDFButton } from "../../lib/ExportPDFButton";
import { FAQ_JOURS_OUVRES } from "../../lib/faq-data";
import { JoursOuvresContent } from "./JoursOuvresContent";

function formatDate(d: Date): string {
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function JoursOuvresPage() {
  const today = new Date();
  const defaultFin = new Date(today);
  defaultFin.setDate(defaultFin.getDate() + 30);

  const [dateDebut, setDateDebut] = useState(toISODate(today));
  const [dateFin, setDateFin] = useState(toISODate(defaultFin));
  const [mode, setMode] = useState<"ouvres" | "ouvrables">("ouvres");
  const [result, setResult] = useState<JoursOuvresOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { track({ name: "tool_start", props: { tool: "jours-ouvres" } }); }, []);
  useEffect(() => { if (result) track({ name: "tool_complete", props: { tool: "jours-ouvres", completion_pct: 100 } }); }, [result]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const r = calculerJoursOuvres({
        dateDebut: new Date(dateDebut),
        dateFin: new Date(dateFin),
        inclureDebut: true,
        inclureFin: true,
        mode,
      });
      setResult(r);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Veuillez verifier les dates saisies.");
    }
  }

  const modeLabel = mode === "ouvres" ? "ouvres" : "ouvrables";
  const interpretation = result
    ? `Entre le ${formatDate(new Date(dateDebut))} et le ${formatDate(new Date(dateFin))}, il y a ${result.total} jour${result.total > 1 ? "s" : ""} ${modeLabel}${result.feriesInclus.length > 0 ? ` (${result.feriesInclus.length} jour${result.feriesInclus.length > 1 ? "s" : ""} ferie${result.feriesInclus.length > 1 ? "s" : ""} deduit${result.feriesInclus.length > 1 ? "s" : ""})` : ""}.`
    : "";

  return (
    <ToolLayout
      title="Calculateur de jours ouvres"
      description="Calculez le nombre de jours ouvres ou ouvrables entre deux dates, jours feries francais inclus"
      footer={
        <TrustFooter
          baremeNom="Jours feries legaux — Art. L3133-1 du Code du travail"
          dateBareme="1er janvier 2026"
          sources={[{ label: "Legifrance — Art. L3133-1", url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006902611" }]}
          verifieLe="14 avril 2026"
          casCouverts="les 11 jours feries legaux de France metropolitaine (8 fixes + 3 mobiles lies a Paques)"
          casNonCouverts="DOM-TOM, Alsace-Moselle, conventions collectives avec jours feries supplementaires"
        />
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="dateDebut" className="block text-sm font-medium text-foreground">Date de debut</label>
              <input
                id="dateDebut"
                type="date"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                className="mt-1.5 block w-full rounded-md border border-border px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                required
              />
            </div>
            <div>
              <label htmlFor="dateFin" className="block text-sm font-medium text-foreground">Date de fin</label>
              <input
                id="dateFin"
                type="date"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                className="mt-1.5 block w-full rounded-md border border-border px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                required
              />
            </div>
            <div>
              <p className="block text-sm font-medium text-foreground mb-2">Mode de calcul</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="mode"
                    value="ouvres"
                    checked={mode === "ouvres"}
                    onChange={() => setMode("ouvres")}
                    className="text-primary focus:ring-primary"
                  />
                  Jours ouvres (lun-ven)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="mode"
                    value="ouvrables"
                    checked={mode === "ouvrables"}
                    onChange={() => setMode("ouvrables")}
                    className="text-primary focus:ring-primary"
                  />
                  Jours ouvrables (lun-sam)
                </label>
              </div>
              <p className="mt-1 text-xs text-muted">Ouvres = lundi au vendredi. Ouvrables = lundi au samedi.</p>
            </div>
            <button type="submit" className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Calculer les jours
            </button>
          </form>
        </div>

        <div>
          {error && (
            <div className="rounded-md border border-danger bg-danger-light p-4">
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          {result && (
            <>
              {/* Montant principal */}
              <div className="rounded-xl border border-border bg-surface-card p-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Jours {modeLabel}</p>
                <p className="mt-2 text-4xl font-extrabold text-primary sm:text-5xl">
                  {result.total}
                </p>
                <p className="mt-2 text-sm text-muted">{interpretation}</p>
              </div>

              {/* Detail */}
              <div className="mt-4 overflow-hidden rounded-xl border border-border bg-surface-card shadow-sm">
                <div className="border-b border-border/60 bg-primary-light px-5 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">Detail du calcul</p>
                </div>
                <div className="divide-y divide-border/40 text-sm">
                  <div className="flex justify-between px-5 py-2.5">
                    <span className="text-muted">Jours calendaires</span>
                    <span className="font-semibold text-foreground">{result.detail.joursCalendaires}</span>
                  </div>
                  <div className="flex justify-between px-5 py-2.5">
                    <span className="text-muted">Samedis</span>
                    <span className="font-semibold text-foreground">- {result.detail.samedis}</span>
                  </div>
                  <div className="flex justify-between px-5 py-2.5">
                    <span className="text-muted">Dimanches</span>
                    <span className="font-semibold text-foreground">- {result.detail.dimanches}</span>
                  </div>
                  <div className="flex justify-between px-5 py-2.5">
                    <span className="text-muted">Jours feries (hors weekend)</span>
                    <span className="font-semibold text-foreground">- {result.detail.feriesHorsSemaine}</span>
                  </div>
                  <div className="flex justify-between px-5 py-2.5 bg-surface">
                    <span className="font-medium text-foreground">Total jours {modeLabel}</span>
                    <span className="font-bold text-primary">{result.total}</span>
                  </div>
                </div>
              </div>

              {/* Feries dans la periode */}
              {result.feriesInclus.length > 0 && (
                <div className="mt-4 overflow-hidden rounded-xl border border-border bg-surface-card shadow-sm">
                  <div className="border-b border-border/60 bg-primary-light px-5 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">Jours feries dans la periode</p>
                  </div>
                  <div className="divide-y divide-border/40 text-sm">
                    {result.feriesInclus.map((f, i) => (
                      <div key={i} className="flex justify-between px-5 py-2.5">
                        <span className="text-foreground">{f.nom}</span>
                        <span className="text-muted">{formatDate(new Date(f.date))}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4">
                <ExportPDFButton toolSlug="jours-ouvres" templateData={{
                  title: "Calculateur de jours ouvres", toolName: "Jours ouvres",
                  generatedAt: new Date().toLocaleDateString("fr-FR"),
                  sections: [
                    { heading: "Parametres", rows: [
                      { label: "Date de debut", value: formatDate(new Date(dateDebut)) },
                      { label: "Date de fin", value: formatDate(new Date(dateFin)) },
                      { label: "Mode", value: mode === "ouvres" ? "Jours ouvres (lun-ven)" : "Jours ouvrables (lun-sam)" },
                    ]},
                    { heading: "Resultat", rows: [
                      { label: `Total jours ${modeLabel}`, value: String(result.total) },
                      { label: "Jours calendaires", value: String(result.detail.joursCalendaires) },
                      { label: "Samedis", value: String(result.detail.samedis) },
                      { label: "Dimanches", value: String(result.detail.dimanches) },
                      { label: "Jours feries (hors weekend)", value: String(result.detail.feriesHorsSemaine) },
                    ]},
                  ],
                  sources: [{ label: "Legifrance — Art. L3133-1", url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006902611" }],
                  disclaimer: "Les resultats sont fournis a titre indicatif. Le calcul ne prend pas en compte les jours feries supplementaires (DOM-TOM, Alsace-Moselle, conventions collectives).",
                }} />
              </div>
              <NextStepBlock currentToolSlug="jours-ouvres" />
            </>
          )}

          {!result && !error && (
            <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-border p-8">
              <p className="text-center text-sm text-muted-light">Remplissez le formulaire pour obtenir le nombre de jours ouvres</p>
            </div>
          )}
        </div>
      </div>

      <JoursOuvresContent />
      <FAQ items={FAQ_JOURS_OUVRES} />
    </ToolLayout>
  );
}
