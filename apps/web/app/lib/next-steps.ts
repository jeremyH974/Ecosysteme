export interface NextStep {
  titre: string;
  description: string;
  url: string;
  pourquoi: string;
}

export const NEXT_STEPS: Record<string, NextStep[]> = {
  "rupture-calc": [
    {
      titre: "Estimez vos allocations chomage",
      description: "Calculez votre ARE apres la rupture conventionnelle",
      url: "/outils/allocation-chomage",
      pourquoi: "Apres une rupture conventionnelle, vous avez droit au chomage. Estimez le montant de votre allocation.",
    },
    {
      titre: "Verifiez votre salaire net de reference",
      description: "Convertissez votre brut en net pour verifier les montants",
      url: "/outils/simulateur-brut-net",
      pourquoi: "Le calcul de votre indemnite depend de votre salaire brut. Verifiez la correspondance brut/net.",
    },
  ],
  "simu-brut-net": [
    {
      titre: "Calculez votre taux d\u2019imposition",
      description: "Decouvrez votre tranche marginale d\u2019imposition",
      url: "/outils/simulateur-tmi",
      pourquoi: "Votre salaire net n\u2019est pas votre revenu final : il reste l\u2019impot sur le revenu a deduire.",
    },
    {
      titre: "Frais reels ou forfait 10% ?",
      description: "Comparez les deux options pour votre declaration",
      url: "/outils/frais-reels-impots",
      pourquoi: "Si vous avez des frais professionnels importants, les frais reels peuvent reduire votre impot.",
    },
  ],
  "allocation-chomage": [
    {
      titre: "Simulez votre indemnite de rupture",
      description: "Calculez l\u2019indemnite legale de rupture conventionnelle",
      url: "/outils/rupture-conventionnelle",
      pourquoi: "En plus de l\u2019ARE, vous recevez une indemnite de depart. Verifiez son montant.",
    },
    {
      titre: "Estimez votre future retraite",
      description: "Impact d\u2019une periode de chomage sur votre pension",
      url: "/outils/simulateur-retraite",
      pourquoi: "Les periodes de chomage indemnise valident des trimestres. Verifiez l\u2019impact sur votre retraite.",
    },
  ],
  "simulateur-tmi": [
    {
      titre: "Comparez frais reels et forfait",
      description: "Optimisez votre declaration d\u2019impots",
      url: "/outils/frais-reels-impots",
      pourquoi: "Connaissant votre TMI, vous pouvez calculer l\u2019economie reelle des frais reels.",
    },
    {
      titre: "Ou vous situez-vous ?",
      description: "Comparez votre revenu a celui des Francais",
      url: "/outils/niveau-richesse",
      pourquoi: "Votre TMI donne une idee de votre fiscalite, mais ou vous situez-vous par rapport aux autres ?",
    },
  ],
  "frais-reels-impots": [
    {
      titre: "Calculez vos indemnites km",
      description: "Bareme kilometrique officiel pour vos trajets",
      url: "/outils/indemnites-km",
      pourquoi: "Les frais kilometriques sont souvent le poste principal des frais reels.",
    },
    {
      titre: "Verifiez votre TMI",
      description: "Votre tranche marginale determine l\u2019economie reelle",
      url: "/outils/simulateur-tmi",
      pourquoi: "L\u2019economie en euros depend de votre TMI : plus elle est elevee, plus les frais reels sont avantageux.",
    },
  ],
  "indemnites-km": [
    {
      titre: "Frais reels ou forfait 10% ?",
      description: "Integrez vos km dans la comparaison globale",
      url: "/outils/frais-reels-impots",
      pourquoi: "Vos indemnites km sont un element des frais reels. Comparez avec le forfait pour choisir.",
    },
    {
      titre: "Calculez votre TMI",
      description: "L\u2019economie depend de votre tranche",
      url: "/outils/simulateur-tmi",
      pourquoi: "L\u2019economie fiscale de vos frais km depend directement de votre tranche d\u2019imposition.",
    },
  ],
  "comparateur-statuts": [
    {
      titre: "Simulez en detail le regime AE",
      description: "Cotisations, CA max, revenu net micro-entreprise",
      url: "/outils/simulateur-auto-entrepreneur",
      pourquoi: "Si l\u2019auto-entreprise semble plus avantageuse, simulez le detail de vos cotisations.",
    },
    {
      titre: "Optimisez votre SASU",
      description: "Trouvez le mix salaire/dividendes optimal",
      url: "/outils/optimisation-sasu",
      pourquoi: "Si la SASU est plus adaptee, optimisez la repartition pour maximiser votre revenu net.",
    },
  ],
  "simulateur-ae": [
    {
      titre: "Comparez avec la SASU",
      description: "Auto-entrepreneur vs SASU : quel statut choisir ?",
      url: "/outils/comparateur-statuts",
      pourquoi: "Au-dela d\u2019un certain CA, la SASU peut devenir plus avantageuse. Comparez les deux.",
    },
    {
      titre: "Calculez votre TMI",
      description: "Impact fiscal du regime micro",
      url: "/outils/simulateur-tmi",
      pourquoi: "En micro-entreprise, vous payez l\u2019IR en plus des cotisations. Verifiez votre tranche.",
    },
  ],
  "sasu-optim": [
    {
      titre: "Comparez avec l\u2019auto-entreprise",
      description: "SASU vs AE : la comparaison complete",
      url: "/outils/comparateur-statuts",
      pourquoi: "Verifiez que la SASU reste plus avantageuse que le regime micro pour votre CA.",
    },
    {
      titre: "Verifiez votre TMI",
      description: "Impact de la repartition sur votre imposition",
      url: "/outils/simulateur-tmi",
      pourquoi: "La repartition salaire/dividendes impacte votre IR. Verifiez votre tranche.",
    },
  ],
  "frais-notaire": [
    {
      titre: "Calculez le rendement locatif",
      description: "Integrez les frais de notaire dans la rentabilite",
      url: "/outils/rendement-locatif",
      pourquoi: "Les frais de notaire font partie du cout total. Calculez la rentabilite reelle de votre investissement.",
    },
    {
      titre: "Estimez la plus-value a la revente",
      description: "Imposition si vous revendez dans quelques annees",
      url: "/outils/plus-value-immobiliere",
      pourquoi: "Anticipez l\u2019imposition a la revente pour evaluer la rentabilite globale de l\u2019operation.",
    },
  ],
  "rendement-locatif": [
    {
      titre: "Estimez les frais de notaire",
      description: "Cout d\u2019acquisition a integrer dans votre calcul",
      url: "/outils/frais-notaire",
      pourquoi: "Les frais de notaire impactent directement votre rendement net. Estimez-les precisement.",
    },
    {
      titre: "Impact fiscal de vos loyers",
      description: "Votre TMI determine l\u2019imposition des revenus fonciers",
      url: "/outils/simulateur-tmi",
      pourquoi: "Les revenus fonciers sont imposes a votre TMI + prelevement sociaux. Verifiez l\u2019impact.",
    },
  ],
  "revision-loyer": [
    {
      titre: "Calculez le rendement locatif",
      description: "Votre loyer revise change-t-il la rentabilite ?",
      url: "/outils/rendement-locatif",
      pourquoi: "Le nouveau loyer modifie votre rendement. Recalculez la rentabilite avec le loyer revise.",
    },
    {
      titre: "Estimez la plus-value a la revente",
      description: "Combien paierez-vous si vous vendez ?",
      url: "/outils/plus-value-immobiliere",
      pourquoi: "Si vous envisagez de vendre plutot que de relouer, estimez l\u2019imposition de la plus-value.",
    },
  ],
  "plus-value-immo": [
    {
      titre: "Calculez les frais de notaire",
      description: "Frais d\u2019acquisition pour un nouvel investissement",
      url: "/outils/frais-notaire",
      pourquoi: "Si vous reinvestissez le produit de la vente, estimez les frais du prochain achat.",
    },
    {
      titre: "Calculez le rendement locatif",
      description: "Evaluez la rentabilite de votre prochain bien",
      url: "/outils/rendement-locatif",
      pourquoi: "Comparez la rentabilite d\u2019un nouvel investissement avec celle de votre bien actuel.",
    },
  ],
  "niveau-richesse": [
    {
      titre: "Calculez votre TMI",
      description: "Votre tranche marginale d\u2019imposition",
      url: "/outils/simulateur-tmi",
      pourquoi: "Apres avoir situe votre revenu, decouvrez combien vous payez d\u2019impot sur le revenu.",
    },
    {
      titre: "Convertissez votre salaire brut/net",
      description: "Verifiez la correspondance brut-net",
      url: "/outils/simulateur-brut-net",
      pourquoi: "Les statistiques utilisent souvent le net. Verifiez que vous comparez les bons montants.",
    },
  ],
  "simulateur-retraite": [
    {
      titre: "Verifiez votre salaire net actuel",
      description: "Comparez votre pension estimee a votre salaire",
      url: "/outils/simulateur-brut-net",
      pourquoi: "Comparez votre future pension a votre salaire net actuel pour evaluer la perte de revenu.",
    },
    {
      titre: "Calculez votre TMI a la retraite",
      description: "Imposition de votre pension",
      url: "/outils/simulateur-tmi",
      pourquoi: "Les pensions de retraite sont imposables. Estimez votre TMI avec vos revenus de retraite.",
    },
  ],
  "prime-activite": [
    {
      titre: "Verifiez votre salaire net",
      description: "Confirmez le montant net utilise pour le calcul",
      url: "/outils/simulateur-brut-net",
      pourquoi: "La prime d\u2019activite depend de votre salaire net. Verifiez la conversion brut/net.",
    },
    {
      titre: "Ou vous situez-vous ?",
      description: "Comparez votre revenu total aux statistiques",
      url: "/outils/niveau-richesse",
      pourquoi: "Avec la prime d\u2019activite, votre revenu disponible augmente. Ou vous situez-vous maintenant ?",
    },
  ],
  "conges-payes": [
    {
      titre: "Calculez votre salaire net",
      description: "Verifiez le montant net de reference",
      url: "/outils/simulateur-brut-net",
      pourquoi: "L\u2019indemnite de conges payes est calculee sur votre salaire brut. Verifiez la correspondance.",
    },
    {
      titre: "Jours ouvres dans la periode",
      description: "Comptez les jours ouvres autour de vos conges",
      url: "/outils/jours-ouvres",
      pourquoi: "Planifiez vos conges en tenant compte des jours feries pour optimiser vos jours de repos.",
    },
  ],
  "jours-ouvres": [
    {
      titre: "Calculez vos conges payes",
      description: "Indemnite de conges payes",
      url: "/outils/conges-payes",
      pourquoi: "Maintenant que vous connaissez les jours ouvres, calculez votre indemnite de conges.",
    },
    {
      titre: "Verifiez votre salaire net",
      description: "Salaire brut/net pour la periode",
      url: "/outils/simulateur-brut-net",
      pourquoi: "Verifiez votre salaire net pour calculer le cout reel d\u2019un jour d\u2019absence.",
    },
  ],
};
