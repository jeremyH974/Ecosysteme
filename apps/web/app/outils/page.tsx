import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../lib/JsonLd";

export const metadata: Metadata = {
  title: "Tous les outils — Ecosysteme",
  description: "11 calculateurs gratuits pour les Francais : droit du travail, freelance, immobilier, fiscalite.",
  openGraph: { title: "Tous les outils — Ecosysteme", description: "11 calculateurs gratuits et precis.", type: "website" },
};

const TOOLS = [
  { name: "Rupture conventionnelle", url: "/outils/rupture-conventionnelle", desc: "Indemnite legale de rupture conventionnelle", cat: "Droit du travail" },
  { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Conversion salaire brut en net avec cotisations", cat: "Salaire" },
  { name: "Optimisation SASU", url: "/outils/optimisation-sasu", desc: "Repartition optimale salaire/dividendes", cat: "Freelance" },
  { name: "Auto-entrepreneur", url: "/outils/simulateur-auto-entrepreneur", desc: "Cotisations et revenu net micro-entreprise", cat: "Freelance" },
  { name: "Comparateur SASU vs AE", url: "/outils/comparateur-statuts", desc: "Comparez revenus nets et protection sociale", cat: "Freelance" },
  { name: "Simulateur TMI", url: "/outils/simulateur-tmi", desc: "Taux marginal d'imposition et detail IR", cat: "Fiscalite" },
  { name: "Indemnites kilometriques", url: "/outils/indemnites-km", desc: "Frais kilometriques deductibles (bareme fiscal)", cat: "Fiscalite" },
  { name: "Revision de loyer", url: "/outils/revision-loyer", desc: "Revision annuelle avec indice IRL", cat: "Immobilier" },
  { name: "Frais de notaire", url: "/outils/frais-notaire", desc: "Estimation frais achat immobilier", cat: "Immobilier" },
  { name: "Rendement locatif", url: "/outils/rendement-locatif", desc: "Rentabilite brute et nette investissement", cat: "Immobilier" },
  { name: "Plus-value immobiliere", url: "/outils/plus-value-immobiliere", desc: "Imposition sur la revente d'un bien", cat: "Immobilier" },
];

const CATEGORIES = [...new Set(TOOLS.map((t) => t.cat))];

export default function Page() {
  return (
    <>
      <JsonLd type="WebApplication" data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Ecosysteme — Tous les outils", description: "11 calculateurs gratuits", url: "/outils" }} />
      <main className="mx-auto max-w-5xl px-5 py-10">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">Tous les outils</h1>
          <p className="mt-1.5 text-sm text-muted">11 calculateurs gratuits, precis et transparents.</p>
        </div>

        <nav className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <a key={cat} href={`#${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-full border border-border bg-surface-card px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-accent/30 hover:text-accent">
              {cat}
            </a>
          ))}
        </nav>

        <div className="space-y-8">
          {CATEGORIES.map((cat) => (
            <section key={cat} id={cat.toLowerCase().replace(/\s+/g, "-")}>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted">{cat}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {TOOLS.filter((t) => t.cat === cat).map((tool) => (
                  <Link key={tool.url} href={tool.url}
                    className="group rounded-xl border border-border bg-surface-card p-4 transition-all hover:border-accent/30 hover:shadow-sm">
                    <p className="text-sm font-semibold text-foreground group-hover:text-accent">{tool.name}</p>
                    <p className="mt-1 text-xs text-muted">{tool.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
