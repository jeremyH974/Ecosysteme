"use client";

import { type FormEvent, useEffect, useState } from "react";
import { ToolLayout, TrustFooter, FormField, ResultCard, FAQ } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { calculerRendementLocatif } from "@ecosysteme/core/property";
import type { RendementLocatifOutput } from "@ecosysteme/core/property";
import { ToolRecommendations } from "../../lib/ToolRecommendations";
import { ExportPDFButton } from "../../lib/ExportPDFButton";
import { FAQ_RENDEMENT } from "../../lib/faq-data";
import { RendementContent } from "./RendementContent";

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n));
}

export function RendementLocatifPage() {
  const [prix, setPrix] = useState("");
  const [loyer, setLoyer] = useState("");
  const [charges, setCharges] = useState("");
  const [fraisNotaire, setFraisNotaire] = useState("");
  const [vacance, setVacance] = useState("1");
  const [result, setResult] = useState<RendementLocatifOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { track({ name: "tool_start", props: { tool: "rendement-locatif" } }); }, []);
  useEffect(() => { if (result) track({ name: "tool_complete", props: { tool: "rendement-locatif", completion_pct: 100 } }); }, [result]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const p = parseFloat(prix);
    const l = parseFloat(loyer);
    if (!prix || isNaN(p) || p <= 0 || !loyer || isNaN(l) || l <= 0) {
      setError("Saisissez le prix d'achat et le loyer mensuel"); return;
    }
    try {
      const r = calculerRendementLocatif({
        prixAchat: p, loyerMensuel: l,
        chargesAnnuelles: parseFloat(charges) || 0,
        fraisNotaire: parseFloat(fraisNotaire) || 0,
        vacanceLocativeMois: parseInt(vacance, 10),
      });
      setResult(r); setError(null);
    } catch { setError("Veuillez verifier les valeurs saisies."); }
  }

  return (
    <ToolLayout
      title="Calcul de rendement locatif"
      description="Evaluez la rentabilite de votre investissement immobilier"
      footer={
        <TrustFooter baremeNom="Calcul de rendement locatif" dateBareme="Methode standard"
          sources={[{ label: "Service-Public.fr — Investissement locatif", url: "https://www.service-public.fr/particuliers/vosdroits/F31235" }]}
          verifieLe="15 janvier 2024"
          casCouverts="les investissements locatifs residentiels (nu ou meuble)"
          casNonCouverts="les dispositifs fiscaux specifiques (Pinel, Denormandie), les SCPI, l'immobilier commercial"
        />
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField label="Prix d'achat du bien" name="prix" type="number" inputMode="decimal" placeholder="ex: 200 000"
              helpText="Prix d'acquisition hors frais de notaire" value={prix} onChange={(e) => setPrix(e.target.value)} required min={0} step="any" />
            <FormField label="Loyer mensuel hors charges" name="loyer" type="number" inputMode="decimal" placeholder="ex: 800"
              helpText="Le loyer que vous percevez ou prévoyez de percevoir" value={loyer} onChange={(e) => setLoyer(e.target.value)} required min={0} step="any" />
            <FormField label="Charges annuelles" name="charges" type="number" inputMode="decimal" placeholder="ex: 2 000"
              helpText="Taxe fonciere, assurance PNO, gestion, travaux... (optionnel)" value={charges} onChange={(e) => setCharges(e.target.value)} min={0} step="any" />
            <FormField label="Frais de notaire" name="fraisNotaire" type="number" inputMode="decimal" placeholder="ex: 15 000"
              helpText="Frais d'acquisition (optionnel, pour le rendement net)" value={fraisNotaire} onChange={(e) => setFraisNotaire(e.target.value)} min={0} step="any" />
            <div className="space-y-1.5">
              <label htmlFor="vacance" className="block text-sm font-medium text-gray-900">Vacance locative</label>
              <select id="vacance" value={vacance} onChange={(e) => setVacance(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1">
                <option value="0">Aucune (0 mois)</option>
                <option value="1">1 mois / an</option>
                <option value="2">2 mois / an</option>
                <option value="3">3 mois / an</option>
              </select>
            </div>
            <button type="submit" className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Calculer le rendement
            </button>
          </form>
        </div>
        <div>
          {error && <div className="rounded-md border border-red-200 bg-red-50 p-4"><p className="text-sm text-red-800">{error}</p></div>}
          {result && (
            <>
              <div className="space-y-4">
                <ResultCard label="Rendement brut" value={result.rendementBrut.toFixed(2) + "%"} interpretation={`Votre investissement genere ${fmt(result.revenuAnnuelBrut)} EUR de loyers annuels bruts pour un bien a ${fmt(result.coutTotalAcquisition)} EUR (acquisition + frais).`}
                  detail={
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                      <span className="text-gray-500">Loyer annuel brut</span><span className="text-right font-medium">{fmt(result.detail.loyerAnnuel)} EUR</span>
                      <span className="text-gray-500">Loyer effectif (- vacance)</span><span className="text-right font-medium">{fmt(result.detail.loyerEffectif)} EUR</span>
                      <span className="text-gray-500">Charges annuelles</span><span className="text-right font-medium">-{fmt(result.detail.chargesAnnuelles)} EUR</span>
                      <span className="text-gray-500">Revenu net annuel</span><span className="text-right font-medium">{fmt(result.revenuAnnuelNet)} EUR</span>
                      <span className="border-t border-gray-200 pt-1 font-bold text-primary">Rendement net</span>
                      <span className="border-t border-gray-200 pt-1 text-right font-bold text-primary">{result.rendementNet.toFixed(2)}%</span>
                    </div>
                  }
                />
              </div>
              <div className="mt-4">
                <ExportPDFButton toolSlug="rendement-locatif" templateData={{
                  title: "Calcul de rendement locatif", toolName: "Rendement locatif",
                  generatedAt: new Date().toLocaleDateString("fr-FR"),
                  sections: [{ heading: "Resultat", rows: [
                    { label: "Prix d'achat", value: `${fmt(parseFloat(prix))} EUR` },
                    { label: "Loyer mensuel", value: `${fmt(parseFloat(loyer))} EUR` },
                    { label: "Rendement brut", value: `${result.rendementBrut.toFixed(2)}%` },
                    { label: "Rendement net", value: `${result.rendementNet.toFixed(2)}%` },
                    { label: "Revenu annuel net", value: `${fmt(result.revenuAnnuelNet)} EUR` },
                  ]}],
                  sources: [{ label: "Service-Public.fr — Investissement locatif", url: "https://www.service-public.fr/particuliers/vosdroits/F31235" }],
                  disclaimer: "Les resultats sont fournis a titre indicatif.",
                }} />
              </div>
              <ToolRecommendations currentToolSlug="rendement-locatif" />
            </>
          )}
          {!result && !error && <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8"><p className="text-center text-sm text-gray-400">Remplissez le formulaire pour obtenir votre estimation</p></div>}
        </div>
      </div>

      <RendementContent />
      <FAQ items={FAQ_RENDEMENT} />
    </ToolLayout>
  );
}
