import Link from "next/link";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export function CongesPayesContent() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <Section title="Droit aux conges payes">
        <p>
          Tout salarie a droit a des conges payes, quel que soit son type de contrat (CDI, CDD, interim),
          son temps de travail ou son anciennete. Le droit aux conges s&apos;acquiert des le premier jour de travail.
        </p>
        <p>
          Un salarie a temps plein acquiert <strong className="text-foreground">2,5 jours ouvrables</strong> de conges
          par mois de travail effectif, soit 30 jours ouvrables (5 semaines) par an. En jours ouvres
          (du lundi au vendredi), cela correspond a 25 jours par an.
        </p>
        <p>
          Certaines conventions collectives prevoient des jours supplementaires (conges d&apos;anciennete,
          jours de fractionnement, conges pour evenements familiaux).
        </p>
      </Section>

      <Section title="Calcul de l&apos;indemnite de conges payes">
        <p>
          L&apos;employeur doit comparer deux methodes de calcul et retenir la plus favorable au salarie :
        </p>
        <div className="grid gap-4 sm:grid-cols-2 mt-3">
          <div className="rounded-lg border border-border bg-surface-card p-4">
            <p className="text-sm font-bold text-foreground">Methode du maintien de salaire</p>
            <p className="mt-2 text-xs text-muted">
              Le salarie percoit son salaire habituel pendant ses conges, comme s&apos;il avait travaille.
              C&apos;est generalement la methode la plus favorable pour les salaires fixes.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface-card p-4">
            <p className="text-sm font-bold text-foreground">Methode du 1/10e</p>
            <p className="mt-2 text-xs text-muted">
              L&apos;indemnite est egale a 10% de la remuneration brute totale percue pendant la periode
              de reference, au prorata des jours pris. Avantageuse si le salarie a eu des primes.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Periode de reference">
        <p>
          La periode de reference pour l&apos;acquisition des conges payes va du{" "}
          <strong className="text-foreground">1er juin de l&apos;annee precedente au 31 mai de l&apos;annee en cours</strong>.
          Les conges acquis pendant cette periode doivent etre pris avant le 31 mai de l&apos;annee suivante.
        </p>
        <p>
          Certaines entreprises utilisent l&apos;annee civile (1er janvier au 31 decembre) comme periode
          de reference, ce qui est possible par accord d&apos;entreprise.
        </p>
      </Section>

      <Section title="Conges payes et maladie">
        <p>
          Depuis une decision de la Cour de cassation de 2024, les periodes d&apos;arret maladie
          (d&apos;origine professionnelle ou non) sont desormais prises en compte pour l&apos;acquisition
          des droits a conges payes. Un salarie en arret maladie continue d&apos;acquerir des jours de conges.
        </p>
        <p>
          Si un salarie tombe malade pendant ses conges, il peut demander le report des jours de conges
          non pris en raison de la maladie, sous reserve de produire un arret de travail.
        </p>
      </Section>

      <Section title="Conges non pris">
        <p>
          En principe, les conges non pris avant le 31 mai de l&apos;annee suivant la periode de reference
          sont perdus. Toutefois, plusieurs exceptions existent :
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Un accord d&apos;entreprise peut prevoir le report des conges non pris.</li>
          <li>Les jours places sur un Compte Epargne Temps (CET) sont conserves.</li>
          <li>En cas d&apos;impossibilite de prendre ses conges (maladie, maternite), ils sont reportes.</li>
        </ul>
        <p>
          En cas de rupture du contrat de travail, les conges non pris doivent etre payes sous forme
          d&apos;<strong className="text-foreground">indemnite compensatrice de conges payes</strong>.
        </p>
      </Section>

      <Section title="Outils complementaires">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Convertissez votre salaire brut en net" },
            { name: "Rupture conventionnelle", url: "/outils/rupture-conventionnelle", desc: "Calculez votre indemnite de depart" },
          ].map((tool) => (
            <Link
              key={tool.url}
              href={tool.url}
              className="group rounded-lg border border-border bg-surface-card p-3 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <p className="text-sm font-medium text-foreground group-hover:text-primary">{tool.name}</p>
              <p className="mt-0.5 text-xs text-muted">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
