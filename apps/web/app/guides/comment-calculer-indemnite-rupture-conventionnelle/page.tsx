import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "../../lib/Breadcrumb";

export const metadata: Metadata = {
  title: "Comment calculer son indemnite de rupture conventionnelle en 2026 — Guide complet",
  description:
    "Formule legale, exemples chiffres par anciennete et salaire, cas particuliers (temps partiel, convention collective), et simulateur gratuit. Guide mis a jour 2026.",
  openGraph: {
    title: "Calcul indemnite rupture conventionnelle 2026 — Guide complet",
    description: "Formule legale, exemples, cas particuliers et simulateur gratuit.",
    type: "article",
  },
};

const EXEMPLES = [
  { anciennete: "1 an", salaire: "2 000", indemnite: "500" },
  { anciennete: "2 ans", salaire: "2 500", indemnite: "1 250" },
  { anciennete: "3 ans", salaire: "2 000", indemnite: "1 500" },
  { anciennete: "5 ans", salaire: "3 000", indemnite: "3 750" },
  { anciennete: "8 ans", salaire: "2 500", indemnite: "5 000" },
  { anciennete: "10 ans", salaire: "3 000", indemnite: "7 500" },
  { anciennete: "12 ans", salaire: "3 000", indemnite: "9 500" },
  { anciennete: "15 ans", salaire: "3 000", indemnite: "12 500" },
  { anciennete: "20 ans", salaire: "3 500", indemnite: "20 417" },
  { anciennete: "25 ans", salaire: "4 000", indemnite: "30 000" },
  { anciennete: "30 ans", salaire: "3 000", indemnite: "27 500" },
];

const FAQ_GUIDE = [
  { q: "L&apos;indemnite de rupture conventionnelle est-elle imposable ?", a: "L&apos;indemnite legale est exoneree d&apos;impot sur le revenu et de cotisations sociales dans la limite du plafond legal (2 PASS soit 96 120 EUR en 2026). Au-dela, la part excedentaire est soumise a l&apos;impot et aux charges." },
  { q: "Mon employeur peut-il me proposer moins que l&apos;indemnite legale ?", a: "Non. L&apos;indemnite de rupture conventionnelle ne peut pas etre inferieure a l&apos;indemnite legale de licenciement. C&apos;est un plancher absolu. Votre convention collective peut prevoir un montant superieur." },
  { q: "Comment negocier une indemnite superieure au minimum legal ?", a: "Vous pouvez negocier en mettant en avant votre anciennete, vos competences difficiles a remplacer, le contexte economique de l&apos;entreprise, et le fait que la rupture conventionnelle evite un contentieux. Un montant de 1 a 3 mois de salaire au-dessus du minimum est courant." },
  { q: "Ai-je droit au chomage apres une rupture conventionnelle ?", a: "Oui. La rupture conventionnelle ouvre droit aux allocations chomage (ARE) dans les memes conditions qu&apos;un licenciement. Vous devez vous inscrire a France Travail et remplir les conditions d&apos;eligibilite (130 jours travailles sur 24 mois)." },
  { q: "Quelle est la duree de la procedure de rupture conventionnelle ?", a: "Au minimum 30 jours : un ou plusieurs entretiens prealables, puis la signature de la convention, puis 15 jours calendaires de retractation, puis l&apos;envoi a la DREETS qui a 15 jours ouvrables pour homologuer." },
  { q: "Peut-on faire une rupture conventionnelle en CDD ?", a: "Non. La rupture conventionnelle n&apos;existe que pour les CDI. Pour les CDD, il existe la rupture anticipee d&apos;un commun accord, qui obeit a des regles differentes." },
  { q: "Que se passe-t-il si la DREETS refuse l&apos;homologation ?", a: "En cas de refus (rare, environ 5% des demandes), les parties peuvent corriger les motifs de refus et soumettre une nouvelle demande. Les motifs frequents de refus sont : indemnite inferieure au minimum legal, absence d&apos;entretien prealable, ou vice du consentement." },
  { q: "Le salarie en arret maladie peut-il signer une rupture conventionnelle ?", a: "Oui, a condition que son consentement soit libre et eclaire. Un salarie en arret pour depression ou burn-out doit etre particulierement vigilant : la jurisprudence a annule des ruptures conventionnelles signees sous l&apos;effet de pressions psychologiques." },
  { q: "L&apos;anciennete en tant qu&apos;interim compte-t-elle ?", a: "Non. Seule l&apos;anciennete en CDI dans l&apos;entreprise est prise en compte. Les periodes d&apos;interim, de CDD ou de stage prealables ne comptent pas, sauf si le contrat de travail le prevoit expressement." },
  { q: "Comment est calcule le salaire de reference ?", a: "Le salaire de reference est le montant le plus favorable entre : la moyenne des 12 derniers mois de salaire brut, ou la moyenne des 3 derniers mois (avec les primes annuelles proratisees au 1/12e). C&apos;est l&apos;employeur qui doit retenir le calcul le plus avantageux pour le salarie." },
  { q: "Les primes comptent-elles dans le calcul ?", a: "Oui. Toutes les primes ayant un caractere de salaire sont incluses : prime d&apos;anciennete, 13e mois, prime de vacances, commission. Les primes exceptionnelles (prime de naissance, mariage) sont en general exclues." },
  { q: "Le temps partiel affecte-t-il le calcul ?", a: "Oui. Pour un salarie a temps partiel, le salaire de reference est le salaire a temps partiel actuel. Si le salarie a alterne temps plein et temps partiel, le calcul est proratise sur chaque periode. Les periodes a temps plein sont valorisees au salaire temps plein." },
  { q: "Y a-t-il un plafond a l&apos;indemnite de rupture conventionnelle ?", a: "Il n&apos;y a pas de plafond legal au montant de l&apos;indemnite. Cependant, au-dela de 2 PASS (96 120 EUR en 2026), la part excedentaire est soumise a impot et cotisations. Le forfait social de 30% s&apos;applique sur la part exoneree pour l&apos;employeur." },
  { q: "Puis-je contester ma rupture conventionnelle apres l&apos;avoir signee ?", a: "Oui, vous avez 12 mois apres l&apos;homologation pour saisir le Conseil de prud&apos;hommes. Les motifs de contestation sont : vice du consentement (pression, harcelement), erreur sur le montant de l&apos;indemnite, ou non-respect de la procedure." },
  { q: "La rupture conventionnelle est-elle possible pour un salarie protege ?", a: "Oui, mais la procedure est differente : il faut l&apos;autorisation de l&apos;Inspecteur du Travail (et non la simple homologation DREETS). Les delegues du personnel, membres du CSE et delegues syndicaux sont concernes." },
];

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-10">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export default function GuidePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Guides" }, { label: "Rupture conventionnelle" }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Comment calculer son indemnite de rupture conventionnelle en 2026",
        description: "Guide complet avec formule legale, exemples par anciennete, cas particuliers et simulateur gratuit.",
        datePublished: "2026-04-14",
        dateModified: "2026-04-14",
        author: { "@type": "Organization", name: "Ecosysteme" },
        publisher: { "@type": "Organization", name: "Ecosysteme", url: "https://ecosysteme-tools.vercel.app" },
        mainEntityOfPage: "https://ecosysteme-tools.vercel.app/guides/comment-calculer-indemnite-rupture-conventionnelle",
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_GUIDE.map((f) => ({
          "@type": "Question",
          name: f.q.replace(/&apos;/g, "'"),
          acceptedAnswer: { "@type": "Answer", text: f.a.replace(/&apos;/g, "'") },
        })),
      })}} />

      <article className="mx-auto max-w-3xl px-5 py-10">
        <header>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Guide complet</p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Comment calculer son indemnite de rupture conventionnelle en 2026
          </h1>
          <p className="mt-3 text-base text-muted">
            Formule legale, exemples chiffres, cas particuliers et simulateur gratuit.
            Mis a jour avec les baremes en vigueur au 1er janvier 2026.
          </p>
          <div className="mt-5">
            <Link href="/outils/rupture-conventionnelle" className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
              Calculer mon indemnite maintenant
            </Link>
          </div>
        </header>

        {/* Sommaire */}
        <nav className="mt-8 rounded-xl border border-border bg-surface-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Sommaire</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {[
              ["#conditions", "Conditions pour en beneficier"],
              ["#formule", "La formule legale de calcul"],
              ["#exemples", "Tableau d&apos;exemples par anciennete"],
              ["#salaire-reference", "Le salaire de reference"],
              ["#procedure", "La procedure etape par etape"],
              ["#cas-particuliers", "Cas particuliers"],
              ["#fiscalite", "Fiscalite de l&apos;indemnite"],
              ["#chomage", "Droit au chomage"],
              ["#faq", "Questions frequentes (15)"],
            ].map(([href, label]) => (
              <li key={href}><a href={href} className="text-primary hover:underline" dangerouslySetInnerHTML={{ __html: label ?? "" }} /></li>
            ))}
          </ul>
        </nav>

        <Section title="Qu&apos;est-ce qu&apos;une rupture conventionnelle ?" id="introduction">
          <p>
            La rupture conventionnelle est un mode de rupture du contrat de travail a duree indeterminee (CDI) d&apos;un commun accord entre l&apos;employeur et le salarie.
            Instauree par la loi du 25 juin 2008, elle offre une alternative au licenciement et a la demission en garantissant au salarie une indemnite au moins egale a l&apos;indemnite legale de licenciement et l&apos;ouverture de droits aux allocations chomage.
          </p>
          <p>
            En 2025, plus de 500 000 ruptures conventionnelles ont ete homologuees en France, ce qui en fait le troisieme mode de rupture du CDI apres la demission et le licenciement.
            Ce guide vous explique en detail comment calculer votre indemnite, quels sont vos droits, et comment optimiser votre negociation.
          </p>
        </Section>

        <Section title="Conditions pour beneficier d&apos;une rupture conventionnelle" id="conditions">
          <ul className="list-disc pl-5 space-y-1">
            <li>Etre en <strong className="text-foreground">CDI</strong> (la rupture conventionnelle n&apos;existe pas en CDD)</li>
            <li>Avoir au moins <strong className="text-foreground">8 mois d&apos;anciennete</strong> ininterrompue dans l&apos;entreprise</li>
            <li>Le consentement des deux parties doit etre <strong className="text-foreground">libre et eclaire</strong></li>
            <li>La procedure doit etre respectee (entretien, delai de retractation, homologation DREETS)</li>
          </ul>
          <p>
            Attention : un salarie en situation de harcelement, de depression liee au travail, ou sous pression de l&apos;employeur peut faire annuler la rupture conventionnelle par le Conseil de prud&apos;hommes pour vice du consentement.
          </p>
        </Section>

        <Section title="La formule legale de calcul" id="formule">
          <div className="rounded-xl border border-border bg-surface-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Formule officielle (Art. L1234-9 et R1234-2 du Code du travail)</p>
            <div className="mt-3 space-y-2 text-sm">
              <p className="font-medium text-foreground">
                Indemnite = Salaire de reference x (1/4 x annees jusqu&apos;a 10 ans) + (1/3 x annees au-dela de 10 ans)
              </p>
              <p>Soit :</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-foreground">1/4 de mois de salaire</strong> par annee d&apos;anciennete pour les 10 premieres annees</li>
                <li><strong className="text-foreground">1/3 de mois de salaire</strong> par annee d&apos;anciennete a partir de la 11e annee</li>
              </ul>
              <p>
                Pour les annees incompletes, le calcul est proratise au nombre de mois complets.
                Exemple : 7 ans et 6 mois = 7,5 annees dans la formule.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Tableau d&apos;exemples par anciennete et salaire" id="exemples">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted">
                  <th className="py-2 text-left font-medium">Anciennete</th>
                  <th className="py-2 text-right font-medium">Salaire brut/mois</th>
                  <th className="py-2 text-right font-medium">Indemnite minimale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {EXEMPLES.map((ex) => (
                  <tr key={ex.anciennete}>
                    <td className="py-2 font-medium text-foreground">{ex.anciennete}</td>
                    <td className="py-2 text-right text-muted">{ex.salaire} EUR</td>
                    <td className="py-2 text-right font-semibold text-primary">{ex.indemnite} EUR</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-light">
            Calculs bases sur l&apos;indemnite legale minimale (Art. L1234-9). La convention collective peut prevoir un montant superieur.
            <Link href="/outils/rupture-conventionnelle" className="ml-1 text-primary hover:underline">Calculer votre montant exact</Link>
          </p>
        </Section>

        <Section title="Le salaire de reference" id="salaire-reference">
          <p>
            Le salaire de reference est le montant le plus favorable entre deux methodes de calcul :
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Methode 1</p>
              <p className="mt-1 text-sm font-medium text-foreground">Moyenne des 12 derniers mois</p>
              <p className="mt-1 text-xs text-muted">Somme des salaires bruts des 12 mois precedant la notification, divisee par 12.</p>
            </div>
            <div className="rounded-lg border border-border bg-surface-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Methode 2</p>
              <p className="mt-1 text-sm font-medium text-foreground">Moyenne des 3 derniers mois</p>
              <p className="mt-1 text-xs text-muted">Somme des 3 derniers mois bruts + primes annuelles proratisees au 1/12e, divisee par 3.</p>
            </div>
          </div>
          <p className="mt-3">
            C&apos;est l&apos;employeur qui doit retenir le calcul le plus avantageux pour le salarie.
            Les primes regulieres (13e mois, prime de vacances, commissions) sont incluses.
            Les primes exceptionnelles (mariage, naissance) sont exclues.
          </p>
        </Section>

        <Section title="La procedure etape par etape" id="procedure">
          <div className="space-y-3">
            {[
              { etape: "1", titre: "Entretien(s) prealable(s)", desc: "Au moins un entretien entre l&apos;employeur et le salarie. Le salarie peut se faire assister par un collegue ou un conseiller du salarie." },
              { etape: "2", titre: "Signature de la convention", desc: "Les deux parties signent le formulaire Cerfa n°14598. Le montant de l&apos;indemnite et la date de fin de contrat y sont inscrits." },
              { etape: "3", titre: "Delai de retractation (15 jours)", desc: "Chaque partie peut se retracter sans motif pendant 15 jours calendaires a compter du lendemain de la signature." },
              { etape: "4", titre: "Envoi a la DREETS", desc: "Apres le delai de retractation, la demande d&apos;homologation est envoyee a la DREETS (ex-DIRECCTE)." },
              { etape: "5", titre: "Homologation (15 jours ouvrables)", desc: "La DREETS dispose de 15 jours ouvrables pour valider ou refuser. Le silence vaut acceptation." },
              { etape: "6", titre: "Fin du contrat", desc: "Le contrat se termine a la date prevue dans la convention. Le salarie recoit son solde de tout compte, son certificat de travail et son attestation France Travail." },
            ].map((e) => (
              <div key={e.etape} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">{e.etape}</span>
                <div>
                  <p className="text-sm font-medium text-foreground" dangerouslySetInnerHTML={{ __html: e.titre }} />
                  <p className="text-xs text-muted" dangerouslySetInnerHTML={{ __html: e.desc }} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Cas particuliers" id="cas-particuliers">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Temps partiel</h3>
              <p>Le salaire de reference est le salaire a temps partiel. Si le salarie a alterne temps plein et temps partiel, le calcul est proratise sur chaque periode.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Convention collective</h3>
              <p>Si votre convention collective prevoit une indemnite de licenciement superieure au minimum legal, c&apos;est ce montant superieur qui s&apos;applique comme plancher. Verifiez votre CC sur votre bulletin de paie (ligne IDCC).</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Salaries proteges</h3>
              <p>Les delegues du personnel, membres du CSE et delegues syndicaux necessitent l&apos;autorisation de l&apos;Inspecteur du Travail (pas seulement l&apos;homologation DREETS).</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Arret maladie</h3>
              <p>Un salarie en arret maladie peut signer une rupture conventionnelle. Cependant, si la maladie est liee au travail (harcelement, burn-out), la rupture peut etre annulee par les prud&apos;hommes.</p>
            </div>
          </div>
        </Section>

        <Section title="Fiscalite de l&apos;indemnite" id="fiscalite">
          <p>L&apos;indemnite de rupture conventionnelle beneficie d&apos;un regime fiscal avantageux :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-foreground">Exoneree d&apos;impot sur le revenu</strong> dans la limite du montant legal ou conventionnel</li>
            <li><strong className="text-foreground">Exoneree de cotisations sociales</strong> dans la limite de 2 PASS (96 120 EUR en 2026)</li>
            <li><strong className="text-foreground">Exoneree de CSG/CRDS</strong> dans la meme limite</li>
            <li>Au-dela, la part excedentaire est soumise a l&apos;impot sur le revenu et aux cotisations sociales</li>
          </ul>
          <p>
            Pour connaitre l&apos;impact sur votre imposition, utilisez notre{" "}
            <Link href="/outils/simulateur-tmi" className="text-primary hover:underline">simulateur TMI</Link>.
          </p>
        </Section>

        <Section title="Droit au chomage apres une rupture conventionnelle" id="chomage">
          <p>
            La rupture conventionnelle ouvre droit aux allocations chomage (ARE) dans les memes conditions qu&apos;un licenciement.
            Vous devez vous inscrire a France Travail dans les 12 mois suivant la fin du contrat.
          </p>
          <p>
            Estimez vos allocations avec notre{" "}
            <Link href="/outils/allocation-chomage" className="text-primary hover:underline">simulateur d&apos;allocations chomage</Link>.
          </p>
        </Section>

        {/* CTA */}
        <div className="mt-10 rounded-xl border border-primary/20 bg-primary-light p-6 text-center">
          <p className="text-base font-bold text-foreground">Calculez votre indemnite en 30 secondes</p>
          <p className="mt-1 text-sm text-muted">Bareme officiel 2026, resultat detaille et PDF telechargeable.</p>
          <Link href="/outils/rupture-conventionnelle" className="mt-4 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
            Simuler mon indemnite
          </Link>
        </div>

        {/* FAQ */}
        <Section title="Questions frequentes" id="faq">
          <div className="divide-y divide-border rounded-xl border border-border bg-surface-card overflow-hidden">
            {FAQ_GUIDE.map((f, i) => (
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
              { name: "Simulateur rupture conventionnelle", href: "/outils/rupture-conventionnelle", desc: "Calcul instantane de votre indemnite" },
              { name: "Simulateur brut/net", href: "/outils/simulateur-brut-net", desc: "Convertir votre salaire de reference" },
              { name: "Allocations chomage", href: "/outils/allocation-chomage", desc: "Estimer votre ARE apres la rupture" },
              { name: "Simulateur TMI", href: "/outils/simulateur-tmi", desc: "Impact fiscal de l&apos;indemnite" },
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
          <p><strong className="text-muted">Sources :</strong> Code du travail Art. L1234-9, L1237-11 a L1237-16, R1234-2 — Service-Public.fr — Legifrance</p>
          <p className="mt-1">Guide mis a jour le 14 avril 2026. Les montants sont indicatifs et bases sur l&apos;indemnite legale minimale.</p>
        </div>
      </article>
    </>
  );
}
