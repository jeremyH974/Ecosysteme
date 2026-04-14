"use client";

import { type FormEvent, useEffect, useState } from "react";
import { ToolLayout, TrustFooter, FormField, ResultCard, FAQ } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { useTMI } from "./useTMI";
import { ToolRecommendations } from "../../lib/ToolRecommendations";
import { ExportPDFButton } from "../../lib/ExportPDFButton";
import { FAQ_TMI } from "../../lib/faq-data";

function formatEuros(n: number): string {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n));
}

function formatPct(n: number): string {
  return (n * 100).toFixed(1) + "%";
}

export function TMIPage() {
  const { result, error, calculate } = useTMI();
  const [revenu, setRevenu] = useState("");
  const [nbParts, setNbParts] = useState("1");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    track({ name: "tool_start", props: { tool: "simulateur-tmi" } });
  }, []);

  useEffect(() => {
    if (result) {
      track({ name: "tool_complete", props: { tool: "simulateur-tmi", completion_pct: 100 } });
    }
  }, [result]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const r = parseFloat(revenu);
    if (!revenu || isNaN(r) || r < 0) {
      setFormErrors({ revenu: "Saisissez votre revenu net imposable annuel" });
      return;
    }
    setFormErrors({});
    calculate({ revenuNetImposable: revenu, nbParts });
  }

  return (
    <ToolLayout
      title="Simulateur TMI — Taux marginal d'imposition"
      description="Calculez votre tranche d'imposition et le montant de votre impot sur le revenu"
      footer={
        <TrustFooter
          baremeNom="Bareme progressif IR 2024 (revenus 2023)"
          dateBareme="1er janvier 2024"
          sources={[{ label: "Service-Public.fr — Bareme IR", url: "https://www.service-public.fr/particuliers/vosdroits/F1419" }]}
          verifieLe="15 janvier 2024"
          casCouverts="les revenus soumis au bareme progressif de l'impot sur le revenu"
          casNonCouverts="les revenus soumis au PFU (dividendes, plus-values), les micro-entrepreneurs au versement liberatoire, les non-residents"
        />
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Revenu net imposable annuel"
              name="revenu"
              type="number"
              inputMode="decimal"
              placeholder="ex: 35 000"
              helpText="Le montant inscrit sur votre avis d'imposition (ligne revenu net imposable)"
              value={revenu}
              onChange={(e) => setRevenu(e.target.value)}
              error={formErrors.revenu}
              required
              min={0}
              step="any"
            />
            <div className="space-y-1.5">
              <label htmlFor="nbParts" className="block text-sm font-medium text-gray-900">Nombre de parts fiscales</label>
              <select
                id="nbParts"
                value={nbParts}
                onChange={(e) => setNbParts(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
              >
                <option value="1">1 part (celibataire)</option>
                <option value="1.5">1.5 parts (celibataire + 1 enfant)</option>
                <option value="2">2 parts (couple)</option>
                <option value="2.5">2.5 parts (couple + 1 enfant)</option>
                <option value="3">3 parts (couple + 2 enfants)</option>
                <option value="3.5">3.5 parts (couple + 3 enfants)</option>
              </select>
            </div>
            <button type="submit" className="w-full rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              Calculer mon TMI
            </button>
          </form>
        </div>

        <div>
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {result && (
            <>
              <div className="space-y-4">
                <ResultCard
                  label="Votre taux marginal d'imposition (TMI)"
                  value={formatPct(result.tauxMarginal)}
                  interpretation={`Votre impot sur le revenu est de ${formatEuros(result.montantIR)} EUR, soit un taux moyen de ${formatPct(result.tauxMoyen)}. Chaque euro supplementaire est impose a ${formatPct(result.tauxMarginal)}.`}
                  detail={
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-700">Detail par tranche</h4>
                      <div className="space-y-1 text-sm">
                        {result.detailParTranche.map((t, i) => (
                          <div key={i} className="flex justify-between">
                            <span className="text-gray-500">
                              {formatPct(t.taux)} ({formatEuros(t.de)} - {t.jusqu_a ? formatEuros(t.jusqu_a) : "..."})
                            </span>
                            <span className="font-medium">{formatEuros(t.montantImpot)} EUR</span>
                          </div>
                        ))}
                        <div className="flex justify-between border-t border-gray-200 pt-1 font-bold">
                          <span>Total IR</span>
                          <span>{formatEuros(result.montantIR)} EUR</span>
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="mt-4">
                <ExportPDFButton toolSlug="simulateur-tmi" templateData={{
                  title: "Simulateur TMI — Taux marginal d'imposition", toolName: "Simulateur TMI",
                  generatedAt: new Date().toLocaleDateString("fr-FR"),
                  sections: [{ heading: "Resultat", rows: [
                    { label: "Revenu net imposable", value: `${formatEuros(parseFloat(revenu))} EUR` },
                    { label: "Nombre de parts", value: nbParts },
                    { label: "TMI", value: formatPct(result.tauxMarginal) },
                    { label: "Taux moyen", value: formatPct(result.tauxMoyen) },
                    { label: "Impot sur le revenu", value: `${formatEuros(result.montantIR)} EUR` },
                  ]}],
                  sources: [{ label: "Service-Public.fr — Bareme IR", url: "https://www.service-public.fr/particuliers/vosdroits/F1419" }],
                  disclaimer: "Les resultats sont fournis a titre indicatif.",
                }} />
              </div>
              <ToolRecommendations currentToolSlug="simulateur-tmi" />
            </>
          )}

          {!result && !error && (
            <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8">
              <p className="text-center text-sm text-gray-400">Remplissez le formulaire pour obtenir votre estimation</p>
            </div>
          )}
        </div>
      </div>

      <FAQ items={FAQ_TMI} />
    </ToolLayout>
  );
}
