import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "../../lib/Breadcrumb";

export const metadata: Metadata = {
  title: "Salaire brut et net : quelles differences ?",
  description:
    "Difference entre salaire brut et net expliquee : cotisations, PAS, super-brut. Tableau de conversion et guide complet.",
  openGraph: {
    title: "Salaire brut et net : quelles differences ?",
    description: "Comprendre la difference brut/net, les cotisations salariales et le prelevement a la source.",
    type: "article",
  },
};

const COTISATIONS = [
  { nom: "CSG deductible", taux: "6,80%", montant3000: "199,53", assiette: "98,25% du brut" },
  { nom: "CRDS", taux: "0,50%", montant3000: "14,74", assiette: "98,25% du brut" },
  { nom: "CSG non-deductible", taux: "2,40%", montant3000: "70,74", assiette: "98,25% du brut" },
  { nom: "Assurance vieillesse plafonnee", taux: "6,90%", montant3000: "207,00", assiette: "Jusqu&apos;au PASS" },
  { nom: "Assurance vieillesse deplafonnee", taux: "0,40%", montant3000: "12,00", assiette: "Totalite" },
  { nom: "AGIRC-ARRCO T1", taux: "3,15%", montant3000: "94,50", assiette: "Jusqu&apos;au PASS" },
  { nom: "Assurance chomage", taux: "0%", montant3000: "0", assiette: "Totalite" },
];

const CONVERSIONS = [
  { brut: "1 500", netNonCadre: "1 170", netCadre: "1 125" },
  { brut: "2 000", netNonCadre: "1 560", netCadre: "1 500" },
  { brut: "2 500", netNonCadre: "1 950", netCadre: "1 875" },
  { brut: "3 000", netNonCadre: "2 340", netCadre: "2 250" },
  { brut: "4 000", netNonCadre: "3 120", netCadre: "3 000" },
  { brut: "5 000", netNonCadre: "3 900", netCadre: "3 750" },
];

const FAQ = [
  { q: "Quel pourcentage retirer du brut pour obtenir le net ?", a: "Pour un salarie non-cadre, retirez environ 22% du brut. Pour un cadre, retirez environ 25%. Par exemple, pour 3 000 EUR brut : non-cadre = 2 340 EUR net, cadre = 2 250 EUR net. Ces taux sont des moyennes ; le calcul exact depend de votre situation." },
  { q: "Le salaire net est-il celui verse sur mon compte ?", a: "Pas exactement. Le montant verse sur votre compte est le salaire net apres impot, c&apos;est-a-dire le net diminue du prelevement a la source (PAS). Le &laquo; net a payer avant impot &raquo; sur votre fiche de paie est le net avant PAS." },
  { q: "Qu&apos;est-ce que le net imposable ?", a: "Le net imposable (ou net fiscal) est le montant sur lequel est calcule votre impot sur le revenu. Il est superieur au net a payer car il inclut la CSG non-deductible et la CRDS. C&apos;est ce montant qui figure sur votre declaration de revenus pre-remplie." },
  { q: "Le cout employeur est-il le meme que le brut ?", a: "Non. Le cout employeur (super-brut) est bien superieur au brut. Il inclut les cotisations patronales qui representent environ 42 a 45% du brut. Pour un brut de 3 000 EUR, le cout total employeur est d&apos;environ 4 260 a 4 350 EUR." },
  { q: "Les heures supplementaires changent-elles le taux de cotisation ?", a: "Les heures supplementaires sont soumises aux memes cotisations que le salaire de base. Toutefois, depuis 2019, elles beneficient d&apos;une exoneration de cotisations salariales dans la limite de 11,31% et d&apos;une exoneration d&apos;impot sur le revenu jusqu&apos;a 7 500 EUR par an." },
  { q: "Mon bulletin de paie affiche un net different du simulateur, pourquoi ?", a: "Les ecarts proviennent generalement de la mutuelle d&apos;entreprise (part salariale), de la prevoyance, des tickets restaurant, ou d&apos;une convention collective specifique avec des taux differents. Le simulateur utilise les taux standards de l&apos;URSSAF." },
];

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-10">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export default function DifferencesBrutNetPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Guides" }, { label: "Brut vs Net" }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Salaire brut et net : quelles differences ?",
        description: "Guide complet sur la difference entre salaire brut et net, cotisations salariales et prelevement a la source.",
        datePublished: "2026-04-14",
        dateModified: "2026-04-14",
        author: { "@type": "Organization", name: "Ecosysteme" },
        publisher: { "@type": "Organization", name: "Ecosysteme", url: "https://ecosysteme-tools.vercel.app" },
        mainEntityOfPage: "https://ecosysteme-tools.vercel.app/guides/differences-brut-net",
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
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Guide complet</p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Salaire brut et net : quelles differences ?
          </h1>
          <p className="mt-3 text-base text-muted">
            Comprendre ce qui separe le salaire brut du net, les cotisations salariales,
            le prelevement a la source et le cout total employeur.
          </p>
          <div className="mt-5">
            <Link href="/outils/simulateur-brut-net" className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
              Convertir mon salaire brut en net
            </Link>
          </div>
        </header>

        {/* Sommaire */}
        <nav className="mt-8 rounded-xl border border-border bg-surface-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Sommaire</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {[
              ["#brut", "Definition du salaire brut"],
              ["#net", "Definition du salaire net"],
              ["#cotisations", "Les cotisations salariales"],
              ["#pas", "Net avant vs apres impot"],
              ["#super-brut", "Le cout total employeur"],
              ["#tableau", "Tableau comparatif brut/net"],
              ["#bulletin", "Comment lire son bulletin de paie"],
              ["#faq", "Questions frequentes"],
            ].map(([href, label]) => (
              <li key={href}><a href={href} className="text-primary hover:underline">{label}</a></li>
            ))}
          </ul>
        </nav>

        <Section title="Definition du salaire brut" id="brut">
          <p>
            Le <strong className="text-foreground">salaire brut</strong> est le montant total de votre remuneration
            tel qu&apos;il figure dans votre contrat de travail, avant toute deduction. Il comprend :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Le salaire de base (remuneration horaire ou forfaitaire)</li>
            <li>Les heures supplementaires et complementaires</li>
            <li>Les primes recurrentes (13e mois, anciennete, rendement)</li>
            <li>Les avantages en nature valorises (voiture, logement)</li>
            <li>Les commissions et gratifications contractuelles</li>
          </ul>
          <p>
            C&apos;est sur ce montant brut que l&apos;ensemble des cotisations sociales — salariales et patronales —
            sont calculees. Le salaire brut sert aussi de reference pour le calcul des indemnites de
            licenciement, de rupture conventionnelle et de conges payes.
          </p>
        </Section>

        <Section title="Definition du salaire net" id="net">
          <p>
            Le <strong className="text-foreground">salaire net</strong> (ou &laquo; net a payer avant impot &raquo;)
            est le montant que vous percevez apres deduction de toutes les cotisations salariales
            obligatoires. C&apos;est la somme inscrite sur la ligne &laquo; Net a payer avant impot sur le revenu &raquo;
            de votre bulletin de paie.
          </p>
          <p>
            Pour un salarie non-cadre, le net represente environ <strong className="text-foreground">78%</strong> du
            brut. Pour un cadre, il represente environ <strong className="text-foreground">75%</strong> du brut,
            les cotisations supplementaires (APEC, retraite complementaire tranche 2) etant plus elevees.
          </p>
        </Section>

        <Section title="Les cotisations salariales expliquees" id="cotisations">
          <p>
            Les cotisations salariales sont les sommes prelevees sur votre salaire brut pour financer
            la protection sociale : retraite, maladie, chomage. Voici le detail pour un salaire brut de 3 000 EUR :
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted">
                  <th className="py-2 text-left font-medium">Cotisation</th>
                  <th className="py-2 text-right font-medium">Taux</th>
                  <th className="py-2 text-right font-medium">Montant (3 000 EUR brut)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {COTISATIONS.map((c) => (
                  <tr key={c.nom}>
                    <td className="py-2 font-medium text-foreground">{c.nom}</td>
                    <td className="py-2 text-right text-muted">{c.taux}</td>
                    <td className="py-2 text-right font-medium text-foreground">{c.montant3000} EUR</td>
                  </tr>
                ))}
                <tr className="bg-primary-light font-bold">
                  <td className="py-2 text-primary">Total cotisations salariales</td>
                  <td className="py-2 text-right text-primary">~22%</td>
                  <td className="py-2 text-right text-primary">~660 EUR</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-light">
            Taux au 1er janvier 2026, salarie non-cadre. Source : URSSAF. L&apos;assurance chomage (0%) est integralement a la charge de l&apos;employeur depuis 2019.
          </p>
        </Section>

        <Section title="Net avant impot vs net apres impot" id="pas">
          <p>
            Depuis janvier 2019, l&apos;impot sur le revenu est preleve directement sur votre salaire
            par votre employeur. On distingue donc deux montants :
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Net avant impot</p>
              <p className="mt-1 text-sm font-medium text-foreground">Salaire brut - cotisations</p>
              <p className="mt-1 text-xs text-muted">C&apos;est le montant le plus souvent cite. Il figure sur votre bulletin de paie a la ligne &laquo; Net a payer avant impot &raquo;.</p>
            </div>
            <div className="rounded-lg border border-border bg-surface-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Net apres impot</p>
              <p className="mt-1 text-sm font-medium text-foreground">Net avant impot - PAS</p>
              <p className="mt-1 text-xs text-muted">Le montant effectivement verse sur votre compte bancaire. Le taux de PAS depend de votre situation fiscale.</p>
            </div>
          </div>
          <p>
            Par exemple, pour 3 000 EUR brut avec un taux de PAS de 7,5% : net avant impot = 2 340 EUR,
            PAS = 175 EUR, net apres impot = 2 165 EUR.
            Simulez votre taux avec notre{" "}
            <Link href="/outils/simulateur-tmi" className="text-primary hover:underline">simulateur TMI</Link>.
          </p>
        </Section>

        <Section title="Le cout total employeur (super-brut)" id="super-brut">
          <p>
            Au-dela des cotisations salariales, l&apos;employeur paie ses propres cotisations patronales :
            assurance maladie, allocations familiales, chomage, retraite complementaire, accidents du
            travail, formation professionnelle.
          </p>
          <p>
            Le total des cotisations patronales represente environ <strong className="text-foreground">42 a 45%</strong> du
            salaire brut. Ainsi, le &laquo; super-brut &raquo; (cout total employeur) est d&apos;environ
            <strong className="text-foreground"> 142%</strong> du brut.
          </p>
          <div className="mt-3 rounded-lg border border-border bg-surface-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Exemple : 3 000 EUR brut</p>
            <div className="mt-2 text-sm space-y-1">
              <p><strong className="text-foreground">Cout employeur :</strong> ~4 300 EUR (super-brut)</p>
              <p><strong className="text-foreground">Salaire brut :</strong> 3 000 EUR</p>
              <p><strong className="text-foreground">Net salarie :</strong> ~2 340 EUR</p>
              <p className="text-xs text-muted-light">Le salarie recoit 54% de ce que l&apos;employeur depense reellement.</p>
            </div>
          </div>
        </Section>

        <Section title="Tableau comparatif : brut vers net" id="tableau">
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted">
                  <th className="py-2 text-left font-medium">Brut mensuel</th>
                  <th className="py-2 text-right font-medium">Net non-cadre (~22%)</th>
                  <th className="py-2 text-right font-medium">Net cadre (~25%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {CONVERSIONS.map((c) => (
                  <tr key={c.brut}>
                    <td className="py-2 font-medium text-foreground">{c.brut} EUR</td>
                    <td className="py-2 text-right text-muted">{c.netNonCadre} EUR</td>
                    <td className="py-2 text-right font-medium text-primary">{c.netCadre} EUR</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-light">
            Estimations indicatives avant prelevement a la source. Pour un calcul precis :{" "}
            <Link href="/outils/simulateur-brut-net" className="text-primary hover:underline">simulateur brut/net</Link>.
          </p>
        </Section>

        <Section title="Comment lire son bulletin de paie" id="bulletin">
          <p>
            Le bulletin de paie est structure en plusieurs blocs. Voici les lignes essentielles a verifier :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-foreground">Salaire de base :</strong> votre remuneration brute contractuelle</li>
            <li><strong className="text-foreground">Cotisations salariales :</strong> le detail de chaque prelement (CSG, vieillesse, retraite complementaire)</li>
            <li><strong className="text-foreground">Net a payer avant impot :</strong> brut - cotisations = le net &laquo; classique &raquo;</li>
            <li><strong className="text-foreground">Net imposable :</strong> base de calcul du PAS (superieur au net a payer car il inclut la CSG non-deductible)</li>
            <li><strong className="text-foreground">PAS :</strong> montant de l&apos;impot preleve a la source</li>
            <li><strong className="text-foreground">Net a payer :</strong> montant effectivement vire sur votre compte</li>
          </ul>
          <p>
            Depuis 2023, le bulletin de paie simplifie regroupe les cotisations en grandes categories
            pour plus de lisibilite. La version detaillee reste accessible sur demande.
          </p>
        </Section>

        {/* CTA */}
        <div className="mt-10 rounded-xl border border-primary/20 bg-primary-light p-6 text-center">
          <p className="text-base font-bold text-foreground">Convertissez votre salaire instantanement</p>
          <p className="mt-1 text-sm text-muted">Brut vers net ou net vers brut, avec les taux officiels 2026.</p>
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

        {/* Outils lies */}
        <Section title="Outils complementaires">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { name: "Simulateur brut/net", href: "/outils/simulateur-brut-net", desc: "Conversion instantanee brut/net" },
              { name: "Simulateur TMI", href: "/outils/simulateur-tmi", desc: "Votre taux marginal d&apos;imposition" },
              { name: "Indemnites kilometriques", href: "/outils/indemnites-km", desc: "Frais reels deductibles" },
              { name: "Niveau de richesse", href: "/outils/niveau-richesse", desc: "Situez votre salaire en France" },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="group rounded-lg border border-border bg-surface-card p-3 transition-all hover:border-primary/30 hover:shadow-sm">
                <p className="text-sm font-medium text-foreground group-hover:text-primary">{t.name}</p>
                <p className="mt-0.5 text-xs text-muted" dangerouslySetInnerHTML={{ __html: t.desc }} />
              </Link>
            ))}
          </div>
        </Section>

        {/* Source */}
        <div className="mt-12 rounded-lg bg-surface p-4 text-xs text-muted-light">
          <p><strong className="text-muted">Sources :</strong> URSSAF — Service-Public.fr — Code de la Securite sociale — DGFiP</p>
          <p className="mt-1">Guide mis a jour le 14 avril 2026. Les taux et montants sont indicatifs.</p>
        </div>
      </article>
    </>
  );
}
