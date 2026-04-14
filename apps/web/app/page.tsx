import Link from "next/link";

const CATEGORIES = [
  {
    title: "Droit du travail & Salaire",
    icon: "briefcase",
    tools: [
      { name: "Rupture conventionnelle", url: "/outils/rupture-conventionnelle", desc: "Indemnite legale de rupture conventionnelle" },
      { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Conversion salaire brut en net" },
      { name: "Niveau de richesse", url: "/outils/niveau-richesse", desc: "Ou vous situez-vous ?" },
      { name: "Allocations chomage", url: "/outils/allocation-chomage", desc: "Estimation ARE" },
      { name: "Simulateur retraite", url: "/outils/simulateur-retraite", desc: "Estimez votre pension" },
    ],
  },
  {
    title: "Freelance & Societe",
    icon: "laptop",
    tools: [
      { name: "Optimisation SASU", url: "/outils/optimisation-sasu", desc: "Repartition salaire/dividendes" },
      { name: "Auto-entrepreneur", url: "/outils/simulateur-auto-entrepreneur", desc: "Cotisations et revenu net" },
      { name: "Comparateur SASU vs AE", url: "/outils/comparateur-statuts", desc: "Quel statut choisir ?" },
    ],
  },
  {
    title: "Immobilier",
    icon: "home",
    tools: [
      { name: "Revision de loyer", url: "/outils/revision-loyer", desc: "Indexation IRL" },
      { name: "Frais de notaire", url: "/outils/frais-notaire", desc: "Ancien ou neuf" },
      { name: "Rendement locatif", url: "/outils/rendement-locatif", desc: "Brut et net" },
      { name: "Plus-value immobiliere", url: "/outils/plus-value-immobiliere", desc: "Imposition revente" },
    ],
  },
  {
    title: "Fiscalite",
    icon: "calculator",
    tools: [
      { name: "Simulateur TMI", url: "/outils/simulateur-tmi", desc: "Taux marginal d'imposition" },
      { name: "Indemnites km", url: "/outils/indemnites-km", desc: "Frais kilometriques deductibles" },
    ],
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b border-border bg-surface-card">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-3 py-1 text-xs font-medium text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            14 outils gratuits
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Les outils financiers<br className="hidden sm:block" /> que vous cherchiez
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg">
            Calculateurs precis, transparents et gratuits pour le droit du travail,
            la fiscalite, le freelance et l&apos;immobilier en France.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/outils"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
            >
              Voir tous les outils
            </Link>
            <a
              href="#categories"
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              Explorer par categorie
            </a>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-5xl px-5 py-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "14", label: "Outils gratuits" },
              { value: "219", label: "Tests automatises" },
              { value: "12", label: "Baremes officiels" },
              { value: "< 30s", label: "Pour un resultat" },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-2xl font-bold text-foreground sm:text-3xl">{m.value}</p>
                <p className="mt-1 text-xs text-muted">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profils */}
      <section className="border-b border-border bg-surface-card">
        <div className="mx-auto max-w-5xl px-5 py-12">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted">Je suis...</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Salarie", desc: "Rupture, brut/net, TMI", href: "#droit-du-travail-&-salaire", emoji: "\u{1F4BC}" },
              { label: "Freelance / Dirigeant", desc: "SASU, AE, comparateur", href: "#freelance-&-societe", emoji: "\u{1F4BB}" },
              { label: "Proprietaire / Bailleur", desc: "Loyer, notaire, rendement, plus-value", href: "#immobilier", emoji: "\u{1F3E0}" },
            ].map((p) => (
              <a
                key={p.label}
                href={p.href}
                className="group flex items-center gap-4 rounded-xl border border-border bg-surface-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <span className="text-2xl">{p.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary">{p.label}</p>
                  <p className="text-xs text-muted">{p.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-5xl px-5 py-12">
        <div className="space-y-10">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} id={cat.title.toLowerCase().replace(/[^a-z]+/g, "-")}>
              <h2 className="text-base font-bold text-foreground">{cat.title}</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cat.tools.map((tool) => (
                  <Link
                    key={tool.url}
                    href={tool.url}
                    className="group rounded-xl border border-border bg-surface-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                  >
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary">{tool.name}</p>
                    <p className="mt-1 text-xs text-muted">{tool.desc}</p>
                    <p className="mt-3 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Utiliser &rarr;
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
