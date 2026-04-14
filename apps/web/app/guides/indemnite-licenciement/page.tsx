import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "../../lib/Breadcrumb";

export const metadata: Metadata = {
  title: "Indemnite de licenciement 2026 — Calcul et droits",
  description:
    "Tout savoir sur l'indemnite de licenciement en 2026 : formule legale, conditions, differences avec la rupture conventionnelle, bareme Macron.",
  openGraph: {
    title: "Indemnite de licenciement 2026 — Calcul et droits",
    description: "Guide complet sur le calcul de l'indemnite de licenciement.",
    type: "article",
  },
};

const COMPARAISON = [
  { critere: "Initiative", licenciement: "Employeur", rupture: "Accord mutuel" },
  { critere: "Motif", licenciement: "Obligatoire (personnel ou economique)", rupture: "Aucun motif requis" },
  { critere: "Preavis", licenciement: "Obligatoire (1 a 3 mois)", rupture: "Negocie librement" },
  { critere: "Indemnite minimum", licenciement: "Legale (1/4 + 1/3)", rupture: "Legale (1/4 + 1/3)" },
  { critere: "Chomage (ARE)", licenciement: "Oui (sauf faute lourde)", rupture: "Oui" },
  { critere: "Contestation", licenciement: "Prud'hommes (bareme Macron)", rupture: "Plus difficile a contester" },
];

const BAREME_MACRON = [
  { anciennete: "1 an", plancher: "Neant", plafond: "1 mois" },
  { anciennete: "2 ans", plancher: "3 mois", plafond: "3,5 mois" },
  { anciennete: "5 ans", plancher: "3 mois", plafond: "6 mois" },
  { anciennete: "10 ans", plancher: "3 mois", plafond: "10 mois" },
  { anciennete: "15 ans", plancher: "3 mois", plafond: "13 mois" },
  { anciennete: "20 ans", plancher: "3 mois", plafond: "15,5 mois" },
  { anciennete: "30 ans+", plancher: "3 mois", plafond: "20 mois" },
];

const FAQ = [
  { q: "Peut-on negocier une indemnite superieure au minimum legal ?", a: "Oui. L'indemnite legale est un minimum. L'employeur peut proposer une indemnite supra-legale, notamment en cas de licenciement economique avec PSE (Plan de Sauvegarde de l'Emploi) ou lors de negociations transactionnelles." },
  { q: "L'indemnite de licenciement est-elle imposable ?", a: "L'indemnite legale de licenciement est exoneree d'impot et de cotisations sociales dans les memes limites que l'indemnite de rupture conventionnelle (le plus eleve entre l'indemnite legale, 2x la remuneration annuelle brute, ou 50% de l'indemnite)." },
  { q: "Que se passe-t-il en cas de faute grave ?", a: "En cas de licenciement pour faute grave ou faute lourde, le salarie perd le droit a l'indemnite de licenciement et au preavis. Il conserve toutefois le droit aux allocations chomage (sauf en cas de faute lourde dans certains cas)." },
  { q: "Comment est calcule le salaire de reference ?", a: "Le salaire de reference est la formule la plus avantageuse entre la moyenne des 12 derniers mois de salaire brut et la moyenne des 3 derniers mois (avec proratisation des primes annuelles sur cette periode)." },
  { q: "Le bareme Macron est-il obligatoire pour les juges ?", a: "Oui, depuis les ordonnances de 2017, les juges prud'homaux doivent respecter le bareme en cas de licenciement sans cause reelle et serieuse. Toutefois, certains conseils de prud'hommes l'ont ecarte en se fondant sur des conventions internationales." },
];

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-10">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export default function IndemniteLicenciementPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Guides" }, { label: "Indemnite de licenciement" }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Indemnite de licenciement 2026 — Calcul et droits",
        description: "Guide complet sur le calcul de l'indemnite de licenciement en France.",
        datePublished: "2026-04-14",
        dateModified: "2026-04-14",
        author: { "@type": "Organization", name: "Ecosysteme" },
        publisher: { "@type": "Organization", name: "Ecosysteme", url: "https://ecosysteme-tools.vercel.app" },
        mainEntityOfPage: "https://ecosysteme-tools.vercel.app/guides/indemnite-licenciement",
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
            Indemnite de licenciement — Calcul et droits
          </h1>
          <p className="mt-3 text-base text-muted">
            Formule legale, conditions d&apos;eligibilite, differences avec la rupture conventionnelle
            et bareme Macron : tout ce qu&apos;il faut savoir sur l&apos;indemnite de licenciement.
          </p>
          <div className="mt-5">
            <Link href="/outils/rupture-conventionnelle" className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
              Calculer mon indemnite
            </Link>
          </div>
        </header>

        {/* Sommaire */}
        <nav className="mt-8 rounded-xl border border-border bg-surface-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Sommaire</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {[
              ["#formule", "Formule legale de calcul"],
              ["#conditions", "Conditions d'eligibilite"],
              ["#comparaison", "Licenciement vs rupture conventionnelle"],
              ["#economique", "Licenciement economique"],
              ["#bareme", "Bareme Macron (indemnites prud'homales)"],
              ["#faq", "Questions frequentes"],
            ].map(([href, label]) => (
              <li key={href}><a href={href} className="text-primary hover:underline">{label}</a></li>
            ))}
          </ul>
        </nav>

        <Section title="Formule legale de calcul" id="formule">
          <p>
            L&apos;indemnite legale de licenciement se calcule de la meme maniere que l&apos;indemnite
            de rupture conventionnelle. La formule est la suivante :
          </p>
          <div className="rounded-lg border border-border bg-surface-card p-4 space-y-2">
            <p className="font-medium text-foreground">Pour les 10 premieres annees :</p>
            <p className="text-primary font-bold">1/4 de mois de salaire par annee d&apos;anciennete</p>
            <p className="font-medium text-foreground mt-3">Au-dela de 10 ans :</p>
            <p className="text-primary font-bold">1/3 de mois de salaire par annee d&apos;anciennete supplementaire</p>
          </div>
          <p>
            Le salaire de reference est le plus favorable entre la moyenne des 12 derniers mois
            et la moyenne des 3 derniers mois de salaire brut (avec proratisation des primes annuelles).
          </p>
          <div className="rounded-lg border border-border bg-surface-card p-4 mt-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Exemple : 8 ans, 3 000 EUR brut</p>
            <div className="mt-2 text-sm space-y-1">
              <p><strong className="text-foreground">Calcul :</strong> 3 000 x 1/4 x 8 = 6 000 EUR</p>
              <p><strong className="text-foreground">Indemnite minimale :</strong> 6 000 EUR</p>
            </div>
          </div>
        </Section>

        <Section title="Conditions d&apos;eligibilite" id="conditions">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: "CDI", label: "Type de contrat", source: "Uniquement" },
              { value: "8 mois", label: "Anciennete minimum", source: "Ininterrompue" },
              { value: "Non", label: "Faute grave", source: "Exclue" },
              { value: "Non", label: "Faute lourde", source: "Exclue" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-surface-card p-3 text-center">
                <p className="text-lg font-bold text-foreground">{s.value}</p>
                <p className="mt-0.5 text-xs text-muted">{s.label}</p>
                <p className="text-[10px] text-muted-light">{s.source}</p>
              </div>
            ))}
          </div>
          <p>
            Pour beneficier de l&apos;indemnite legale de licenciement, le salarie doit etre en CDI
            et justifier d&apos;au moins 8 mois d&apos;anciennete ininterrompue dans l&apos;entreprise.
            Le licenciement ne doit pas etre motive par une faute grave ou lourde.
          </p>
          <p>
            La convention collective peut prevoir des conditions plus favorables (indemnite superieure,
            anciennete requise moindre). Il faut toujours verifier la convention applicable.
          </p>
        </Section>

        <Section title="Licenciement vs rupture conventionnelle" id="comparaison">
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted">
                  <th className="py-2 text-left font-medium">Critere</th>
                  <th className="py-2 text-left font-medium">Licenciement</th>
                  <th className="py-2 text-left font-medium">Rupture conventionnelle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {COMPARAISON.map((c) => (
                  <tr key={c.critere}>
                    <td className="py-2 font-medium text-foreground">{c.critere}</td>
                    <td className="py-2 text-muted">{c.licenciement}</td>
                    <td className="py-2 text-muted">{c.rupture}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Licenciement economique" id="economique">
          <p>
            Le licenciement economique intervient pour des motifs non lies a la personne du salarie :
            difficultes economiques, mutations technologiques, reorganisation necessaire a la sauvegarde
            de la competitivite, ou cessation d&apos;activite.
          </p>
          <p>
            En cas de licenciement economique, le salarie beneficie de dispositifs supplementaires :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-foreground">CSP (Contrat de Securisation Professionnelle) :</strong>{" "}
              dans les entreprises de moins de 1 000 salaries, le CSP offre 12 mois d&apos;accompagnement
              renforce avec une allocation de 75% du salaire brut.
            </li>
            <li>
              <strong className="text-foreground">Reclassement :</strong>{" "}
              l&apos;employeur doit proposer un reclassement interne avant tout licenciement.
            </li>
            <li>
              <strong className="text-foreground">PSE :</strong>{" "}
              pour les entreprises de plus de 50 salaries licenciant 10 personnes ou plus, un Plan
              de Sauvegarde de l&apos;Emploi est obligatoire.
            </li>
          </ul>
        </Section>

        <Section title="Bareme Macron (indemnites prud&apos;homales)" id="bareme">
          <p>
            Depuis les ordonnances de septembre 2017, un bareme encadre les indemnites accordees
            par les prud&apos;hommes en cas de licenciement sans cause reelle et serieuse.
            Ce bareme fixe un plancher et un plafond en mois de salaire brut selon l&apos;anciennete :
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted">
                  <th className="py-2 text-left font-medium">Anciennete</th>
                  <th className="py-2 text-right font-medium">Plancher</th>
                  <th className="py-2 text-right font-medium">Plafond</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {BAREME_MACRON.map((b) => (
                  <tr key={b.anciennete}>
                    <td className="py-2 font-medium text-foreground">{b.anciennete}</td>
                    <td className="py-2 text-right text-muted">{b.plancher}</td>
                    <td className="py-2 text-right font-medium text-primary">{b.plafond}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-light">
            Source : Art. L1235-3 du Code du travail — Ordonnance n 2017-1387 du 22 septembre 2017.
            Plancher applicable aux entreprises de 11 salaries et plus.
          </p>
        </Section>

        {/* CTA */}
        <div className="mt-10 rounded-xl border border-primary/20 bg-primary-light p-6 text-center">
          <p className="text-base font-bold text-foreground">Calculez votre indemnite</p>
          <p className="mt-1 text-sm text-muted">Le meme calcul s&apos;applique pour le licenciement et la rupture conventionnelle.</p>
          <Link href="/outils/rupture-conventionnelle" className="mt-4 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
            Calculer mon indemnite
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
              { name: "Rupture conventionnelle", href: "/outils/rupture-conventionnelle", desc: "Calculez votre indemnite legale" },
              { name: "Allocations chomage", href: "/outils/allocation-chomage", desc: "Estimez votre ARE apres licenciement" },
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
          <p><strong className="text-muted">Sources :</strong> Code du travail Art. L1234-9, L1235-3 — Legifrance — Service-Public.fr</p>
          <p className="mt-1">Guide mis a jour le 14 avril 2026.</p>
        </div>
      </article>
    </>
  );
}
