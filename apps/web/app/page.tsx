import Link from "next/link";
import { DiagnosticWizard } from "./lib/DiagnosticWizard";

const POPULAR_TOOLS = [
  { name: "Rupture conventionnelle", url: "/outils/rupture-conventionnelle", desc: "Indemnite legale en 30 secondes" },
  { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Brut, net, horaire, annuel — instantane" },
  { name: "Frais de notaire", url: "/outils/frais-notaire", desc: "Ancien ou neuf, detail complet" },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero + Diagnostic */}
      <section className="border-b border-border bg-surface-card">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            {/* Left — Tagline */}
            <div className="lg:pt-8">
              <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                Ou en etes-vous vraiment, financierement ?
              </h1>
              <p className="mt-3 text-base text-muted">
                Repondez a 5 questions. Obtenez un diagnostic personnalise avec les outils adaptes a votre situation.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-light">
                <span>302 tests de fiabilite</span>
                <span className="h-3 w-px bg-border" />
                <span>18 outils gratuits</span>
                <span className="h-3 w-px bg-border" />
                <span>Sources officielles</span>
              </div>
              <div className="mt-6">
                <Link href="/outils" className="text-sm text-primary font-medium hover:underline">
                  Voir tous les outils directement &rarr;
                </Link>
              </div>
            </div>

            {/* Right — Diagnostic Wizard */}
            <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
              <DiagnosticWizard />
            </div>
          </div>
        </div>
      </section>

      {/* Outils populaires */}
      <section className="bg-surface">
        <div className="mx-auto max-w-5xl px-5 py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted mb-5">
            Les plus utilises
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {POPULAR_TOOLS.map((tool) => (
              <Link key={tool.url} href={tool.url}
                className="group relative rounded-xl border border-border bg-surface-card p-4 transition-all hover:border-primary/30 hover:shadow-sm">
                <span className="absolute top-3 right-3 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">Populaire</span>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary pr-16">{tool.name}</p>
                <p className="mt-1 text-xs text-muted">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-t border-border bg-surface-card">
        <div className="mx-auto max-w-5xl px-5 py-6 text-center">
          <p className="text-xs text-muted">
            Baremes mis a jour au 14 avril 2026 &middot; 20 baremes verifies &middot; Sources : URSSAF, INSEE, Legifrance, Service-Public
          </p>
        </div>
      </section>
    </main>
  );
}
