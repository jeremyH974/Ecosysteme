import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "../../lib/Breadcrumb";

export const metadata: Metadata = {
  title: "Prelevement a la source 2026 — Comment ca marche ?",
  description:
    "Tout comprendre sur le prelevement a la source en 2026 : calcul du taux, taux personnalise vs neutre, impact sur le bulletin de paie, modification du taux.",
  openGraph: {
    title: "Prelevement a la source 2026 — Comment ca marche ?",
    description: "Guide complet sur le prelevement a la source de l'impot sur le revenu.",
    type: "article",
  },
};

const TAUX_PAR_TRANCHE = [
  { tranche: "Jusqu'a 11 294 EUR", taux: "0%", impot: "0 EUR" },
  { tranche: "11 295 — 28 797 EUR", taux: "11%", impot: "Sur la part dans cette tranche" },
  { tranche: "28 798 — 82 341 EUR", taux: "30%", impot: "Sur la part dans cette tranche" },
  { tranche: "82 342 — 177 106 EUR", taux: "41%", impot: "Sur la part dans cette tranche" },
  { tranche: "Au-dela de 177 106 EUR", taux: "45%", impot: "Sur la part dans cette tranche" },
];

const FAQ = [
  { q: "Le prelevement a la source change-t-il le montant de mon impot ?", a: "Non. Le PAS est uniquement un mode de collecte. Le montant total d'impot reste identique : il est calcule sur votre declaration annuelle. Seul le calendrier de paiement change." },
  { q: "Que se passe-t-il si mon taux est trop eleve ou trop bas ?", a: "Si votre taux est trop eleve, vous serez rembourse l'annee suivante lors de la regularisation. S'il est trop bas, vous devrez payer un complement. Vous pouvez ajuster votre taux a tout moment sur impots.gouv.fr." },
  { q: "Mon employeur connait-il mes revenus totaux ?", a: "Non. L'administration fiscale transmet uniquement le taux a appliquer a votre employeur, pas le detail de vos revenus (patrimoine, revenus du conjoint, etc.). En choisissant le taux neutre, meme le taux personnalise reste confidentiel." },
  { q: "Comment fonctionne le taux pour un couple ?", a: "Par defaut, les couples maries ou pacses ont un taux commun (taux du foyer). Ils peuvent opter pour un taux individualise qui tient compte des ecarts de revenus au sein du couple, sans changer l'impot total." },
  { q: "Les independants sont-ils concernes ?", a: "Oui. Les travailleurs independants paient des acomptes mensuels ou trimestriels preleves directement sur leur compte bancaire. Le montant est calcule sur la base de la derniere declaration de revenus." },
];

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-10">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export default function PrelevementSourcePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Guides" }, { label: "Prelevement a la source" }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Prelevement a la source 2026 — Comment ca marche ?",
        description: "Guide complet sur le prelevement a la source de l'impot sur le revenu en France.",
        datePublished: "2026-04-14",
        dateModified: "2026-04-14",
        author: { "@type": "Organization", name: "Ecosysteme" },
        publisher: { "@type": "Organization", name: "Ecosysteme", url: "https://ecosysteme-tools.vercel.app" },
        mainEntityOfPage: "https://ecosysteme-tools.vercel.app/guides/prelevement-a-la-source",
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
            Prelevement a la source — Comment ca marche ?
          </h1>
          <p className="mt-3 text-base text-muted">
            Depuis janvier 2019, l&apos;impot sur le revenu est preleve directement sur votre salaire.
            Taux personnalise, neutre ou individualise : tout comprendre sur le PAS.
          </p>
          <div className="mt-5">
            <Link href="/outils/simulateur-tmi" className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
              Calculer mon taux marginal
            </Link>
          </div>
        </header>

        {/* Sommaire */}
        <nav className="mt-8 rounded-xl border border-border bg-surface-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Sommaire</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {[
              ["#principe", "Principe du prelevement a la source"],
              ["#taux", "Les trois types de taux"],
              ["#tranches", "Taux par tranche de revenus"],
              ["#modifier", "Comment modifier son taux"],
              ["#bulletin", "Impact sur le bulletin de paie"],
              ["#independants", "Acompte pour les independants"],
              ["#faq", "Questions frequentes"],
            ].map(([href, label]) => (
              <li key={href}><a href={href} className="text-primary hover:underline">{label}</a></li>
            ))}
          </ul>
        </nav>

        <Section title="Principe du prelevement a la source" id="principe">
          <p>
            Le prelevement a la source (PAS) est entre en vigueur le 1er janvier 2019. Il consiste
            a prelever l&apos;impot sur le revenu directement sur les revenus, au moment ou ils sont percus,
            plutot que l&apos;annee suivante.
          </p>
          <p>
            Pour les salaries, c&apos;est l&apos;employeur qui se charge de la retenue et la reverse a
            l&apos;administration fiscale. Le salarie n&apos;a aucune demarche a effectuer.
          </p>
          <p>
            L&apos;objectif est de supprimer le decalage d&apos;un an entre la perception des revenus
            et le paiement de l&apos;impot, ce qui evite les difficultes en cas de changement de situation
            (perte d&apos;emploi, depart a la retraite, variation de revenus).
          </p>
        </Section>

        <Section title="Les trois types de taux" id="taux">
          <div className="grid gap-4 sm:grid-cols-3 mt-3">
            <div className="rounded-lg border border-border bg-surface-card p-4">
              <p className="text-sm font-bold text-foreground">Taux personnalise</p>
              <p className="mt-2 text-xs text-muted">
                Calcule par l&apos;administration a partir de votre derniere declaration de revenus.
                Tient compte de l&apos;ensemble de vos revenus et de votre situation familiale.
                C&apos;est le taux applique par defaut.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface-card p-4">
              <p className="text-sm font-bold text-foreground">Taux neutre (non personnalise)</p>
              <p className="mt-2 text-xs text-muted">
                Taux calcule uniquement sur le montant du salaire, sans tenir compte de la situation
                familiale ou des autres revenus. Utile pour preserver la confidentialite vis-a-vis
                de l&apos;employeur. Le complement est paye directement au fisc.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface-card p-4">
              <p className="text-sm font-bold text-foreground">Taux individualise</p>
              <p className="mt-2 text-xs text-muted">
                Pour les couples maries ou pacses : chacun se voit appliquer un taux
                correspondant a ses propres revenus. L&apos;impot total du foyer reste identique.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Taux par tranche de revenus 2026" id="tranches">
          <p>
            Le taux de prelevement depend du bareme progressif de l&apos;impot sur le revenu,
            applique au revenu net imposable par part fiscale :
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted">
                  <th className="py-2 text-left font-medium">Tranche de revenu</th>
                  <th className="py-2 text-right font-medium">Taux</th>
                  <th className="py-2 text-left font-medium pl-4">Impot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {TAUX_PAR_TRANCHE.map((t) => (
                  <tr key={t.tranche}>
                    <td className="py-2 font-medium text-foreground">{t.tranche}</td>
                    <td className="py-2 text-right text-primary font-medium">{t.taux}</td>
                    <td className="py-2 text-muted pl-4">{t.impot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-light">
            Source : article 197 du Code General des Impots — Loi de finances 2026.
          </p>
        </Section>

        <Section title="Comment modifier son taux" id="modifier">
          <p>
            Vous pouvez modifier votre taux de prelevement a tout moment sur{" "}
            <a href="https://www.impots.gouv.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">impots.gouv.fr</a>,
            rubrique &laquo; Gerer mon prelevement a la source &raquo;.
          </p>
          <p>
            Les motifs de modification les plus courants sont :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Changement de situation familiale (mariage, naissance, divorce)</li>
            <li>Variation significative de revenus (augmentation, perte d&apos;emploi)</li>
            <li>Choix du taux neutre pour la confidentialite</li>
            <li>Passage au taux individualise pour un couple</li>
          </ul>
          <p>
            Le nouveau taux est transmis a l&apos;employeur sous 1 a 2 mois apres la demande.
          </p>
        </Section>

        <Section title="Impact sur le bulletin de paie" id="bulletin">
          <p>
            Sur votre bulletin de paie, le prelevement a la source apparait comme une ligne distincte
            apres le calcul du salaire net. Vous y trouvez :
          </p>
          <div className="rounded-lg border border-border bg-surface-card p-4 mt-3">
            <div className="text-sm space-y-1">
              <p><strong className="text-foreground">Net avant impot :</strong> votre salaire net social</p>
              <p><strong className="text-foreground">Taux PAS :</strong> le taux applique (ex: 7,5%)</p>
              <p><strong className="text-foreground">Montant PAS :</strong> la retenue (net x taux)</p>
              <p><strong className="text-foreground">Net a payer :</strong> ce que vous recevez sur votre compte</p>
            </div>
          </div>
          <p>
            Le net a payer (apres impot) est le montant effectivement vire sur votre compte bancaire.
            C&apos;est la difference entre le net avant impot et le montant du prelevement a la source.
          </p>
        </Section>

        <Section title="Acompte pour les independants" id="independants">
          <p>
            Les travailleurs independants (auto-entrepreneurs, professions liberales, gerants)
            ne sont pas preleves par un tiers mais paient des acomptes directement a l&apos;administration fiscale.
          </p>
          <p>
            Ces acomptes sont preleves mensuellement ou trimestriellement (au choix) sur le compte bancaire
            du contribuable. Leur montant est calcule sur la base de la derniere declaration de revenus
            et peut etre ajuste en cours d&apos;annee en cas de variation significative.
          </p>
        </Section>

        {/* CTA */}
        <div className="mt-10 rounded-xl border border-primary/20 bg-primary-light p-6 text-center">
          <p className="text-base font-bold text-foreground">Calculez votre taux marginal</p>
          <p className="mt-1 text-sm text-muted">Simulez votre impot sur le revenu avec le bareme 2026.</p>
          <Link href="/outils/simulateur-tmi" className="mt-4 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
            Simuler mon TMI
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
              { name: "Simulateur TMI", href: "/outils/simulateur-tmi", desc: "Calculez votre tranche marginale d&apos;imposition" },
              { name: "Simulateur brut/net", href: "/outils/simulateur-brut-net", desc: "Impact du PAS sur votre salaire net" },
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
          <p><strong className="text-muted">Sources :</strong> Code General des Impots Art. 204 A a 204 N — impots.gouv.fr — Service-Public.fr</p>
          <p className="mt-1">Guide mis a jour le 14 avril 2026. Les taux et tranches sont ceux du bareme 2026.</p>
        </div>
      </article>
    </>
  );
}
