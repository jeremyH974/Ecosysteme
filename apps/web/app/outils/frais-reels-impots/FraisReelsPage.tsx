"use client";

import { type FormEvent, useEffect, useState } from "react";
import { ToolLayout, TrustFooter, FormField, FAQ } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { calculerFraisReels } from "@ecosysteme/core/fiscal";
import type { FraisReelsOutput } from "@ecosysteme/core/fiscal";
import { NextStepBlock } from "../../lib/NextStepBlock";
import { ExportPDFButton } from "../../lib/ExportPDFButton";
import { FAQ_FRAIS_REELS } from "../../lib/faq-data";
import { FraisReelsContent } from "./FraisReelsContent";
import Link from "next/link";

const BAREME_KM = [
  { puissance: "3", t1_coeff: 0.529, t1_ajout: 0, t2_coeff: 0.316, t2_ajout: 1065, t3_coeff: 0.407, t3_ajout: 0 },
  { puissance: "4", t1_coeff: 0.606, t1_ajout: 0, t2_coeff: 0.340, t2_ajout: 1330, t3_coeff: 0.407, t3_ajout: 0 },
  { puissance: "5", t1_coeff: 0.657, t1_ajout: 0, t2_coeff: 0.357, t2_ajout: 1395, t3_coeff: 0.407, t3_ajout: 0 },
  { puissance: "6", t1_coeff: 0.665, t1_ajout: 0, t2_coeff: 0.374, t2_ajout: 1435, t3_coeff: 0.407, t3_ajout: 0 },
  { puissance: "7+", t1_coeff: 0.661, t1_ajout: 0, t2_coeff: 0.374, t2_ajout: 1435, t3_coeff: 0.407, t3_ajout: 0 },
];

const VALEUR_REPAS_DOMICILE = 5.20;

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n));
}

export function FraisReelsPage() {
  const [joursDeplacementAn, setJoursDeplacementAn] = useState("220");
  const [distanceAllerKm, setDistanceAllerKm] = useState("");
  const [puissanceFiscale, setPuissanceFiscale] = useState("5");
  const [nbRepasHorsDomicile, setNbRepasHorsDomicile] = useState("200");
  const [valeurRepasActuel, setValeurRepasActuel] = useState("10");
  const [autresFrais, setAutresFrais] = useState("0");
  const [salaireBrutAnnuel, setSalaireBrutAnnuel] = useState("");
  const [result, setResult] = useState<FraisReelsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => { track({ name: "tool_start", props: { tool: "frais-reels-impots" } }); }, []);
  useEffect(() => { if (result) track({ name: "tool_complete", props: { tool: "frais-reels-impots", completion_pct: 100 } }); }, [result]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errors: Record<string, string> = {};
    const dk = parseFloat(distanceAllerKm);
    const sb = parseFloat(salaireBrutAnnuel);

    if (!distanceAllerKm || isNaN(dk) || dk < 0) errors.distanceAllerKm = "Saisissez la distance aller";
    if (!salaireBrutAnnuel || isNaN(sb) || sb <= 0) errors.salaireBrutAnnuel = "Saisissez votre salaire brut annuel";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    try {
      const r = calculerFraisReels({
        joursDeplacementAn: parseInt(joursDeplacementAn, 10) || 0,
        distanceAllerKm: dk,
        puissanceFiscale: puissanceFiscale as "3" | "4" | "5" | "6" | "7+",
        nbRepasHorsDomicile: parseInt(nbRepasHorsDomicile, 10) || 0,
        valeurRepasActuel: parseFloat(valeurRepasActuel) || 0,
        valeurRepasDomicile: VALEUR_REPAS_DOMICILE,
        autresFrais: parseFloat(autresFrais) || 0,
        salaireBrutAnnuel: sb,
        baremeKm: BAREME_KM,
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
      title="Simulateur frais reels vs forfait 10%"
      description="Comparez la deduction des frais reels avec l'abattement forfaitaire de 10% pour votre declaration de revenus"
      footer={
        <TrustFooter
          baremeNom="Bareme kilometrique 2025-2026 + frais repas URSSAF 2024"
          dateBareme="1er janvier 2026"
          sources={[
            { label: "BOFIP — Bareme kilometrique", url: "https://bofip.impots.gouv.fr/bofip/2185-PGP.html/identifiant=BOI-BAREME-000001-20230720" },
            { label: "URSSAF — Frais professionnels", url: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/frais-professionnels.html" },
          ]}
          verifieLe="14 avril 2026"
          casCouverts="les salaries du secteur prive, vehicules de 3 a 7+ CV, frais de repas plafonnes"
          casNonCouverts="les frais de double residence, les vehicules electriques (majoration 20% non appliquee automatiquement), les motos et scooters"
        />
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Jours de deplacement / an"
                name="joursDeplacementAn"
                type="number"
                inputMode="numeric"
                placeholder="220"
                helpText="Nombre de jours travailles dans l'annee (utilisez notre calculateur jours ouvres)"
                value={joursDeplacementAn}
                onChange={(e) => setJoursDeplacementAn(e.target.value)}
                min={0}
                max={365}
              />
              <FormField
                label="Distance aller (km)"
                name="distanceAllerKm"
                type="number"
                inputMode="decimal"
                placeholder="ex: 25"
                helpText="Distance domicile-travail, aller simple"
                value={distanceAllerKm}
                onChange={(e) => setDistanceAllerKm(e.target.value)}
                error={formErrors.distanceAllerKm}
                required
                min={0}
                step="any"
              />
            </div>

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

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Repas hors domicile / an"
                name="nbRepasHorsDomicile"
                type="number"
                inputMode="numeric"
                placeholder="200"
                helpText="Nombre de repas pris hors du domicile"
                value={nbRepasHorsDomicile}
                onChange={(e) => setNbRepasHorsDomicile(e.target.value)}
                min={0}
              />
              <FormField
                label="Cout moyen du repas (EUR)"
                name="valeurRepasActuel"
                type="number"
                inputMode="decimal"
                placeholder="10"
                helpText="Ce que vous payez reellement par repas"
                value={valeurRepasActuel}
                onChange={(e) => setValeurRepasActuel(e.target.value)}
                min={0}
                step="any"
              />
            </div>

            <FormField
              label="Autres frais annuels (EUR)"
              name="autresFrais"
              type="number"
              inputMode="decimal"
              placeholder="0"
              helpText="Materiel, fournitures, formation, teletravail..."
              value={autresFrais}
              onChange={(e) => setAutresFrais(e.target.value)}
              min={0}
              step="any"
            />

            <FormField
              label="Salaire brut annuel (EUR)"
              name="salaireBrutAnnuel"
              type="number"
              inputMode="decimal"
              placeholder="ex: 30 000"
              helpText="Votre salaire brut annuel (tous revenus d'activite)"
              value={salaireBrutAnnuel}
              onChange={(e) => setSalaireBrutAnnuel(e.target.value)}
              error={formErrors.salaireBrutAnnuel}
              required
              min={0}
              step="any"
            />

            <button type="submit" className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Comparer frais reels vs forfait
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
              {/* Recommandation principale */}
              <div className={`rounded-xl border p-6 text-center ${result.plusFavorable === "frais_reels" ? "border-green-200 bg-green-50" : "border-blue-200 bg-blue-50"}`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Option la plus avantageuse</p>
                <p className="mt-2 text-2xl font-extrabold text-foreground sm:text-3xl">
                  {result.plusFavorable === "frais_reels" ? "Frais reels" : "Forfait 10%"}
                </p>
                <p className="mt-1 text-sm text-muted">
                  Economie de <strong className="text-foreground">{fmt(result.economie)} EUR</strong> par rapport a l&apos;autre option
                </p>
              </div>

              {/* Comparaison */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className={`rounded-xl border p-4 text-center ${result.plusFavorable === "frais_reels" ? "border-green-200 bg-green-50" : "border-border bg-surface-card"}`}>
                  <p className="text-[10px] font-medium text-muted">Frais reels</p>
                  <p className="mt-1 text-xl font-bold text-foreground">{fmt(result.totalFraisReels)} EUR</p>
                </div>
                <div className={`rounded-xl border p-4 text-center ${result.plusFavorable === "forfait" ? "border-blue-200 bg-blue-50" : "border-border bg-surface-card"}`}>
                  <p className="text-[10px] font-medium text-muted">Forfait 10%</p>
                  <p className="mt-1 text-xl font-bold text-foreground">{fmt(result.deductionForfaitaire10)} EUR</p>
                </div>
              </div>

              {/* Detail frais reels */}
              <div className="mt-4 overflow-hidden rounded-xl border border-border bg-surface-card shadow-sm">
                <div className="border-b border-border/60 bg-primary-light px-5 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">Detail des frais reels</p>
                </div>
                <div className="divide-y divide-border/40 text-sm">
                  <div className="flex justify-between px-5 py-2.5">
                    <span className="text-muted">Distance annuelle A/R</span>
                    <span className="font-semibold text-foreground">{fmt(result.detail.distanceAnnuelleAR)} km</span>
                  </div>
                  <div className="flex justify-between px-5 py-2.5">
                    <span className="text-muted">Frais de transport (bareme km)</span>
                    <span className="font-semibold text-foreground">{fmt(result.detail.fraisTransport)} EUR</span>
                  </div>
                  <div className="flex justify-between px-5 py-2.5">
                    <span className="text-muted">Frais de repas (part deductible)</span>
                    <span className="font-semibold text-foreground">{fmt(result.detail.fraisRepas)} EUR</span>
                  </div>
                  <div className="flex justify-between px-5 py-2.5">
                    <span className="text-muted">Autres frais</span>
                    <span className="font-semibold text-foreground">{fmt(result.detail.autresFrais)} EUR</span>
                  </div>
                  <div className="flex justify-between px-5 py-2.5 bg-surface">
                    <span className="font-medium text-foreground">Total frais reels</span>
                    <span className="font-bold text-primary">{fmt(result.totalFraisReels)} EUR</span>
                  </div>
                </div>
              </div>

              {/* CTA vers TMI */}
              <div className="mt-4 rounded-lg border border-primary/20 bg-primary-light p-4 text-center">
                <p className="text-sm font-medium text-foreground">Quel impact sur votre impot ?</p>
                <p className="mt-1 text-xs text-muted">Calculez votre TMI pour estimer l&apos;economie fiscale reelle.</p>
                <Link href="/outils/simulateur-tmi" className="mt-3 inline-flex rounded-md bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-hover">
                  Simuler mon TMI
                </Link>
              </div>

              <div className="mt-4">
                <ExportPDFButton toolSlug="frais-reels-impots" templateData={{
                  title: "Simulateur frais reels vs forfait 10%", toolName: "Frais reels",
                  generatedAt: new Date().toLocaleDateString("fr-FR"),
                  sections: [
                    { heading: "Comparaison", rows: [
                      { label: "Frais reels", value: `${fmt(result.totalFraisReels)} EUR` },
                      { label: "Forfait 10%", value: `${fmt(result.deductionForfaitaire10)} EUR` },
                      { label: "Option retenue", value: result.plusFavorable === "frais_reels" ? "Frais reels" : "Forfait 10%" },
                      { label: "Economie", value: `${fmt(result.economie)} EUR` },
                    ]},
                    { heading: "Detail frais reels", rows: [
                      { label: "Distance annuelle A/R", value: `${fmt(result.detail.distanceAnnuelleAR)} km` },
                      { label: "Frais transport", value: `${fmt(result.detail.fraisTransport)} EUR` },
                      { label: "Frais repas", value: `${fmt(result.detail.fraisRepas)} EUR` },
                      { label: "Autres frais", value: `${fmt(result.detail.autresFrais)} EUR` },
                    ]},
                  ],
                  sources: [
                    { label: "BOFIP — Bareme kilometrique", url: "https://bofip.impots.gouv.fr/bofip/2185-PGP.html" },
                    { label: "URSSAF — Frais professionnels", url: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/frais-professionnels.html" },
                  ],
                  disclaimer: "Les resultats sont fournis a titre indicatif. Consultez un expert-comptable pour votre declaration.",
                }} />
              </div>
              <NextStepBlock currentToolSlug="frais-reels-impots" />
            </>
          )}

          {!result && !error && (
            <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8">
              <p className="text-center text-sm text-gray-400">Remplissez le formulaire pour comparer frais reels et forfait 10%</p>
            </div>
          )}
        </div>
      </div>

      <FraisReelsContent />
      <FAQ items={FAQ_FRAIS_REELS} />
    </ToolLayout>
  );
}
