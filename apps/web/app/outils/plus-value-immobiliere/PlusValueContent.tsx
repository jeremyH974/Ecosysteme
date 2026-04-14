import Link from "next/link";

const ABATTEMENTS_IR = [
  { duree: "0 a 5 ans", taux: "0%", cumule: "0%" },
  { duree: "6e annee", taux: "6%", cumule: "6%" },
  { duree: "7e annee", taux: "6%", cumule: "12%" },
  { duree: "8e annee", taux: "6%", cumule: "18%" },
  { duree: "9e annee", taux: "6%", cumule: "24%" },
  { duree: "10e annee", taux: "6%", cumule: "30%" },
  { duree: "11e a 21e annee", taux: "6%/an", cumule: "30% a 96%" },
  { duree: "22e annee", taux: "4%", cumule: "100%" },
  { duree: "Au-dela de 22 ans", taux: "—", cumule: "Exonere (IR)" },
];

const ABATTEMENTS_PS = [
  { duree: "0 a 5 ans", taux: "0%", cumule: "0%" },
  { duree: "6e a 21e annee", taux: "1,65%/an", cumule: "1,65% a 26,40%" },
  { duree: "22e annee", taux: "1,80%", cumule: "28,20%" },
  { duree: "23e a 30e annee", taux: "9%/an", cumule: "28,20% a 100%" },
  { duree: "Au-dela de 30 ans", taux: "—", cumule: "Exonere (PS)" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export function PlusValueContent() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <Section title="Comment calculer la plus-value immobiliere ?">
        <p>
          La plus-value immobiliere est la difference entre le prix de vente et le prix d&apos;acquisition
          d&apos;un bien immobilier. Elle est soumise a l&apos;impot sur le revenu (19%) et aux prelevements sociaux (17,2%),
          soit un taux global de <strong className="text-foreground">36,2%</strong>, apres abattements pour duree de detention.
        </p>
        <div className="mt-3 rounded-lg border border-border bg-surface-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Formule de calcul</p>
          <div className="mt-2 text-sm space-y-1">
            <p><strong className="text-foreground">Plus-value brute</strong> = Prix de vente - Prix d&apos;acquisition corrige</p>
            <p><strong className="text-foreground">Prix d&apos;acquisition corrige</strong> = Prix d&apos;achat + frais d&apos;acquisition (7,5% forfaitaires ou reels) + travaux (15% forfaitaires apres 5 ans ou reels)</p>
            <p><strong className="text-foreground">Plus-value imposable</strong> = Plus-value brute - abattements pour duree de detention</p>
          </div>
        </div>
      </Section>

      <Section title="Abattements pour duree de detention (impot sur le revenu)">
        <p>
          L&apos;abattement pour duree de detention permet de reduire progressivement la plus-value imposable.
          Apres 22 ans de detention, la plus-value est totalement exoneree d&apos;impot sur le revenu :
        </p>
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 text-left font-medium">Duree de detention</th>
                <th className="py-2 text-right font-medium">Abattement annuel</th>
                <th className="py-2 text-right font-medium">Abattement cumule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {ABATTEMENTS_IR.map((a) => (
                <tr key={a.duree}>
                  <td className="py-2 font-medium text-foreground">{a.duree}</td>
                  <td className="py-2 text-right text-muted">{a.taux}</td>
                  <td className="py-2 text-right font-medium text-foreground">{a.cumule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Abattements pour duree de detention (prelevements sociaux)">
        <p>
          Les prelevements sociaux (17,2%) suivent un bareme different, plus lent. L&apos;exoneration totale
          n&apos;intervient qu&apos;apres <strong className="text-foreground">30 ans</strong> de detention :
        </p>
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 text-left font-medium">Duree de detention</th>
                <th className="py-2 text-right font-medium">Abattement annuel</th>
                <th className="py-2 text-right font-medium">Abattement cumule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {ABATTEMENTS_PS.map((a) => (
                <tr key={a.duree}>
                  <td className="py-2 font-medium text-foreground">{a.duree}</td>
                  <td className="py-2 text-right text-muted">{a.taux}</td>
                  <td className="py-2 text-right font-medium text-foreground">{a.cumule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Cas d&apos;exoneration de la plus-value">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Residence principale</h3>
            <p>La plus-value sur la vente de votre residence principale est totalement exoneree d&apos;impot, quelle que soit la duree de detention ou le montant. C&apos;est l&apos;exoneration la plus courante.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Premiere vente d&apos;un logement autre que la RP</h3>
            <p>Vous pouvez beneficier d&apos;une exoneration si vous n&apos;avez pas ete proprietaire de votre residence principale au cours des 4 dernieres annees et que vous remployez le prix de vente dans l&apos;achat d&apos;une residence principale dans les 24 mois.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Prix de vente inferieur a 15 000 EUR</h3>
            <p>Les cessions dont le prix ne depasse pas 15 000 EUR sont exonerees. Ce seuil s&apos;apprecie bien par bien (et non par vendeur), ce qui concerne surtout les parkings et caves.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Detention superieure a 30 ans</h3>
            <p>Apres 30 ans de detention, la plus-value est totalement exoneree tant d&apos;impot sur le revenu (22 ans) que de prelevements sociaux (30 ans).</p>
          </div>
        </div>
      </Section>

      <Section title="Surtaxe sur les plus-values immobilieres elevees">
        <p>
          Depuis 2013, une surtaxe s&apos;applique aux plus-values nettes imposables superieures a 50 000 EUR.
          Le taux varie de 2% (entre 50 001 et 60 000 EUR) a 6% (au-dela de 260 000 EUR). Cette surtaxe
          s&apos;ajoute a l&apos;impot de 19% et aux prelevements sociaux de 17,2%.
        </p>
      </Section>

      <Section title="Outils complementaires">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Frais de notaire", url: "/outils/frais-notaire", desc: "Estimez les frais d&apos;acquisition" },
            { name: "Rendement locatif", url: "/outils/rendement-locatif", desc: "Calculez la rentabilite de votre bien" },
            { name: "Simulateur TMI", url: "/outils/simulateur-tmi", desc: "Votre tranche marginale d&apos;imposition" },
          ].map((tool) => (
            <Link
              key={tool.url}
              href={tool.url}
              className="group rounded-lg border border-border bg-surface-card p-3 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <p className="text-sm font-medium text-foreground group-hover:text-primary">{tool.name}</p>
              <p className="mt-0.5 text-xs text-muted" dangerouslySetInnerHTML={{ __html: tool.desc }} />
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
