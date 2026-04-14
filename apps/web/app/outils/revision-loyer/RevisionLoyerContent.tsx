import Link from "next/link";

const HISTORIQUE_IRL = [
  { trimestre: "T4 2024", valeur: "145,47", variation: "+3,26%" },
  { trimestre: "T3 2024", valeur: "144,12", variation: "+3,49%" },
  { trimestre: "T2 2024", valeur: "143,58", variation: "+3,60%" },
  { trimestre: "T1 2024", valeur: "143,46", variation: "+3,50%" },
  { trimestre: "T4 2023", valeur: "142,06", variation: "+3,50%" },
  { trimestre: "T3 2023", valeur: "141,03", variation: "+3,49%" },
  { trimestre: "T2 2023", valeur: "140,59", variation: "+3,50%" },
  { trimestre: "T1 2023", valeur: "138,61", variation: "+3,49%" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export function RevisionLoyerContent() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <Section title="L&apos;IRL explique : Indice de Reference des Loyers">
        <p>
          L&apos;Indice de Reference des Loyers (IRL) est publie chaque trimestre par l&apos;INSEE. Il sert de base
          a la revision annuelle des loyers d&apos;habitation en France. L&apos;IRL est calcule a partir
          de la moyenne sur 12 mois de l&apos;indice des prix a la consommation (hors tabac et loyers).
        </p>
        <p>
          Le proprietaire ne peut augmenter le loyer au-dela de la variation de l&apos;IRL. Si le bail prevoit
          une clause de revision, l&apos;augmentation est automatique a la date anniversaire du bail.
          En l&apos;absence de clause, aucune revision n&apos;est possible.
        </p>
      </Section>

      <Section title="Formule de revision du loyer">
        <div className="rounded-lg border border-border bg-surface-card p-4 space-y-2">
          <p className="font-medium text-foreground">Formule legale :</p>
          <p className="text-primary font-bold">Nouveau loyer = Loyer actuel x (IRL du trimestre de reference / IRL du meme trimestre de l&apos;annee precedente)</p>
          <p className="text-xs text-muted-light mt-2">
            Le trimestre de reference est celui indique dans le bail, ou a defaut le dernier IRL publie a la date anniversaire.
          </p>
        </div>
        <p>
          Exemple : pour un loyer de 800 EUR avec un IRL passant de 140,59 (T2 2023) a 143,58 (T2 2024),
          le nouveau loyer serait : 800 x 143,58 / 140,59 = <strong className="text-foreground">817,02 EUR</strong>,
          soit une hausse de 17,02 EUR par mois.
        </p>
      </Section>

      <Section title="Procedure de revision">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[
            { value: "1 an", label: "Periodicite", source: "Date anniversaire du bail" },
            { value: "1 an", label: "Delai de prescription", source: "Pour reclamer les arrieres" },
            { value: "Courrier", label: "Notification", source: "Lettre ou email" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-surface-card p-3 text-center">
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="mt-0.5 text-xs text-muted">{s.label}</p>
              <p className="text-[10px] text-muted-light">{s.source}</p>
            </div>
          ))}
        </div>
        <p>
          Le proprietaire doit notifier la revision au locataire par courrier, email ou acte d&apos;huissier.
          Si la notification n&apos;est pas faite dans l&apos;annee suivant la date de revision, le proprietaire
          perd le droit de reclamer retroactivement la hausse pour la periode ecoulee.
        </p>
        <p>
          La revision ne prend effet qu&apos;a compter de la date de notification, jamais retroactivement
          (sauf dans la limite d&apos;un an d&apos;arrieres pour les baux signes avant mars 2014).
        </p>
      </Section>

      <Section title="Zones tendues et encadrement des loyers">
        <p>
          Dans les zones tendues (28 agglomerations dont Paris, Lyon, Marseille, Bordeaux, Lille),
          des regles supplementaires s&apos;appliquent. En plus du plafonnement par l&apos;IRL,
          certaines villes ont mis en place un <strong className="text-foreground">encadrement des loyers</strong> qui fixe
          des loyers de reference par quartier et type de bien.
        </p>
        <p>
          A Paris, Lyon, Lille, Bordeaux, Montpellier et dans d&apos;autres villes, le loyer ne peut pas depasser
          le loyer de reference majore (loyer median + 20%). En cas de complement de loyer, le locataire
          peut contester dans les 3 mois suivant la signature du bail.
        </p>
        <p>
          Dans les zones tendues, lors d&apos;un renouvellement de bail, l&apos;augmentation est plafonnee a l&apos;IRL
          meme si le loyer est inferieur au prix du marche (sauf travaux importants ou loyer manifestement sous-evalue).
        </p>
      </Section>

      <Section title="Historique recent de l&apos;IRL">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 text-left font-medium">Trimestre</th>
                <th className="py-2 text-right font-medium">Valeur IRL</th>
                <th className="py-2 text-right font-medium">Variation annuelle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {HISTORIQUE_IRL.map((h) => (
                <tr key={h.trimestre}>
                  <td className="py-2 font-medium text-foreground">{h.trimestre}</td>
                  <td className="py-2 text-right text-muted">{h.valeur}</td>
                  <td className="py-2 text-right font-medium text-primary">{h.variation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-light">
          Source : INSEE. L&apos;IRL a ete plafonne a 3,5% de mi-2022 a mi-2024 (bouclier loyer).
        </p>
      </Section>

      <Section title="Outils complementaires">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Frais de notaire", url: "/outils/frais-notaire", desc: "Estimez vos frais d&apos;acquisition" },
            { name: "Rendement locatif", url: "/outils/rendement-locatif", desc: "Calculez votre rentabilite" },
            { name: "Plus-value immobiliere", url: "/outils/plus-value-immobiliere", desc: "Estimez l&apos;impot a la revente" },
            { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Convertissez votre salaire" },
            { name: "Simulateur TMI", url: "/outils/simulateur-tmi", desc: "Votre tranche d&apos;imposition" },
            { name: "Niveau de richesse", url: "/outils/niveau-richesse", desc: "Situez vos revenus en France" },
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
