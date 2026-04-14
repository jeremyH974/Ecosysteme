import type { FAQItem } from "@ecosysteme/ui";

export const FAQ_RUPTURE: FAQItem[] = [
  { question: "Qu'est-ce qu'une rupture conventionnelle ?", answer: "C'est un mode de rupture du CDI d'un commun accord entre l'employeur et le salarie. Elle ouvre droit a une indemnite au moins egale a l'indemnite legale de licenciement et aux allocations chomage." },
  { question: "Quelle est l'anciennete minimum pour en beneficier ?", answer: "Le calcul legal s'applique a partir de 8 mois d'anciennete ininterrompue dans l'entreprise. En dessous, les regles sont differentes et dependent du contrat." },
  { question: "Comment est calcule le salaire de reference ?", answer: "Le salaire de reference est le plus favorable entre la moyenne des 12 derniers mois et la moyenne des 3 derniers mois de salaire brut." },
  { question: "La convention collective peut-elle prevoir plus ?", answer: "Oui. Votre convention collective peut prevoir une indemnite superieure au minimum legal. Verifiez sur votre bulletin de paie (ligne CC) ou aupres de votre delegue syndical." },
  { question: "Quel est le delai de retractation ?", answer: "Chaque partie dispose de 15 jours calendaires pour se retracter apres la signature de la convention. Ce delai commence le lendemain de la date de signature." },
  { question: "L'indemnite est-elle imposable ?", answer: "L'indemnite de rupture conventionnelle est exoneree d'impot sur le revenu et de cotisations sociales dans la limite du plafond legal. Au-dela, elle est soumise a l'impot et aux charges." },
];

export const FAQ_BRUT_NET: FAQItem[] = [
  { question: "Quelle difference entre salaire brut et net ?", answer: "Le salaire brut est le montant avant deduction des cotisations sociales (retraite, maladie, chomage, CSG/CRDS). Le salaire net est ce que vous recevez sur votre compte bancaire, avant impot sur le revenu." },
  { question: "Pourquoi mon taux de cotisations differe ?", answer: "Le taux depend de votre statut (cadre ou non-cadre), de votre salaire (les cotisations au-dessus du plafond de la Securite Sociale sont differentes) et de votre temps de travail." },
  { question: "Que sont les cotisations CSG et CRDS ?", answer: "La CSG (Contribution Sociale Generalisee) et la CRDS (Contribution au Remboursement de la Dette Sociale) sont prelevees sur 98,25% du salaire brut. La CSG est partiellement deductible de l'impot sur le revenu." },
  { question: "Le net affiche est-il ce que je recois vraiment ?", answer: "Le simulateur calcule le net avant impot sur le revenu. Depuis 2019, le prelevement a la source est deduit par votre employeur. Le montant verse est donc le net apres impot." },
  { question: "Comment lire mon bulletin de paie ?", answer: "Votre bulletin de paie detaille chaque cotisation. Le salaire brut est en haut, les cotisations au milieu, et le net a payer en bas. Le taux global de cotisations salariales est generalement autour de 22%." },
  { question: "Comment passer du net au brut ?", answer: "Pour retrouver le brut a partir du net, divisez le net par (1 - taux de cotisations). Par exemple, pour 2 000 EUR net avec 22% de cotisations : 2 000 / 0,78 = 2 564 EUR brut. Notre simulateur effectue ce calcul inverse automatiquement." },
  { question: "Quel est le taux de cotisations pour un cadre ?", answer: "Un cadre paie environ 25% de cotisations salariales (contre ~22% pour un non-cadre). La difference vient principalement de la cotisation APEC (0,024%) et de taux de retraite complementaire legerement differents au-dela du plafond de la Securite Sociale." },
  { question: "Qu'est-ce que le plafond de la Securite Sociale (PASS) ?", answer: "Le PASS est un seuil fixe chaque annee (3 864 EUR/mois en 2024). Certaines cotisations (vieillesse plafonnee, AGIRC-ARRCO tranche 1) ne s'appliquent que sur la part du salaire inferieure au PASS. Au-dela, des taux differents s'appliquent." },
  { question: "Comment fonctionne le 13e mois ?", answer: "Le 13e mois est une prime equivalente a un mois de salaire supplementaire, generalement versee en decembre ou en deux fois. Dans notre simulateur, selectionnez '13 mois' pour voir l'impact sur votre salaire annuel. Les cotisations sont calculees de la meme maniere." },
];

export const FAQ_SASU: FAQItem[] = [
  { question: "Qu'est-ce qu'une SASU ?", answer: "La SASU (Societe par Actions Simplifiee Unipersonnelle) est une forme juridique avec un seul associe. Le president est assimile salarie, ce qui lui donne une protection sociale complete (retraite, maladie) mais avec des cotisations plus elevees qu'un TNS." },
  { question: "Pourquoi optimiser la repartition salaire/dividendes ?", answer: "Le salaire est soumis aux cotisations sociales (~80% du net) mais reduit l'assiette de l'IS. Les dividendes sont soumis au PFU (30%) mais pas aux cotisations. Le mix optimal depend de votre situation fiscale personnelle." },
  { question: "Qu'est-ce que le PFU (flat tax) ?", answer: "Le Prelevement Forfaitaire Unique est un impot de 30% sur les revenus du capital (dividendes, interets). Il comprend 12,8% d'impot sur le revenu et 17,2% de prelevements sociaux. Vous pouvez opter pour le bareme progressif si c'est plus avantageux." },
  { question: "Faut-il se verser un salaire minimum en SASU ?", answer: "Legalement non, mais sans remuneration vous n'avez aucune protection sociale (maladie, retraite). Un minimum est recommande pour valider des trimestres de retraite et beneficier de l'assurance maladie." },
];

export const FAQ_LOYER: FAQItem[] = [
  { question: "Qu'est-ce que l'IRL ?", answer: "L'Indice de Reference des Loyers est publie chaque trimestre par l'INSEE. Il sert de base au calcul de la revision annuelle des loyers d'habitation. Il est calcule a partir de la moyenne de l'evolution des prix a la consommation hors tabac." },
  { question: "Quand peut-on reviser un loyer ?", answer: "Le loyer peut etre revise une fois par an, a la date anniversaire du bail ou a la date convenue dans le contrat. Le bailleur doit en informer le locataire par courrier." },
  { question: "Le bailleur est-il oblige de reviser le loyer ?", answer: "Non, la revision est un droit du bailleur, pas une obligation. Si le bailleur ne la demande pas dans l'annee suivant la date de revision, il perd ce droit pour cette annee." },
  { question: "Le loyer peut-il baisser avec l'IRL ?", answer: "En theorie oui, si l'IRL baisse. En pratique, c'est tres rare car l'IRL suit l'inflation qui est generalement positive." },
];

export const FAQ_TMI: FAQItem[] = [
  { question: "Qu'est-ce que le TMI ?", answer: "Le Taux Marginal d'Imposition est le taux d'impot applique a la derniere tranche de vos revenus. Ce n'est pas le taux moyen de votre impot (qui est plus bas), mais le taux auquel sera impose chaque euro supplementaire de revenu." },
  { question: "Quelle difference entre taux marginal et taux moyen ?", answer: "Le taux moyen est le rapport entre l'impot total paye et le revenu total. Le TMI est le taux de la derniere tranche atteinte. Exemple : avec 30 000 EUR de revenus, votre TMI est 30% mais votre taux moyen est ~7,6%." },
  { question: "Comment fonctionne le quotient familial ?", answer: "Le quotient familial divise le revenu imposable par le nombre de parts du foyer (1 pour un celibataire, 2 pour un couple, +0,5 par enfant). Cela reduit le TMI et l'impot total pour les familles." },
];

export const FAQ_NOTAIRE: FAQItem[] = [
  { question: "Que comprennent les frais de notaire ?", answer: "Les 'frais de notaire' comprennent principalement les droits de mutation (impots verses au departement et a l'Etat), les emoluments du notaire (sa remuneration reglementee) et les frais divers (cadastre, hypotheque, timbres)." },
  { question: "Pourquoi les frais sont differents dans l'ancien et le neuf ?", answer: "Dans l'ancien, les droits de mutation sont d'environ 5,80% (taxe departementale). Dans le neuf, ils sont remplaces par une taxe de publicite fonciere d'environ 0,715%, ce qui reduit considerablement les frais." },
  { question: "Les frais de notaire sont-ils negociables ?", answer: "Les droits de mutation (la majorite des frais) ne sont pas negociables car ce sont des taxes. Les emoluments du notaire sont reglementes par l'Etat. Seule une remise de 20% maximum est possible sur les emoluments pour les transactions > 100 000 EUR." },
];

export const FAQ_RENDEMENT: FAQItem[] = [
  { question: "Quelle difference entre rendement brut et net ?", answer: "Le rendement brut = loyers annuels / prix d'achat. Le rendement net deduit les charges (taxe fonciere, assurance, gestion, travaux, vacance locative) et integre les frais de notaire dans le cout total. Le rendement net est toujours inferieur au brut." },
  { question: "Quel est un bon rendement locatif ?", answer: "En France, un rendement brut de 5-7% est considere comme correct. Au-dessus de 7%, c'est un bon rendement. En dessous de 4%, l'investissement est peu rentable sauf si vous comptez sur la plus-value a la revente." },
  { question: "Qu'est-ce que la vacance locative ?", answer: "C'est la periode pendant laquelle le logement est vide entre deux locataires. On estime generalement 1 mois par an en moyenne, mais cela varie selon la localisation et le type de bien." },
];

export const FAQ_KM: FAQItem[] = [
  { question: "A quoi servent les indemnites kilometriques ?", answer: "Elles permettent de deduire de vos impots les frais de deplacement professionnel avec votre vehicule personnel. Vous pouvez les utiliser dans votre declaration de revenus en optant pour les frais reels au lieu de l'abattement forfaitaire de 10%." },
  { question: "Comment determiner ma puissance fiscale ?", answer: "La puissance fiscale (CV) est inscrite sur votre carte grise (certificat d'immatriculation), a la rubrique P.6. Elle est differente de la puissance reelle du moteur." },
  { question: "Le bareme couvre-t-il tous les frais ?", answer: "Le bareme kilometrique couvre la depreciation du vehicule, les frais de reparation et d'entretien, les depenses de pneumatiques, la consommation de carburant et les primes d'assurance. Les frais de peage et de stationnement peuvent etre ajoutes en plus." },
];

export const FAQ_PV: FAQItem[] = [
  { question: "La residence principale est-elle exoneree ?", answer: "Oui, la vente de votre residence principale est totalement exoneree de plus-value, quelle que soit la duree de detention ou le montant de la plus-value. C'est l'exoneration la plus importante en immobilier." },
  { question: "Au bout de combien d'annees est-on exonere ?", answer: "Pour l'impot sur le revenu (19%), l'exoneration totale est atteinte apres 22 ans de detention. Pour les prelevements sociaux (17.2%), il faut attendre 30 ans. Entre les deux, une exoneration partielle s'applique par annee de detention." },
  { question: "Comment reduire la plus-value imposable ?", answer: "Vous pouvez majorer le prix d'acquisition des frais de notaire (reels ou forfait 7.5%) et des travaux d'amelioration (sur justificatifs ou forfait 15% apres 5 ans de detention). Cela reduit la base imposable." },
];

export const FAQ_COMPARATEUR: FAQItem[] = [
  { question: "Quelle est la principale difference entre AE et SASU ?", answer: "L'auto-entrepreneur paie des cotisations sociales sur le chiffre d'affaires (pas de deduction de charges). La SASU permet de deduire les charges reelles et d'optimiser entre salaire et dividendes, mais les cotisations sociales sont plus elevees en pourcentage." },
  { question: "A partir de quel CA la SASU devient-elle plus interessante ?", answer: "Il n'y a pas de seuil universel. La SASU devient souvent plus avantageuse quand le CA depasse 40-50k EUR avec des charges reelles significatives a deduire, ou quand la protection sociale complete (retraite, maladie) est une priorite." },
  { question: "Peut-on passer de l'auto-entreprise a la SASU ?", answer: "Oui, c'est possible a tout moment. Il faut creer la SASU puis fermer l'auto-entreprise (ou apporter le fonds de commerce). Un expert-comptable peut vous accompagner dans cette transition." },
];

export const FAQ_RICHESSE: FAQItem[] = [
  { question: "Comment est calcule le niveau de richesse ?", answer: "Votre salaire net mensuel est compare aux statistiques nationales de l'INSEE : salaire moyen, median, SMIC, seuil de pauvrete et seuils des 10% et 1% les mieux payes." },
  { question: "Quelle est la difference entre salaire moyen et median ?", answer: "Le salaire moyen est la somme de tous les salaires divisee par le nombre de salaries (2 735 EUR net en 2024). Le median est le salaire qui partage les salaries en deux moities egales (2 183 EUR). Le median est plus representatif car moins influence par les tres hauts salaires." },
  { question: "Quel est le seuil de pauvrete en France ?", answer: "Le seuil de pauvrete est fixe a 60% du revenu median, soit environ 1 158 EUR net par mois pour une personne seule. Environ 14% de la population francaise vit sous ce seuil." },
];

export const FAQ_CHOMAGE: FAQItem[] = [
  { question: "Quelles sont les conditions pour toucher le chomage ?", answer: "Il faut avoir travaille au moins 130 jours (6 mois) sur les 24 derniers mois (36 mois pour les 53 ans et plus). Il faut etre inscrit a France Travail et etre en recherche active d'emploi." },
  { question: "Comment est calculee l'allocation chomage (ARE) ?", answer: "L'ARE est calculee a partir du Salaire Journalier de Reference (SJR). Deux methodes sont comparees : 57% du SJR ou 40,4% du SJR + 12,95 EUR/jour. La plus favorable est retenue, avec un minimum de 31,59 EUR/jour." },
  { question: "Combien de temps peut-on toucher le chomage ?", answer: "La duree depend de l'age et de l'anciennete : maximum 24 mois avant 53 ans, 30 mois entre 53 et 55 ans, 36 mois apres 55 ans. La duree ne peut pas depasser la duree d'affiliation." },
];

export const FAQ_RETRAITE: FAQItem[] = [
  { question: "A quel age peut-on partir a la retraite ?", answer: "L'age legal de depart est de 64 ans (reforme 2023, progressivement appliquee). Vous pouvez partir a taux plein a 67 ans quel que soit votre nombre de trimestres. Un depart anticipe est possible sous conditions (carriere longue, handicap, penibilite)." },
  { question: "Combien de trimestres faut-il pour le taux plein ?", answer: "Pour les personnes nees a partir de 1965, il faut 172 trimestres (43 ans de cotisation) pour beneficier du taux plein de 50%. Chaque trimestre manquant entraine une decote de 0,625%." },
  { question: "Comment est calculee la pension de base ?", answer: "La formule est : SAM x taux x (trimestres valides / trimestres requis). Le SAM est la moyenne des 25 meilleures annees de salaire brut. Le taux plein est de 50%. S'y ajoute la retraite complementaire AGIRC-ARRCO." },
];

export const FAQ_AE: FAQItem[] = [
  { question: "Quelles sont les charges d'un auto-entrepreneur ?", answer: "Les cotisations sociales sont un pourcentage du chiffre d'affaires : 12,3% pour la vente de marchandises, 21,2% pour les prestations BIC (artisan, commercial) et 21,1% pour les prestations BNC (liberal). S'ajoute la CFE (Cotisation Fonciere des Entreprises)." },
  { question: "Qu'est-ce que le versement liberatoire ?", answer: "C'est une option qui permet de payer l'impot sur le revenu en meme temps que les cotisations sociales, a un taux fixe (1% vente, 1,7% BIC, 2,2% BNC). C'est avantageux si votre taux marginal d'imposition est superieur a ces taux." },
  { question: "Quels sont les plafonds de CA en auto-entrepreneur ?", answer: "En 2024 : 188 700 EUR pour la vente de marchandises et 77 700 EUR pour les prestations de service. Au-dela, vous basculez automatiquement vers le regime reel d'imposition." },
  { question: "L'auto-entreprise est-elle mieux que la SASU ?", answer: "Ca depend. L'auto-entreprise est plus simple et moins couteuse en charges tant que le CA est modere. La SASU offre une meilleure protection sociale, la possibilite de deduire les charges reelles et d'optimiser via les dividendes. Utilisez notre simulateur SASU pour comparer." },
];
