import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "../../lib/Breadcrumb";

export const metadata: Metadata = {
  title: "Frais reels ou forfait 10% — Comment choisir en 2026 ?",
  description:
    "Guide complet pour choisir entre frais reels et abattement forfaitaire de 10%. Bareme km, repas, justificatifs, exemples chiffres.",
  openGraph: {
    title: "Frais reels ou forfait 10% — Comment choisir en 2026 ?",
    description: "Guide complet pour optimiser votre declaration de revenus : frais reels ou forfait 10%.",
    type: "article",
  },
};

const FAQ = [
  { q: "Quand les frais reels sont-ils plus avantageux ?", a: "Les frais reels sont plus interessants que l'abattement de 10% quand vos depenses professionnelles reelles (transport, repas, materiel) depassent 10% de votre salaire brut. C'est souvent le cas pour les salaries qui habitent loin de leur lieu de travail." },
  { q: "Quels justificatifs conserver pour les frais reels ?", a: "Conservez tous vos justificatifs pendant 3 ans : factures de carburant, abonnements transport, tickets de parking, factures de materiel professionnel, notes de restaurant (si repas hors domicile obligatoire), carte grise du vehicule." },
  { q: "Le teletravail reduit-il les frais reels ?", a: "Oui, les jours de teletravail ne generent pas de frais de transport domicile-travail. En revanche, vous pouvez deduire une quote-part de vos frais de bureau a domicile (electricite, internet, loyer proportionnel a la surface et au temps d'utilisation)." },
  { q: "Peut-on cumuler frais reels et abattement forfaitaire ?", a: "Non, c'est l'un ou l'autre. Vous devez choisir la meme option pour tous vos revenus salariaux. Vous ne pouvez pas appliquer les frais reels sur un emploi et le forfait sur un autre." },
  { q: "Le bareme kilometrique est-il le meme pour les voitures electriques ?", a: "Non. Les proprietaires de vehicules 100% electriques beneficient d'une majoration de 20% du bareme kilometrique. Par exemple, si le bareme vous donne 5 000 EUR, le montant deductible passe a 6 000 EUR pour un vehicule electrique." },
  { q: "Quelle est la limite de distance domicile-travail deductible ?", a: "En principe, seuls les 40 premiers kilometres du trajet aller sont retenus. Au-dela, vous devez justifier cet eloignement par des circonstances particulieres (emploi du conjoint, scolarite des enfants, etat de sante). Si la justification est admise, la totalite est deductible." },
  { q: "Les frais de transport en commun sont-ils deductibles ?", a: "Oui, les abonnements de transport en commun sont deductibles en frais reels (la part non remboursee par l'employeur). L'employeur est tenu de rembourser 50% de l'abonnement, le reste est deductible si vous optez pour les frais reels." },
  { q: "Comment declarer les frais reels sur impots.gouv.fr ?", a: "Sur votre declaration en ligne, cochez la case 'Frais reels' dans la section des traitements et salaires. Inscrivez le montant total dans la case 1AK (declarant 1) ou 1BK (declarant 2). Conservez les justificatifs en cas de controle." },
];

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-10">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export default function FraisReelsGuidePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Guides" }, { label: "Frais reels ou forfait 10%" }]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Frais reels ou forfait 10% — Comment choisir en 2026 ?",
        description: "Guide complet pour choisir entre frais reels et abattement forfaitaire de 10% sur la declaration de revenus.",
        datePublished: "2026-04-14",
        dateModified: "2026-04-14",
        author: { "@type": "Organization", name: "Ecosysteme" },
        publisher: { "@type": "Organization", name: "Ecosysteme", url: "https://ecosysteme-tools.vercel.app" },
        mainEntityOfPage: "https://ecosysteme-tools.vercel.app/guides/frais-reels-ou-forfait-10-pourcent",
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
            Frais reels ou forfait 10% : comment choisir en 2026 ?
          </h1>
          <p className="mt-3 text-base text-muted">
            Chaque annee, des millions de salaries francais se posent la meme question lors de leur
            declaration de revenus : faut-il garder l&apos;abattement forfaitaire de 10% ou opter pour
            la deduction des frais reels ? Ce guide vous donne toutes les cles pour faire le bon choix.
          </p>
          <div className="mt-5">
            <Link href="/outils/frais-reels-impots" className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
              Simuler mes frais reels
            </Link>
          </div>
        </header>

        {/* Sommaire */}
        <nav className="mt-8 rounded-xl border border-border bg-surface-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Sommaire</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {[
              ["#principe", "Le principe : deux options pour deduire vos frais"],
              ["#quand-choisir", "Quand choisir les frais reels ?"],
              ["#transport", "Frais de transport : le bareme kilometrique"],
              ["#repas", "Frais de repas : calcul et plafond"],
              ["#autres", "Autres frais deductibles"],
              ["#teletravail", "Cas particulier : le teletravail"],
              ["#erreurs", "Erreurs courantes a eviter"],
              ["#declaration", "Comment declarer les frais reels"],
              ["#faq", "Questions frequentes"],
            ].map(([href, label]) => (
              <li key={href}><a href={href} className="text-primary hover:underline">{label}</a></li>
            ))}
          </ul>
        </nav>

        <Section title="Le principe : deux options pour deduire vos frais" id="principe">
          <p>
            L&apos;administration fiscale propose deux methodes pour prendre en compte vos frais
            professionnels dans le calcul de votre impot sur le revenu :
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Forfait 10%</p>
              <p className="mt-1 text-sm font-medium text-foreground">Option par defaut</p>
              <p className="mt-1 text-xs text-muted">
                L&apos;administration deduit automatiquement 10% de vos revenus salariaux.
                Minimum 495 EUR, maximum 14 171 EUR (2026). Aucun justificatif necessaire.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Frais reels</p>
              <p className="mt-1 text-sm font-medium text-foreground">Option sur choix</p>
              <p className="mt-1 text-xs text-muted">
                Vous calculez et declarez le montant exact de vos depenses professionnelles.
                Justificatifs obligatoires. Pas de plafond.
              </p>
            </div>
          </div>
          <p>
            Les deux options sont mutuellement exclusives : vous ne pouvez pas cumuler le forfait
            sur une partie de vos frais et les frais reels sur une autre. Le choix s&apos;applique a
            l&apos;ensemble de vos revenus salariaux.
          </p>
        </Section>

        <Section title="Quand choisir les frais reels ?" id="quand-choisir">
          <p>
            La regle est simple : si le total de vos frais professionnels justifies depasse 10% de
            votre salaire brut, vous avez interet a opter pour les frais reels.
          </p>
          <p>
            En pratique, les frais reels sont souvent plus avantageux dans les cas suivants :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-foreground">Long trajet domicile-travail :</strong> a partir de 30 km aller
              (60 km aller-retour par jour), les frais kilometriques representent souvent plus de 10% du salaire.
            </li>
            <li>
              <strong className="text-foreground">Repas obligatoirement pris a l&apos;exterieur :</strong> si votre
              entreprise n&apos;a pas de cantine et que vous habitez trop loin pour rentrer manger.
            </li>
            <li>
              <strong className="text-foreground">Double residence :</strong> si votre conjoint travaille dans une
              autre ville, les frais de logement et de transport supplementaires sont deductibles.
            </li>
            <li>
              <strong className="text-foreground">Frais de materiel importants :</strong> achat d&apos;un ordinateur,
              outils specifiques, vetements de travail.
            </li>
          </ul>
          <div className="mt-3 rounded-lg border border-border bg-surface-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Exemple chiffre</p>
            <div className="mt-2 text-sm space-y-1">
              <p><strong className="text-foreground">Salaire brut annuel :</strong> 30 000 EUR → forfait 10% = 3 000 EUR</p>
              <p><strong className="text-foreground">Frais km (25 km aller, 5 CV, 220 jours) :</strong> ~5 322 EUR</p>
              <p><strong className="text-foreground">Frais repas (200 repas a 10 EUR) :</strong> ~960 EUR</p>
              <p><strong className="text-foreground">Total frais reels :</strong> 6 282 EUR &gt; 3 000 EUR → frais reels avantageux</p>
            </div>
          </div>
          <p>
            Utilisez notre{" "}
            <Link href="/outils/frais-reels-impots" className="text-primary hover:underline">simulateur frais reels</Link>
            {" "}pour comparer les deux options avec vos chiffres exacts.
          </p>
        </Section>

        <Section title="Frais de transport : le bareme kilometrique" id="transport">
          <p>
            Les frais de deplacement domicile-travail constituent le poste le plus important des frais
            reels. Ils sont calcules a l&apos;aide du bareme kilometrique publie chaque annee par l&apos;administration
            fiscale (BOFIP).
          </p>
          <p>
            Le bareme depend de deux facteurs : la puissance fiscale du vehicule (inscrite sur la carte grise,
            rubrique P.6) et la distance annuelle parcourue. Il couvre la depreciation du vehicule,
            l&apos;assurance, les reparations, l&apos;entretien, les pneumatiques et le carburant.
          </p>
          <p>
            Les frais de peage, de parking et de stationnement payant peuvent etre ajoutes en plus du
            bareme, sur justificatif. Pour les vehicules 100% electriques, le bareme est majore de 20%.
          </p>
          <p>
            Attention : en principe, seuls les 40 premiers kilometres du trajet aller sont retenus.
            Si votre domicile est plus eloigne, vous devez justifier cet eloignement (emploi du conjoint,
            sante, scolarite des enfants).
          </p>
          <p>
            Pour calculer vos frais kilometriques exacts, utilisez notre{" "}
            <Link href="/outils/indemnites-km" className="text-primary hover:underline">calculateur d&apos;indemnites km</Link>.
          </p>
        </Section>

        <Section title="Frais de repas : calcul et plafond" id="repas">
          <p>
            Si vous etes contraint de prendre vos repas hors de votre domicile (absence de cantine
            d&apos;entreprise, distance domicile-travail trop grande pour rentrer), vous pouvez deduire
            une partie de vos frais de repas.
          </p>
          <p>
            La deduction n&apos;est pas le cout total du repas, mais la difference entre ce que vous payez
            reellement et la valeur forfaitaire du repas pris a domicile fixee par l&apos;URSSAF : 5,20 EUR
            en 2024.
          </p>
          <p>
            De plus, le cout reel pris en compte est plafonne a 20,20 EUR par repas. La deduction maximale
            par repas est donc de 20,20 - 5,20 = 15 EUR.
          </p>
          <div className="mt-3 rounded-lg border border-border bg-surface-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Exemples de deduction par repas</p>
            <div className="mt-2 text-sm space-y-1">
              <p><strong className="text-foreground">Repas a 8 EUR :</strong> 8 - 5,20 = 2,80 EUR deductibles</p>
              <p><strong className="text-foreground">Repas a 15 EUR :</strong> 15 - 5,20 = 9,80 EUR deductibles</p>
              <p><strong className="text-foreground">Repas a 25 EUR :</strong> 20,20 - 5,20 = 15 EUR deductibles (plafond)</p>
            </div>
          </div>
          <p>
            Si votre entreprise dispose d&apos;une cantine ou d&apos;un restaurant inter-entreprises, vous ne
            pouvez deduire que la difference entre ce que vous payez et 5,20 EUR, a condition que le
            prix depasse cette valeur.
          </p>
        </Section>

        <Section title="Autres frais deductibles" id="autres">
          <p>
            Au-dela du transport et des repas, d&apos;autres frais professionnels peuvent etre deduits
            en frais reels, a condition d&apos;etre directement lies a l&apos;exercice de votre activite :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-foreground">Materiel informatique :</strong> ordinateur portable, ecran,
              clavier, souris, logiciels. Si le materiel est aussi utilise a titre personnel, seule la part
              professionnelle est deductible (prorata du temps d&apos;utilisation).
            </li>
            <li>
              <strong className="text-foreground">Telephone et internet :</strong> la part professionnelle de
              votre forfait telephone et de votre abonnement internet.
            </li>
            <li>
              <strong className="text-foreground">Formation et ouvrages :</strong> les frais de formation
              professionnelle, les certifications, les livres et revues specialisees.
            </li>
            <li>
              <strong className="text-foreground">Vetements de travail :</strong> uniquement les vetements
              specifiques a la profession (uniformes, blouses, chaussures de securite). Les vetements
              de ville ne sont pas deductibles.
            </li>
            <li>
              <strong className="text-foreground">Double residence :</strong> si votre conjoint travaille dans
              une autre ville, les frais de loyer du second logement et les deplacements entre les deux
              residences sont deductibles.
            </li>
            <li>
              <strong className="text-foreground">Cotisations syndicales :</strong> les cotisations a un syndicat
              professionnel ouvrent droit a un credit d&apos;impot de 66%, mais peuvent aussi etre incluses
              dans les frais reels si c&apos;est plus avantageux.
            </li>
          </ul>
        </Section>

        <Section title="Cas particulier : le teletravail" id="teletravail">
          <p>
            Le teletravail modifie sensiblement le calcul des frais reels. Les jours teletravailles ne
            generent pas de frais de transport domicile-travail ni de frais de repas a l&apos;exterieur.
            En revanche, ils peuvent generer des frais specifiques :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Quote-part du loyer ou des charges de copropriete (prorata de la surface du bureau)</li>
            <li>Electricite et chauffage du bureau a domicile</li>
            <li>Abonnement internet (part professionnelle)</li>
            <li>Mobilier de bureau (chaise ergonomique, bureau)</li>
          </ul>
          <p>
            L&apos;administration fiscale admet un forfait simplifie de 2,60 EUR par jour de teletravail
            (plafonnable a 57,20 EUR par mois). Ce forfait peut etre utilise a la place du calcul reel
            des frais de teletravail.
          </p>
          <p>
            Si vous teletravaillez 2 jours par semaine sur 46 semaines, cela represente 92 jours x 2,60 EUR
            = 239,20 EUR de frais de teletravail, a ajouter a vos frais de transport pour les jours de
            presence (220 - 92 = 128 jours).
          </p>
        </Section>

        <Section title="Erreurs courantes a eviter" id="erreurs">
          <p>
            Voici les pieges les plus frequents lors de la declaration des frais reels :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-foreground">Oublier de deduire le remboursement employeur :</strong> si votre
              employeur rembourse une partie de vos frais (transport en commun, indemnites km), cette part
              remboursee doit etre reintegree dans vos revenus ou deduite de vos frais.
            </li>
            <li>
              <strong className="text-foreground">Depasser les 40 km sans justification :</strong> au-dela de
              40 km aller, l&apos;administration peut refuser la deduction si l&apos;eloignement n&apos;est pas justifie.
            </li>
            <li>
              <strong className="text-foreground">Deduire les repas si une cantine est disponible :</strong> si
              votre entreprise propose une cantine a prix subventionne, les frais de repas pris a l&apos;exterieur
              ne sont generalement pas admis.
            </li>
            <li>
              <strong className="text-foreground">Ne pas conserver les justificatifs :</strong> en cas de controle,
              l&apos;absence de justificatifs entraine le rejet de la deduction et un eventuel rappel d&apos;impot.
            </li>
          </ul>
        </Section>

        <Section title="Comment declarer les frais reels" id="declaration">
          <p>
            La declaration des frais reels se fait sur le formulaire 2042, dans la section
            &laquo; Traitements et salaires &raquo; :
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Connectez-vous sur <strong className="text-foreground">impots.gouv.fr</strong></li>
            <li>Ouvrez votre declaration de revenus</li>
            <li>Dans la section &laquo; Traitements, salaires &raquo;, cochez &laquo; Frais reels &raquo;</li>
            <li>Inscrivez le montant total dans la case <strong className="text-foreground">1AK</strong> (declarant 1) ou <strong className="text-foreground">1BK</strong> (declarant 2)</li>
            <li>Joignez un detail du calcul (non obligatoire mais recommande)</li>
            <li>Conservez tous les justificatifs pendant 3 ans</li>
          </ol>
          <p>
            Avant de declarer, verifiez que vos frais reels sont bien superieurs au forfait 10% avec
            notre{" "}
            <Link href="/outils/frais-reels-impots" className="text-primary hover:underline">simulateur frais reels</Link>.
            Puis estimez l&apos;impact sur votre impot avec le{" "}
            <Link href="/outils/simulateur-tmi" className="text-primary hover:underline">simulateur TMI</Link>.
          </p>
        </Section>

        {/* CTA */}
        <div className="mt-10 rounded-xl border border-primary/20 bg-primary-light p-6 text-center">
          <p className="text-base font-bold text-foreground">Comparez frais reels et forfait 10%</p>
          <p className="mt-1 text-sm text-muted">Simulez avec vos chiffres exacts en 30 secondes.</p>
          <Link href="/outils/frais-reels-impots" className="mt-4 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
            Lancer la simulation
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
              { name: "Simulateur frais reels", href: "/outils/frais-reels-impots", desc: "Comparez frais reels et forfait 10%" },
              { name: "Simulateur TMI", href: "/outils/simulateur-tmi", desc: "Estimez votre taux marginal d'imposition" },
              { name: "Indemnites km", href: "/outils/indemnites-km", desc: "Calcul detaille des frais kilometriques" },
              { name: "Jours ouvres", href: "/outils/jours-ouvres", desc: "Nombre de jours travailles entre deux dates" },
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
          <p><strong className="text-muted">Sources :</strong> BOFIP BOI-BAREME-000001 — URSSAF Frais professionnels — Service-Public.fr — Code general des impots Art. 83</p>
          <p className="mt-1">Guide mis a jour le 14 avril 2026. Les montants et seuils sont indicatifs et sujets a evolution reglementaire.</p>
        </div>
      </article>
    </>
  );
}
