"use client";

import { type FormEvent, useEffect, useState } from "react";
import { ToolLayout, TrustFooter, FormField, ResultCard } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { calculerFraisNotaire } from "@ecosysteme/core/property";
import type { FraisNotaireOutput } from "@ecosysteme/core/property";
import { ToolRecommendations } from "../../lib/ToolRecommendations";

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n));
}

export function FraisNotairePage() {
  const [prix, setPrix] = useState("");
  const [type, setType] = useState<"ancien" | "neuf">("ancien");
  const [result, setResult] = useState<FraisNotaireOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { track({ name: "tool_start", props: { tool: "frais-notaire" } }); }, []);
  useEffect(() => { if (result) track({ name: "tool_complete", props: { tool: "frais-notaire", completion_pct: 100 } }); }, [result]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const p = parseFloat(prix);
    if (!prix || isNaN(p) || p <= 0) { setError("Saisissez un prix d'achat valide"); return; }
    try {
      const r = calculerFraisNotaire({
        prixAchat: p, typeAchat: type,
        tauxDroitsMutationAncien: 0.058, tauxDroitsMutationNeuf: 0.00715,
        tauxEmolumentsNotaire: 0.01, fraisDivers: 1200,
      });
      setResult(r); setError(null);
    } catch { setError("Veuillez verifier les valeurs saisies."); }
  }

  return (
    <ToolLayout
      title="Calcul des frais de notaire"
      description="Estimez les frais de notaire pour votre achat immobilier"
      footer={
        <TrustFooter baremeNom="Droits de mutation et emoluments 2024" dateBareme="1er janvier 2024"
          sources={[{ label: "Service-Public.fr — Frais de notaire", url: "https://www.service-public.fr/particuliers/vosdroits/F17759" }]}
          verifieLe="15 janvier 2024"
          casCouverts="les achats immobiliers dans l'ancien et le neuf en France metropolitaine"
          casNonCouverts="les departements a taux reduit (Indre, Isere, Morbihan), les ventes en viager, les acquisitions par des professionnels"
        />
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField label="Prix d'achat" name="prix" type="number" inputMode="decimal" placeholder="ex: 250 000"
              helpText="Le prix d'acquisition du bien immobilier" value={prix} onChange={(e) => setPrix(e.target.value)} required min={0} step="any" />
            <div className="space-y-1.5">
              <span className="block text-sm font-medium text-gray-900">Type de bien</span>
              <div className="mt-1.5 flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="type" checked={type === "ancien"} onChange={() => setType("ancien")}
                    className="h-4 w-4 border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                  <span className="text-sm text-gray-700">Ancien</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="type" checked={type === "neuf"} onChange={() => setType("neuf")}
                    className="h-4 w-4 border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                  <span className="text-sm text-gray-700">Neuf</span>
                </label>
              </div>
            </div>
            <button type="submit" className="w-full rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              Calculer les frais
            </button>
          </form>
        </div>
        <div>
          {error && <div className="rounded-md border border-red-200 bg-red-50 p-4"><p className="text-sm text-red-800">{error}</p></div>}
          {result && (
            <>
              <ResultCard label="Frais de notaire estimes" value={fmt(result.totalFraisNotaire)} unit="EUR"
                interpretation={`Les frais de notaire representent environ ${result.pourcentageDuPrix.toFixed(1)}% du prix d'achat pour un bien ${type === "ancien" ? "dans l'ancien" : "neuf"}.`}
                detail={
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                    <span className="text-gray-500">Droits de mutation</span><span className="text-right font-medium">{fmt(result.detail.droitsMutation)} EUR</span>
                    <span className="text-gray-500">Emoluments notaire</span><span className="text-right font-medium">{fmt(result.detail.emolumentsNotaire)} EUR</span>
                    <span className="text-gray-500">Frais divers</span><span className="text-right font-medium">{fmt(result.detail.fraisDivers)} EUR</span>
                    <span className="border-t border-gray-200 pt-1 font-bold">Total</span><span className="border-t border-gray-200 pt-1 text-right font-bold">{fmt(result.totalFraisNotaire)} EUR</span>
                  </div>
                }
              />
              <ToolRecommendations currentToolSlug="frais-notaire" />
            </>
          )}
          {!result && !error && <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8"><p className="text-center text-sm text-gray-400">Remplissez le formulaire pour obtenir votre estimation</p></div>}
        </div>
      </div>
    </ToolLayout>
  );
}
