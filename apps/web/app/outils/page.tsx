import type { Metadata } from "next";
import { JsonLd } from "../lib/JsonLd";

export const metadata: Metadata = {
  title: "Tous les outils — Ecosysteme",
  description:
    "8 calculateurs gratuits pour les Francais : rupture conventionnelle, brut/net, SASU, auto-entrepreneur, TMI, frais de notaire, loyer, rendement locatif.",
  openGraph: {
    title: "Tous les outils — Ecosysteme",
    description: "8 calculateurs gratuits et precis pour les Francais.",
    type: "website",
  },
};

const TOOLS = [
  { name: "Rupture conventionnelle", url: "/outils/rupture-conventionnelle", desc: "Indemnite legale de rupture conventionnelle", cat: "Droit du travail", tags: ["salarie", "cdi", "licenciement", "indemnite"] },
  { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Conversion salaire brut en net avec cotisations", cat: "Salaire", tags: ["salarie", "cotisations", "fiche de paie", "brut"] },
  { name: "Optimisation SASU", url: "/outils/optimisation-sasu", desc: "Repartition optimale salaire/dividendes SASU", cat: "Freelance", tags: ["sasu", "dividendes", "dirigeant", "societe"] },
  { name: "Auto-entrepreneur", url: "/outils/simulateur-auto-entrepreneur", desc: "Cotisations et revenu net micro-entreprise", cat: "Freelance", tags: ["micro", "auto-entrepreneur", "freelance", "independant"] },
  { name: "Simulateur TMI", url: "/outils/simulateur-tmi", desc: "Taux marginal d'imposition et detail IR", cat: "Fiscalite", tags: ["impot", "ir", "tmi", "bareme", "tranche"] },
  { name: "Revision de loyer", url: "/outils/revision-loyer", desc: "Revision annuelle avec indice IRL", cat: "Immobilier", tags: ["loyer", "irl", "bailleur", "locataire", "indexation"] },
  { name: "Frais de notaire", url: "/outils/frais-notaire", desc: "Estimation frais achat immobilier", cat: "Immobilier", tags: ["notaire", "achat", "ancien", "neuf", "droits mutation"] },
  { name: "Rendement locatif", url: "/outils/rendement-locatif", desc: "Rentabilite brute et nette investissement", cat: "Immobilier", tags: ["rendement", "investissement", "locatif", "rentabilite"] },
];

const CATEGORIES = [...new Set(TOOLS.map((t) => t.cat))];

function ToolsIndex() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Tous les outils</h1>
        <p className="mt-2 text-gray-600">
          8 calculateurs gratuits, precis et transparents. Chaque outil cite ses sources officielles.
        </p>
      </div>

      {/* Navigation rapide par categorie */}
      <nav className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={`#${cat.toLowerCase().replace(/\s+/g, "-")}`}
            className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 hover:border-emerald-300 hover:text-emerald-700"
          >
            {cat}
          </a>
        ))}
      </nav>

      {/* Outils par categorie */}
      <div className="space-y-10">
        {CATEGORIES.map((cat) => (
          <section key={cat} id={cat.toLowerCase().replace(/\s+/g, "-")}>
            <h2 className="mb-4 text-lg font-bold text-gray-900">{cat}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TOOLS.filter((t) => t.cat === cat).map((tool) => (
                <a
                  key={tool.url}
                  href={tool.url}
                  className="group rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
                >
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-emerald-700">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{tool.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {tool.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <>
      <JsonLd
        type="WebApplication"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Ecosysteme — Tous les outils",
          description: "Collection de 8 calculateurs utilitaires gratuits pour les Francais",
          url: "/outils",
        }}
      />
      <ToolsIndex />
    </>
  );
}
