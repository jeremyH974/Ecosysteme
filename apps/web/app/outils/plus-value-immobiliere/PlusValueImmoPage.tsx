"use client";

import { type FormEvent, useEffect, useState } from "react";
import { ToolLayout, TrustFooter, FormField, ResultCard, FAQ } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { calculerPlusValueImmo } from "@ecosysteme/core/property";
import type { PlusValueImmoOutput } from "@ecosysteme/core/property";
import { NextStepBlock } from "../../lib/NextStepBlock";
import { ExportPDFButton } from "../../lib/ExportPDFButton";
import { FAQ_PV } from "../../lib/faq-data";
import { PlusValueContent } from "./PlusValueContent";

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n));
}

function formatPct(n: number): string {
  return (n * 100).toFixed(1) + "%";
}

export function PlusValueImmoPage() {
  const [prixAchat, setPrixAchat] = useState("");
  const [prixVente, setPrixVente] = useState("");
  const [dureeDetention, setDureeDetention] = useState("");
  const [residencePrincipale, setResidencePrincipale] = useState(false);
  const [result, setResult] = useState<PlusValueImmoOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => { track({ name: "tool_start", props: { tool: "plus-value-immo" } }); }, []);
  useEffect(() => { if (result) track({ name: "tool_complete", props: { tool: "plus-value-immo", completion_pct: 100 } }); }, [result]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const pa = parseFloat(prixAchat);
    const pv = parseFloat(prixVente);
    const duree = parseInt(dureeDetention, 10);
    const errors: Record<string, string> = {};
    if (!prixAchat || isNaN(pa) || pa <= 0) errors.prixAchat = "Saisissez le prix d'achat";
    if (!prixVente || isNaN(pv) || pv <= 0) errors.prixVente = "Saisissez le prix de vente";
    if (!dureeDetention || isNaN(duree) || duree < 0) errors.dureeDetention = "Saisissez la duree de detention";
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormErrors({});
    try {
      const r = calculerPlusValueImmo({
        prixAchat: pa,
        prixVente: pv,
        fraisAcquisition: 0,
        travauxDeductibles: 0,
        dureeDetentionAnnees: duree,
        residencePrincipale,
        tauxImposition: 0.19,
        tauxPrelevementsSociaux: 0.172,
        abattementIRParAn6a21: 0.06,
        abattementIRParAn22: 0.04,
        abattementPSParAn6a21: 0.0165,
        abattementPSParAn22: 0.018,
        abattementPSParAnApres22: 0.09,
      });
      setResult(r);
      setError(null);
    } catch {
      setResult(null);
      setError("Veuillez verifier les valeurs saisies.");
    }
  }

  return (
    <ToolLayout
      title="Calcul de plus-value immobiliere"
      description="Estimez l'imposition sur la revente de votre bien immobilier"
      footer={
        <TrustFooter
          baremeNom="Plus-value immobiliere 2024"
          dateBareme="1er janvier 2024"
          sources={[{ label: "Service-Public.fr — Plus-value immobiliere", url: "https://www.service-public.fr/particuliers/vosdroits/F10864" }]}
          verifieLe="15 janvier 2024"
          casCouverts="les ventes de biens immobiliers detenus par des particuliers (residence secondaire, investissement locatif)"
          casNonCouverts="les biens detenus par des societes (SCI a l'IS), les terrains a batir (surtaxe eventuelle), les expropriations"
        />
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Prix d'achat"
              name="prixAchat"
              type="number"
              inputMode="decimal"
              placeholder="ex: 200 000"
              helpText="Prix d'acquisition du bien (hors frais de notaire)"
              value={prixAchat}
              onChange={(e) => setPrixAchat(e.target.value)}
              error={formErrors.prixAchat}
              required
              min={0}
              step="any"
            />
            <FormField
              label="Prix de vente"
              name="prixVente"
              type="number"
              inputMode="decimal"
              placeholder="ex: 300 000"
              helpText="Prix de cession du bien"
              value={prixVente}
              onChange={(e) => setPrixVente(e.target.value)}
              error={formErrors.prixVente}
              required
              min={0}
              step="any"
            />
            <FormField
              label="Duree de detention (annees)"
              name="dureeDetention"
              type="number"
              inputMode="numeric"
              placeholder="ex: 10"
              helpText="Nombre d'annees entre l'achat et la vente"
              value={dureeDetention}
              onChange={(e) => setDureeDetention(e.target.value)}
              error={formErrors.dureeDetention}
              required
              min={0}
              step="1"
            />
            <details className="mt-4 rounded-lg border border-border">
              <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-muted hover:text-foreground">
                Affiner le calcul (optionnel)
              </summary>
              <div className="border-t border-border/50 px-4 py-4 space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    id="residencePrincipale"
                    type="checkbox"
                    checked={residencePrincipale}
                    onChange={(e) => setResidencePrincipale(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="residencePrincipale" className="text-sm font-medium text-gray-900">
                    Residence principale (exoneration totale)
                  </label>
                </div>
              </div>
            </details>
            <button type="submit" className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Calculer la plus-value
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
                  label={result.exonere ? "Plus-value exoneree" : "Imposition totale sur la plus-value"}
                  value={result.exonere ? "Exoneree" : `${fmt(result.totalImposition)} EUR`}
                  interpretation={
                    result.exonere
                      ? "Votre plus-value est totalement exoneree d'impot (residence principale ou detention superieure a 30 ans)."
                      : `Plus-value brute de ${fmt(result.plusValueBrute)} EUR. Apres abattements et imposition, vous conservez ${fmt(result.netApresImpot)} EUR.`
                  }
                  detail={
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                      <span className="text-gray-500">Plus-value brute</span><span className="text-right font-medium">{fmt(result.plusValueBrute)} EUR</span>
                      <span className="text-gray-500">Prix d&apos;achat corrige</span><span className="text-right font-medium">{fmt(result.detail.prixAchatCorrige)} EUR</span>
                      <span className="text-gray-500">Abattement IR ({formatPct(result.detail.abattementIR)})</span><span className="text-right font-medium">{fmt(result.impotIR)} EUR</span>
                      <span className="text-gray-500">Abattement PS ({formatPct(result.detail.abattementPS)})</span><span className="text-right font-medium">{fmt(result.prelevementsSociaux)} EUR</span>
                      <span className="text-gray-500">Impot sur le revenu (19%)</span><span className="text-right font-medium">{fmt(result.impotIR)} EUR</span>
                      <span className="text-gray-500">Prelevements sociaux (17,2%)</span><span className="text-right font-medium">{fmt(result.prelevementsSociaux)} EUR</span>
                      <span className="border-t border-gray-200 pt-1 font-bold text-primary">Net apres impot</span>
                      <span className="border-t border-gray-200 pt-1 text-right font-bold text-primary">{fmt(result.netApresImpot)} EUR</span>
                    </div>
                  }
                />
              </div>
              <div className="mt-4">
                <ExportPDFButton toolSlug="plus-value-immo" templateData={{
                  title: "Calcul de plus-value immobiliere", toolName: "Plus-value immobiliere",
                  generatedAt: new Date().toLocaleDateString("fr-FR"),
                  sections: [{ heading: "Resultat", rows: [
                    { label: "Prix d'achat", value: `${fmt(parseFloat(prixAchat))} EUR` },
                    { label: "Prix de vente", value: `${fmt(parseFloat(prixVente))} EUR` },
                    { label: "Duree de detention", value: `${dureeDetention} ans` },
                    { label: "Plus-value brute", value: `${fmt(result.plusValueBrute)} EUR` },
                    { label: "Imposition totale", value: `${fmt(result.totalImposition)} EUR` },
                    { label: "Net apres impot", value: `${fmt(result.netApresImpot)} EUR` },
                  ]}],
                  sources: [{ label: "Service-Public.fr — Plus-value immobiliere", url: "https://www.service-public.fr/particuliers/vosdroits/F10864" }],
                  disclaimer: "Les resultats sont fournis a titre indicatif.",
                }} />
              </div>
              <NextStepBlock currentToolSlug="plus-value-immo" />
            </>
          )}

          {!result && !error && (
            <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8">
              <p className="text-center text-sm text-gray-400">Remplissez le formulaire pour obtenir votre estimation</p>
            </div>
          )}
        </div>
      </div>

      <PlusValueContent />
      <FAQ items={FAQ_PV} />
    </ToolLayout>
  );
}
