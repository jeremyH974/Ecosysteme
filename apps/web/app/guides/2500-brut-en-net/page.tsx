import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "../../lib/Breadcrumb";

export const metadata: Metadata = {
  title: "2 500 EUR brut en net 2026 — Calcul et detail",
  description:
    "2 500 EUR brut en net : ~1 950 EUR non-cadre, ~1 875 EUR cadre. Detail cotisations, PAS et comparaison SMIC/median.",
  openGraph: {
    title: "2 500 EUR brut en net 2026 — Calcul et detail",
    description: "Conversion 2 500 EUR brut en net avec detail des cotisations et comparaison.",
    type: "article",
  },
};

const COTISATIONS = [
  { nom: "CSG/CRDS", montant: "239" },
  { nom: "Assurance vieillesse", montant: "183" },
  { nom: "Retraite complementaire AGIRC-ARRCO", montant: "79" },
  { nom: "Autres (CEG, chomage...)", montant: "49" },
];

const FAQ = [
  { q: "2 500 EUR brut, ca fait combien en net ?", a: "Pour un salarie non-cadre, 2 500 EUR brut correspond a environ 1 950 EUR net avant impot. Pour un cadre, le net est d&apos;environ 1 875 EUR en raison de cotisations supplementaires (APEC, prevoyance, retraite T2)." },
  { q: "2 500 EUR brut, est-ce un bon salaire en 2026 ?", a: "2 500 EUR brut (soit ~1 950 EUR net) se situe en dessous du salaire median francais (~2 183 EUR net). C&apos;est 37% au-dessus du SMIC (1 823 EUR brut). Ce salaire correspond a un profil debutant/confirme dans de nombreux secteurs." },
  { q: "Combien d&apos;impot pour 2 500 EUR brut ?", a: "Pour un celibataire sans enfant, le prelevement a la source est d&apos;environ 4,5%, soit environ 88 EUR/mois. Le net apres impot est donc d&apos;environ 1 862 EUR pour un non-cadre." },
  { q: "2 500 EUR brut annuel, ca donne quoi ?", a: "2 500 EUR brut mensuel = 30 000 EUR brut annuel. En net annuel : environ 23 400 EUR (non-cadre) ou 22 500 EUR (cadre), avant prelevement a la source." },
];

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-10">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export default function Page2500BrutEnNet() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Guides" }, { label: "2 500 EUR brut en net" }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "2 500 EUR brut en net 2026 — Calcul et detail",
        description: "Conversion complete de 2 500 EUR brut en net pour cadre et non-cadre.",
        datePublished: "2026-04-14",
        dateModified: "2026-04-14",
        author: { "@type": "Organization", name: "Ecosysteme" },
        publisher: { "@type": "Organization", name: "Ecosysteme", url: "https://ecosysteme-tools.vercel.app" },
        mainEntityOfPage: "https://ecosysteme-tools.vercel.app/guides/2500-brut-en-net",
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
            2 500 EUR brut en net 2026 : calcul et detail
          </h1>
          <p className="mt-3 text-base text-muted">
            Combien fait 2 500 EUR brut en net ? Resultat pour non-cadre et cadre, detail des cotisations
            et comparaison avec le SMIC et le salaire median.
          </p>
        </header>

        {/* Resultat principal */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface-card p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Non-cadre (~22%)</p>
            <p className="mt-2 text-3xl font-bold text-primary">1 950 EUR</p>
            <p className="text-xs text-muted">net avant impot / mois</p>
          </div>
          <div className="rounded-xl border border-border bg-surface-card p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Cadre (~25%)</p>
            <p className="mt-2 text-3xl font-bold text-foreground">1 875 EUR</p>
            <p className="text-xs text-muted">net avant impot / mois</p>
          </div>
        </div>

        <Section title="Detail des cotisations (non-cadre)" id="cotisations">
          <p>
            Sur un salaire brut de 2 500 EUR, les cotisations salariales s&apos;elevent a environ 550 EUR
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
                  <td className="py-2 text-right text-primary">~550 EUR</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Impact du prelevement a la source" id="pas">
          <p>
            Apres deduction du PAS, le salaire effectivement recu varie selon votre situation familiale.
            Pour un celibataire sans enfant avec 2 500 EUR brut, le taux de PAS est d&apos;environ 4,5% :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-foreground">Net avant PAS :</strong> 1 950 EUR (non-cadre)</li>
            <li><strong className="text-foreground">PAS (~4,5%) :</strong> -88 EUR</li>
            <li><strong className="text-foreground">Net apres PAS :</strong> ~1 862 EUR</li>
          </ul>
        </Section>

        <Section title="Comparaison avec le SMIC et le salaire median" id="comparaison">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-surface-card p-3 text-center">
              <p className="text-lg font-bold text-foreground">1 443 EUR</p>
              <p className="text-xs text-muted">SMIC net</p>
            </div>
            <div className="rounded-lg border border-primary/30 bg-primary-light p-3 text-center">
              <p className="text-lg font-bold text-primary">1 950 EUR</p>
              <p className="text-xs text-muted">2 500 brut (net)</p>
            </div>
            <div className="rounded-lg border border-border bg-surface-card p-3 text-center">
              <p className="text-lg font-bold text-foreground">2 183 EUR</p>
              <p className="text-xs text-muted">Salaire median</p>
            </div>
          </div>
          <p>
            Un salaire de 2 500 EUR brut se situe 35% au-dessus du SMIC mais 10% en dessous du salaire
            median. Pour situer votre revenu, utilisez notre{" "}
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
