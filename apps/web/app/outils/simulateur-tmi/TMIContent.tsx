import Link from "next/link";

const TRANCHES_IR = [
  { tranche: "Jusqu&apos;a 11 294 EUR", taux: "0%", exemple: "0 EUR", cumul: "0 EUR" },
  { tranche: "De 11 295 a 28 797 EUR", taux: "11%", exemple: "1 925 EUR", cumul: "1 925 EUR" },
  { tranche: "De 28 798 a 82 341 EUR", taux: "30%", exemple: "16 063 EUR", cumul: "17 988 EUR" },
  { tranche: "De 82 342 a 177 106 EUR", taux: "41%", exemple: "38 854 EUR", cumul: "56 842 EUR" },
  { tranche: "Au-dela de 177 106 EUR", taux: "45%", exemple: "Variable", cumul: "Variable" },
];

const EXEMPLES_TMI = [
  { revenu: "20 000 EUR", tmi: "11%", impot: "957 EUR", tauxMoyen: "4,8%" },
  { revenu: "30 000 EUR", tmi: "30%", impot: "2 287 EUR", tauxMoyen: "7,6%" },
  { revenu: "45 000 EUR", tmi: "30%", impot: "6 787 EUR", tauxMoyen: "15,1%" },
  { revenu: "60 000 EUR", tmi: "30%", impot: "11 287 EUR", tauxMoyen: "18,8%" },
  { revenu: "100 000 EUR", tmi: "41%", impot: "24 537 EUR", tauxMoyen: "24,5%" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export function TMIContent() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <Section title="Le bareme progressif de l&apos;impot sur le revenu explique">
        <p>
          L&apos;impot sur le revenu en France est calcule selon un bareme progressif compose de 5 tranches.
          Chaque tranche de revenu est imposee a un taux different, de 0% a 45%.
          Le <strong className="text-foreground">TMI</strong> (Taux Marginal d&apos;Imposition) correspond au taux applique
          a la derniere tranche de votre revenu.
        </p>
        <p>
          Attention : le TMI ne signifie pas que l&apos;ensemble de votre revenu est impose a ce taux.
          Seule la fraction de revenu situee dans cette tranche est taxee au TMI. Les tranches inferieures
          sont imposees aux taux correspondants.
        </p>
      </Section>

      <Section title="Les 5 tranches du bareme IR 2024 (revenus 2023)">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 text-left font-medium">Tranche de revenu (par part)</th>
                <th className="py-2 text-right font-medium">Taux</th>
                <th className="py-2 text-right font-medium">Impot sur la tranche</th>
                <th className="py-2 text-right font-medium">Impot cumule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {TRANCHES_IR.map((t) => (
                <tr key={t.tranche}>
                  <td className="py-2 font-medium text-foreground">{t.tranche}</td>
                  <td className="py-2 text-right text-primary font-medium">{t.taux}</td>
                  <td className="py-2 text-right text-muted">{t.exemple}</td>
                  <td className="py-2 text-right font-medium text-foreground">{t.cumul}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-light">
          Source : article 197 du Code general des impots. Bareme applicable aux revenus de 2023.
        </p>
      </Section>

      <Section title="Exemples concrets : TMI vs taux moyen">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 text-left font-medium">Revenu net imposable</th>
                <th className="py-2 text-right font-medium">TMI</th>
                <th className="py-2 text-right font-medium">Impot du</th>
                <th className="py-2 text-right font-medium">Taux moyen effectif</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {EXEMPLES_TMI.map((e) => (
                <tr key={e.revenu}>
                  <td className="py-2 font-medium text-foreground">{e.revenu}</td>
                  <td className="py-2 text-right text-primary font-medium">{e.tmi}</td>
                  <td className="py-2 text-right text-muted">{e.impot}</td>
                  <td className="py-2 text-right font-medium text-foreground">{e.tauxMoyen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-light">
          Calculs pour un celibataire (1 part) sans deductions particulieres.
        </p>
      </Section>

      <Section title="Le quotient familial">
        <p>
          Le quotient familial divise le revenu imposable par le nombre de parts du foyer fiscal
          avant d&apos;appliquer le bareme. Le resultat est ensuite multiplie par le nombre de parts
          pour obtenir l&apos;impot du.
        </p>
        <div className="rounded-lg border border-border bg-surface-card p-4 space-y-2">
          <p className="font-medium text-foreground">Nombre de parts :</p>
          <p className="text-foreground">Celibataire : <strong className="text-primary">1 part</strong></p>
          <p className="text-foreground">Couple marie/pacse : <strong className="text-primary">2 parts</strong></p>
          <p className="text-foreground">1er et 2e enfant : <strong className="text-primary">+0,5 part chacun</strong></p>
          <p className="text-foreground">3e enfant et suivants : <strong className="text-primary">+1 part chacun</strong></p>
          <p className="text-xs text-muted-light mt-2">
            Plafonnement : l&apos;avantage fiscal par demi-part supplementaire est limite a 1 759 EUR (2024).
          </p>
        </div>
      </Section>

      <Section title="Difference entre TMI et taux moyen d&apos;imposition">
        <p>
          <strong className="text-foreground">Le TMI</strong> est le taux applique au dernier euro gagne. Il est essentiel
          pour evaluer l&apos;impact fiscal d&apos;un revenu supplementaire : prime, augmentation, revenus locatifs,
          ou dividendes soumis au bareme progressif.
        </p>
        <p>
          <strong className="text-foreground">Le taux moyen</strong> est le rapport entre l&apos;impot total et le revenu total.
          Il est toujours inferieur au TMI car les premieres tranches sont imposees a des taux plus faibles.
          Par exemple, avec un TMI de 30%, le taux moyen effectif peut n&apos;etre que de 15%.
        </p>
        <p>
          Connaitre votre TMI est crucial pour optimiser votre fiscalite : choisir entre PFU et bareme
          pour vos dividendes, evaluer l&apos;interet du versement liberatoire en micro-entreprise,
          ou determiner si une deduction fiscale vaut le coup.
        </p>
      </Section>

      <Section title="Le prelevement a la source (PAS)">
        <p>
          Depuis janvier 2019, l&apos;impot est preleve directement sur les revenus par les employeurs,
          les caisses de retraite ou France Travail. Le taux de prelevement est actualise chaque annee
          en septembre, sur la base de votre derniere declaration.
        </p>
        <p>
          Vous pouvez opter pour un taux individualise (utile en cas de forte disparite de revenus dans le couple)
          ou un taux neutre (si vous ne souhaitez pas que votre employeur connaisse votre taux reel).
          La regularisation se fait lors de la declaration annuelle.
        </p>
      </Section>

      <Section title="Outils complementaires">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Convertissez votre salaire" },
            { name: "Niveau de richesse", url: "/outils/niveau-richesse", desc: "Situez vos revenus en France" },
            { name: "Optimisation SASU", url: "/outils/optimisation-sasu", desc: "Impact fiscal salaire vs dividendes" },
            { name: "Auto-entrepreneur", url: "/outils/simulateur-auto-entrepreneur", desc: "Versement liberatoire vs bareme" },
            { name: "Rupture conventionnelle", url: "/outils/rupture-conventionnelle", desc: "Fiscalite de l&apos;indemnite" },
            { name: "Simulateur retraite", url: "/outils/simulateur-retraite", desc: "Imposition de votre pension" },
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
