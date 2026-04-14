import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "../../lib/Breadcrumb";

export const metadata: Metadata = {
  title: "2 000 EUR brut en net 2026 — Calcul et detail",
  description:
    "2 000 EUR brut en net : ~1 560 EUR non-cadre, ~1 500 EUR cadre. Detail cotisations, PAS et comparaison SMIC/median.",
  openGraph: {
    title: "2 000 EUR brut en net 2026 — Calcul et detail",
    description: "Conversion 2 000 EUR brut en net avec detail des cotisations et comparaison.",
    type: "article",
  },
};

const COTISATIONS = [
  { nom: "CSG/CRDS", montant: "191" },
  { nom: "Assurance vieillesse", montant: "146" },
  { nom: "Retraite complementaire AGIRC-ARRCO", montant: "63" },
  { nom: "Autres (CEG, chomage...)", montant: "40" },
];

const FAQ = [
  { q: "2 000 EUR brut, ca fait combien en net ?", a: "Pour un salarie non-cadre, 2 000 EUR brut correspond a environ 1 560 EUR net avant impot. Pour un cadre, le net est d&apos;environ 1 500 EUR. La difference de 60 EUR/mois s&apos;explique par les cotisations cadre supplementaires." },
  { q: "2 000 EUR brut, est-ce au-dessus du SMIC ?", a: "Oui. Le SMIC brut est de 1 823 EUR en 2026. Un salaire de 2 000 EUR brut est donc 10% au-dessus du SMIC. En net, cela donne environ 1 560 EUR contre 1 443 EUR pour le SMIC, soit 117 EUR de plus par mois." },
  { q: "Combien d&apos;impot pour 2 000 EUR brut ?", a: "Pour un celibataire sans enfant, le prelevement a la source est d&apos;environ 2%, soit environ 31 EUR/mois. Le net apres impot est donc d&apos;environ 1 529 EUR pour un non-cadre. Les personnes au SMIC ou juste au-dessus paient peu ou pas d&apos;impot." },
  { q: "2 000 EUR brut annuel, ca donne quoi ?", a: "2 000 EUR brut mensuel = 24 000 EUR brut annuel. En net annuel : environ 18 720 EUR (non-cadre) ou 18 000 EUR (cadre), avant prelevement a la source." },
];

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-10">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export default function Page2000BrutEnNet() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Guides" }, { label: "2 000 EUR brut en net" }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "2 000 EUR brut en net 2026 — Calcul et detail",
        description: "Conversion complete de 2 000 EUR brut en net pour cadre et non-cadre.",
        datePublished: "2026-04-14",
        dateModified: "2026-04-14",
        author: { "@type": "Organization", name: "Ecosysteme" },
        publisher: { "@type": "Organization", name: "Ecosysteme", url: "https://ecosysteme-tools.vercel.app" },
        mainEntityOfPage: "https://ecosysteme-tools.vercel.app/guides/2000-brut-en-net",
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q.replace(/&apos;/g, "'"),
          acceptedAnswer: { "@type": "Answer", text: f.a.replace(/&apos;/g, "'") },
        })),
      })}} />

      <article className="mx-auto max-w-3xl px-5 py-10">
        <header>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Conversion 2026</p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            2 000 EUR brut en net 2026 : calcul et detail
          </h1>
          <p className="mt-3 text-base text-muted">
            Combien fait 2 000 EUR brut en net ? Resultat pour non-cadre et cadre, detail des cotisations
            et comparaison avec le SMIC et le salaire median.
          </p>
        </header>

        {/* Resultat principal */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface-card p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Non-cadre (~22%)</p>
            <p className="mt-2 text-3xl font-bold text-primary">1 560 EUR</p>
            <p className="text-xs text-muted">net avant impot / mois</p>
          </div>
          <div className="rounded-xl border border-border bg-surface-card p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Cadre (~25%)</p>
            <p className="mt-2 text-3xl font-bold text-foreground">1 500 EUR</p>
            <p className="text-xs text-muted">net avant impot / mois</p>
          </div>
        </div>

        <Section title="Detail des cotisations (non-cadre)" id="cotisations">
          <p>
            Sur un salaire brut de 2 000 EUR, les cotisations salariales s&apos;elevent a environ 440 EUR
            pour un non-cadre :
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted">
                  <th className="py-2 text-left font-medium">Cotisation</th>
                  <th className="py-2 text-right font-medium">Montant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {COTISATIONS.map((c) => (
                  <tr key={c.nom}>
                    <td className="py-2 font-medium text-foreground">{c.nom}</td>
                    <td className="py-2 text-right text-muted">{c.montant} EUR</td>
                  </tr>
                ))}
                <tr className="bg-primary-light font-bold">
                  <td className="py-2 text-primary">Total cotisations</td>
                  <td className="py-2 text-right text-primary">~440 EUR</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Impact du prelevement a la source" id="pas">
          <p>
            Apres deduction du PAS, le salaire effectivement recu varie selon votre situation familiale.
            Pour un celibataire sans enfant avec 2 000 EUR brut, le taux de PAS est d&apos;environ 2% :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-foreground">Net avant PAS :</strong> 1 560 EUR (non-cadre)</li>
            <li><strong className="text-foreground">PAS (~2%) :</strong> -31 EUR</li>
            <li><strong className="text-foreground">Net apres PAS :</strong> ~1 529 EUR</li>
          </ul>
        </Section>

        <Section title="Comparaison avec le SMIC et le salaire median" id="comparaison">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-surface-card p-3 text-center">
              <p className="text-lg font-bold text-foreground">1 443 EUR</p>
              <p className="text-xs text-muted">SMIC net</p>
            </div>
            <div className="rounded-lg border border-primary/30 bg-primary-light p-3 text-center">
              <p className="text-lg font-bold text-primary">1 560 EUR</p>
              <p className="text-xs text-muted">2 000 brut (net)</p>
            </div>
            <div className="rounded-lg border border-border bg-surface-card p-3 text-center">
              <p className="text-lg font-bold text-foreground">2 183 EUR</p>
              <p className="text-xs text-muted">Salaire median</p>
            </div>
          </div>
          <p>
            Un salaire de 2 000 EUR brut se situe 8% au-dessus du SMIC mais 29% en dessous du salaire median.
            Ce niveau de remuneration concerne de nombreux postes en debut de carriere. Pour situer votre revenu :{" "}
            <Link href="/outils/niveau-richesse" className="text-primary hover:underline">outil Niveau de richesse</Link>.
          </p>
        </Section>

        {/* CTA */}
        <div className="mt-10 rounded-xl border border-primary/20 bg-primary-light p-6 text-center">
          <p className="text-base font-bold text-foreground">Calculez votre net exact</p>
          <p className="mt-1 text-sm text-muted">Avec les taux officiels 2026, cadre ou non-cadre.</p>
          <Link href="/outils/simulateur-brut-net" className="mt-4 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
            Simuler mon salaire
          </Link>
        </div>

        {/* FAQ */}
        <Section title="Questions frequentes" id="faq">
          <div className="divide-y divide-border rounded-xl border border-border bg-surface-card overflow-hidden">
            {FAQ.map((f, i) => (
              <details key={i} className="group">
                <summary className="flex cursor-pointer items-center justify-between px-5 py-3.5 text-sm font-medium text-foreground hover:bg-surface">
                  <span dangerouslySetInnerHTML={{ __html: f.q }} />
                  <span className="ml-4 text-muted group-open:rotate-180 transition-transform">&#9660;</span>
                </summary>
                <div className="border-t border-border/50 bg-surface px-5 py-4">
                  <p className="text-sm leading-relaxed text-muted" dangerouslySetInnerHTML={{ __html: f.a }} />
                </div>
              </details>
            ))}
          </div>
        </Section>

        {/* Source */}
        <div className="mt-12 rounded-lg bg-surface p-4 text-xs text-muted-light">
          <p><strong className="text-muted">Sources :</strong> URSSAF — Service-Public.fr — Taux 2026</p>
          <p className="mt-1">Calcul mis a jour le 14 avril 2026. Les montants sont indicatifs.</p>
        </div>
      </article>
    </>
  );
}
