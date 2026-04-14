import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "../../lib/Breadcrumb";

export const metadata: Metadata = {
  title: "SMIC 2026 : montant brut, net, horaire — a jour",
  description:
    "SMIC 2026 en chiffres : 12,02 EUR/h brut, 1 823 EUR mensuel brut, ~1 443 EUR net. Historique, temps partiel, revalorisation.",
  openGraph: {
    title: "SMIC 2026 : montant brut, net, horaire",
    description: "SMIC 2026 en chiffres : horaire, mensuel brut et net, historique et revalorisation.",
    type: "article",
  },
};

const HISTORIQUE_SMIC = [
  { annee: "2026", date: "1er janvier 2026", horaire: "12,02 EUR", mensuelBrut: "1 823,03 EUR", mensuelNet: "~1 443 EUR" },
  { annee: "2025", date: "1er janvier 2025", horaire: "11,88 EUR", mensuelBrut: "1 801,80 EUR", mensuelNet: "~1 427 EUR" },
  { annee: "2024", date: "1er janvier 2024", horaire: "11,65 EUR", mensuelBrut: "1 766,92 EUR", mensuelNet: "~1 399 EUR" },
  { annee: "2023", date: "1er janvier 2023", horaire: "11,27 EUR", mensuelBrut: "1 709,28 EUR", mensuelNet: "~1 353 EUR" },
  { annee: "2022", date: "1er aout 2022", horaire: "11,07 EUR", mensuelBrut: "1 678,95 EUR", mensuelNet: "~1 329 EUR" },
  { annee: "2021", date: "1er janvier 2021", horaire: "10,25 EUR", mensuelBrut: "1 554,58 EUR", mensuelNet: "~1 231 EUR" },
  { annee: "2020", date: "1er janvier 2020", horaire: "10,15 EUR", mensuelBrut: "1 539,42 EUR", mensuelNet: "~1 219 EUR" },
];

const FAQ = [
  { q: "Quel est le SMIC net mensuel en 2026 ?", a: "Le SMIC net mensuel en 2026 est d&apos;environ 1 443 EUR pour un temps plein (35h/semaine, 151,67h/mois). Ce montant varie legerement selon les conventions collectives et le prelevement a la source." },
  { q: "Comment calculer le SMIC a temps partiel ?", a: "Le SMIC a temps partiel se calcule proportionnellement aux heures travaillees. Pour un mi-temps (17,5h/semaine), divisez le SMIC mensuel par deux : environ 911 EUR brut et ~721 EUR net. La formule est : SMIC horaire x nombre d&apos;heures mensuelles." },
  { q: "Quand le SMIC est-il revalorise ?", a: "Le SMIC est revalorise automatiquement au 1er janvier de chaque annee en fonction de l&apos;inflation et de l&apos;evolution du pouvoir d&apos;achat des ouvriers. Il peut etre revalorise en cours d&apos;annee si l&apos;indice des prix augmente de plus de 2% depuis la derniere revalorisation." },
  { q: "Le 13e mois est-il inclus dans le SMIC ?", a: "Non. Le 13e mois, les primes d&apos;anciennete, les primes de rendement et les avantages en nature ne sont pas inclus dans le SMIC. Seule la remuneration de base et les majorations liees aux conditions de travail comptent." },
  { q: "Existe-t-il un SMIC jeunes ou un SMIC reduit ?", a: "Il n&apos;existe pas de SMIC jeune a proprement parler. Toutefois, les salaries de moins de 18 ans sans 6 mois d&apos;experience professionnelle peuvent etre remuneres a 80% (moins de 17 ans) ou 90% (17-18 ans) du SMIC." },
  { q: "Le SMIC est-il le meme a Mayotte ?", a: "Non. Mayotte dispose d&apos;un SMIC specifique, inferieur au SMIC metropolitain. Au 1er janvier 2026, le SMIC horaire brut a Mayotte est d&apos;environ 9,12 EUR, soit environ 1 383 EUR brut mensuel. Un rattrapage progressif est en cours." },
];

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-10">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export default function SmicGuidePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Guides" }, { label: "SMIC 2026" }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "SMIC 2026 : montant brut, net, horaire — a jour",
        description: "SMIC 2026 en chiffres : horaire, mensuel brut et net, historique et mecanisme de revalorisation.",
        datePublished: "2026-04-14",
        dateModified: "2026-04-14",
        author: { "@type": "Organization", name: "Ecosysteme" },
        publisher: { "@type": "Organization", name: "Ecosysteme", url: "https://ecosysteme-tools.vercel.app" },
        mainEntityOfPage: "https://ecosysteme-tools.vercel.app/guides/smic-2026",
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
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Guide 2026</p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            SMIC 2026 : montant brut, net et horaire a jour
          </h1>
          <p className="mt-3 text-base text-muted">
            Tout savoir sur le SMIC en 2026 : montant horaire, mensuel brut et net, historique,
            temps partiel, mecanisme de revalorisation et comparaison avec le salaire median.
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
              ["#chiffres", "SMIC 2026 en chiffres"],
              ["#historique", "Historique du SMIC (2020-2026)"],
              ["#brut-net", "Passer du SMIC brut au net"],
              ["#temps-partiel", "SMIC et temps partiel"],
              ["#revalorisation", "Revalorisation : comment et quand"],
              ["#median", "SMIC vs salaire median"],
              ["#faq", "Questions frequentes"],
            ].map(([href, label]) => (
              <li key={href}><a href={href} className="text-primary hover:underline">{label}</a></li>
            ))}
          </ul>
        </nav>

        <Section title="SMIC 2026 en chiffres" id="chiffres">
          <p>
            Au 1er janvier 2026, le SMIC a ete revalorise pour atteindre les montants suivants :
          </p>
          <div className="mt-4 rounded-xl border border-border bg-surface-card p-5">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-foreground">12,02 EUR</p>
                <p className="text-xs text-muted">SMIC horaire brut</p>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">1 823,03 EUR</p>
                <p className="text-xs text-muted">SMIC mensuel brut</p>
              </div>
              <div>
                <p className="text-xl font-bold text-primary">~1 443 EUR</p>
                <p className="text-xs text-muted">SMIC mensuel net</p>
              </div>
            </div>
            <p className="mt-3 text-[10px] text-center text-muted-light">Base 35h/semaine — 151,67h/mois — au 1er janvier 2026</p>
          </div>
          <p>
            Le SMIC annuel brut s&apos;eleve a environ 21 876 EUR, soit un SMIC annuel net d&apos;environ 17 316 EUR
            avant prelevement a la source. Le SMIC journalier brut pour 7 heures de travail est de 84,14 EUR.
          </p>
          <p>
            Ces montants s&apos;appliquent a l&apos;ensemble du territoire metropolitain et des departements d&apos;outre-mer,
            a l&apos;exception de Mayotte qui dispose d&apos;un SMIC specifique.
          </p>
        </Section>

        <Section title="Historique du SMIC (2020-2026)" id="historique">
          <p>
            Le SMIC a connu une progression significative ces dernieres annees, portee par l&apos;inflation
            et les revalorisations exceptionnelles de 2022 :
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted">
                  <th className="py-2 text-left font-medium">Date</th>
                  <th className="py-2 text-right font-medium">Horaire brut</th>
                  <th className="py-2 text-right font-medium">Mensuel brut</th>
                  <th className="py-2 text-right font-medium">Mensuel net</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {HISTORIQUE_SMIC.map((h) => (
                  <tr key={h.annee}>
                    <td className="py-2 font-medium text-foreground">{h.date}</td>
                    <td className="py-2 text-right text-muted">{h.horaire}</td>
                    <td className="py-2 text-right text-muted">{h.mensuelBrut}</td>
                    <td className="py-2 text-right font-medium text-foreground">{h.mensuelNet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-light">Source : Service-Public.fr, Legifrance. Base 35h/semaine.</p>
          <p>
            Entre 2020 et 2026, le SMIC horaire brut est passe de 10,15 EUR a 12,02 EUR, soit une
            hausse de 18,4%. Cette progression est principalement due a l&apos;inflation post-Covid et a la
            crise energetique de 2022 qui a declenche trois revalorisations la meme annee.
          </p>
        </Section>

        <Section title="Comment passer du SMIC brut au net" id="brut-net">
          <p>
            Pour convertir le SMIC brut en net, il faut deduire les cotisations salariales obligatoires.
            Pour un salarie non-cadre, ces cotisations representent environ <strong className="text-foreground">20,8%</strong> du
            salaire brut au niveau du SMIC (le taux est legerement inferieur au taux standard de 22%
            grace a l&apos;allegement de cotisations sur les bas salaires).
          </p>
          <div className="mt-3 rounded-lg border border-border bg-surface-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Calcul simplifie</p>
            <div className="mt-2 text-sm space-y-1">
              <p><strong className="text-foreground">SMIC brut :</strong> 1 823,03 EUR</p>
              <p><strong className="text-foreground">Cotisations salariales (~20,8%) :</strong> -379 EUR</p>
              <p><strong className="text-foreground">SMIC net avant impot :</strong> ~1 443 EUR</p>
            </div>
          </div>
          <p>
            Le montant exact depend de votre convention collective et de votre regime (general, Alsace-Moselle).
            Pour un calcul precis, utilisez notre{" "}
            <Link href="/outils/simulateur-brut-net" className="text-primary hover:underline">simulateur brut/net</Link>.
          </p>
          <p>
            Notez que les salaries au SMIC beneficient generalement d&apos;un taux de prelevement a la source
            de 0% grace au mecanisme de decote et d&apos;abattement fiscal, ce qui signifie que le net avant
            impot et le net apres impot sont souvent identiques.
          </p>
        </Section>

        <Section title="SMIC et temps partiel" id="temps-partiel">
          <p>
            Le SMIC a temps partiel se calcule proportionnellement aux heures travaillees. La base est
            toujours le SMIC horaire brut de 12,02 EUR.
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted">
                  <th className="py-2 text-left font-medium">Quotite</th>
                  <th className="py-2 text-right font-medium">Heures/semaine</th>
                  <th className="py-2 text-right font-medium">Brut mensuel</th>
                  <th className="py-2 text-right font-medium">Net mensuel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {[
                  { quotite: "100% (temps plein)", heures: "35h", brut: "1 823 EUR", net: "~1 443 EUR" },
                  { quotite: "80%", heures: "28h", brut: "1 458 EUR", net: "~1 155 EUR" },
                  { quotite: "50% (mi-temps)", heures: "17,5h", brut: "912 EUR", net: "~722 EUR" },
                  { quotite: "24h/semaine", heures: "24h", brut: "1 250 EUR", net: "~990 EUR" },
                ].map((tp) => (
                  <tr key={tp.quotite}>
                    <td className="py-2 font-medium text-foreground">{tp.quotite}</td>
                    <td className="py-2 text-right text-muted">{tp.heures}</td>
                    <td className="py-2 text-right text-muted">{tp.brut}</td>
                    <td className="py-2 text-right font-medium text-foreground">{tp.net}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Le calcul est simple : <strong className="text-foreground">SMIC horaire x heures mensuelles</strong>.
            Pour un mi-temps a 17,5h/semaine, les heures mensuelles sont 17,5 x 52 / 12 = 75,83h.
            Donc : 12,02 x 75,83 = 911,48 EUR brut.
          </p>
        </Section>

        <Section title="Revalorisation du SMIC : comment et quand" id="revalorisation">
          <p>
            Le mecanisme de revalorisation du SMIC est fixe par le Code du travail (articles L3231-4 et suivants).
            Il repose sur deux criteres cumulatifs :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-foreground">L&apos;inflation :</strong> le SMIC est indexe sur l&apos;indice des prix
              a la consommation (hors tabac) des menages du premier quintile de revenus.
            </li>
            <li>
              <strong className="text-foreground">Le pouvoir d&apos;achat :</strong> la moitie du gain de pouvoir d&apos;achat
              du salaire horaire de base ouvrier et employe (SHBOE) est ajoutee a la revalorisation.
            </li>
          </ul>
          <p>
            La revalorisation intervient au <strong className="text-foreground">1er janvier</strong> de chaque annee.
            Toutefois, si l&apos;indice des prix augmente de plus de 2% par rapport a la derniere revalorisation,
            un ajustement automatique en cours d&apos;annee est declenche — c&apos;est ce qui s&apos;est produit en mai
            et aout 2022.
          </p>
          <p>
            Le gouvernement peut egalement decider un &laquo; coup de pouce &raquo; supplementaire, mais cette
            pratique est devenue rare : le dernier date de juillet 2012.
          </p>
        </Section>

        <Section title="SMIC vs salaire median en France" id="median">
          <p>
            Le SMIC net (~1 443 EUR/mois) se situe bien en dessous du salaire net median
            en France, estime a environ <strong className="text-foreground">2 183 EUR</strong> net par mois (INSEE 2024).
            Cela signifie que le SMIC represente environ 66% du salaire median.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-surface-card p-4 text-center">
              <p className="text-lg font-bold text-foreground">1 443 EUR</p>
              <p className="text-xs text-muted">SMIC net</p>
            </div>
            <div className="rounded-lg border border-border bg-surface-card p-4 text-center">
              <p className="text-lg font-bold text-foreground">2 183 EUR</p>
              <p className="text-xs text-muted">Salaire median</p>
            </div>
            <div className="rounded-lg border border-border bg-surface-card p-4 text-center">
              <p className="text-lg font-bold text-foreground">2 735 EUR</p>
              <p className="text-xs text-muted">Salaire moyen</p>
            </div>
          </div>
          <p>
            Environ 12% des salaries du secteur prive sont remuneres au SMIC en France. Pour situer
            votre salaire par rapport au reste de la population, utilisez notre{" "}
            <Link href="/outils/niveau-richesse" className="text-primary hover:underline">outil Niveau de richesse</Link>.
          </p>
        </Section>

        {/* CTA */}
        <div className="mt-10 rounded-xl border border-primary/20 bg-primary-light p-6 text-center">
          <p className="text-base font-bold text-foreground">Calculez votre salaire net exact</p>
          <p className="mt-1 text-sm text-muted">Simulez la conversion brut/net avec les taux officiels 2026.</p>
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
              { name: "Simulateur brut/net", href: "/outils/simulateur-brut-net", desc: "Convertir un salaire brut en net" },
              { name: "Niveau de richesse", href: "/outils/niveau-richesse", desc: "Situez votre salaire en France" },
              { name: "Simulateur TMI", href: "/outils/simulateur-tmi", desc: "Votre tranche marginale d&apos;imposition" },
              { name: "Allocations chomage", href: "/outils/allocation-chomage", desc: "Estimez votre ARE" },
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
          <p><strong className="text-muted">Sources :</strong> Code du travail Art. L3231-1 a L3231-12 — Service-Public.fr — Legifrance — INSEE</p>
          <p className="mt-1">Guide mis a jour le 14 avril 2026. Les montants nets sont indicatifs et peuvent varier selon la convention collective.</p>
        </div>
      </article>
    </>
  );
}
