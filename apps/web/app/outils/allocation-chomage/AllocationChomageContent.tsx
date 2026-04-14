import Link from "next/link";

const DUREES_INDEMNISATION = [
  { age: "Moins de 53 ans", dureeMin: "6 mois", dureeMax: "24 mois", condition: "130 jours travailles sur 24 mois" },
  { age: "53 - 54 ans", dureeMin: "6 mois", dureeMax: "30 mois", condition: "130 jours travailles sur 36 mois" },
  { age: "55 ans et plus", dureeMin: "6 mois", dureeMax: "36 mois", condition: "130 jours travailles sur 36 mois" },
];

const CAS_DEMISSION_LEGITIME = [
  "Suivi du conjoint qui change de lieu de residence pour un motif professionnel",
  "Non-paiement des salaires par l&apos;employeur",
  "Actes delictueux au travail (harcelement, violences)",
  "Demission pour creation ou reprise d&apos;entreprise (sous conditions)",
  "Demission d&apos;un contrat aide pour un CDI ou CDD de plus de 6 mois",
  "Demenagement pour cause de mariage ou PACS",
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export function AllocationChomageContent() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <Section title="Guide : l&apos;allocation de retour a l&apos;emploi (ARE)">
        <p>
          L&apos;allocation de retour a l&apos;emploi (ARE) est l&apos;indemnite versee par France Travail (anciennement Pole emploi)
          aux demandeurs d&apos;emploi involontairement prives d&apos;emploi. Son montant depend de vos anciens salaires
          et sa duree varie selon votre age et votre anciennete.
        </p>
        <p>
          Le calcul de l&apos;ARE repose sur le Salaire Journalier de Reference (SJR), lui-meme calcule a partir
          de vos salaires bruts percus au cours des 24 ou 36 derniers mois precedant la fin de contrat.
        </p>
      </Section>

      <Section title="Conditions d&apos;eligibilite">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "130 jours", label: "Travail minimum", source: "ou 910 heures" },
            { value: "24 mois", label: "Periode de reference", source: "36 mois si 53 ans+" },
            { value: "J+7", label: "Delai de carence", source: "Incompressible" },
            { value: "6 mois min.", label: "Duree minimale", source: "d&apos;indemnisation" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-surface-card p-3 text-center">
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="mt-0.5 text-xs text-muted">{s.label}</p>
              <p className="text-[10px] text-muted-light">{s.source}</p>
            </div>
          ))}
        </div>
        <p>
          Pour beneficier de l&apos;ARE, vous devez avoir travaille au moins 130 jours (ou 910 heures) au cours
          des 24 derniers mois (36 mois si vous avez 53 ans ou plus). La perte d&apos;emploi doit etre involontaire :
          licenciement, rupture conventionnelle, ou fin de CDD.
        </p>
      </Section>

      <Section title="Calcul du Salaire Journalier de Reference (SJR)">
        <div className="rounded-lg border border-border bg-surface-card p-4 space-y-2">
          <p className="font-medium text-foreground">Formule du SJR :</p>
          <p className="text-primary font-bold">SJR = Salaires bruts de la periode de reference / Nombre de jours calendaires</p>
          <p className="text-xs text-muted-light mt-2">
            La periode de reference correspond aux 24 derniers mois (ou 36 si 53 ans et plus).
            Seuls les jours travailles et assimiles sont pris en compte au denominateur.
          </p>
        </div>
        <p>
          Le SJR sert de base au calcul de l&apos;allocation journaliere. Il prend en compte les salaires bruts
          (y compris primes) percus pendant la periode de reference, a l&apos;exclusion des indemnites de rupture.
        </p>
      </Section>

      <Section title="Deux methodes de calcul de l&apos;allocation journaliere">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface-card p-4">
            <p className="font-medium text-foreground">Methode 1 : pourcentage</p>
            <p className="text-primary font-bold mt-2">40,4% du SJR + 12,95 EUR/jour</p>
            <p className="text-xs text-muted-light mt-1">Part fixe + part proportionnelle</p>
          </div>
          <div className="rounded-lg border border-border bg-surface-card p-4">
            <p className="font-medium text-foreground">Methode 2 : taux</p>
            <p className="text-primary font-bold mt-2">57% du SJR</p>
            <p className="text-xs text-muted-light mt-1">Taux proportionnel simple</p>
          </div>
        </div>
        <p>
          France Travail retient la formule la plus avantageuse pour le demandeur d&apos;emploi.
          L&apos;allocation journaliere ne peut pas etre inferieure a 31,59 EUR ni depasser 75% du SJR.
        </p>
        <p>
          En pratique, la methode 1 (40,4% + fixe) est plus favorable pour les bas salaires, tandis que
          la methode 2 (57%) avantage les salaires plus eleves.
        </p>
      </Section>

      <Section title="Duree d&apos;indemnisation selon l&apos;age">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 text-left font-medium">Age a la fin du contrat</th>
                <th className="py-2 text-right font-medium">Duree minimale</th>
                <th className="py-2 text-right font-medium">Duree maximale</th>
                <th className="py-2 text-left font-medium pl-4">Condition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {DUREES_INDEMNISATION.map((d) => (
                <tr key={d.age}>
                  <td className="py-2 font-medium text-foreground">{d.age}</td>
                  <td className="py-2 text-right text-muted">{d.dureeMin}</td>
                  <td className="py-2 text-right font-medium text-primary">{d.dureeMax}</td>
                  <td className="py-2 text-muted pl-4">{d.condition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-light">
          Source : Reglement d&apos;assurance chomage. Depuis 2023, un coefficient de 0,75 peut s&apos;appliquer
          en periode de conjoncture favorable (reforme contracyclique).
        </p>
      </Section>

      <Section title="Cas particuliers : demission legitime">
        <p>
          En principe, la demission ne donne pas droit au chomage. Cependant, certaines demissions sont considerees
          comme &laquo; legitimes &raquo; et ouvrent droit a l&apos;ARE :
        </p>
        <ul className="list-disc pl-5 space-y-1">
          {CAS_DEMISSION_LEGITIME.map((cas) => (
            <li key={cas}>{cas}</li>
          ))}
        </ul>
        <p>
          Depuis le 1er novembre 2019, la demission pour reconversion professionnelle peut egalement ouvrir droit
          au chomage, sous reserve de justifier d&apos;un projet professionnel reel et serieux valide par une commission paritaire.
        </p>
      </Section>

      <Section title="Cumul emploi-chomage">
        <p>
          France Travail permet de cumuler partiellement une activite professionnelle avec l&apos;ARE.
          Le montant de l&apos;allocation est reduit en fonction des revenus d&apos;activite, mais le cumul
          est souvent plus avantageux que l&apos;allocation seule.
        </p>
        <p>
          La formule de cumul : le nombre de jours non indemnises dans le mois est egal au revenu brut
          de l&apos;activite divise par le SJR. Les jours non consommes sont reportes et allongent la duree d&apos;indemnisation.
        </p>
      </Section>

      <Section title="Outils complementaires">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Rupture conventionnelle", url: "/outils/rupture-conventionnelle", desc: "Calculez votre indemnite de depart" },
            { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Convertissez votre salaire" },
            { name: "Simulateur TMI", url: "/outils/simulateur-tmi", desc: "Votre taux marginal d&apos;imposition" },
            { name: "Auto-entrepreneur", url: "/outils/simulateur-auto-entrepreneur", desc: "Cumulez ARE et micro-entreprise" },
            { name: "Niveau de richesse", url: "/outils/niveau-richesse", desc: "Situez votre salaire en France" },
            { name: "Simulateur retraite", url: "/outils/simulateur-retraite", desc: "Impact du chomage sur la retraite" },
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
