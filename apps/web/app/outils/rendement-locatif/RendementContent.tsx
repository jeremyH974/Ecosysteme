import Link from "next/link";

const RENDEMENTS_VILLES = [
  { ville: "Paris", rendementBrut: "3,0 - 4,0%", rendementNet: "2,0 - 3,0%", prixM2: "~9 500 EUR" },
  { ville: "Lyon", rendementBrut: "3,5 - 5,0%", rendementNet: "2,5 - 3,5%", prixM2: "~4 800 EUR" },
  { ville: "Marseille", rendementBrut: "5,0 - 7,0%", rendementNet: "3,5 - 5,0%", prixM2: "~3 200 EUR" },
  { ville: "Bordeaux", rendementBrut: "3,5 - 5,0%", rendementNet: "2,5 - 3,5%", prixM2: "~4 500 EUR" },
  { ville: "Lille", rendementBrut: "5,0 - 7,0%", rendementNet: "3,5 - 5,0%", prixM2: "~3 400 EUR" },
  { ville: "Toulouse", rendementBrut: "4,0 - 5,5%", rendementNet: "2,8 - 4,0%", prixM2: "~3 600 EUR" },
  { ville: "Saint-Etienne", rendementBrut: "7,0 - 10,0%", rendementNet: "5,0 - 7,0%", prixM2: "~1 200 EUR" },
  { ville: "Rennes", rendementBrut: "4,0 - 5,5%", rendementNet: "2,8 - 4,0%", prixM2: "~3 800 EUR" },
];

const CHARGES_DEDUCTIBLES = [
  { charge: "Taxe fonciere", estimation: "1 a 2 mois de loyer", frequence: "Annuelle" },
  { charge: "Charges de copropriete (non recuperables)", estimation: "5 a 15% des loyers", frequence: "Trimestrielle" },
  { charge: "Assurance PNO", estimation: "150 a 300 EUR", frequence: "Annuelle" },
  { charge: "Gestion locative (agence)", estimation: "6 a 10% des loyers", frequence: "Mensuelle" },
  { charge: "Entretien et reparations", estimation: "3 a 5% des loyers", frequence: "Variable" },
  { charge: "Vacance locative", estimation: "1 mois / an en moyenne", frequence: "Variable" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export function RendementContent() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <Section title="Rendement brut vs rendement net : quelle difference ?">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface-card p-4">
            <p className="font-medium text-foreground">Rendement brut</p>
            <p className="text-primary font-bold mt-2">Loyers annuels / Prix d&apos;achat x 100</p>
            <p className="text-xs text-muted-light mt-1">Indicateur simple mais trompeur</p>
          </div>
          <div className="rounded-lg border border-border bg-surface-card p-4">
            <p className="font-medium text-foreground">Rendement net</p>
            <p className="text-primary font-bold mt-2">(Loyers - Charges) / Cout total x 100</p>
            <p className="text-xs text-muted-light mt-1">Reflete la rentabilite reelle</p>
          </div>
        </div>
        <p>
          Le <strong className="text-foreground">rendement brut</strong> est un indicateur rapide pour comparer des biens,
          mais il ne tient pas compte des charges, de la vacance locative ni des frais d&apos;acquisition.
          Il surestime systematiquement la rentabilite reelle de 2 a 3 points.
        </p>
        <p>
          Le <strong className="text-foreground">rendement net</strong> integre toutes les charges (taxe fonciere,
          copropriete, assurance, gestion, entretien) et les frais de notaire dans le cout d&apos;acquisition.
          C&apos;est le seul indicateur fiable pour evaluer un investissement.
        </p>
      </Section>

      <Section title="Charges a prendre en compte">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 text-left font-medium">Charge</th>
                <th className="py-2 text-right font-medium">Estimation</th>
                <th className="py-2 text-right font-medium">Frequence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {CHARGES_DEDUCTIBLES.map((c) => (
                <tr key={c.charge}>
                  <td className="py-2 font-medium text-foreground">{c.charge}</td>
                  <td className="py-2 text-right text-muted">{c.estimation}</td>
                  <td className="py-2 text-right text-muted">{c.frequence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-light">
          Estimations moyennes. Les charges varient fortement selon la localisation, le type de bien et l&apos;etat de l&apos;immeuble.
        </p>
      </Section>

      <Section title="La vacance locative">
        <p>
          La vacance locative represente les periodes ou le bien n&apos;est pas loue : entre deux locataires,
          pendant des travaux de remise en etat, ou en cas de difficulte a trouver un locataire.
        </p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: "2 a 4%", label: "Grandes villes", source: "Zones tendues" },
            { value: "5 a 8%", label: "Villes moyennes", source: "Marche equilibre" },
            { value: "8 a 15%", label: "Zones rurales", source: "Marche detendu" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-surface-card p-3 text-center">
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="mt-0.5 text-xs text-muted">{s.label}</p>
              <p className="text-[10px] text-muted-light">{s.source}</p>
            </div>
          ))}
        </div>
        <p>
          En pratique, prevoyez 1 mois de vacance par an (soit ~8%) pour un calcul prudent.
          Dans les zones tres tendues comme Paris, la vacance est quasi nulle (quelques jours entre locataires).
        </p>
      </Section>

      <Section title="Rendements moyens par ville">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 text-left font-medium">Ville</th>
                <th className="py-2 text-right font-medium">Rendement brut</th>
                <th className="py-2 text-right font-medium">Rendement net</th>
                <th className="py-2 text-right font-medium">Prix moyen /m2</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {RENDEMENTS_VILLES.map((v) => (
                <tr key={v.ville}>
                  <td className="py-2 font-medium text-foreground">{v.ville}</td>
                  <td className="py-2 text-right text-muted">{v.rendementBrut}</td>
                  <td className="py-2 text-right text-primary font-medium">{v.rendementNet}</td>
                  <td className="py-2 text-right text-muted">{v.prixM2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-light">
          Estimations indicatives 2024. Les rendements varient selon le quartier, le type de bien et l&apos;etat.
        </p>
      </Section>

      <Section title="Cashflow : l&apos;indicateur cle">
        <p>
          Le cashflow est la difference entre les loyers percus et toutes les depenses (credit, charges, impots).
          Un cashflow positif signifie que l&apos;investissement s&apos;autofinance et genere un surplus mensuel.
        </p>
        <div className="rounded-lg border border-border bg-surface-card p-4 space-y-2">
          <p className="font-medium text-foreground">Formule du cashflow mensuel :</p>
          <p className="text-primary font-bold">Cashflow = Loyer net - Mensualite de credit - Charges non recuperables - Impots fonciers</p>
          <p className="text-xs text-muted-light mt-2">
            Un bon investissement locatif vise un cashflow positif ou neutre, sauf strategie patrimoniale assumee.
          </p>
        </div>
        <p>
          Pour obtenir un cashflow positif, visez un rendement net superieur au taux de votre credit immobilier
          majore de 1 a 2 points. Avec des taux de credit a 3,5-4%, il faut un rendement net d&apos;au moins 5-6%
          pour etre positif sans apport important.
        </p>
      </Section>

      <Section title="Outils complementaires">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Frais de notaire", url: "/outils/frais-notaire", desc: "Integrez les frais dans votre calcul" },
            { name: "Revision de loyer", url: "/outils/revision-loyer", desc: "Anticipez la hausse annuelle du loyer" },
            { name: "Plus-value immobiliere", url: "/outils/plus-value-immobiliere", desc: "Estimez l&apos;impot a la revente" },
            { name: "Simulateur TMI", url: "/outils/simulateur-tmi", desc: "Impact fiscal de vos revenus fonciers" },
            { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Votre salaire net disponible" },
            { name: "Niveau de richesse", url: "/outils/niveau-richesse", desc: "Evaluez votre capacite d&apos;investissement" },
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
