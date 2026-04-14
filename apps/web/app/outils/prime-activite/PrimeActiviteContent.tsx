import Link from "next/link";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export function PrimeActiviteContent() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <Section title="Qu&apos;est-ce que la prime d&apos;activite ?">
        <p>
          La prime d&apos;activite est une prestation sociale versee par la Caisse d&apos;Allocations Familiales (CAF)
          ou la Mutualite Sociale Agricole (MSA). Elle a ete creee en 2016 en remplacement du RSA activite
          et de la prime pour l&apos;emploi. Son objectif est d&apos;encourager l&apos;activite professionnelle
          et de soutenir le pouvoir d&apos;achat des travailleurs aux revenus modestes.
        </p>
        <p>
          Elle est versee mensuellement et son montant est recalcule tous les 3 mois en fonction
          des revenus declares par le beneficiaire.
        </p>
      </Section>

      <Section title="Conditions d&apos;eligibilite">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "18 ans+", label: "Age minimum", source: "Obligatoire" },
            { value: "France", label: "Residence", source: "Stable et reguliere" },
            { value: "Salarie ou independant", label: "Activite", source: "Professionnelle" },
            { value: "< plafond", label: "Revenus", source: "Selon composition foyer" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-surface-card p-3 text-center">
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="mt-0.5 text-xs text-muted">{s.label}</p>
              <p className="text-[10px] text-muted-light">{s.source}</p>
            </div>
          ))}
        </div>
        <p>
          La prime d&apos;activite est ouverte a toute personne de 18 ans ou plus, residant en France de maniere
          stable et reguliere, et exercant une activite professionnelle salariee ou independante.
          Les revenus du foyer ne doivent pas depasser un certain plafond qui varie selon la composition familiale.
        </p>
        <p>
          Les etudiants et apprentis peuvent en beneficier a condition que leur revenu mensuel net depasse
          1 082 EUR (environ 0,78 SMIC net).
        </p>
      </Section>

      <Section title="Montant forfaitaire 2026">
        <div className="rounded-lg border border-border bg-surface-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Montant de base</p>
          <div className="mt-2 text-sm space-y-1">
            <p><strong className="text-foreground">Celibataire sans enfant :</strong> 622,63 EUR</p>
            <p><strong className="text-foreground">Couple sans enfant :</strong> 933,95 EUR (+50%)</p>
            <p><strong className="text-foreground">Par enfant (2 premiers) :</strong> +186,79 EUR (+30%)</p>
            <p><strong className="text-foreground">Par enfant supplementaire :</strong> +249,05 EUR (+40%)</p>
          </div>
        </div>
        <p>
          Le montant forfaitaire est la composante principale du calcul de la prime d&apos;activite.
          Il est majore en fonction de la composition du foyer : +50% pour un couple,
          +30% par enfant pour les deux premiers, et +40% par enfant supplementaire.
        </p>
      </Section>

      <Section title="Bonification individuelle">
        <p>
          Une bonification individuelle est ajoutee pour chaque membre du foyer dont les revenus professionnels
          depassent 0,5 SMIC net (environ 632 EUR). Elle est progressive et atteint son maximum
          de 173,22 EUR lorsque le salaire atteint le SMIC net (environ 1 264 EUR).
        </p>
        <p>
          Cette bonification a ete renforcee en 2019 dans le cadre des mesures d&apos;urgence economiques
          et sociales, ce qui a significativement augmente le montant de la prime pour les travailleurs
          proches du SMIC.
        </p>
      </Section>

      <Section title="Comment faire la demande ?">
        <p>
          La demande de prime d&apos;activite se fait exclusivement en ligne sur{" "}
          <a href="https://www.caf.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">caf.fr</a>{" "}
          (ou msa.fr pour les salaries agricoles). Vous devrez renseigner vos revenus des 3 derniers mois
          et la composition de votre foyer.
        </p>
        <p>
          Une fois la prime accordee, vous devez declarer vos revenus tous les 3 mois (declaration trimestrielle)
          pour continuer a la percevoir. Le versement intervient le 5 du mois suivant.
        </p>
      </Section>

      <Section title="Outils complementaires">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Convertissez votre salaire brut en net" },
            { name: "Niveau de richesse", url: "/outils/niveau-richesse", desc: "Situez votre salaire en France" },
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
