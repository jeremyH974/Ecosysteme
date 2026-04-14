import Link from "next/link";

const DECILES_SALAIRES = [
  { decile: "D1 (10% les moins payes)", seuil: "1 280 EUR", part: "3,5%" },
  { decile: "D2", seuil: "1 480 EUR", part: "5,0%" },
  { decile: "D3", seuil: "1 650 EUR", part: "6,0%" },
  { decile: "D4", seuil: "1 850 EUR", part: "7,0%" },
  { decile: "D5 (median)", seuil: "2 183 EUR", part: "8,0%" },
  { decile: "D6", seuil: "2 500 EUR", part: "9,0%" },
  { decile: "D7", seuil: "2 900 EUR", part: "10,5%" },
  { decile: "D8", seuil: "3 500 EUR", part: "13,0%" },
  { decile: "D9 (10% les mieux payes)", seuil: "4 500 EUR", part: "17,0%" },
  { decile: "Top 1%", seuil: "8 000 EUR+", part: "~6%" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export function NiveauRichesseContent() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <Section title="Comprendre les inegalites salariales en France">
        <p>
          La France presente des ecarts de revenus significatifs. Connaitre sa position dans la distribution
          des salaires permet de mieux comprendre sa situation financiere et de prendre des decisions eclairees
          en matiere de negociation salariale ou de choix de carriere.
        </p>
        <p>
          Les statistiques de l&apos;INSEE montrent que la repartition des salaires est fortement asymetrique :
          une minorite de tres hauts revenus tire la moyenne vers le haut, ce qui explique l&apos;ecart important
          entre salaire moyen et salaire median.
        </p>
      </Section>

      <Section title="Salaire moyen vs salaire median : quelle difference ?">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-border bg-surface-card p-4 text-center">
            <p className="text-lg font-bold text-foreground">2 735 EUR</p>
            <p className="mt-0.5 text-xs text-muted">Salaire net moyen</p>
            <p className="text-[10px] text-muted-light">INSEE 2024</p>
          </div>
          <div className="rounded-lg border border-border bg-surface-card p-4 text-center">
            <p className="text-lg font-bold text-primary">2 183 EUR</p>
            <p className="mt-0.5 text-xs text-muted">Salaire net median</p>
            <p className="text-[10px] text-muted-light">INSEE 2024</p>
          </div>
        </div>
        <p>
          Le <strong className="text-foreground">salaire moyen</strong> est la somme de tous les salaires divisee par le nombre
          de salaries. Il est tire vers le haut par les tres hauts revenus et ne reflete pas la realite de la majorite.
        </p>
        <p>
          Le <strong className="text-foreground">salaire median</strong> partage la population en deux : 50% gagnent moins,
          50% gagnent plus. C&apos;est un indicateur bien plus representatif de la situation &laquo; typique &raquo; d&apos;un salarie francais.
        </p>
        <p>
          L&apos;ecart de 552 EUR entre les deux chiffres illustre l&apos;impact des tres hauts salaires sur la moyenne.
          Si vous gagnez plus que le median, vous etes dans la moitie superieure des salaries francais.
        </p>
      </Section>

      <Section title="Seuil de pauvrete en France">
        <div className="rounded-lg border border-border bg-surface-card p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-foreground">1 158 EUR</p>
              <p className="text-xs text-muted">Seuil a 60% du median</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">965 EUR</p>
              <p className="text-xs text-muted">Seuil a 50% du median</p>
            </div>
            <div>
              <p className="text-lg font-bold text-primary">14,5%</p>
              <p className="text-xs text-muted">Taux de pauvrete</p>
            </div>
          </div>
          <p className="mt-3 text-[10px] text-center text-muted-light">Source : INSEE 2024 — seuils pour une personne seule</p>
        </div>
        <p>
          Le seuil de pauvrete est defini par l&apos;INSEE comme 60% du revenu median. En France, environ 9,1 millions
          de personnes vivent sous ce seuil, soit 14,5% de la population.
        </p>
      </Section>

      <Section title="Distribution des salaires par deciles">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 text-left font-medium">Decile</th>
                <th className="py-2 text-right font-medium">Seuil net mensuel</th>
                <th className="py-2 text-right font-medium">Part des revenus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {DECILES_SALAIRES.map((d) => (
                <tr key={d.decile}>
                  <td className="py-2 font-medium text-foreground">{d.decile}</td>
                  <td className="py-2 text-right text-muted">{d.seuil}</td>
                  <td className="py-2 text-right font-medium text-foreground">{d.part}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-light">
          Source : INSEE, donnees 2022. Salaires nets mensuels en equivalents temps plein.
        </p>
      </Section>

      <Section title="Pouvoir d&apos;achat et cout de la vie">
        <p>
          Le salaire net ne suffit pas a evaluer le niveau de vie reel. Le cout du logement, qui represente
          en moyenne 25 a 35% du budget des menages, varie fortement selon les regions. Un salaire de 2 500 EUR net
          a Paris n&apos;offre pas le meme confort qu&apos;en province.
        </p>
        <p>
          L&apos;inflation, mesuree par l&apos;indice des prix a la consommation (IPC), impacte directement le pouvoir
          d&apos;achat. Depuis 2022, les hausses de prix sur l&apos;alimentation et l&apos;energie ont significativement
          reduit le pouvoir d&apos;achat des menages francais, malgre les revalorisations du SMIC.
        </p>
      </Section>

      <Section title="Outils complementaires">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Convertissez votre salaire brut en net" },
            { name: "Simulateur TMI", url: "/outils/simulateur-tmi", desc: "Calculez votre taux marginal d&apos;imposition" },
            { name: "Allocation chomage", url: "/outils/allocation-chomage", desc: "Estimez votre ARE" },
            { name: "Rupture conventionnelle", url: "/outils/rupture-conventionnelle", desc: "Calculez votre indemnite de depart" },
            { name: "Auto-entrepreneur", url: "/outils/simulateur-auto-entrepreneur", desc: "Simulez vos revenus en micro" },
            { name: "Simulateur retraite", url: "/outils/simulateur-retraite", desc: "Estimez votre future pension" },
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
