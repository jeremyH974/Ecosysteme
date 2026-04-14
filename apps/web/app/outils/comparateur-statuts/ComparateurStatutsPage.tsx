"use client";

import { type FormEvent, useEffect, useState } from "react";
import { ToolLayout, TrustFooter, FormField, ResultCard, FAQ } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { comparerStatuts } from "@ecosysteme/core/fiscal";
import type { ComparateurStatutsOutput } from "@ecosysteme/core/fiscal";
import { ToolRecommendations } from "../../lib/ToolRecommendations";
import { ExportPDFButton } from "../../lib/ExportPDFButton";
import { FAQ_COMPARATEUR } from "../../lib/faq-data";

const TRANCHES_IR = [
  { de: 0, jusqu_a: 11600, taux: 0.00 },
  { de: 11601, jusqu_a: 29579, taux: 0.11 },
  { de: 29580, jusqu_a: 84577, taux: 0.30 },
  { de: 84578, jusqu_a: 181917, taux: 0.41 },
  { de: 181918, jusqu_a: null, taux: 0.45 },
];

const TAUX_AE: Record<string, { cotisations: number; abattement: number }> = {
  vente: { cotisations: 0.123, abattement: 0.71 },
  prestation_bic: { cotisations: 0.212, abattement: 0.50 },
  prestation_bnc: { cotisations: 0.211, abattement: 0.34 },
};

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n));
}

export function ComparateurStatutsPage() {
  const [chiffreAffaires, setChiffreAffaires] = useState("");
  const [activite, setActivite] = useState("prestation_bnc");
  const [chargesReelles, setChargesReelles] = useState("");
  const [result, setResult] = useState<ComparateurStatutsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => { track({ name: "tool_start", props: { tool: "comparateur-statuts" } }); }, []);
  useEffect(() => { if (result) track({ name: "tool_complete", props: { tool: "comparateur-statuts", completion_pct: 100 } }); }, [result]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const ca = parseFloat(chiffreAffaires);
    if (!chiffreAffaires || isNaN(ca) || ca <= 0) {
      setFormErrors({ chiffreAffaires: "Saisissez votre chiffre d'affaires annuel" });
      return;
    }
    setFormErrors({});
    const tauxActivite = TAUX_AE[activite];
    if (!tauxActivite) { setError("Activite non reconnue."); return; }
    try {
      const r = comparerStatuts({
        chiffreAffaires: ca,
        chargesReelles: parseFloat(chargesReelles) || 0,
        activite: activite as "vente" | "prestation_bic" | "prestation_bnc",
        nbPartsFiscales: 1,
        tauxCotisationsAE: tauxActivite.cotisations,
        tauxAbattementAE: tauxActivite.abattement,
        tauxCotisationsPatronalesSASU: 0.42,
        tauxCotisationsSalarialesSASU: 0.22,
        tauxISReduit: 0.15,
        tauxISNormal: 0.25,
        seuilISReduit: 42500,
        tauxPFU: 0.30,
        tranchesIR: TRANCHES_IR,
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
      title="Comparateur SASU vs Auto-entrepreneur"
      description="Comparez les revenus nets, cotisations et impots entre auto-entrepreneur et SASU"
      footer={
        <TrustFooter
          baremeNom="Taux cotisations AE et SASU 2024"
          dateBareme="1er janvier 2024"
          sources={[
            { label: "URSSAF — Taux auto-entrepreneur", url: "https://www.urssaf.fr/accueil/micro-entrepreneur.html" },
            { label: "Service-Public.fr — SASU", url: "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32887" },
          ]}
          verifieLe="15 janvier 2024"
          casCouverts="les activites de vente, prestations BIC et BNC, comparaison simplifiee salaire 100%"
          casNonCouverts="l'optimisation salaire/dividendes en SASU (utilisez notre outil dedie), les activites reglementees, les cas avec plusieurs associes"
        />
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Chiffre d'affaires annuel"
              name="chiffreAffaires"
              type="number"
              inputMode="decimal"
              placeholder="ex: 60 000"
              helpText="Votre chiffre d'affaires annuel prevu (HT)"
              value={chiffreAffaires}
              onChange={(e) => setChiffreAffaires(e.target.value)}
              error={formErrors.chiffreAffaires}
              required
              min={0}
              step="any"
            />
            <div className="space-y-1.5">
              <label htmlFor="activite" className="block text-sm font-medium text-gray-900">Type d&apos;activite</label>
              <select
                id="activite"
                value={activite}
                onChange={(e) => setActivite(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              >
                <option value="prestation_bnc">Prestation de service BNC (liberal)</option>
                <option value="prestation_bic">Prestation de service BIC (artisan/commercial)</option>
                <option value="vente">Vente de marchandises</option>
              </select>
            </div>
            <FormField
              label="Charges reelles annuelles (optionnel)"
              name="chargesReelles"
              type="number"
              inputMode="decimal"
              placeholder="ex: 5 000"
              helpText="Charges deductibles en SASU (loyer bureau, materiel, deplacement...)"
              value={chargesReelles}
              onChange={(e) => setChargesReelles(e.target.value)}
              min={0}
              step="any"
            />
            <button type="submit" className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Comparer les statuts
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
                  label="Recommandation"
                  value={result.ecart > 0 ? "Auto-entrepreneur" : "SASU"}
                  interpretation={result.recommandation}
                  detail={
                    <div className="space-y-4">
                      <div className="overflow-hidden rounded-lg border border-gray-200">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-3 py-2 text-left font-medium text-gray-600"></th>
                              <th className="px-3 py-2 text-right font-medium text-gray-600">Auto-entrepreneur</th>
                              <th className="px-3 py-2 text-right font-medium text-gray-600">SASU</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            <tr>
                              <td className="px-3 py-2 text-gray-500">Charges sociales</td>
                              <td className="px-3 py-2 text-right font-medium">{fmt(result.autoEntrepreneur.chargesSociales)} EUR</td>
                              <td className="px-3 py-2 text-right font-medium">{fmt(result.sasu.chargesSociales)} EUR</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2 text-gray-500">Impots (IR)</td>
                              <td className="px-3 py-2 text-right font-medium">{fmt(result.autoEntrepreneur.impots)} EUR</td>
                              <td className="px-3 py-2 text-right font-medium">{fmt(result.sasu.impots)} EUR</td>
                            </tr>
                            <tr className="bg-primary-light font-bold">
                              <td className="px-3 py-2 text-primary-hover">Revenu net</td>
                              <td className="px-3 py-2 text-right text-primary-hover">{fmt(result.autoEntrepreneur.revenuNet)} EUR</td>
                              <td className="px-3 py-2 text-right text-primary-hover">{fmt(result.sasu.revenuNet)} EUR</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2 text-gray-500">Protection sociale</td>
                              <td className="px-3 py-2 text-right text-xs">{result.autoEntrepreneur.protectionSociale}</td>
                              <td className="px-3 py-2 text-right text-xs">{result.sasu.protectionSociale}</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2 text-gray-500">Complexite</td>
                              <td className="px-3 py-2 text-right text-xs">{result.autoEntrepreneur.complexite}</td>
                              <td className="px-3 py-2 text-right text-xs">{result.sasu.complexite}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-gray-500">
                        Ecart : {fmt(Math.abs(result.ecart))} EUR/an en faveur de {result.ecart > 0 ? "l'auto-entreprise" : "la SASU"}
                      </p>
                    </div>
                  }
                />
              </div>
              <div className="mt-4">
                <ExportPDFButton toolSlug="comparateur-statuts" templateData={{
                  title: "Comparateur SASU vs Auto-entrepreneur", toolName: "Comparateur de statuts",
                  generatedAt: new Date().toLocaleDateString("fr-FR"),
                  sections: [{ heading: "Comparaison", rows: [
                    { label: "Chiffre d'affaires", value: `${fmt(parseFloat(chiffreAffaires))} EUR` },
                    { label: "Revenu net AE", value: `${fmt(result.autoEntrepreneur.revenuNet)} EUR` },
                    { label: "Revenu net SASU", value: `${fmt(result.sasu.revenuNet)} EUR` },
                    { label: "Ecart", value: `${fmt(Math.abs(result.ecart))} EUR` },
                    { label: "Recommandation", value: result.recommandation },
                  ]}],
                  sources: [
                    { label: "URSSAF — Taux auto-entrepreneur", url: "https://www.urssaf.fr/accueil/micro-entrepreneur.html" },
                    { label: "Service-Public.fr — SASU", url: "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32887" },
                  ],
                  disclaimer: "Les resultats sont fournis a titre indicatif. Simulation simplifiee, consultez un expert-comptable.",
                }} />
              </div>
              <ToolRecommendations currentToolSlug="comparateur-statuts" />
            </>
          )}

          {!result && !error && (
            <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8">
              <p className="text-center text-sm text-gray-400">Remplissez le formulaire pour obtenir votre estimation</p>
            </div>
          )}
        </div>
      </div>

      <FAQ items={FAQ_COMPARATEUR} />
    </ToolLayout>
  );
}
