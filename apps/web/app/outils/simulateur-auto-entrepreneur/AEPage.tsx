"use client";

import { type FormEvent, useEffect, useState } from "react";
import { ToolLayout, TrustFooter, FormField, ResultCard } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { calculerAutoEntrepreneur } from "@ecosysteme/core/fiscal";
import type { AEOutput } from "@ecosysteme/core/fiscal";
import { ToolRecommendations } from "../../lib/ToolRecommendations";

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n));
}

const TAUX: Record<string, { cotisations: number; abattement: number; vl: number }> = {
  vente: { cotisations: 0.123, abattement: 0.71, vl: 0.01 },
  prestation_bic: { cotisations: 0.212, abattement: 0.50, vl: 0.017 },
  prestation_bnc: { cotisations: 0.211, abattement: 0.34, vl: 0.022 },
};

export function AEPage() {
  const [ca, setCa] = useState("");
  const [activite, setActivite] = useState<"vente" | "prestation_bic" | "prestation_bnc">("prestation_bnc");
  const [vl, setVl] = useState(false);
  const [result, setResult] = useState<AEOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { track({ name: "tool_start", props: { tool: "simulateur-ae" } }); }, []);
  useEffect(() => { if (result) track({ name: "tool_complete", props: { tool: "simulateur-ae", completion_pct: 100 } }); }, [result]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const c = parseFloat(ca);
    if (!ca || isNaN(c) || c < 0) { setError("Saisissez votre chiffre d'affaires"); return; }
    const t = TAUX[activite]!;
    try {
      const r = calculerAutoEntrepreneur({
        chiffreAffaires: c, activite,
        tauxCotisations: t.cotisations, tauxAbattementFiscal: t.abattement,
        versementLiberatoire: vl, tauxVersementLiberatoire: t.vl,
      });
      setResult(r); setError(null);
    } catch { setError("Veuillez verifier les valeurs saisies."); }
  }

  return (
    <ToolLayout
      title="Simulateur auto-entrepreneur"
      description="Estimez vos cotisations sociales et votre revenu net"
      footer={
        <TrustFooter baremeNom="Cotisations micro-entrepreneur 2024 — URSSAF" dateBareme="1er janvier 2024"
          sources={[{ label: "URSSAF — Auto-entrepreneur", url: "https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/lessentiel-du-statut.html" }]}
          verifieLe="15 janvier 2024"
          casCouverts="les micro-entrepreneurs (ex auto-entrepreneurs) en activite commerciale, artisanale ou liberale"
          casNonCouverts="les EIRL, les societes (SASU, SARL), les professions liberales reglementees hors CIPAV, l'ACRE (taux reduits)"
        />
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField label="Chiffre d'affaires annuel" name="ca" type="number" inputMode="decimal" placeholder="ex: 50 000"
              helpText="Votre CA annuel ou previsionnel" value={ca} onChange={(e) => setCa(e.target.value)} required min={0} step="any" />
            <div className="space-y-1.5">
              <span className="block text-sm font-medium text-gray-900">Type d&apos;activite</span>
              <select value={activite} onChange={(e) => setActivite(e.target.value as typeof activite)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1">
                <option value="prestation_bnc">Prestation de service BNC (liberal)</option>
                <option value="prestation_bic">Prestation de service BIC (artisan/commercial)</option>
                <option value="vente">Vente de marchandises</option>
              </select>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={vl} onChange={(e) => setVl(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
              <span className="text-sm text-gray-700">Versement liberatoire de l&apos;impot sur le revenu</span>
            </label>
            <button type="submit" className="w-full rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              Simuler mes charges
            </button>
          </form>
        </div>
        <div>
          {error && <div className="rounded-md border border-red-200 bg-red-50 p-4"><p className="text-sm text-red-800">{error}</p></div>}
          {result && (
            <>
              <ResultCard label="Revenu net apres cotisations" value={fmt(result.revenuApresCharges)} unit="EUR / an"
                interpretation={`Vos cotisations sociales representent ${(result.tauxChargesEffectif * 100).toFixed(1)}% de votre CA. ${vl ? `Le versement liberatoire de l'IR ajoute ${fmt(result.versementLiberatoireIR)} EUR.` : `Votre revenu imposable est de ${fmt(result.revenuImposable)} EUR (apres abattement fiscal).`}`}
                detail={
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                    <span className="text-gray-500">Chiffre d&apos;affaires</span><span className="text-right font-medium">{fmt(result.detail.chiffreAffaires)} EUR</span>
                    <span className="text-gray-500">Cotisations sociales</span><span className="text-right font-medium">-{fmt(result.cotisationsSociales)} EUR</span>
                    {vl && <><span className="text-gray-500">Versement liberatoire IR</span><span className="text-right font-medium">-{fmt(result.versementLiberatoireIR)} EUR</span></>}
                    <span className="border-t border-gray-200 pt-1 font-bold text-emerald-700">Revenu net</span>
                    <span className="border-t border-gray-200 pt-1 text-right font-bold text-emerald-700">{fmt(result.revenuApresCharges)} EUR</span>
                    <span className="text-gray-500">Abattement fiscal</span><span className="text-right font-medium">{fmt(result.detail.abattementFiscal)} EUR</span>
                    <span className="text-gray-500">Revenu imposable</span><span className="text-right font-medium">{fmt(result.revenuImposable)} EUR</span>
                  </div>
                }
              />
              <ToolRecommendations currentToolSlug="simulateur-ae" />
            </>
          )}
          {!result && !error && <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8"><p className="text-center text-sm text-gray-400">Remplissez le formulaire pour obtenir votre estimation</p></div>}
        </div>
      </div>
    </ToolLayout>
  );
}
