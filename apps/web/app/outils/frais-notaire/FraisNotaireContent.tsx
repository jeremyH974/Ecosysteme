import Link from "next/link";

const COMPOSITION_FRAIS = [
  { poste: "Droits de mutation (taxes)", ancien: "5,09% a 5,81%", neuf: "0,71%", desc: "Taxe departementale + taxe communale + frais d&apos;assiette" },
  { poste: "Emoluments du notaire", ancien: "~0,8 a 1%", neuf: "~0,8 a 1%", desc: "Remuneration reglementee du notaire (bareme degressif)" },
  { poste: "Debours et formalites", ancien: "~0,1%", neuf: "~0,1%", desc: "Frais avances par le notaire (cadastre, hypotheque, etc.)" },
  { poste: "Contribution de securite immobiliere", ancien: "0,10%", neuf: "0,10%", desc: "Publication au fichier immobilier (ex-conservation des hypotheques)" },
];

const EMOLUMENTS_BAREME = [
  { tranche: "De 0 a 6 500 EUR", taux: "3,870%" },
  { tranche: "De 6 500 a 17 000 EUR", taux: "1,596%" },
  { tranche: "De 17 000 a 60 000 EUR", taux: "1,064%" },
  { tranche: "Au-dela de 60 000 EUR", taux: "0,799%" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export function FraisNotaireContent() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <Section title="De quoi se composent les frais de notaire ?">
        <p>
          Les &laquo; frais de notaire &raquo; designent l&apos;ensemble des sommes versees au notaire lors d&apos;un achat immobilier.
          Contrairement a l&apos;idee recue, la remuneration du notaire (emoluments) ne represente qu&apos;une petite partie
          du total. L&apos;essentiel correspond aux droits de mutation (taxes reversees a l&apos;Etat et aux collectivites).
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 text-left font-medium">Poste</th>
                <th className="py-2 text-right font-medium">Ancien</th>
                <th className="py-2 text-right font-medium">Neuf</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {COMPOSITION_FRAIS.map((f) => (
                <tr key={f.poste}>
                  <td className="py-2">
                    <p className="font-medium text-foreground">{f.poste}</p>
                    <p className="text-xs text-muted-light">{f.desc}</p>
                  </td>
                  <td className="py-2 text-right font-medium text-foreground">{f.ancien}</td>
                  <td className="py-2 text-right text-primary font-medium">{f.neuf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Ancien vs neuf : une difference majeure">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface-card p-4 text-center">
            <p className="text-lg font-bold text-foreground">7 a 8%</p>
            <p className="text-xs text-muted mt-1">Frais dans l&apos;ancien</p>
            <p className="text-[10px] text-muted-light">Droits de mutation eleves (~5,8%)</p>
          </div>
          <div className="rounded-lg border border-border bg-surface-card p-4 text-center">
            <p className="text-lg font-bold text-primary">2 a 3%</p>
            <p className="text-xs text-muted mt-1">Frais dans le neuf</p>
            <p className="text-[10px] text-muted-light">Droits de mutation reduits (~0,7%)</p>
          </div>
        </div>
        <p>
          L&apos;achat d&apos;un bien neuf (VEFA ou moins de 5 ans) beneficie de droits de mutation reduits
          car la TVA immobiliere (20%) est deja incluse dans le prix de vente.
          Les droits de mutation ne s&apos;appliquent alors qu&apos;au taux reduit de 0,715%.
        </p>
        <p>
          Pour un achat a 300 000 EUR, la difference est significative : environ 22 500 EUR de frais dans l&apos;ancien
          contre 7 500 EUR dans le neuf, soit une economie de 15 000 EUR.
        </p>
      </Section>

      <Section title="Bareme des emoluments du notaire">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 text-left font-medium">Tranche de prix</th>
                <th className="py-2 text-right font-medium">Taux TTC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {EMOLUMENTS_BAREME.map((e) => (
                <tr key={e.tranche}>
                  <td className="py-2 font-medium text-foreground">{e.tranche}</td>
                  <td className="py-2 text-right text-primary font-medium">{e.taux}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-light">
          Source : decret n 2016-230. Bareme degressif applique par tranches cumulatives.
        </p>
      </Section>

      <Section title="Remise possible sur les emoluments">
        <p>
          Depuis 2021, le notaire peut accorder une remise de <strong className="text-foreground">20% maximum</strong> sur
          ses emoluments pour la fraction du prix depassant 100 000 EUR. Cette remise est a la discretion du notaire
          et doit etre appliquee de maniere uniforme a tous ses clients.
        </p>
        <p>
          En pratique, peu de notaires appliquent cette remise spontanement. N&apos;hesitez pas a la demander
          lors de votre premier rendez-vous, surtout pour les transactions importantes.
        </p>
      </Section>

      <Section title="Departements a taux de droits reduits">
        <p>
          Le taux departemental des droits de mutation est en principe de 4,50% mais certains departements
          appliquent un taux reduit a 3,80%. C&apos;est le cas de l&apos;Indre, du Morbihan et de Mayotte
          (liste susceptible d&apos;evoluer selon les votes des conseils departementaux).
        </p>
        <p>
          Attention : depuis 2014, la quasi-totalite des departements ont opte pour le taux maximal de 4,50%.
          Le taux communal de 1,20% s&apos;ajoute systematiquement, portant le taux global entre 5,09% et 5,81%
          selon le departement.
        </p>
      </Section>

      <Section title="Outils complementaires">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Rendement locatif", url: "/outils/rendement-locatif", desc: "Integrez les frais dans votre calcul" },
            { name: "Plus-value immobiliere", url: "/outils/plus-value-immobiliere", desc: "Estimez l&apos;impot a la revente" },
            { name: "Revision de loyer", url: "/outils/revision-loyer", desc: "Calculez la hausse annuelle du loyer" },
            { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Convertissez votre salaire" },
            { name: "Simulateur TMI", url: "/outils/simulateur-tmi", desc: "Votre tranche d&apos;imposition" },
            { name: "Niveau de richesse", url: "/outils/niveau-richesse", desc: "Evaluez votre capacite d&apos;emprunt" },
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
