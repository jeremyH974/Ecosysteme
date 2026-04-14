import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "../../lib/Breadcrumb";

export const metadata: Metadata = {
  title: "Cadre vs non-cadre : salaire et cotisations",
  description:
    "Differences cadre et non-cadre : cotisations, net, retraite, APEC. Tableau comparatif et impact sur le salaire.",
  openGraph: {
    title: "Cadre vs non-cadre : differences de salaire et cotisations",
    description: "Tout comprendre sur le statut cadre : cotisations, salaire net, avantages et inconvenients.",
    type: "article",
  },
};

const COMPARAISON_COTISATIONS = [
  { cotisation: "CSG/CRDS", nonCadre: "9,70%", cadre: "9,70%", diff: "=" },
  { cotisation: "Assurance vieillesse", nonCadre: "7,30%", cadre: "7,30%", diff: "=" },
  { cotisation: "AGIRC-ARRCO T1 (jusqu&apos;au PASS)", nonCadre: "3,15%", cadre: "3,15%", diff: "=" },
  { cotisation: "AGIRC-ARRCO T2 (au-dela du PASS)", nonCadre: "—", cadre: "8,64%", diff: "Cadre uniquement" },
  { cotisation: "APEC", nonCadre: "—", cadre: "0,024%", diff: "Cadre uniquement" },
  { cotisation: "Contribution d&apos;equilibre T1 (CEG)", nonCadre: "0,86%", cadre: "0,86%", diff: "=" },
  { cotisation: "Contribution d&apos;equilibre T2 (CET)", nonCadre: "—", cadre: "0,14%", diff: "Cadre uniquement" },
  { cotisation: "Prevoyance obligatoire", nonCadre: "Variable", cadre: "~1,50%", diff: "Cadre : minimum 1,50% T1" },
];

const FAQ = [
  { q: "Un cadre gagne-t-il forcement plus qu&apos;un non-cadre ?", a: "Non. Le statut cadre ne garantit pas un salaire plus eleve. Un technicien specialise ou un ouvrier qualifie peut gagner plus qu&apos;un cadre debutant. Le statut cadre definit un regime de cotisations et des avantages sociaux, pas un niveau de salaire." },
  { q: "Peut-on refuser le passage cadre ?", a: "Oui. Le passage cadre est une modification du contrat de travail qui necessite l&apos;accord du salarie. Si votre employeur vous propose le statut cadre, vous pouvez le refuser, notamment si la baisse de net ne compense pas les avantages." },
  { q: "Le statut cadre donne-t-il droit a plus de conges ?", a: "Le statut cadre ne donne pas automatiquement droit a plus de conges. Cependant, les cadres au forfait jours (218 jours/an) beneficient de jours de repos supplementaires (RTT), generalement entre 8 et 12 jours selon l&apos;annee." },
  { q: "Les cotisations cadre sont-elles les memes dans toutes les entreprises ?", a: "Les taux de base (AGIRC-ARRCO, APEC) sont les memes. Mais la prevoyance, la mutuelle et les taux conventionnels varient selon l&apos;entreprise et la convention collective. Le taux global peut aller de 24% a 27% selon les cas." },
  { q: "Quand vaut-il mieux etre cadre ?", a: "Le statut cadre est particulierement avantageux a partir d&apos;un salaire brut d&apos;environ 3 500 EUR/mois, quand les avantages (retraite complementaire, prevoyance, APEC) compensent largement le surcout en cotisations. A salaire egal, le statut cadre est aussi un atout sur le CV." },
];

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-10">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export default function CadreNonCadrePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Guides" }, { label: "Cadre vs non-cadre" }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Cadre vs non-cadre : differences de salaire et cotisations",
        description: "Comparaison complete des statuts cadre et non-cadre : cotisations, salaire net, avantages et inconvenients.",
        datePublished: "2026-04-14",
        dateModified: "2026-04-14",
        author: { "@type": "Organization", name: "Ecosysteme" },
        publisher: { "@type": "Organization", name: "Ecosysteme", url: "https://ecosysteme-tools.vercel.app" },
        mainEntityOfPage: "https://ecosysteme-tools.vercel.app/guides/salaire-cadre-non-cadre",
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
            Cadre vs non-cadre : differences de salaire et cotisations
          </h1>
          <p className="mt-3 text-base text-muted">
            Statut cadre ou non-cadre : impact sur les cotisations, le salaire net,
            la retraite et les avantages sociaux. Comparatif chiffre.
          </p>
          <div className="mt-5">
            <Link href="/outils/simulateur-brut-net" className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
              Comparer cadre/non-cadre avec le simulateur
            </Link>
          </div>
        </header>

        {/* Sommaire */}
        <nav className="mt-8 rounded-xl border border-border bg-surface-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Sommaire</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {[
              ["#definition", "Qu&apos;est-ce que le statut cadre ?"],
              ["#cotisations", "Differences de cotisations"],
              ["#impact", "Impact sur le net : exemple a 3 000 EUR"],
              ["#avantages", "Avantages du statut cadre"],
              ["#inconvenients", "Inconvenients du statut cadre"],
              ["#passage", "Passage cadre : comment et quand"],
              ["#faq", "Questions frequentes"],
            ].map(([href, label]) => (
              <li key={href}><a href={href} className="text-primary hover:underline" dangerouslySetInnerHTML={{ __html: label ?? "" }} /></li>
            ))}
          </ul>
        </nav>

        <Section title="Qu&apos;est-ce que le statut cadre ?" id="definition">
          <p>
            Le statut cadre designe une categorie de salaries definie par la convention collective applicable
            a l&apos;entreprise. Depuis la reforme de 2019 (Accord National Interprofessionnel du 28 fevrier 2020),
            le statut cadre est attribue aux salaries qui exercent des fonctions impliquant une responsabilite
            d&apos;encadrement, une expertise technique, ou une autonomie dans l&apos;organisation de leur travail.
          </p>
          <p>
            En pratique, la distinction cadre/non-cadre determine principalement le regime de cotisations
            sociales, la caisse de retraite complementaire et certains avantages (prevoyance, APEC).
            En France, environ 20% des salaries du prive ont le statut cadre.
          </p>
          <p>
            Le statut est indique sur votre bulletin de paie (ligne &laquo; categorie &raquo;) et dans votre contrat
            de travail. Il peut aussi figurer sous les termes &laquo; ETAM &raquo; (employes, techniciens, agents de
            maitrise) pour les non-cadres.
          </p>
        </Section>

        <Section title="Differences de cotisations" id="cotisations">
          <p>
            La principale difference entre cadre et non-cadre reside dans le niveau des cotisations sociales.
            Un cadre cotise davantage, essentiellement pour la retraite complementaire et la prevoyance :
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted">
                  <th className="py-2 text-left font-medium">Cotisation</th>
                  <th className="py-2 text-right font-medium">Non-cadre</th>
                  <th className="py-2 text-right font-medium">Cadre</th>
                  <th className="py-2 text-right font-medium">Difference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {COMPARAISON_COTISATIONS.map((c) => (
                  <tr key={c.cotisation}>
                    <td className="py-2 font-medium text-foreground" dangerouslySetInnerHTML={{ __html: c.cotisation }} />
                    <td className="py-2 text-right text-muted">{c.nonCadre}</td>
                    <td className="py-2 text-right text-muted">{c.cadre}</td>
                    <td className="py-2 text-right text-xs text-muted">{c.diff}</td>
                  </tr>
                ))}
                <tr className="bg-primary-light font-bold">
                  <td className="py-2 text-primary">Taux total salarial</td>
                  <td className="py-2 text-right text-primary">~22%</td>
                  <td className="py-2 text-right text-primary">~25%</td>
                  <td className="py-2 text-right text-primary">+3 pts</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-light">
            Taux indicatifs au 1er janvier 2026. Les taux exacts varient selon la convention collective. Source : URSSAF, AGIRC-ARRCO.
          </p>
        </Section>

        <Section title="Impact sur le net : 3 000 EUR brut cadre vs non-cadre" id="impact">
          <p>
            Pour un meme salaire brut de 3 000 EUR, la difference de net entre cadre et non-cadre
            est significative :
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface-card p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Non-cadre</p>
              <p className="mt-2 text-2xl font-bold text-foreground">2 340 EUR</p>
              <p className="text-xs text-muted">net avant impot</p>
              <p className="mt-1 text-xs text-muted-light">Cotisations : ~660 EUR (22%)</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-card p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Cadre</p>
              <p className="mt-2 text-2xl font-bold text-primary">2 250 EUR</p>
              <p className="text-xs text-muted">net avant impot</p>
              <p className="mt-1 text-xs text-muted-light">Cotisations : ~750 EUR (25%)</p>
            </div>
          </div>
          <p>
            Un cadre percoit donc environ <strong className="text-foreground">90 EUR de moins par mois</strong> (soit
            1 080 EUR/an) qu&apos;un non-cadre a salaire brut identique. Cet ecart est le prix de cotisations
            supplementaires qui financent une meilleure retraite complementaire et une prevoyance renforcee.
          </p>
          <p>
            Pour calculer votre net exact selon votre statut, utilisez notre{" "}
            <Link href="/outils/simulateur-brut-net" className="text-primary hover:underline">simulateur brut/net</Link>{" "}
            qui distingue cadre et non-cadre.
          </p>
        </Section>

        <Section title="Avantages du statut cadre" id="avantages">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Retraite complementaire amelioree</h3>
              <p>Les cotisations supplementaires (AGIRC-ARRCO tranche 2) generent davantage de points de retraite. Un cadre qui cotise 40 ans a 4 000 EUR brut percevra une retraite complementaire significativement superieure.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Prevoyance obligatoire</h3>
              <p>Les cadres beneficient d&apos;une prevoyance minimale de 1,50% du salaire brut (tranche 1), entierement a la charge de l&apos;employeur. Cela couvre le deces, l&apos;invalidite et l&apos;incapacite de travail.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Acces a l&apos;APEC</h3>
              <p>Les cadres beneficient des services de l&apos;Association Pour l&apos;Emploi des Cadres : accompagnement a la recherche d&apos;emploi, bilan de competences, acces a des offres exclusives.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Indemnites de licenciement</h3>
              <p>Certaines conventions collectives prevoient des indemnites de licenciement plus favorables pour les cadres, avec un calcul base sur des fractions de mois superieures.</p>
            </div>
          </div>
        </Section>

        <Section title="Inconvenients du statut cadre" id="inconvenients">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-foreground">Cotisations plus elevees :</strong> environ 3 points de plus que les non-cadres,
              ce qui reduit le net a payer d&apos;environ 90 EUR/mois pour un brut de 3 000 EUR.
            </li>
            <li>
              <strong className="text-foreground">Forfait jours :</strong> beaucoup de cadres sont au forfait 218 jours/an,
              sans decompte horaire. Cela peut impliquer des horaires plus lourds sans majoration pour heures supplementaires.
            </li>
            <li>
              <strong className="text-foreground">Periode d&apos;essai plus longue :</strong> 4 mois pour un cadre (renouvelable une fois)
              contre 2 mois pour un non-cadre.
            </li>
            <li>
              <strong className="text-foreground">Preavis plus long :</strong> generalement 3 mois en cas de demission ou licenciement,
              contre 1 a 2 mois pour un non-cadre.
            </li>
          </ul>
        </Section>

        <Section title="Passage cadre : comment et quand" id="passage">
          <p>
            Le passage du statut non-cadre au statut cadre se fait generalement dans trois situations :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-foreground">Promotion interne :</strong> votre employeur vous propose une evolution de poste avec passage au statut cadre</li>
            <li><strong className="text-foreground">Changement d&apos;entreprise :</strong> vous etes embauche comme cadre dans une nouvelle entreprise</li>
            <li><strong className="text-foreground">Reclassification conventionnelle :</strong> la convention collective est renouvelee et votre poste est reclasse en categorie cadre</li>
          </ul>
          <p>
            Dans tous les cas, le passage cadre implique un avenant au contrat de travail. Vous pouvez
            negocier une augmentation de salaire brut pour compenser la hausse des cotisations et maintenir
            votre net. Il est recommande de demander au minimum 3% de brut supplementaire.
          </p>
        </Section>

        {/* CTA */}
        <div className="mt-10 rounded-xl border border-primary/20 bg-primary-light p-6 text-center">
          <p className="text-base font-bold text-foreground">Comparez cadre et non-cadre</p>
          <p className="mt-1 text-sm text-muted">Simulez votre salaire net selon votre statut avec les taux officiels.</p>
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
              { name: "Simulateur brut/net", href: "/outils/simulateur-brut-net", desc: "Comparer cadre et non-cadre" },
              { name: "Simulateur TMI", href: "/outils/simulateur-tmi", desc: "Impact fiscal du statut cadre" },
              { name: "Simulateur retraite", href: "/outils/simulateur-retraite", desc: "Estimez votre pension" },
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
          <p><strong className="text-muted">Sources :</strong> AGIRC-ARRCO — URSSAF — ANI du 28 fevrier 2020 — Service-Public.fr</p>
          <p className="mt-1">Guide mis a jour le 14 avril 2026. Les taux et montants sont indicatifs.</p>
        </div>
      </article>
    </>
  );
}
