import Link from "next/link";

const COTISATIONS_PAR_ACTIVITE = [
  { activite: "Vente de marchandises (BIC)", taux: "12,3%", abattement: "71%", plafond: "188 700 EUR", vl: "1,0%" },
  { activite: "Prestations de services (BIC)", taux: "21,2%", abattement: "50%", plafond: "77 700 EUR", vl: "1,7%" },
  { activite: "Prestations de services (BNC)", taux: "21,1%", abattement: "34%", plafond: "77 700 EUR", vl: "2,2%" },
  { activite: "Activites liberales (BNC CIPAV)", taux: "21,2%", abattement: "34%", plafond: "77 700 EUR", vl: "2,2%" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export function AEContent() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <Section title="Guide : le regime de la micro-entreprise">
        <p>
          La micro-entreprise (anciennement auto-entrepreneur) est le regime le plus simple pour demarrer
          une activite independante en France. Les cotisations sociales sont calculees en pourcentage
          du chiffre d&apos;affaires, sans charges fixes ni comptabilite complexe.
        </p>
        <p>
          Ce regime est ideal pour tester une activite, exercer un complement de revenu, ou lancer une activite
          de freelance. Les formalites administratives sont reduites au minimum : declaration en ligne,
          pas d&apos;obligation de bilan comptable, et declaration de CA trimestrielle ou mensuelle.
        </p>
      </Section>

      <Section title="Taux de cotisations par type d&apos;activite">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 text-left font-medium">Activite</th>
                <th className="py-2 text-right font-medium">Cotisations</th>
                <th className="py-2 text-right font-medium">Abattement fiscal</th>
                <th className="py-2 text-right font-medium">Plafond CA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {COTISATIONS_PAR_ACTIVITE.map((c) => (
                <tr key={c.activite}>
                  <td className="py-2 font-medium text-foreground">{c.activite}</td>
                  <td className="py-2 text-right text-primary font-medium">{c.taux}</td>
                  <td className="py-2 text-right text-muted">{c.abattement}</td>
                  <td className="py-2 text-right text-muted">{c.plafond}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-light">
          Source : URSSAF 2024. Les taux incluent la contribution a la formation professionnelle.
        </p>
      </Section>

      <Section title="L&apos;abattement fiscal forfaitaire">
        <p>
          En micro-entreprise, le benefice imposable n&apos;est pas calcule sur les charges reelles mais sur un
          abattement forfaitaire applique au chiffre d&apos;affaires. Cet abattement varie selon l&apos;activite :
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-surface-card p-4 text-center">
            <p className="text-lg font-bold text-primary">71%</p>
            <p className="text-xs text-muted mt-1">Vente de marchandises</p>
            <p className="text-[10px] text-muted-light">Revenu imposable = 29% du CA</p>
          </div>
          <div className="rounded-lg border border-border bg-surface-card p-4 text-center">
            <p className="text-lg font-bold text-primary">50%</p>
            <p className="text-xs text-muted mt-1">Prestations BIC</p>
            <p className="text-[10px] text-muted-light">Revenu imposable = 50% du CA</p>
          </div>
          <div className="rounded-lg border border-border bg-surface-card p-4 text-center">
            <p className="text-lg font-bold text-primary">34%</p>
            <p className="text-xs text-muted mt-1">Prestations BNC</p>
            <p className="text-[10px] text-muted-light">Revenu imposable = 66% du CA</p>
          </div>
        </div>
        <p>
          L&apos;abattement est automatiquement applique par l&apos;administration fiscale. Si vos charges reelles
          depassent cet abattement forfaitaire, le regime reel (SASU, EURL) peut etre plus avantageux.
        </p>
      </Section>

      <Section title="Plafonds de chiffre d&apos;affaires">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface-card p-4">
            <p className="font-medium text-foreground">Activites de vente</p>
            <p className="text-primary font-bold mt-2">188 700 EUR / an</p>
            <p className="text-xs text-muted-light mt-1">Achat-revente, fourniture de logement</p>
          </div>
          <div className="rounded-lg border border-border bg-surface-card p-4">
            <p className="font-medium text-foreground">Prestations de services</p>
            <p className="text-primary font-bold mt-2">77 700 EUR / an</p>
            <p className="text-xs text-muted-light mt-1">Services BIC et BNC, professions liberales</p>
          </div>
        </div>
        <p>
          En cas de depassement du plafond pendant deux annees consecutives, vous basculez automatiquement
          vers le regime reel d&apos;imposition. Un depassement ponctuel sur une seule annee est tolere.
        </p>
      </Section>

      <Section title="Le versement liberatoire de l&apos;impot">
        <p>
          Le versement liberatoire permet de payer l&apos;impot sur le revenu en meme temps que les cotisations
          sociales, sous forme d&apos;un pourcentage fixe du CA :
        </p>
        <div className="rounded-lg border border-border bg-surface-card p-4 space-y-2">
          <p className="text-foreground"><strong className="text-foreground">1,0%</strong> pour la vente de marchandises</p>
          <p className="text-foreground"><strong className="text-foreground">1,7%</strong> pour les prestations BIC</p>
          <p className="text-foreground"><strong className="text-foreground">2,2%</strong> pour les prestations BNC</p>
        </div>
        <p>
          Pour en beneficier, le revenu fiscal de reference du foyer (N-2) ne doit pas depasser 27 478 EUR
          par part de quotient familial. Cette option est avantageuse si votre TMI est superieure
          au taux du versement liberatoire.
        </p>
      </Section>

      <Section title="CFE et TVA">
        <p>
          <strong className="text-foreground">La CFE</strong> (Cotisation Fonciere des Entreprises) est due a partir de la 2e annee
          d&apos;activite. Son montant varie de 200 a 2 000 EUR selon la commune et le CA.
          Les micro-entrepreneurs dont le CA est inferieur a 5 000 EUR en sont exoneres.
        </p>
        <p>
          <strong className="text-foreground">La franchise de TVA</strong> s&apos;applique tant que le CA reste sous les seuils de base :
          91 900 EUR pour la vente et 36 800 EUR pour les services. En dessous de ces seuils, vous ne facturez pas
          la TVA a vos clients (mention &laquo; TVA non applicable, art. 293 B du CGI &raquo;). En contrepartie,
          vous ne pouvez pas recuperer la TVA sur vos achats.
        </p>
      </Section>

      <Section title="Outils complementaires">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Comparateur SASU vs AE", url: "/outils/comparateur-statuts", desc: "SASU ou micro-entreprise ?" },
            { name: "Optimisation SASU", url: "/outils/optimisation-sasu", desc: "Salaire vs dividendes en SASU" },
            { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Convertissez un salaire brut en net" },
            { name: "Simulateur TMI", url: "/outils/simulateur-tmi", desc: "Votre tranche marginale d&apos;imposition" },
            { name: "Allocation chomage", url: "/outils/allocation-chomage", desc: "Cumulez ARE et micro-entreprise" },
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
