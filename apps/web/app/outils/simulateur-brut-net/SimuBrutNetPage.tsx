"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ToolLayout, TrustFooter, FAQ } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { calculerBrutNet } from "@ecosysteme/core/salary";
import type { BrutNetOutput } from "@ecosysteme/core/salary";
import { ToolRecommendations } from "../../lib/ToolRecommendations";
import { ExportPDFButton } from "../../lib/ExportPDFButton";
import { FAQ_BRUT_NET } from "../../lib/faq-data";
import { BrutNetContent } from "./BrutNetContent";

const TAUX = {
  baseCsgCrds: 0.9825, csgDeductible: 0.068, csgNonDeductible: 0.024, crds: 0.005,
  vieillessePlafonnee: 0.069, vieillesseDeplafonnee: 0.004, agircArrcoT1: 0.0315,
  agircArrcoT2: 0.0864, cegT2: 0.0108, apec: 0.00024, passMensuel: 4005,
};

const SMIC_HORAIRE = 12.02;
const HEURES_MOIS_STD = 151.67;

type Statut = "non_cadre" | "cadre";
type Source = "brut_annuel" | "brut_mensuel" | "brut_horaire" | "net_annuel" | "net_mensuel" | "net_horaire";

function fmt(n: number): string {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}
function fmtPct(n: number): string {
  return (n * 100).toFixed(1) + "%";
}

function netVersBrut(net: number, statut: Statut, tp: number): number {
  let lo = net, hi = net * 2;
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    try {
      const r = calculerBrutNet({ salaireBrutMensuel: mid, statut, tempsPartiel: tp, ...TAUX });
      if (r.salaireNetAvantImpot < net) lo = mid; else hi = mid;
    } catch { lo = mid; }
  }
  return (lo + hi) / 2;
}

export function SimuBrutNetPage() {
  const [vals, setVals] = useState({ brut_annuel: "", brut_mensuel: "", brut_horaire: "", net_annuel: "", net_mensuel: "", net_horaire: "" });
  const [statut, setStatut] = useState<Statut>("non_cadre");
  const [heures, setHeures] = useState(35);
  const [tempsPartiel, setTempsPartiel] = useState(100);
  const [nbMois, setNbMois] = useState(12);
  const [tauxPAS, setTauxPAS] = useState(0);
  const [result, setResult] = useState<BrutNetOutput | null>(null);
  const [brutCalc, setBrutCalc] = useState(0);
  const sourceRef = useRef<Source | null>(null);

  useEffect(() => { track({ name: "tool_start", props: { tool: "simu-brut-net" } }); }, []);

  const heuresMois = heures * 52 / 12;
  const tp = tempsPartiel / 100;

  const recalc = useCallback(() => {
    const src = sourceRef.current;
    if (!src) return;
    const raw = vals[src];
    const v = parseFloat(raw);
    if (!raw || isNaN(v) || v <= 0) { setResult(null); return; }

    // Determiner le brut mensuel selon la source
    let brutMensuel: number;
    if (src === "brut_mensuel") brutMensuel = v;
    else if (src === "brut_annuel") brutMensuel = v / nbMois;
    else if (src === "brut_horaire") brutMensuel = v * heuresMois;
    else if (src === "net_mensuel") brutMensuel = netVersBrut(v, statut, tp);
    else if (src === "net_annuel") brutMensuel = netVersBrut(v / nbMois, statut, tp);
    else brutMensuel = netVersBrut(v * heuresMois, statut, tp);

    if (brutMensuel <= 0) { setResult(null); return; }

    try {
      const r = calculerBrutNet({ salaireBrutMensuel: brutMensuel, statut, tempsPartiel: tp, ...TAUX });
      setResult(r);
      setBrutCalc(brutMensuel);

      // Remplir tous les champs SAUF celui en cours de saisie
      const newVals = { ...vals };
      if (src !== "brut_mensuel") newVals.brut_mensuel = brutMensuel.toFixed(2);
      if (src !== "brut_annuel") newVals.brut_annuel = (brutMensuel * nbMois).toFixed(2);
      if (src !== "brut_horaire") newVals.brut_horaire = (heuresMois > 0 ? brutMensuel / heuresMois : 0).toFixed(2);
      if (src !== "net_mensuel") newVals.net_mensuel = r.salaireNetAvantImpot.toFixed(2);
      if (src !== "net_annuel") newVals.net_annuel = (r.salaireNetAvantImpot * nbMois).toFixed(2);
      if (src !== "net_horaire") newVals.net_horaire = (heuresMois > 0 ? r.salaireNetAvantImpot / heuresMois : 0).toFixed(2);
      setVals(newVals);

      track({ name: "tool_complete", props: { tool: "simu-brut-net", completion_pct: 100 } });
    } catch { setResult(null); }
  }, [vals, statut, heures, tempsPartiel, nbMois, tp, heuresMois]);

  useEffect(() => {
    const t = setTimeout(recalc, 250);
    return () => clearTimeout(t);
  }, [recalc]);

  function onInput(field: Source, value: string) {
    sourceRef.current = field;
    setVals((prev) => ({ ...prev, [field]: value }));
  }

  function fillSMIC() {
    sourceRef.current = "brut_mensuel";
    setVals((prev) => ({ ...prev, brut_mensuel: (SMIC_HORAIRE * HEURES_MOIS_STD).toFixed(2) }));
  }

  function reset() {
    sourceRef.current = null;
    setVals({ brut_annuel: "", brut_mensuel: "", brut_horaire: "", net_annuel: "", net_mensuel: "", net_horaire: "" });
    setResult(null); setStatut("non_cadre"); setHeures(35); setTempsPartiel(100); setNbMois(12); setTauxPAS(0);
  }

  const badge = `${statut === "cadre" ? "Cadre" : "Non-cadre"} -${result ? Math.round(result.detail.tauxGlobalCotisations * 100) : 22}%`;
  const netApresPAS = result ? result.salaireNetAvantImpot * (1 - tauxPAS / 100) : 0;

  return (
    <ToolLayout
      title="Simulateur salaire brut / net"
      description="Saisissez un montant dans n&apos;importe quel champ — tous les autres se calculent automatiquement"
      footer={
        <TrustFooter baremeNom="Cotisations salariales 2024 — URSSAF" dateBareme="1er janvier 2024"
          sources={[{ label: "URSSAF — Taux de cotisations secteur prive", url: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/taux-cotisations-secteur-prive.html" }]}
          verifieLe="15 janvier 2024" casCouverts="les salaries du secteur prive (CDI/CDD), cadres et non-cadres"
          casNonCouverts="les fonctionnaires, les independants/TNS, les regimes speciaux" />
      }
    >
      {/* SAISIE — 6 champs editables */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Saisissez votre salaire brut</p>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Saisissez votre salaire net</p>
          {result && <span className="rounded-full border border-primary/20 bg-primary-light px-2 py-0.5 text-[10px] font-medium text-primary">{badge}</span>}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3">
        {([
          ["brut_annuel", "Annuel brut", "Ex: 28 990"],
          ["net_annuel", "Annuel net", "Annuel"],
          ["brut_mensuel", "Mensuel brut", "Ex: 2 415"],
          ["net_mensuel", "Mensuel net", "Mensuel"],
          ["brut_horaire", "Horaire brut", "Ex: 15,93"],
          ["net_horaire", "Horaire net", "Horaire"],
        ] as const).map(([field, label, ph]) => (
          <div key={field}>
            <p className="text-[10px] text-muted-light mb-0.5">{label}</p>
            <div className="relative">
              <input type="number" inputMode="decimal" placeholder={ph} value={vals[field]}
                onChange={(e) => onInput(field, e.target.value)} min={0} step="any"
                className="w-full rounded-lg border border-border bg-surface-card px-3 py-2.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-light">EUR</span>
            </div>
          </div>
        ))}
      </div>

      {/* Actions + Statut */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button type="button" onClick={fillSMIC} className="rounded-lg border border-border bg-surface-card px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-primary/30 hover:text-primary">Afficher le SMIC</button>
        <button type="button" onClick={reset} className="rounded-lg border border-border bg-surface-card px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-border-hover hover:text-foreground">Reinitialiser</button>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Statut salarial</p>
        <div className="flex flex-wrap gap-2">
          {([
            { value: "non_cadre" as const, label: "Salarie non-cadre" },
            { value: "cadre" as const, label: "Salarie cadre" },
          ]).map((s) => (
            <button key={s.value} type="button" onClick={() => { setStatut(s.value); if (sourceRef.current) recalc(); }}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${statut === s.value ? "border-primary bg-primary-light text-primary" : "border-border bg-surface-card text-muted hover:border-border-hover"}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Parametres */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-wider text-muted">Heures / semaine</p><p className="text-sm font-bold text-foreground">{heures}h</p></div>
          <input type="range" min={10} max={48} value={heures} onChange={(e) => setHeures(parseInt(e.target.value, 10))} className="mt-2 w-full accent-primary" />
        </div>
        <div>
          <div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-wider text-muted">Temps de travail</p><p className="text-sm font-bold text-foreground">{tempsPartiel}%</p></div>
          <input type="range" min={10} max={100} step={5} value={tempsPartiel} onChange={(e) => setTempsPartiel(parseInt(e.target.value, 10))} className="mt-2 w-full accent-primary" />
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Mois (prime)</p>
          <div className="flex gap-1">
            {[12, 13, 14, 15, 16].map((m) => (
              <button key={m} type="button" onClick={() => setNbMois(m)}
                className={`flex-1 rounded-lg border py-1.5 text-xs font-medium transition-colors ${nbMois === m ? "border-primary bg-primary-light text-primary" : "border-border bg-surface-card text-muted hover:border-border-hover"}`}>
                {m}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-wider text-muted">Prelevement source</p><p className="text-sm font-bold text-foreground">{tauxPAS}%</p></div>
          <input type="range" min={0} max={45} step={0.5} value={tauxPAS} onChange={(e) => setTauxPAS(parseFloat(e.target.value))} className="mt-2 w-full accent-primary" />
        </div>
      </div>

      {/* Resultat PAS */}
      {result && tauxPAS > 0 && (
        <div className="mt-4 rounded-xl border border-border bg-surface-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Net apres prelevement a la source</p>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div><p className="text-2xl font-bold text-foreground">{fmt(netApresPAS)} EUR</p><p className="text-[10px] text-muted">par mois</p></div>
            <div><p className="text-2xl font-bold text-foreground">{fmt(netApresPAS * nbMois)} EUR</p><p className="text-[10px] text-muted">par an ({nbMois} mois)</p></div>
          </div>
        </div>
      )}

      {/* Tableau detaille */}
      {result && (
        <div className="mt-8 space-y-4">
          <div className="overflow-hidden rounded-xl border border-border bg-surface-card shadow-sm">
            <div className="border-b border-border/60 bg-primary-light px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Resultats detailles</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border/60 text-xs text-muted"><th className="px-5 py-2 text-left font-medium" /><th className="px-3 py-2 text-right font-medium">Mensuel</th><th className="px-3 py-2 text-right font-medium">Annuel</th></tr></thead>
                <tbody className="divide-y divide-border/40">
                  <tr><td className="px-5 py-2 font-medium text-foreground">Salaire brut</td><td className="px-3 py-2 text-right font-semibold">{fmt(brutCalc)} EUR</td><td className="px-3 py-2 text-right text-muted">{fmt(brutCalc * nbMois)} EUR</td></tr>
                  <tr><td className="px-5 py-2 text-muted">CSG + CRDS</td><td className="px-3 py-2 text-right text-danger">-{fmt(result.detail.montantCsgCrds)} EUR</td><td className="px-3 py-2 text-right text-muted">-{fmt(result.detail.montantCsgCrds * nbMois)} EUR</td></tr>
                  <tr><td className="px-5 py-2 text-muted">Assurance vieillesse</td><td className="px-3 py-2 text-right text-danger">-{fmt(result.detail.montantVieillessePlafonnee + result.detail.montantVieillesseDeplafonnee)} EUR</td><td className="px-3 py-2 text-right text-muted">-{fmt((result.detail.montantVieillessePlafonnee + result.detail.montantVieillesseDeplafonnee) * nbMois)} EUR</td></tr>
                  <tr><td className="px-5 py-2 text-muted">Retraite complementaire</td><td className="px-3 py-2 text-right text-danger">-{fmt(result.detail.montantRetraiteComplementaire)} EUR</td><td className="px-3 py-2 text-right text-muted">-{fmt(result.detail.montantRetraiteComplementaire * nbMois)} EUR</td></tr>
                  {result.detail.montantApec > 0 && <tr><td className="px-5 py-2 text-muted">APEC (cadre)</td><td className="px-3 py-2 text-right text-danger">-{fmt(result.detail.montantApec)} EUR</td><td className="px-3 py-2 text-right text-muted">-{fmt(result.detail.montantApec * nbMois)} EUR</td></tr>}
                  <tr className="bg-surface font-semibold"><td className="px-5 py-2 text-foreground">Total cotisations ({fmtPct(result.detail.tauxGlobalCotisations)})</td><td className="px-3 py-2 text-right text-danger">-{fmt(result.totalCotisationsSalariales)} EUR</td><td className="px-3 py-2 text-right text-danger">-{fmt(result.totalCotisationsSalariales * nbMois)} EUR</td></tr>
                  <tr className="font-bold text-primary"><td className="px-5 py-2.5">Salaire net avant impot</td><td className="px-3 py-2.5 text-right">{fmt(result.salaireNetAvantImpot)} EUR</td><td className="px-3 py-2.5 text-right">{fmt(result.salaireNetAvantImpot * nbMois)} EUR</td></tr>
                  {tauxPAS > 0 && (<><tr><td className="px-5 py-2 text-muted">Prelevement source ({tauxPAS}%)</td><td className="px-3 py-2 text-right text-danger">-{fmt(result.salaireNetAvantImpot * tauxPAS / 100)} EUR</td><td className="px-3 py-2 text-right text-muted">-{fmt(result.salaireNetAvantImpot * tauxPAS / 100 * nbMois)} EUR</td></tr>
                  <tr className="font-bold"><td className="px-5 py-2.5 text-foreground">Net apres impot</td><td className="px-3 py-2.5 text-right text-foreground">{fmt(netApresPAS)} EUR</td><td className="px-3 py-2.5 text-right text-foreground">{fmt(netApresPAS * nbMois)} EUR</td></tr></>)}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex gap-2">
            <ExportPDFButton toolSlug="simulateur-brut-net" templateData={{ title: "Simulation salaire brut / net", toolName: "Simulateur brut net", generatedAt: new Date().toLocaleDateString("fr-FR"),
              sections: [{ heading: "Resultat", rows: [
                { label: "Salaire brut mensuel", value: `${fmt(brutCalc)} EUR` },
                { label: "Cotisations", value: `-${fmt(result.totalCotisationsSalariales)} EUR (${fmtPct(result.detail.tauxGlobalCotisations)})` },
                { label: "Net avant impot", value: `${fmt(result.salaireNetAvantImpot)} EUR` },
                { label: "Brut annuel", value: `${fmt(brutCalc * nbMois)} EUR (${nbMois} mois)` },
                { label: "Net annuel", value: `${fmt(result.salaireNetAvantImpot * nbMois)} EUR` },
                ...(tauxPAS > 0 ? [{ label: `Net apres impot (PAS ${tauxPAS}%)`, value: `${fmt(netApresPAS)} EUR / mois` }] : []),
              ]}],
              sources: [{ label: "URSSAF", url: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/taux-cotisations-secteur-prive.html" }],
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
