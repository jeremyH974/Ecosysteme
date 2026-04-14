import Link from "next/link";
import { SITUATIONS } from "./lib/situations";

const POPULAR_TOOLS = [
  { name: "Rupture conventionnelle", url: "/outils/rupture-conventionnelle", desc: "Calculez votre indemnite legale de depart en 30 secondes" },
  { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Convertissez votre salaire brut en net instantanement" },
  { name: "Frais de notaire", url: "/outils/frais-notaire", desc: "Estimez les frais d&apos;acquisition immobiliere" },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b border-border bg-surface-card">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Les calculateurs financiers<br className="hidden sm:block" /> les plus fiables de France
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg">
            Resultats exacts, sources officielles, gratuit
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/outils"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
            >
              Voir tous les outils
            </Link>
          </div>
        </div>
      </section>

      {/* Situations */}
      <section className="mx-auto max-w-5xl px-5 py-12">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted mb-8">
          Quelle est votre situation ?
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {SITUATIONS.map((sit) => (
            <Link
              key={sit.id}
              href={`/situations/${sit.id}`}
              className="group rounded-xl border border-border bg-surface-card p-5 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{sit.icon}</span>
                <h2 className="text-base font-bold text-foreground group-hover:text-primary">
                  {sit.title}
                </h2>
              </div>
              <p className="text-sm text-muted mb-4">{sit.accroche}</p>
              <div className="flex flex-wrap gap-2">
                {sit.primary.map((tool) => (
                  <span
                    key={tool.slug}
                    className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-muted"
                  >
                    {tool.name}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Outils populaires */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-5xl px-5 py-12">
          <h2 className="text-center text-base font-bold text-foreground mb-6">
            Outils les plus utilises
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {POPULAR_TOOLS.map((tool) => (
              <Link
                key={tool.url}
                href={tool.url}
                className="group relative rounded-xl border border-border bg-surface-card p-5 transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <span className="absolute top-3 right-3 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  Populaire
                </span>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary pr-16">
                  {tool.name}
                </p>
                <p className="mt-1 text-xs text-muted">{tool.desc}</p>
                <p className="mt-3 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Utiliser &rarr;
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust footer */}
      <section className="border-t border-border bg-surface-card">
        <div className="mx-auto max-w-5xl px-5 py-8 text-center">
          <p className="text-sm text-muted">
            302 tests de fiabilite &middot; Baremes mis a jour au 14 avril 2026 &middot; Sources officielles
          </p>
        </div>
      </section>
    </main>
  );
}
