"use client";

import { useEffect, useState, useCallback } from "react";
import { ToolLayout, TrustFooter, FAQ } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { calculerBrutNet } from "@ecosysteme/core/salary";
import type { BrutNetOutput } from "@ecosysteme/core/salary";
import { ToolRecommendations } from "../../lib/ToolRecommendations";
import { ExportPDFButton } from "../../lib/ExportPDFButton";
import { FAQ_BRUT_NET } from "../../lib/faq-data";
import { BrutNetContent } from "./BrutNetContent";

// Taux 2024
const TAUX = {
  baseCsgCrds: 0.9825,
  csgDeductible: 0.068,
  csgNonDeductible: 0.024,
  crds: 0.005,
  vieillessePlafonnee: 0.069,
  vieillesseDeplafonnee: 0.004,
  agircArrcoT1: 0.0315,
  agircArrcoT2: 0.0864,
  cegT2: 0.0108,
  apec: 0.00024,
  passMensuel: 3864,
};

const SMIC_HORAIRE = 11.65;
const HEURES_MOIS = 151.67;

type Statut = "non_cadre" | "cadre";

function fmt(n: number): string {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

function fmtPct(n: number): string {
  return (n * 100).toFixed(1) + "%";
}

// Calcul inverse net → brut par dichotomie
function calculerNetVersBrut(netCible: number, statut: Statut, tempsPartiel: number): number {
  let lo = netCible;
  let hi = netCible * 2;
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    try {
      const r = calculerBrutNet({ salaireBrutMensuel: mid, statut, tempsPartiel, ...TAUX });
      if (r.salaireNetAvantImpot < netCible) lo = mid;
      else hi = mid;
    } catch {
      lo = mid;
    }
  }
  return (lo + hi) / 2;
}

export function SimuBrutNetPage() {
  // Inputs
  const [brutMensuel, setBrutMensuel] = useState("");
  const [netMensuel, setNetMensuel] = useState("");
  const [statut, setStatut] = useState<Statut>("non_cadre");
  const [heuresParSemaine, setHeuresParSemaine] = useState(35);
  const [tempsPartiel, setTempsPartiel] = useState(100);
  const [nbMois, setNbMois] = useState(12);
  const [tauxPAS, setTauxPAS] = useState(0);
  const [direction, setDirection] = useState<"brut_to_net" | "net_to_brut">("brut_to_net");

  // Result
  const [result, setResult] = useState<BrutNetOutput | null>(null);
  const [brutCalc, setBrutCalc] = useState(0);

  useEffect(() => {
    track({ name: "tool_start", props: { tool: "simu-brut-net" } });
  }, []);

  const calculate = useCallback(() => {
    const tp = tempsPartiel / 100;
    const heuresMois = heuresParSemaine * 52 / 12;

    let brut: number;
    if (direction === "brut_to_net") {
      const val = parseFloat(brutMensuel);
      if (!brutMensuel || isNaN(val) || val <= 0) { setResult(null); return; }
      brut = val;
    } else {
      const val = parseFloat(netMensuel);
      if (!netMensuel || isNaN(val) || val <= 0) { setResult(null); return; }
      brut = calculerNetVersBrut(val, statut, tp);
    }

    try {
      const r = calculerBrutNet({
        salaireBrutMensuel: brut,
        statut,
        tempsPartiel: tp,
        ...TAUX,
      });
      setResult(r);
      setBrutCalc(brut);

      if (direction === "brut_to_net") {
        setNetMensuel(r.salaireNetAvantImpot.toFixed(2));
      } else {
        setBrutMensuel(brut.toFixed(2));
      }

      track({ name: "tool_complete", props: { tool: "simu-brut-net", completion_pct: 100 } });
    } catch {
      setResult(null);
    }
  }, [brutMensuel, netMensuel, statut, heuresParSemaine, tempsPartiel, nbMois, direction]);

  // Calcul en temps reel
  useEffect(() => {
    const timer = setTimeout(calculate, 200);
    return () => clearTimeout(timer);
  }, [calculate]);

  function fillSMIC() {
    const smicMensuel = SMIC_HORAIRE * HEURES_MOIS;
    setBrutMensuel(smicMensuel.toFixed(2));
    setDirection("brut_to_net");
  }

  function reset() {
    setBrutMensuel("");
    setNetMensuel("");
    setResult(null);
    setStatut("non_cadre");
    setHeuresParSemaine(35);
    setTempsPartiel(100);
    setNbMois(12);
    setTauxPAS(0);
  }

  const heuresMois = heuresParSemaine * 52 / 12;
  const brutAnnuel = brutCalc * nbMois;
  const brutHoraire = heuresMois > 0 ? brutCalc / heuresMois : 0;
  const netAnnuel = result ? result.salaireNetAvantImpot * nbMois : 0;
  const netHoraire = result && heuresMois > 0 ? result.salaireNetAvantImpot / heuresMois : 0;
  const netApresPAS = result ? result.salaireNetAvantImpot * (1 - tauxPAS / 100) : 0;
  const netAnnuelApresPAS = netApresPAS * nbMois;

  return (
    <ToolLayout
      title="Simulateur salaire brut / net"
      description="Convertissez instantanement votre salaire brut en net ou net en brut"
      footer={
        <TrustFooter
          baremeNom="Cotisations salariales 2024 — URSSAF"
          dateBareme="1er janvier 2024"
          sources={[{ label: "URSSAF — Taux de cotisations secteur prive", url: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/taux-cotisations-secteur-prive.html" }]}
          verifieLe="15 janvier 2024"
          casCouverts="les salaries du secteur prive (CDI/CDD), cadres et non-cadres"
          casNonCouverts="les fonctionnaires, les independants/TNS, les regimes speciaux"
        />
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* COLONNE GAUCHE — SAISIE */}
        <div className="space-y-6">
          {/* Inputs brut / net */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Salaire brut</label>
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] text-muted-light mb-0.5">Mensuel brut</p>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="decimal"
                      placeholder={`Ex: ${fmt(SMIC_HORAIRE * HEURES_MOIS)}`}
                      value={brutMensuel}
                      onChange={(e) => { setBrutMensuel(e.target.value); setDirection("brut_to_net"); }}
                      className="w-full rounded-lg border border-border bg-surface-card px-3 py-2.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      min={0}
                      step="any"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">EUR</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] text-muted-light mb-0.5">Annuel brut</p>
                    <div className="rounded-lg border border-border/60 bg-surface px-3 py-2 text-sm font-medium text-foreground">
                      {result ? fmt(brutAnnuel) : "—"}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-light mb-0.5">Horaire brut</p>
                    <div className="rounded-lg border border-border/60 bg-surface px-3 py-2 text-sm font-medium text-foreground">
                      {result ? fmt(brutHoraire) : "—"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                Salaire net
                {result && <span className="ml-1 text-primary">{statut === "cadre" ? "Cadre" : "Non-cadre"} {fmtPct(result.detail.tauxGlobalCotisations)}</span>}
              </label>
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] text-muted-light mb-0.5">Mensuel net</p>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="decimal"
                      placeholder="Mensuel"
                      value={netMensuel}
                      onChange={(e) => { setNetMensuel(e.target.value); setDirection("net_to_brut"); }}
                      className="w-full rounded-lg border border-border bg-surface-card px-3 py-2.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      min={0}
                      step="any"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">EUR</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] text-muted-light mb-0.5">Annuel net</p>
                    <div className="rounded-lg border border-border/60 bg-surface px-3 py-2 text-sm font-medium text-foreground">
                      {result ? fmt(netAnnuel) : "—"}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-light mb-0.5">Horaire net</p>
                    <div className="rounded-lg border border-border/60 bg-surface px-3 py-2 text-sm font-medium text-foreground">
                      {result ? fmt(netHoraire) : "—"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Boutons SMIC et Reset */}
          <div className="flex gap-2">
            <button type="button" onClick={fillSMIC} className="rounded-lg border border-border bg-surface-card px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-primary/30 hover:text-primary">
              Afficher le SMIC
            </button>
            <button type="button" onClick={reset} className="rounded-lg border border-border bg-surface-card px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-border-hover hover:text-foreground">
              Reinitialiser
            </button>
          </div>

          {/* Statut salarial */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Statut salarial</p>
            <div className="flex gap-2">
              {([
                { value: "non_cadre" as const, label: "Non-cadre" },
                { value: "cadre" as const, label: "Cadre" },
              ]).map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setStatut(s.value)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    statut === s.value
                      ? "border-primary bg-primary-light text-primary"
                      : "border-border bg-surface-card text-muted hover:border-border-hover"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* COLONNE DROITE — PARAMETRES + RESULTATS */}
        <div className="space-y-6">
          {/* Heures par semaine */}
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Heures / semaine</p>
              <p className="text-sm font-bold text-foreground">{heuresParSemaine}h</p>
            </div>
            <input
              type="range"
              min={10}
              max={48}
              value={heuresParSemaine}
              onChange={(e) => setHeuresParSemaine(parseInt(e.target.value, 10))}
              className="mt-2 w-full accent-primary"
            />
          </div>

          {/* Temps de travail */}
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Temps de travail</p>
              <p className="text-sm font-bold text-foreground">{tempsPartiel}%</p>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={tempsPartiel}
              onChange={(e) => setTempsPartiel(parseInt(e.target.value, 10))}
              className="mt-2 w-full accent-primary"
            />
          </div>

          {/* Nombre de mois */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Nombre de mois (prime)</p>
            <div className="flex gap-2">
              {[12, 13, 14, 15, 16].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setNbMois(m)}
                  className={`flex-1 rounded-lg border py-2 text-xs font-medium transition-colors ${
                    nbMois === m
                      ? "border-primary bg-primary-light text-primary"
                      : "border-border bg-surface-card text-muted hover:border-border-hover"
                  }`}
                >
                  {m} mois
                </button>
              ))}
            </div>
          </div>

          {/* Prelevement a la source */}
          <div className="rounded-xl border border-border bg-surface-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Prelevement a la source</p>
              <p className="text-sm font-bold text-foreground">{tauxPAS}%</p>
            </div>
            <input
              type="range"
              min={0}
              max={45}
              step={0.5}
              value={tauxPAS}
              onChange={(e) => setTauxPAS(parseFloat(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
            {result && tauxPAS > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[10px] text-muted">Mensuel net apres impot</p>
                  <p className="font-bold text-foreground">{fmt(netApresPAS)} EUR</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted">Annuel net apres impot</p>
                  <p className="font-bold text-foreground">{fmt(netAnnuelApresPAS)} EUR</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RESULTATS DETAILLES */}
      {result && (
        <div className="mt-8 space-y-4">
          <div className="overflow-hidden rounded-xl border border-border bg-surface-card shadow-sm">
            <div className="border-b border-border/60 bg-primary-light px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Resultats detailles</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-xs text-muted">
                    <th className="px-5 py-2.5 text-left font-medium" />
                    <th className="px-3 py-2.5 text-right font-medium">Mensuel</th>
                    <th className="px-3 py-2.5 text-right font-medium">Annuel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  <tr>
                    <td className="px-5 py-2.5 font-medium text-foreground">Salaire brut</td>
                    <td className="px-3 py-2.5 text-right font-semibold">{fmt(brutCalc)} EUR</td>
                    <td className="px-3 py-2.5 text-right text-muted">{fmt(brutAnnuel)} EUR</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-2.5 text-muted">CSG + CRDS</td>
                    <td className="px-3 py-2.5 text-right text-danger">-{fmt(result.detail.montantCsgCrds)} EUR</td>
                    <td className="px-3 py-2.5 text-right text-muted">-{fmt(result.detail.montantCsgCrds * nbMois)} EUR</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-2.5 text-muted">Assurance vieillesse</td>
                    <td className="px-3 py-2.5 text-right text-danger">-{fmt(result.detail.montantVieillessePlafonnee + result.detail.montantVieillesseDeplafonnee)} EUR</td>
                    <td className="px-3 py-2.5 text-right text-muted">-{fmt((result.detail.montantVieillessePlafonnee + result.detail.montantVieillesseDeplafonnee) * nbMois)} EUR</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-2.5 text-muted">Retraite complementaire</td>
                    <td className="px-3 py-2.5 text-right text-danger">-{fmt(result.detail.montantRetraiteComplementaire)} EUR</td>
                    <td className="px-3 py-2.5 text-right text-muted">-{fmt(result.detail.montantRetraiteComplementaire * nbMois)} EUR</td>
                  </tr>
                  {result.detail.montantApec > 0 && (
                    <tr>
                      <td className="px-5 py-2.5 text-muted">APEC (cadre)</td>
                      <td className="px-3 py-2.5 text-right text-danger">-{fmt(result.detail.montantApec)} EUR</td>
                      <td className="px-3 py-2.5 text-right text-muted">-{fmt(result.detail.montantApec * nbMois)} EUR</td>
                    </tr>
                  )}
                  <tr className="bg-surface font-semibold">
                    <td className="px-5 py-2.5 text-foreground">Total cotisations ({fmtPct(result.detail.tauxGlobalCotisations)})</td>
                    <td className="px-3 py-2.5 text-right text-danger">-{fmt(result.totalCotisationsSalariales)} EUR</td>
                    <td className="px-3 py-2.5 text-right text-danger">-{fmt(result.totalCotisationsSalariales * nbMois)} EUR</td>
                  </tr>
                  <tr className="font-bold text-primary">
                    <td className="px-5 py-3">Salaire net avant impot</td>
                    <td className="px-3 py-3 text-right">{fmt(result.salaireNetAvantImpot)} EUR</td>
                    <td className="px-3 py-3 text-right">{fmt(netAnnuel)} EUR</td>
                  </tr>
                  {tauxPAS > 0 && (
                    <>
                      <tr>
                        <td className="px-5 py-2.5 text-muted">Prelevement a la source ({tauxPAS}%)</td>
                        <td className="px-3 py-2.5 text-right text-danger">-{fmt(result.salaireNetAvantImpot * tauxPAS / 100)} EUR</td>
                        <td className="px-3 py-2.5 text-right text-muted">-{fmt(result.salaireNetAvantImpot * tauxPAS / 100 * nbMois)} EUR</td>
                      </tr>
                      <tr className="font-bold">
                        <td className="px-5 py-3 text-foreground">Net apres impot</td>
                        <td className="px-3 py-3 text-right text-foreground">{fmt(netApresPAS)} EUR</td>
                        <td className="px-3 py-3 text-right text-foreground">{fmt(netAnnuelApresPAS)} EUR</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex gap-2">
            <ExportPDFButton toolSlug="simulateur-brut-net" templateData={{
              title: "Simulation salaire brut / net", toolName: "Simulateur brut net",
              generatedAt: new Date().toLocaleDateString("fr-FR"),
              sections: [{ heading: "Resultat", rows: [
                { label: "Salaire brut mensuel", value: `${fmt(brutCalc)} EUR` },
                { label: "Cotisations salariales", value: `-${fmt(result.totalCotisationsSalariales)} EUR (${fmtPct(result.detail.tauxGlobalCotisations)})` },
                { label: "Salaire net avant impot", value: `${fmt(result.salaireNetAvantImpot)} EUR` },
                { label: "Salaire brut annuel", value: `${fmt(brutAnnuel)} EUR (${nbMois} mois)` },
                { label: "Salaire net annuel", value: `${fmt(netAnnuel)} EUR` },
                ...(tauxPAS > 0 ? [{ label: `Net apres impot (PAS ${tauxPAS}%)`, value: `${fmt(netApresPAS)} EUR / mois` }] : []),
              ]}],
              sources: [{ label: "URSSAF — Cotisations", url: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/taux-cotisations-secteur-prive.html" }],
              disclaimer: "Resultats indicatifs.",
            }} />
          </div>

          <ToolRecommendations currentToolSlug="simu-brut-net" />
        </div>
      )}

      <BrutNetContent />

      <FAQ items={FAQ_BRUT_NET} />
    </ToolLayout>
  );
}
