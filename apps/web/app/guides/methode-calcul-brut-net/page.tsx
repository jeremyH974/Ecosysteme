import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "../../lib/Breadcrumb";

export const metadata: Metadata = {
  title: "Comment calculer son salaire brut en net — Methode complete",
  description:
    "La methode pas a pas pour convertir un salaire brut en net : chaque cotisation expliquee, exemple chiffre pour 3 000 EUR, difference cadre vs non-cadre.",
  openGraph: {
    title: "Comment calculer son salaire brut en net — Methode complete",
    description: "Guide complet pour comprendre la conversion brut/net avec le detail de chaque cotisation.",
    type: "article",
  },
};

const COTISATIONS = [
  { nom: "CSG deductible", taux: "6,80%", assiette: "98,25% du brut", desc: "Contribution Sociale Generalisee (part deductible de l'IR)" },
  { nom: "CSG non deductible", taux: "2,40%", assiette: "98,25% du brut", desc: "Part non deductible de l'impot sur le revenu" },
  { nom: "CRDS", taux: "0,50%", assiette: "98,25% du brut", desc: "Contribution au Remboursement de la Dette Sociale" },
  { nom: "Vieillesse plafonnee", taux: "6,90%", assiette: "Brut (dans la limite du PASS)", desc: "Retraite de base Securite Sociale" },
  { nom: "Vieillesse deplafonnee", taux: "0,40%", assiette: "Brut total", desc: "Retraite de base sur totalite du salaire" },
  { nom: "AGIRC-ARRCO T1", taux: "3,15%", assiette: "Brut (dans la limite du PASS)", desc: "Retraite complementaire tranche 1" },
  { nom: "AGIRC-ARRCO T2", taux: "8,64%", assiette: "Brut entre 1 et 8 PASS", desc: "Retraite complementaire tranche 2 (cadres principalement)" },
];

const EXEMPLE_3000 = [
  { ligne: "Salaire brut", montant: "3 000,00 EUR" },
  { ligne: "CSG/CRDS (9,7% sur 98,25% du brut)", montant: "-285,85 EUR" },
  { ligne: "Vieillesse plafonnee (6,90%)", montant: "-207,00 EUR" },
  { ligne: "Vieillesse deplafonnee (0,40%)", montant: "-12,00 EUR" },
  { ligne: "AGIRC-ARRCO T1 (3,15%)", montant: "-94,50 EUR" },
  { ligne: "Total cotisations salariales", montant: "-599,35 EUR" },
  { ligne: "Salaire net avant impot", montant: "2 400,65 EUR" },
];

const FAQ = [
  { q: "Quel est le taux moyen de cotisations salariales ?", a: "Pour un non-cadre, le taux moyen est d'environ 22% du salaire brut. Pour un cadre, il monte a environ 25% en raison des cotisations AGIRC-ARRCO sur la tranche 2 et de la cotisation APEC." },
  { q: "Pourquoi le taux de cotisation varie-t-il selon le salaire ?", a: "Certaines cotisations sont plafonnees au PASS (Plafond Annuel de la Securite Sociale : 3 864 EUR/mois en 2024). Au-dela, des cotisations differentes s'appliquent sur la tranche 2, ce qui modifie le taux global." },
  { q: "Qu'est-ce que le PASS et pourquoi est-il important ?", a: "Le PASS (Plafond Annuel de la Securite Sociale) est un seuil fixe chaque annee. Il delimite la tranche 1 et la tranche 2 pour les cotisations retraite. Les salaires au-dessus du PASS ont un taux de cotisation different." },
  { q: "Le net affiche inclut-il le prelevement a la source ?", a: "Non. Le salaire net avant impot est calcule apres deduction des cotisations sociales mais avant le prelevement a la source (PAS). Le montant reellement verse sur votre compte est le net apres impot." },
];

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-10">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export default function MethodeCalculBrutNetPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Guides" }, { label: "Methode calcul brut/net" }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Comment calculer son salaire brut en net — Methode complete",
        description: "La methode pas a pas pour convertir un salaire brut en net en France.",
        datePublished: "2026-04-14",
        dateModified: "2026-04-14",
        author: { "@type": "Organization", name: "Ecosysteme" },
        publisher: { "@type": "Organization", name: "Ecosysteme", url: "https://ecosysteme-tools.vercel.app" },
        mainEntityOfPage: "https://ecosysteme-tools.vercel.app/guides/methode-calcul-brut-net",
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      })}} />

      <article className="mx-auto max-w-3xl px-5 py-10">
        <header>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Guide 2026</p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Comment calculer son salaire brut en net
          </h1>
          <p className="mt-3 text-base text-muted">
            La formule pas a pas pour passer du brut au net, avec le detail de chaque cotisation salariale,
            un exemple complet pour 3 000 EUR brut et les differences cadre vs non-cadre.
          </p>
          <div className="mt-5">
            <Link href="/outils/simulateur-brut-net" className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
              Simuler mon salaire brut/net
            </Link>
          </div>
        </header>

        {/* Sommaire */}
        <nav className="mt-8 rounded-xl border border-border bg-surface-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Sommaire</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {[
              ["#formule", "La formule pas a pas"],
              ["#cotisations", "Chaque cotisation expliquee"],
              ["#exemple", "Exemple complet pour 3 000 EUR brut"],
              ["#cadre", "Difference cadre vs non-cadre"],
              ["#pass", "Le role du PASS"],
              ["#faq", "Questions frequentes"],
            ].map(([href, label]) => (
              <li key={href}><a href={href} className="text-primary hover:underline">{label}</a></li>
            ))}
          </ul>
        </nav>

        <Section title="La formule pas a pas" id="formule">
          <p>
            La conversion du salaire brut en net suit une logique simple :
          </p>
          <div className="rounded-lg border border-border bg-surface-card p-4 mt-3">
            <p className="text-center text-lg font-bold text-primary">
              Salaire net = Salaire brut - Cotisations salariales
            </p>
          </div>
          <p>
            Les cotisations salariales representent environ 22% du salaire brut pour un non-cadre
            et 25% pour un cadre. Elles financent la protection sociale : retraite, maladie,
            chomage, CSG/CRDS.
          </p>
          <p>
            En pratique, le calcul est plus complexe car chaque cotisation a son propre taux
            et sa propre assiette (base de calcul). Certaines cotisations s&apos;appliquent
            sur la totalite du brut, d&apos;autres uniquement dans la limite du plafond de la Securite Sociale (PASS).
          </p>
        </Section>

        <Section title="Chaque cotisation expliquee" id="cotisations">
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted">
                  <th className="py-2 text-left font-medium">Cotisation</th>
                  <th className="py-2 text-right font-medium">Taux salarial</th>
                  <th className="py-2 text-left font-medium pl-4">Assiette</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {COTISATIONS.map((c) => (
                  <tr key={c.nom}>
                    <td className="py-2">
                      <p className="font-medium text-foreground">{c.nom}</p>
                      <p className="text-[10px] text-muted-light">{c.desc}</p>
                    </td>
                    <td className="py-2 text-right text-primary font-medium">{c.taux}</td>
                    <td className="py-2 text-muted pl-4 text-xs">{c.assiette}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-light">
            Source : URSSAF — Taux de cotisations salariales 2026. PASS mensuel : 3 864 EUR.
          </p>
        </Section>

        <Section title="Exemple complet : 3 000 EUR brut (non-cadre)" id="exemple">
          <p>
            Voici le detail du calcul pour un salaire brut de 3 000 EUR pour un non-cadre
            a temps plein (salaire sous le PASS, donc pas de tranche 2) :
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border/40">
                {EXEMPLE_3000.map((e, i) => (
                  <tr key={e.ligne} className={i === EXEMPLE_3000.length - 1 ? "bg-surface" : ""}>
                    <td className={`py-2.5 ${i === EXEMPLE_3000.length - 1 ? "font-bold text-foreground" : "text-muted"}`}>
                      {e.ligne}
                    </td>
                    <td className={`py-2.5 text-right ${i === EXEMPLE_3000.length - 1 ? "font-bold text-primary" : "font-medium text-foreground"}`}>
                      {e.montant}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Le taux global de cotisations salariales dans cet exemple est d&apos;environ 20%,
            ce qui donne un salaire net d&apos;environ 2 400 EUR avant prelevement a la source.
          </p>
        </Section>

        <Section title="Difference cadre vs non-cadre" id="cadre">
          <p>
            La principale difference entre un cadre et un non-cadre se situe au niveau
            des cotisations de retraite complementaire :
          </p>
          <div className="grid gap-4 sm:grid-cols-2 mt-3">
            <div className="rounded-lg border border-border bg-surface-card p-4">
              <p className="text-sm font-bold text-foreground">Non-cadre</p>
              <p className="mt-2 text-xs text-muted">
                Taux global de cotisations salariales : environ 22%.
                Pas de cotisation APEC. Cotisation AGIRC-ARRCO uniquement sur la tranche 1
                pour les salaires sous le PASS.
              </p>
              <p className="mt-2 text-sm font-bold text-primary">3 000 EUR brut = ~2 340 EUR net</p>
            </div>
            <div className="rounded-lg border border-border bg-surface-card p-4">
              <p className="text-sm font-bold text-foreground">Cadre</p>
              <p className="mt-2 text-xs text-muted">
                Taux global de cotisations salariales : environ 25%.
                Cotisation APEC (0,024%). Cotisation AGIRC-ARRCO sur les tranches 1 et 2.
                Meilleure retraite complementaire en contrepartie.
              </p>
              <p className="mt-2 text-sm font-bold text-primary">3 000 EUR brut = ~2 250 EUR net</p>
            </div>
          </div>
        </Section>

        <Section title="Le role du PASS" id="pass">
          <p>
            Le PASS (Plafond Annuel de la Securite Sociale) est un seuil fondamental dans le calcul
            des cotisations. En 2026, il est fixe a <strong className="text-foreground">3 864 EUR par mois</strong>{" "}
            (46 368 EUR par an).
          </p>
          <p>
            Les cotisations de retraite sont separees en deux tranches :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-foreground">Tranche 1 :</strong> part du salaire jusqu&apos;au PASS.
              Cotisation AGIRC-ARRCO a 3,15%.
            </li>
            <li>
              <strong className="text-foreground">Tranche 2 :</strong> part du salaire entre 1 et 8 PASS.
              Cotisation AGIRC-ARRCO a 8,64%.
            </li>
          </ul>
          <p>
            Pour un salaire inferieur au PASS (ce qui concerne la majorite des salaries),
            seule la tranche 1 s&apos;applique, ce qui simplifie le calcul.
          </p>
        </Section>

        {/* CTA */}
        <div className="mt-10 rounded-xl border border-primary/20 bg-primary-light p-6 text-center">
          <p className="text-base font-bold text-foreground">Calculez votre salaire net exact</p>
          <p className="mt-1 text-sm text-muted">Utilisez notre simulateur avec les taux URSSAF 2026.</p>
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
                  <span>{f.q}</span>
                  <span className="ml-4 text-muted group-open:rotate-180 transition-transform">&#9660;</span>
                </summary>
                <div className="border-t border-border/50 bg-surface px-5 py-4">
                  <p className="text-sm leading-relaxed text-muted">{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </Section>

        {/* Outils lies */}
        <Section title="Outils complementaires">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { name: "Simulateur brut/net", href: "/outils/simulateur-brut-net", desc: "Conversion automatique brut en net" },
              { name: "Differences brut/net", href: "/guides/differences-brut-net", desc: "Guide sur les differences entre brut et net" },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="group rounded-lg border border-border bg-surface-card p-3 transition-all hover:border-primary/30 hover:shadow-sm">
                <p className="text-sm font-medium text-foreground group-hover:text-primary">{t.name}</p>
                <p className="mt-0.5 text-xs text-muted">{t.desc}</p>
              </Link>
            ))}
          </div>
        </Section>

        {/* Source */}
        <div className="mt-12 rounded-lg bg-surface p-4 text-xs text-muted-light">
          <p><strong className="text-muted">Sources :</strong> URSSAF — Taux cotisations 2026 — Code de la Securite Sociale</p>
          <p className="mt-1">Guide mis a jour le 14 avril 2026. Les taux et le PASS sont ceux applicables en 2026.</p>
        </div>
      </article>
    </>
  );
}
