"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "@ecosysteme/analytics";
import { SITUATIONS, getSituationsForTool } from "../lib/situations";

interface Tool {
  name: string;
  url: string;
  desc: string;
  cat: string;
}

const TOOLS: Tool[] = [
  { name: "Rupture conventionnelle", url: "/outils/rupture-conventionnelle", desc: "Indemnite legale de rupture conventionnelle", cat: "Droit du travail" },
  { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Conversion salaire brut en net avec cotisations", cat: "Salaire" },
  { name: "Optimisation SASU", url: "/outils/optimisation-sasu", desc: "Repartition optimale salaire/dividendes", cat: "Freelance" },
  { name: "Auto-entrepreneur", url: "/outils/simulateur-auto-entrepreneur", desc: "Cotisations et revenu net micro-entreprise", cat: "Freelance" },
  { name: "Comparateur SASU vs AE", url: "/outils/comparateur-statuts", desc: "Comparez revenus nets et protection sociale", cat: "Freelance" },
  { name: "Simulateur TMI", url: "/outils/simulateur-tmi", desc: "Taux marginal d\u2019imposition et detail IR", cat: "Fiscalite" },
  { name: "Indemnites kilometriques", url: "/outils/indemnites-km", desc: "Frais kilometriques deductibles (bareme fiscal)", cat: "Fiscalite" },
  { name: "Revision de loyer", url: "/outils/revision-loyer", desc: "Revision annuelle avec indice IRL", cat: "Immobilier" },
  { name: "Frais de notaire", url: "/outils/frais-notaire", desc: "Estimation frais achat immobilier", cat: "Immobilier" },
  { name: "Rendement locatif", url: "/outils/rendement-locatif", desc: "Rentabilite brute et nette investissement", cat: "Immobilier" },
  { name: "Plus-value immobiliere", url: "/outils/plus-value-immobiliere", desc: "Imposition sur la revente d\u2019un bien", cat: "Immobilier" },
  { name: "Niveau de richesse", url: "/outils/niveau-richesse", desc: "Ou vous situez-vous par rapport aux Francais ?", cat: "Salaire" },
  { name: "Allocations chomage", url: "/outils/allocation-chomage", desc: "Estimation allocation chomage (ARE)", cat: "Droit du travail" },
  { name: "Simulateur retraite", url: "/outils/simulateur-retraite", desc: "Estimation pension de retraite", cat: "Droit du travail" },
  { name: "Prime d\u2019activite", url: "/outils/prime-activite", desc: "Estimation prime d\u2019activite CAF", cat: "Salaire" },
  { name: "Conges payes", url: "/outils/conges-payes", desc: "Indemnite de conges payes", cat: "Droit du travail" },
  { name: "Jours ouvres", url: "/outils/jours-ouvres", desc: "Nombre de jours ouvres entre deux dates (feries inclus)", cat: "Droit du travail" },
  { name: "Frais reels", url: "/outils/frais-reels-impots", desc: "Comparez frais reels et forfait 10% pour votre IR", cat: "Fiscalite" },
];

const FILTERS = [
  { id: "tous", label: "Tous" },
  ...SITUATIONS.map((s) => ({ id: s.id, label: s.subtitle })),
];

function getToolSlugFromUrl(url: string): string {
  return url.replace("/outils/", "");
}

export function OutilsFilter() {
  const [active, setActive] = useState("tous");

  const filtered =
    active === "tous"
      ? TOOLS
      : TOOLS.filter((tool) => {
          const slug = getToolSlugFromUrl(tool.url);
          const situations = getSituationsForTool(slug);
          return situations.includes(active);
        });

  const categories = [...new Set(filtered.map((t) => t.cat))];

  return (
    <>
      <nav className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => {
              setActive(f.id);
              track({ name: "outils_filter", props: { situation: f.id } });
            }}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              active === f.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-surface-card text-muted hover:border-primary/30 hover:text-primary"
            }`}
          >
            {f.label}
          </button>
        ))}
      </nav>

      <div className="space-y-8">
        {categories.map((cat) => (
          <section key={cat} id={cat.toLowerCase().replace(/\s+/g, "-")}>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted">
              {cat}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered
                .filter((t) => t.cat === cat)
                .map((tool) => (
                  <Link
                    key={tool.url}
                    href={tool.url}
                    className="group rounded-xl border border-border bg-surface-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                  >
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary">
                      {tool.name}
                    </p>
                    <p className="mt-1 text-xs text-muted">{tool.desc}</p>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
