import Link from "next/link";

const TRANCHES_TRIMESTRES = [
  { anneeNaissance: "1961", ageLegal: "62 ans", trimestres: "168 (42 ans)" },
  { anneeNaissance: "1962", ageLegal: "62 ans et 6 mois", trimestres: "169 (42 ans et 3 mois)" },
  { anneeNaissance: "1963", ageLegal: "63 ans", trimestres: "170 (42 ans et 6 mois)" },
  { anneeNaissance: "1964", ageLegal: "63 ans et 6 mois", trimestres: "171 (42 ans et 9 mois)" },
  { anneeNaissance: "1965", ageLegal: "64 ans", trimestres: "172 (43 ans)" },
  { anneeNaissance: "1966 et apres", ageLegal: "64 ans", trimestres: "172 (43 ans)" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export function RetraiteContent() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <Section title="Le systeme de retraite francais : fonctionnement">
        <p>
          Le systeme de retraite francais repose sur le principe de <strong className="text-foreground">repartition</strong> :
          les actifs d&apos;aujourd&apos;hui financent les pensions des retraites actuels par leurs cotisations.
          La retraite se compose de deux etages obligatoires : la retraite de base et la retraite complementaire.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "64 ans", label: "Age legal", source: "Reforme 2023" },
            { value: "172", label: "Trimestres requis", source: "Nes apres 1965" },
            { value: "50%", label: "Taux plein base", source: "CNAV" },
            { value: "67 ans", label: "Taux plein automatique", source: "Sans decote" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-surface-card p-3 text-center">
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="mt-0.5 text-xs text-muted">{s.label}</p>
              <p className="text-[10px] text-muted-light">{s.source}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Retraite de base CNAV : la formule">
        <div className="rounded-lg border border-border bg-surface-card p-4 space-y-2">
          <p className="font-medium text-foreground">Formule de la pension de base :</p>
          <p className="text-primary font-bold">Pension = SAM x Taux x (Trimestres valides / Trimestres requis)</p>
          <p className="text-xs text-muted-light mt-2">
            SAM = Salaire Annuel Moyen des 25 meilleures annees. Taux plein = 50%.
          </p>
        </div>
        <p>
          Le <strong className="text-foreground">SAM</strong> (Salaire Annuel Moyen) est calcule sur les 25 meilleures annees
          de carriere. Les salaires anterieurs sont revalorises selon un coefficient fixe chaque annee par arrete ministeriel.
        </p>
        <p>
          Le SAM est plafonne au Plafond Annuel de la Securite Sociale (PASS = 46 368 EUR en 2024).
          Au-dela de ce plafond, seule la retraite complementaire prend le relais.
        </p>
      </Section>

      <Section title="Retraite complementaire AGIRC-ARRCO">
        <p>
          Les salaries du secteur prive cotisent obligatoirement a l&apos;AGIRC-ARRCO. Le systeme fonctionne
          par points : chaque annee, vos cotisations sont converties en points de retraite.
        </p>
        <div className="rounded-lg border border-border bg-surface-card p-4 space-y-2">
          <p className="font-medium text-foreground">Formule complementaire :</p>
          <p className="text-primary font-bold">Pension complementaire = Nombre de points x Valeur du point</p>
          <p className="text-xs text-muted-light mt-2">
            Valeur du point AGIRC-ARRCO en 2024 : 1,4159 EUR. Prix d&apos;achat du point : 19,6321 EUR.
          </p>
        </div>
        <p>
          Un coefficient de minoration temporaire de 10% pendant 3 ans s&apos;applique si vous partez au taux plein
          sans attendre un an supplementaire (coefficient dit &laquo; de solidarite &raquo;). Ce coefficient est supprime
          a partir du 1er avril 2025 pour les nouveaux retraites.
        </p>
      </Section>

      <Section title="Reforme 2023 : ce qui change">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 text-left font-medium">Annee de naissance</th>
                <th className="py-2 text-right font-medium">Age legal</th>
                <th className="py-2 text-right font-medium">Trimestres requis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {TRANCHES_TRIMESTRES.map((t) => (
                <tr key={t.anneeNaissance}>
                  <td className="py-2 font-medium text-foreground">{t.anneeNaissance}</td>
                  <td className="py-2 text-right text-muted">{t.ageLegal}</td>
                  <td className="py-2 text-right font-medium text-foreground">{t.trimestres}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-light">
          Source : loi n 2023-270 du 14 avril 2023 de financement rectificative de la securite sociale.
        </p>
      </Section>

      <Section title="Decote et surcote">
        <p>
          <strong className="text-foreground">La decote</strong> s&apos;applique si vous partez avant d&apos;avoir le nombre de trimestres
          requis. Chaque trimestre manquant reduit votre taux de 0,625 point (soit 1,25% de pension en moins par trimestre).
          La decote maximale est de 20 trimestres, soit un taux reduit a 37,5% au lieu de 50%.
        </p>
        <p>
          <strong className="text-foreground">La surcote</strong> recompense ceux qui continuent a travailler au-dela du taux plein.
          Chaque trimestre supplementaire au-dela du nombre requis augmente la pension de 1,25%.
          Il n&apos;y a pas de plafond a la surcote.
        </p>
      </Section>

      <Section title="Majoration pour enfants">
        <p>
          Les assures ayant eu ou eleve au moins 3 enfants beneficient d&apos;une majoration de 10% sur leur pension
          de base et sur leur retraite complementaire AGIRC-ARRCO.
        </p>
        <p>
          Cette majoration est cumulable avec les trimestres supplementaires accordes aux femmes pour maternite
          (8 trimestres par enfant : 4 au titre de la maternite + 4 au titre de l&apos;education).
          Les peres peuvent egalement beneficier des 4 trimestres d&apos;education sous conditions.
        </p>
      </Section>

      <Section title="Comment estimer ses trimestres">
        <p>
          Pour valider un trimestre, il faut avoir cotise sur un revenu egal a 150 fois le SMIC horaire brut,
          soit environ 1 782 EUR en 2024. On peut valider au maximum 4 trimestres par an.
        </p>
        <p>
          Certaines periodes non travaillees donnent droit a des trimestres assimiles : chomage indemnise,
          maladie, maternite, service militaire, invalidite. Ces trimestres comptent pour le taux
          mais pas pour le calcul du SAM.
        </p>
        <p>
          Vous pouvez consulter votre releve de carriere sur le site{" "}
          <strong className="text-foreground">info-retraite.fr</strong> pour verifier vos trimestres valides
          et corriger d&apos;eventuelles erreurs.
        </p>
      </Section>

      <Section title="Outils complementaires">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Convertissez votre salaire brut en net" },
            { name: "Simulateur TMI", url: "/outils/simulateur-tmi", desc: "Impact fiscal de votre pension" },
            { name: "Niveau de richesse", url: "/outils/niveau-richesse", desc: "Situez vos revenus en France" },
            { name: "Rupture conventionnelle", url: "/outils/rupture-conventionnelle", desc: "Indemnite avant la retraite" },
            { name: "Rendement locatif", url: "/outils/rendement-locatif", desc: "Completer sa retraite par l&apos;immobilier" },
            { name: "Allocation chomage", url: "/outils/allocation-chomage", desc: "Trimestres chomage et retraite" },
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
