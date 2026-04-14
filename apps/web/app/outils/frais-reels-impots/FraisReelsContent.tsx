import Link from "next/link";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export function FraisReelsContent() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <Section title="Frais reels ou forfait 10% : comment choisir ?">
        <p>
          Chaque annee, lors de votre declaration de revenus, vous avez le choix entre deux methodes
          pour deduire vos frais professionnels. L&apos;abattement forfaitaire de 10% est applique
          automatiquement par l&apos;administration fiscale. L&apos;option frais reels, elle, necessite de
          calculer et justifier chaque depense professionnelle.
        </p>
        <p>
          La regle est simple : si vos frais reels (transport + repas + autres) depassent 10% de votre
          salaire brut, optez pour les frais reels. Sinon, gardez le forfait.
        </p>
      </Section>

      <Section title="Les frais de transport deductibles">
        <p>
          Les frais de transport domicile-travail sont le poste principal des frais reels. Ils sont
          calcules selon le bareme kilometrique officiel, qui depend de la puissance fiscale du vehicule
          et de la distance annuelle parcourue.
        </p>
        <p>
          Le bareme couvre la depreciation du vehicule, l&apos;assurance, les reparations, l&apos;entretien,
          les pneumatiques et le carburant. Les frais de peage et de stationnement peuvent etre ajoutes
          en plus, sur justificatif.
        </p>
        <p>
          Pour les vehicules electriques, une majoration de 20% s&apos;applique sur le montant du bareme.
          Calculez vos indemnites kilometriques avec notre{" "}
          <Link href="/outils/indemnites-km" className="text-primary hover:underline">calculateur IK</Link>.
        </p>
      </Section>

      <Section title="Les frais de repas deductibles">
        <p>
          Si vous etes contraint de prendre vos repas hors de votre domicile (pas de cantine, distance
          trop importante pour rentrer), vous pouvez deduire la difference entre le cout reel du repas
          et la valeur forfaitaire du repas pris a domicile fixee par l&apos;URSSAF (5,20 EUR en 2024).
        </p>
        <p>
          La deduction est plafonnee : le cout reel pris en compte ne peut pas depasser 20,20 EUR par
          repas. Ainsi, la deduction maximale par repas est de 20,20 - 5,20 = 15 EUR.
        </p>
        <div className="mt-3 rounded-lg border border-border bg-surface-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Exemple</p>
          <div className="mt-2 text-sm space-y-1">
            <p><strong className="text-foreground">Repas a 12 EUR :</strong> deduction = 12 - 5,20 = 6,80 EUR</p>
            <p><strong className="text-foreground">Repas a 25 EUR :</strong> deduction = 20,20 - 5,20 = 15 EUR (plafond)</p>
            <p><strong className="text-foreground">200 repas a 12 EUR :</strong> deduction totale = 1 360 EUR</p>
          </div>
        </div>
      </Section>

      <Section title="Les autres frais deductibles">
        <p>
          En plus du transport et des repas, d&apos;autres frais professionnels peuvent etre deduits :
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-foreground">Materiel professionnel :</strong> ordinateur, logiciels, telephone utilise pour le travail</li>
          <li><strong className="text-foreground">Teletravail :</strong> quote-part du loyer, electricite, internet (prorata de la surface et du temps)</li>
          <li><strong className="text-foreground">Formation :</strong> cours, certifications, ouvrages professionnels</li>
          <li><strong className="text-foreground">Vetements specifiques :</strong> uniformes, equipements de securite (pas les vetements de ville)</li>
          <li><strong className="text-foreground">Double residence :</strong> loyer, transport si votre conjoint travaille dans une autre ville</li>
        </ul>
        <p>
          Tous ces frais doivent etre justifies par des factures conservees pendant 3 ans.
        </p>
      </Section>

      <Section title="Justificatifs a conserver">
        <p>
          En cas de controle fiscal, vous devez pouvoir justifier chaque depense declaree en frais reels.
          Conservez pendant au moins 3 ans :
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Factures de carburant et de peage</li>
          <li>Carte grise du vehicule (pour la puissance fiscale)</li>
          <li>Tickets de restaurant ou notes de frais</li>
          <li>Attestation employeur (nombre de jours travailles, absence de cantine)</li>
          <li>Factures d&apos;achat de materiel professionnel</li>
          <li>Quittances de loyer (pour la double residence ou le teletravail)</li>
        </ul>
      </Section>

      <Section title="Outils complementaires">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Simulateur TMI", url: "/outils/simulateur-tmi", desc: "Impact fiscal de la deduction" },
            { name: "Indemnites km", url: "/outils/indemnites-km", desc: "Calcul detaille des frais km" },
            { name: "Jours ouvres", url: "/outils/jours-ouvres", desc: "Nombre de jours travailles" },
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
