"use client";

import { type FormEvent, useEffect, useState } from "react";
import { ToolLayout, TrustFooter, FormField, ResultCard, FAQ } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { calculerIndemnitesKm } from "@ecosysteme/core/fiscal";
import type { IndemniteKmOutput } from "@ecosysteme/core/fiscal";
import { NextStepBlock } from "../../lib/NextStepBlock";
import { ExportPDFButton } from "../../lib/ExportPDFButton";
import { FAQ_KM } from "../../lib/faq-data";
import { IndemniteKmContent } from "./IndemniteKmContent";

const BAREME_KM = [
  { puissance: "3", jusqu_a_5000: { coeff: 0.529, ajout: 0 }, de_5001_a_20000: { coeff: 0.316, ajout: 1065 }, au_dela_20000: { coeff: 0.370, ajout: 0 } },
  { puissance: "4", jusqu_a_5000: { coeff: 0.606, ajout: 0 }, de_5001_a_20000: { coeff: 0.340, ajout: 1330 }, au_dela_20000: { coeff: 0.407, ajout: 0 } },
  { puissance: "5", jusqu_a_5000: { coeff: 0.657, ajout: 0 }, de_5001_a_20000: { coeff: 0.357, ajout: 1395 }, au_dela_20000: { coeff: 0.407, ajout: 0 } },
  { puissance: "6", jusqu_a_5000: { coeff: 0.665, ajout: 0 }, de_5001_a_20000: { coeff: 0.374, ajout: 1435 }, au_dela_20000: { coeff: 0.407, ajout: 0 } },
  { puissance: "7+", jusqu_a_5000: { coeff: 0.661, ajout: 0 }, de_5001_a_20000: { coeff: 0.374, ajout: 1435 }, au_dela_20000: { coeff: 0.407, ajout: 0 } },
];

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n));
}

export function IndemniteKmPage() {
  const [distanceAnnuelle, setDistanceAnnuelle] = useState("");
  const [puissanceFiscale, setPuissanceFiscale] = useState("5");
  const [result, setResult] = useState<IndemniteKmOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => { track({ name: "tool_start", props: { tool: "indemnites-km" } }); }, []);
  useEffect(() => { if (result) track({ name: "tool_complete", props: { tool: "indemnites-km", completion_pct: 100 } }); }, [result]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const d = parseFloat(distanceAnnuelle);
    if (!distanceAnnuelle || isNaN(d) || d <= 0) {
      setFormErrors({ distanceAnnuelle: "Saisissez la distance annuelle parcourue" });
      return;
    }
    setFormErrors({});
    try {
      const r = calculerIndemnitesKm({
        distanceAnnuelle: d,
        puissanceFiscale: puissanceFiscale as "3" | "4" | "5" | "6" | "7+",
        bareme: BAREME_KM,
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
      title="Calculateur d'indemnites kilometriques"
      description="Calculez vos frais kilometriques deductibles pour la declaration de revenus (frais reels)"
      footer={
        <TrustFooter
          baremeNom="Bareme kilometrique 2024 (revenus 2023)"
          dateBareme="1er janvier 2024"
          sources={[{ label: "Service-Public.fr — Bareme kilometrique", url: "https://www.service-public.fr/particuliers/vosdroits/F19846" }]}
          verifieLe="15 janvier 2024"
          casCouverts="les voitures particulieres, tous les kilometrages, puissances fiscales de 3 a 7+ CV"
          casNonCouverts="les motos, scooters et cyclomoteurs (baremes specifiques), les vehicules de societe, les indemnites grand deplacement"
        />
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Distance annuelle parcourue (km)"
              name="distanceAnnuelle"
              type="number"
              inputMode="decimal"
              placeholder="ex: 12 000"
              helpText="Le nombre total de kilometres professionnels parcourus dans l'annee"
              value={distanceAnnuelle}
              onChange={(e) => setDistanceAnnuelle(e.target.value)}
              error={formErrors.distanceAnnuelle}
              required
              min={0}
              step="any"
            />
            <div className="space-y-1.5">
              <label htmlFor="puissanceFiscale" className="block text-sm font-medium text-gray-900">Puissance fiscale du vehicule</label>
              <select
                id="puissanceFiscale"
                value={puissanceFiscale}
                onChange={(e) => setPuissanceFiscale(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              >
                <option value="3">3 CV</option>
                <option value="4">4 CV</option>
                <option value="5">5 CV</option>
                <option value="6">6 CV</option>
                <option value="7+">7 CV et plus</option>
              </select>
            </div>
            <button type="submit" className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Calculer mes indemnites
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
                  label="Indemnites kilometriques annuelles"
                  value={`${fmt(result.montantTotal)} EUR`}
                  interpretation={`Soit ${fmt(result.montantMensuel)} EUR par mois. Ce montant est deductible de vos revenus imposables si vous optez pour les frais reels.`}
                  detail={
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                      <span className="text-gray-500">Distance annuelle</span><span className="text-right font-medium">{fmt(result.detail.distanceAnnuelle)} km</span>
                      <span className="text-gray-500">Puissance fiscale</span><span className="text-right font-medium">{result.detail.puissanceFiscale} CV</span>
                      <span className="text-gray-500">Tranche</span><span className="text-right font-medium">{result.detail.tranche}</span>
                      <span className="text-gray-500">Formule</span><span className="text-right font-medium">{result.detail.formule}</span>
                      <span className="border-t border-gray-200 pt-1 font-bold text-primary">Montant mensuel</span>
                      <span className="border-t border-gray-200 pt-1 text-right font-bold text-primary">{fmt(result.montantMensuel)} EUR</span>
                    </div>
                  }
                />
              </div>
              <div className="mt-4">
                <ExportPDFButton toolSlug="indemnites-km" templateData={{
                  title: "Calculateur d'indemnites kilometriques", toolName: "Indemnites kilometriques",
                  generatedAt: new Date().toLocaleDateString("fr-FR"),
                  sections: [{ heading: "Resultat", rows: [
                    { label: "Distance annuelle", value: `${fmt(parseFloat(distanceAnnuelle))} km` },
                    { label: "Puissance fiscale", value: `${puissanceFiscale} CV` },
                    { label: "Montant annuel", value: `${fmt(result.montantTotal)} EUR` },
                    { label: "Montant mensuel", value: `${fmt(result.montantMensuel)} EUR` },
                    { label: "Formule", value: result.detail.formule },
                  ]}],
                  sources: [{ label: "Service-Public.fr — Bareme kilometrique", url: "https://www.service-public.fr/particuliers/vosdroits/F19846" }],
                  disclaimer: "Les resultats sont fournis a titre indicatif.",
                }} />
              </div>
              <NextStepBlock currentToolSlug="indemnites-km" />
            </>
          )}

          {!result && !error && (
            <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8">
              <p className="text-center text-sm text-gray-400">Remplissez le formulaire pour obtenir votre estimation</p>
            </div>
          )}
        </div>
      </div>

      <IndemniteKmContent />
      <FAQ items={FAQ_KM} />
    </ToolLayout>
  );
}
