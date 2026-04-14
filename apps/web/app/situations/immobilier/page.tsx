import type { Metadata } from "next";
import Link from "next/link";
import { SITUATIONS } from "../../lib/situations";

const situation = SITUATIONS.find((s) => s.id === "immobilier")!;

export const metadata: Metadata = {
  title: "Outils immobilier — Ecosysteme",
  description:
    "Calculateurs gratuits pour l\u2019immobilier : frais de notaire, rendement locatif, revision de loyer, plus-value. Sources officielles.",
  openGraph: {
    title: "Outils immobilier — Ecosysteme",
    description: "Calculez la rentabilite reelle avant d\u2019acheter, gerer ou vendre.",
    type: "website",
  },
};

export default function ImmobilierPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: "https://ecosysteme-tools.vercel.app" },
              { "@type": "ListItem", position: 2, name: "Immobilier", item: "https://ecosysteme-tools.vercel.app/situations/immobilier" },
            ],
          }),
        }}
      />
      <nav className="mx-auto max-w-5xl px-5 pt-4">
        <ol className="flex items-center gap-1.5 text-xs text-muted">
          <li><Link href="/" className="hover:text-primary transition-colors">Accueil</Link></li>
          <li>/</li>
          <li className="text-foreground font-medium">{situation.title}</li>
        </ol>
      </nav>
      <main className="mx-auto max-w-5xl px-5 py-10">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">
            Vous investissez dans l&apos;immobilier {situation.icon}
          </h1>
          <p className="mt-2 text-sm text-muted max-w-2xl">
            {situation.accroche}. De l&apos;estimation des frais de notaire au calcul de la plus-value a la revente, ces outils couvrent toutes les etapes de votre projet immobilier.
          </p>
        </div>

        <h2 className="text-sm font-bold uppercase tracking-wider text-muted mb-4">
          Outils essentiels
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {situation.primary.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.url}
              className="group rounded-xl border border-border bg-surface-card p-5 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <p className="text-sm font-semibold text-foreground group-hover:text-primary">
                {tool.name}
              </p>
              <p className="mt-1 text-xs text-muted">{tool.desc}</p>
              {tool.example && (
                <p className="mt-2 rounded-md bg-surface px-2 py-1 text-xs text-muted-light font-mono">
                  {tool.example}
                </p>
              )}
              <p className="mt-3 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Calculer &rarr;
              </p>
            </Link>
          ))}
        </div>

        {situation.secondary.length > 0 && (
          <div className="mt-10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted mb-4">
              Dans cette situation, vous pourriez aussi avoir besoin de :
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {situation.secondary.map((tool) => (
                <Link
                  key={tool.slug}
                  href={tool.url}
                  className="group rounded-lg border border-border bg-surface-card p-3 transition-all hover:border-primary/30"
                >
                  <p className="text-xs font-semibold text-foreground group-hover:text-primary">
                    {tool.name}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted">{tool.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
