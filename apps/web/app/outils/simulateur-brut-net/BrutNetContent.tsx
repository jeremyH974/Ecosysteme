import Link from "next/link";

const EXEMPLES_SALAIRES = [
  { brut: 1800, net: 1404, label: "SMIC+" },
  { brut: 2000, net: 1560, label: "2 000 EUR" },
  { brut: 2500, net: 1950, label: "2 500 EUR" },
  { brut: 3000, net: 2340, label: "3 000 EUR" },
  { brut: 3500, net: 2730, label: "3 500 EUR" },
  { brut: 4000, net: 3120, label: "4 000 EUR" },
  { brut: 5000, net: 3900, label: "5 000 EUR" },
];

const HISTORIQUE_SMIC = [
  { date: "1er janvier 2025", horaire: "11,88 EUR", mensuelBrut: "1 801,80 EUR", mensuelNet: "~1 427 EUR" },
  { date: "1er janvier 2024", horaire: "11,65 EUR", mensuelBrut: "1 766,92 EUR", mensuelNet: "~1 399 EUR" },
  { date: "1er janvier 2023", horaire: "11,27 EUR", mensuelBrut: "1 709,28 EUR", mensuelNet: "~1 353 EUR" },
  { date: "1er aout 2022", horaire: "11,07 EUR", mensuelBrut: "1 678,95 EUR", mensuelNet: "~1 329 EUR" },
  { date: "1er mai 2022", horaire: "10,85 EUR", mensuelBrut: "1 645,58 EUR", mensuelNet: "~1 302 EUR" },
  { date: "1er janvier 2022", horaire: "10,57 EUR", mensuelBrut: "1 603,12 EUR", mensuelNet: "~1 269 EUR" },
];

const COTISATIONS_DETAIL = [
  { nom: "CSG deductible", taux: "6,80%", assiette: "98,25% du brut", desc: "Contribution Sociale Generalisee — finance la Securite sociale" },
  { nom: "CSG non-deductible", taux: "2,40%", assiette: "98,25% du brut", desc: "Part non deductible de l&apos;impot sur le revenu" },
  { nom: "CRDS", taux: "0,50%", assiette: "98,25% du brut", desc: "Contribution au Remboursement de la Dette Sociale" },
  { nom: "Assurance vieillesse plafonnee", taux: "6,90%", assiette: "Jusqu&apos;au PASS", desc: "Retraite de base — plafonnee au PASS (3 864 EUR/mois)" },
  { nom: "Assurance vieillesse deplafonnee", taux: "0,40%", assiette: "Totalite du brut", desc: "Retraite de base — sur l&apos;ensemble du salaire" },
  { nom: "AGIRC-ARRCO tranche 1", taux: "3,15%", assiette: "Jusqu&apos;au PASS", desc: "Retraite complementaire obligatoire" },
  { nom: "AGIRC-ARRCO tranche 2", taux: "8,64%", assiette: "Au-dela du PASS", desc: "Retraite complementaire — part au-dela du plafond" },
  { nom: "APEC (cadres)", taux: "0,024%", assiette: "Totalite du brut", desc: "Association Pour l&apos;Emploi des Cadres" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export function BrutNetContent() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      {/* Guide complet */}
      <Section title="Comment calculer son salaire net a partir du brut ?">
        <p>
          Le salaire brut est le montant total de votre remuneration avant deduction des cotisations sociales.
          Le salaire net, celui que vous recevez sur votre compte, correspond au brut diminue des cotisations
          salariales (environ 22% pour un non-cadre et 25% pour un cadre).
        </p>
        <p>
          Notre simulateur applique les taux officiels de l&apos;URSSAF pour calculer precisement chaque cotisation :
          CSG/CRDS, assurance vieillesse, retraite complementaire AGIRC-ARRCO, et APEC pour les cadres.
          Le resultat est affiche en temps reel, sans avoir a cliquer sur un bouton.
        </p>
        <p>
          Vous pouvez aussi saisir un salaire net pour retrouver le brut correspondant : le simulateur
          effectue le calcul inverse automatiquement.
        </p>
      </Section>

      {/* Chiffres cles */}
      <Section title="Le salaire en France : chiffres cles">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "2 735 EUR", label: "Salaire net moyen", source: "INSEE 2024" },
            { value: "2 183 EUR", label: "Salaire net median", source: "INSEE 2024" },
            { value: "1 427 EUR", label: "SMIC net mensuel", source: "2025" },
            { value: "46 368 EUR", label: "PASS annuel", source: "2024" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-surface-card p-3 text-center">
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="mt-0.5 text-xs text-muted">{s.label}</p>
              <p className="text-[10px] text-muted-light">{s.source}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Difference brut / net */}
      <Section title="Quelle difference entre salaire brut et salaire net ?">
        <p>
          <strong className="text-foreground">Le salaire brut</strong> est le montant inscrit sur votre contrat de travail.
          Il comprend votre remuneration de base, les heures supplementaires, les primes, les avantages en nature valorises.
          C&apos;est le montant sur lequel sont calculees toutes les cotisations sociales.
        </p>
        <p>
          <strong className="text-foreground">Le salaire net avant impot</strong> (ou net a payer avant PAS) est ce que vous recevez
          apres deduction des cotisations salariales. C&apos;est le montant qui apparait en bas de votre bulletin de paie
          a la ligne &laquo; Net a payer avant impot sur le revenu &raquo;.
        </p>
        <p>
          <strong className="text-foreground">Le salaire net apres impot</strong> est le montant effectivement verse sur votre compte bancaire
          apres le prelevement a la source (PAS). Le taux de PAS depend de votre situation fiscale et est communique
          par l&apos;administration fiscale a votre employeur.
        </p>
      </Section>

      {/* Detail des cotisations */}
      <Section title="Detail des cotisations salariales 2024">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 text-left font-medium">Cotisation</th>
                <th className="py-2 text-right font-medium">Taux</th>
                <th className="py-2 text-right font-medium">Assiette</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {COTISATIONS_DETAIL.map((c) => (
                <tr key={c.nom}>
                  <td className="py-2">
                    <p className="font-medium text-foreground">{c.nom}</p>
                    <p className="text-xs text-muted-light">{c.desc}</p>
                  </td>
                  <td className="py-2 text-right font-medium text-foreground">{c.taux}</td>
                  <td className="py-2 text-right text-muted">{c.assiette}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-light">
          Source : URSSAF — Taux au 1er janvier 2024. PASS mensuel : 3 864 EUR. PASS annuel : 46 368 EUR.
        </p>
      </Section>

      {/* Cout employeur */}
      <Section title="Le cout total pour l&apos;employeur (super-brut)">
        <p>
          Au-dela des cotisations salariales prelevees sur votre brut, l&apos;employeur paie ses propres cotisations
          patronales : assurance maladie, allocations familiales, assurance chomage, retraite complementaire,
          accidents du travail, formation professionnelle, etc.
        </p>
        <p>
          Le total des cotisations patronales represente environ <strong className="text-foreground">42 a 45% du salaire brut</strong>.
          Ainsi, pour un salaire brut de 3 000 EUR, le cout total pour l&apos;employeur (appele &laquo; super-brut &raquo;) est d&apos;environ
          4 260 a 4 350 EUR, tandis que le salarie recoit environ 2 340 EUR net.
        </p>
      </Section>

      {/* Exemples rapides */}
      <Section title="Exemples de conversion brut/net">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {EXEMPLES_SALAIRES.map((ex) => (
            <div key={ex.brut} className="rounded-lg border border-border bg-surface-card p-3 text-center">
              <p className="text-xs text-muted">{ex.brut} EUR brut</p>
              <p className="mt-1 text-base font-bold text-primary">{ex.net} EUR</p>
              <p className="text-[10px] text-muted-light">net / mois</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-light">
          Estimations pour un salarie non-cadre a temps plein. Les montants nets sont indicatifs (~22% de cotisations).
        </p>
      </Section>

      {/* Prelevement a la source */}
      <Section title="Le prelevement a la source (PAS)">
        <p>
          Depuis janvier 2019, l&apos;impot sur le revenu est preleve directement sur votre salaire par votre employeur.
          Le taux de prelevement depend de vos revenus declares l&apos;annee precedente et est communique
          automatiquement par l&apos;administration fiscale.
        </p>
        <p>
          Les taux vont de <strong className="text-foreground">0% a 43%</strong> selon votre tranche marginale d&apos;imposition.
          Vous pouvez simuler l&apos;impact du PAS sur votre salaire net en utilisant le curseur &laquo; Prelevement a la source &raquo;
          dans notre simulateur ci-dessus.
        </p>
        <p>
          Pour connaitre votre taux exact, utilisez notre{" "}
          <Link href="/outils/simulateur-tmi" className="text-primary underline decoration-primary/30 hover:decoration-primary">
            simulateur TMI
          </Link>.
        </p>
      </Section>

      {/* SMIC */}
      <Section title="Le SMIC en 2025">
        <p>
          Le SMIC (Salaire Minimum Interprofessionnel de Croissance) est revalorise au minimum une fois par an,
          au 1er janvier. Il peut etre revalorise en cours d&apos;annee si l&apos;inflation depasse 2%.
        </p>
        <div className="rounded-lg border border-border bg-surface-card p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-foreground">11,88 EUR</p>
              <p className="text-xs text-muted">SMIC horaire brut</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">1 801,80 EUR</p>
              <p className="text-xs text-muted">SMIC mensuel brut</p>
            </div>
            <div>
              <p className="text-lg font-bold text-primary">~1 427 EUR</p>
              <p className="text-xs text-muted">SMIC mensuel net</p>
            </div>
          </div>
          <p className="mt-3 text-[10px] text-center text-muted-light">Base 35h/semaine — 151,67h/mois — 1er janvier 2025</p>
        </div>
      </Section>

      {/* Historique SMIC */}
      <Section title="Historique du SMIC">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 text-left font-medium">Date</th>
                <th className="py-2 text-right font-medium">Horaire brut</th>
                <th className="py-2 text-right font-medium">Mensuel brut</th>
                <th className="py-2 text-right font-medium">Mensuel net</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {HISTORIQUE_SMIC.map((h) => (
                <tr key={h.date}>
                  <td className="py-2 font-medium text-foreground">{h.date}</td>
                  <td className="py-2 text-right text-muted">{h.horaire}</td>
                  <td className="py-2 text-right text-muted">{h.mensuelBrut}</td>
                  <td className="py-2 text-right font-medium text-foreground">{h.mensuelNet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-light">Source : Service-Public.fr. Base 35h/semaine.</p>
      </Section>

      {/* Outils complementaires */}
      <Section title="Outils complementaires">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Rupture conventionnelle", url: "/outils/rupture-conventionnelle", desc: "Calculez votre indemnite de depart" },
            { name: "Simulateur TMI", url: "/outils/simulateur-tmi", desc: "Votre taux marginal d&apos;imposition" },
            { name: "Indemnites kilometriques", url: "/outils/indemnites-km", desc: "Frais reels deductibles" },
            { name: "Optimisation SASU", url: "/outils/optimisation-sasu", desc: "Salaire vs dividendes" },
            { name: "Auto-entrepreneur", url: "/outils/simulateur-auto-entrepreneur", desc: "Cotisations micro-entreprise" },
            { name: "Comparateur SASU vs AE", url: "/outils/comparateur-statuts", desc: "Quel statut choisir ?" },
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
