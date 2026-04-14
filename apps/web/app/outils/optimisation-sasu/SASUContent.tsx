import Link from "next/link";

const COMPARAISON_CHARGES = [
  { poste: "Protection sociale", sasu: "~65% sur salaire brut (patronales + salariales)", ae: "21,1 a 21,2% du CA (BNC/BIC)" },
  { poste: "Assurance chomage", sasu: "Non (president = assimile salarie)", ae: "Non (TNS)" },
  { poste: "Retraite de base", sasu: "Oui (CNAV, trimestres valides)", ae: "Oui (CIPAV ou SSI)" },
  { poste: "Retraite complementaire", sasu: "AGIRC-ARRCO", ae: "SSI uniquement" },
  { poste: "Impot societe", sasu: "15% puis 25%", ae: "Neant (IR directement)" },
  { poste: "Impot sur dividendes", sasu: "PFU 30% ou bareme IR", ae: "Non applicable" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export function SASUContent() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <Section title="Guide : optimisation de remuneration en SASU">
        <p>
          En SASU (Societe par Actions Simplifiee Unipersonnelle), le dirigeant a le choix entre se remunerer
          en salaire, en dividendes, ou en combinant les deux. Chaque option a un impact different sur les charges
          sociales, l&apos;impot sur les societes et l&apos;impot sur le revenu.
        </p>
        <p>
          L&apos;optimisation consiste a trouver le mix ideal entre salaire et dividendes pour maximiser le revenu
          net disponible tout en maintenant une protection sociale adequ ate.
        </p>
      </Section>

      <Section title="Le president de SASU : statut assimile salarie">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "~65%", label: "Charges sur salaire", source: "Patronales + salariales" },
            { value: "Oui", label: "Securite sociale", source: "Regime general" },
            { value: "Non", label: "Chomage", source: "Pas de cotisation" },
            { value: "Oui", label: "AGIRC-ARRCO", source: "Retraite complementaire" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-surface-card p-3 text-center">
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="mt-0.5 text-xs text-muted">{s.label}</p>
              <p className="text-[10px] text-muted-light">{s.source}</p>
            </div>
          ))}
        </div>
        <p>
          Le president de SASU est assimile salarie. Il beneficie de la meme protection sociale qu&apos;un salarie
          classique (maladie, maternite, retraite de base et complementaire) a l&apos;exception de l&apos;assurance chomage.
          En contrepartie, les charges sociales sont elevees : environ 80% du net verse en cotisations patronales et salariales.
        </p>
      </Section>

      <Section title="Impot sur les societes (IS) : deux tranches">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface-card p-4">
            <p className="font-medium text-foreground">Taux reduit</p>
            <p className="text-primary font-bold mt-2">15%</p>
            <p className="text-xs text-muted-light mt-1">Sur les 42 500 premiers euros de benefice</p>
          </div>
          <div className="rounded-lg border border-border bg-surface-card p-4">
            <p className="font-medium text-foreground">Taux normal</p>
            <p className="text-primary font-bold mt-2">25%</p>
            <p className="text-xs text-muted-light mt-1">Au-dela de 42 500 EUR de benefice</p>
          </div>
        </div>
        <p>
          Le taux reduit de 15% s&apos;applique sous conditions : CA inferieur a 10 millions d&apos;euros
          et capital entierement libere detenu a 75% minimum par des personnes physiques.
          Le salaire verse au president est une charge deductible du benefice imposable.
        </p>
      </Section>

      <Section title="PFU (flat tax) sur les dividendes">
        <div className="rounded-lg border border-border bg-surface-card p-4 space-y-2">
          <p className="font-medium text-foreground">Prelevement Forfaitaire Unique (PFU) :</p>
          <p className="text-primary font-bold">30% = 12,8% IR + 17,2% prelevements sociaux</p>
          <p className="text-xs text-muted-light mt-2">
            Option possible : imposition au bareme progressif de l&apos;IR avec abattement de 40%.
          </p>
        </div>
        <p>
          Les dividendes verses par la SASU sont soumis au PFU de 30% par defaut. Ce prelevement est liberatoire :
          il n&apos;y a rien de plus a payer. Contrairement a l&apos;EURL ou la SARL, il n&apos;y a <strong className="text-foreground">pas
          de cotisations sociales supplementaires</strong> sur les dividendes en SASU.
        </p>
        <p>
          L&apos;option pour le bareme progressif peut etre avantageuse si votre TMI est inferieure a 30%.
          Dans ce cas, un abattement de 40% s&apos;applique sur les dividendes avant imposition.
        </p>
      </Section>

      <Section title="Pourquoi mixer salaire et dividendes ?">
        <p>
          <strong className="text-foreground">Le salaire</strong> est lourdement charge (~65% de cotisations) mais ouvre des droits
          sociaux (retraite, maladie) et constitue une charge deductible de l&apos;IS.
        </p>
        <p>
          <strong className="text-foreground">Les dividendes</strong> ne supportent que le PFU de 30% (ou le bareme IR + PS)
          mais n&apos;ouvrent aucun droit social et ne sont verses qu&apos;apres paiement de l&apos;IS.
        </p>
        <p>
          Le mix optimal depend du montant du CA, de la situation familiale (quotient familial) et des besoins
          en protection sociale. En general, il est recommande de se verser un salaire minimum pour valider
          ses trimestres de retraite, puis de completer par des dividendes.
        </p>
      </Section>

      <Section title="Quand la SASU est-elle plus avantageuse ?">
        <p>
          La SASU devient interessante a partir d&apos;un CA annuel d&apos;environ <strong className="text-foreground">70 000 a 80 000 EUR</strong>,
          lorsque les plafonds de la micro-entreprise commencent a se rapprocher et que l&apos;optimisation
          salaire/dividendes permet de reduire la charge fiscale et sociale globale.
        </p>
        <p>
          Elle est particulierement adaptee si vous souhaitez une meilleure protection sociale (regime general),
          si vous avez des frais professionnels importants a deduire, ou si vous prevoyez de reinvestir
          une partie du benefice dans l&apos;entreprise.
        </p>
      </Section>

      <Section title="Outils complementaires">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Comparateur SASU vs AE", url: "/outils/comparateur-statuts", desc: "Comparez les deux statuts" },
            { name: "Auto-entrepreneur", url: "/outils/simulateur-auto-entrepreneur", desc: "Simulez vos revenus en micro" },
            { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Salaire net du president" },
            { name: "Simulateur TMI", url: "/outils/simulateur-tmi", desc: "Impact fiscal de votre remuneration" },
            { name: "Simulateur retraite", url: "/outils/simulateur-retraite", desc: "Trimestres et pension du president" },
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
