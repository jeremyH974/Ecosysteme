"use client";

import { useEffect, useState, useCallback } from "react";
import { ToolLayout, TrustFooter, FAQ } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { calculerPrimeActivite } from "@ecosysteme/core/salary";
import type { PrimeActiviteOutput } from "@ecosysteme/core/salary";
import { NextStepBlock } from "../../lib/NextStepBlock";
import { ExportPDFButton } from "../../lib/ExportPDFButton";
import { FAQ_PRIME } from "../../lib/faq-data";
import { PrimeActiviteContent } from "./PrimeActiviteContent";

function fmt(n: number): string {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

export function PrimeActivitePage() {
  const [salaireNet, setSalaireNet] = useState("");
  const [nbPersonnes, setNbPersonnes] = useState("1");
  const [nbEnfants, setNbEnfants] = useState("0");
  const [autresRevenus, setAutresRevenus] = useState("");
  const [result, setResult] = useState<PrimeActiviteOutput | null>(null);

  useEffect(() => {
    track({ name: "tool_start", props: { tool: "prime-activite" } });
  }, []);

  const calculate = useCallback(() => {
    const s = parseFloat(salaireNet);
    if (!salaireNet || isNaN(s) || s < 0) {
      setResult(null);
      return;
    }

    try {
      const r = calculerPrimeActivite({
        salaireNetMensuel: s,
        nbPersonnesFoyer: parseInt(nbPersonnes, 10),
        nbEnfants: parseInt(nbEnfants, 10),
        autresRevenus: autresRevenus ? parseFloat(autresRevenus) : 0,
        montantForfaitaire: 622.63,
        bonification: 173.22,
        seuilBonification: 632.16,
        plafondBonification: 1264.32,
      });
      setResult(r);
      track({ name: "tool_complete", props: { tool: "prime-activite", completion_pct: 100 } });
    } catch {
      setResult(null);
    }
  }, [salaireNet, nbPersonnes, nbEnfants, autresRevenus]);

  useEffect(() => {
    const timer = setTimeout(calculate, 200);
    return () => clearTimeout(timer);
  }, [calculate]);

  return (
    <ToolLayout
      title="Simulateur prime d&apos;activite"
      description="Estimez votre prime d&apos;activite CAF en fonction de votre situation"
      footer={
        <TrustFooter
          baremeNom="Prime d'activite — Art. L842-1 et suivants du Code de la Securite Sociale"
          dateBareme="1er avril 2026"
          sources={[{ label: "CAF — Prime d'activite", url: "https://www.caf.fr/allocataires/droits-et-prestations/s-informer-sur-les-aides/solidarite-et-insertion/la-prime-d-activite" }]}
          verifieLe="14 avril 2026"
          casCouverts="les salaries de 18 ans et plus, residant en France, dont les revenus ne depassent pas le plafond"
          casNonCouverts="les travailleurs detaches, les personnes en conge parental total, les etudiants/apprentis gagnant moins de 1 082 EUR net/mois. Cette simulation est indicative : le montant reel depend du detail des ressources du foyer (CAF)"
        />
      }
    >
      {/* Saisie */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Salaire net mensuel
          </label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              placeholder="Ex: 1 443"
              value={salaireNet}
              onChange={(e) => setSalaireNet(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface-card px-3 py-2.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              min={0}
              step="any"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">EUR</span>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Personnes au foyer
          </label>
          <select
            value={nbPersonnes}
            onChange={(e) => setNbPersonnes(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface-card px-3 py-2.5 text-sm text-foreground shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="1">1 (celibataire)</option>
            <option value="2">2 (couple)</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Nombre d&apos;enfants
          </label>
          <select
            value={nbEnfants}
            onChange={(e) => setNbEnfants(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface-card px-3 py-2.5 text-sm text-foreground shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Autres revenus (optionnel)
          </label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              placeholder="Ex: 0"
              value={autresRevenus}
              onChange={(e) => setAutresRevenus(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface-card px-3 py-2.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              min={0}
              step="any"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">EUR</span>
          </div>
        </div>
      </div>

      {/* Resultat */}
      {result && (
        <div className="mt-8 space-y-6">
          {/* Montant principal + badge */}
          <div className="rounded-xl border border-border bg-surface-card p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Prime d&apos;activite estimee</p>
            <p className="mt-2 text-3xl font-extrabold text-primary sm:text-4xl">
              {fmt(result.montantEstime)} EUR
            </p>
            <div className="mt-3">
              {result.eligible ? (
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-xs font-semibold text-green-700">
                  Eligible
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-xs font-semibold text-red-700">
                  Non eligible
                </span>
              )}
            </div>
          </div>

          {/* Detail */}
          <div className="overflow-hidden rounded-xl border border-border bg-surface-card shadow-sm">
            <div className="border-b border-border/60 bg-primary-light px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Detail du calcul</p>
            </div>
            <div className="divide-y divide-border/40 text-sm">
              <div className="flex justify-between px-5 py-2.5">
                <span className="text-muted">Montant forfaitaire</span>
                <span className="font-semibold text-foreground">{fmt(result.detail.forfaitaire)} EUR</span>
              </div>
              <div className="flex justify-between px-5 py-2.5">
                <span className="text-muted">Bonification individuelle</span>
                <span className="font-semibold text-foreground">{fmt(result.detail.bonification)} EUR</span>
              </div>
              <div className="flex justify-between px-5 py-2.5">
                <span className="text-muted">Revenus pris en compte</span>
                <span className="font-semibold text-foreground">{fmt(result.detail.revenus)} EUR</span>
              </div>
              <div className="flex justify-between px-5 py-2.5">
                <span className="text-muted">Nombre de personnes au foyer</span>
                <span className="font-semibold text-foreground">{result.detail.nbPersonnes}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <ExportPDFButton toolSlug="prime-activite" templateData={{
              title: "Simulation prime d'activite", toolName: "Prime d'activite",
              generatedAt: new Date().toLocaleDateString("fr-FR"),
              sections: [{ heading: "Resultat", rows: [
                { label: "Prime estimee", value: `${fmt(result.montantEstime)} EUR` },
                { label: "Eligible", value: result.eligible ? "Oui" : "Non" },
                { label: "Forfaitaire", value: `${fmt(result.detail.forfaitaire)} EUR` },
                { label: "Bonification", value: `${fmt(result.detail.bonification)} EUR` },
                { label: "Revenus pris en compte", value: `${fmt(result.detail.revenus)} EUR` },
              ]}],
              sources: [{ label: "CAF — Prime d'activite", url: "https://www.caf.fr" }],
              disclaimer: "Estimation indicative. Le montant reel depend du detail des ressources du foyer (CAF).",
            }} />
          </div>

          <NextStepBlock currentToolSlug="prime-activite" />
        </div>
      )}

      <PrimeActiviteContent />
      <FAQ items={FAQ_PRIME} />
    </ToolLayout>
  );
}
