const CATEGORIES = [
  {
    title: "Droit du travail & Salaire",
    description: "Outils pour les salaries et les RH",
    tools: [
      { name: "Rupture conventionnelle", url: "/outils/rupture-conventionnelle", desc: "Calculez votre indemnite legale de rupture conventionnelle en 30 secondes." },
      { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Convertissez votre salaire brut en net avec le detail des cotisations." },
    ],
  },
  {
    title: "Freelance & Societe",
    description: "Optimisation pour les independants et dirigeants",
    tools: [
      { name: "Optimisation SASU", url: "/outils/optimisation-sasu", desc: "Trouvez la repartition optimale salaire/dividendes pour votre SASU." },
      { name: "Auto-entrepreneur", url: "/outils/simulateur-auto-entrepreneur", desc: "Simulez vos cotisations sociales et votre revenu net en micro-entreprise." },
      { name: "Comparateur SASU vs AE", url: "/outils/comparateur-statuts", desc: "Comparez les revenus nets et la protection sociale des deux statuts." },
    ],
  },
  {
    title: "Immobilier",
    description: "Calculs pour les proprietaires, bailleurs et investisseurs",
    tools: [
      { name: "Revision de loyer (IRL)", url: "/outils/revision-loyer", desc: "Calculez le nouveau montant de votre loyer avec l'indice IRL de l'INSEE." },
      { name: "Frais de notaire", url: "/outils/frais-notaire", desc: "Estimez les frais de notaire pour votre achat immobilier (ancien ou neuf)." },
      { name: "Rendement locatif", url: "/outils/rendement-locatif", desc: "Evaluez la rentabilite brute et nette de votre investissement locatif." },
      { name: "Plus-value immobiliere", url: "/outils/plus-value-immobiliere", desc: "Calculez l'imposition sur la revente de votre bien immobilier." },
    ],
  },
  {
    title: "Fiscalite",
    description: "Impot sur le revenu et fiscalite pratique",
    tools: [
      { name: "Simulateur TMI", url: "/outils/simulateur-tmi", desc: "Calculez votre taux marginal d'imposition et le detail de votre IR." },
      { name: "Indemnites kilometriques", url: "/outils/indemnites-km", desc: "Calculez vos frais kilometriques deductibles pour votre declaration IR." },
    ],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-emerald-700">
            Calculateurs de reference
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Ecosysteme
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            11 outils gratuits, precis et transparents pour les Francais.
            Droit du travail, fiscalite, freelance et immobilier.
          </p>
          <p className="mt-3 text-sm text-gray-400">
            L&apos;outil que votre expert-comptable aurait fait si vous lui aviez demande
            de le rendre gratuit et accessible.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="#outils" className="rounded-md bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800">
              Voir les outils
            </a>
          </div>
        </div>
      </section>

      {/* Chiffres cles */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-900">11</p>
              <p className="mt-1 text-xs text-gray-500">Outils gratuits</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">194</p>
              <p className="mt-1 text-xs text-gray-500">Tests automatises</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">12</p>
              <p className="mt-1 text-xs text-gray-500">Baremes officiels</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">30s</p>
              <p className="mt-1 text-xs text-gray-500">Pour un resultat</p>
            </div>
          </div>
        </div>
      </section>

      {/* Parcours par profil */}
      <section className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-center text-lg font-bold text-gray-900">Je suis...</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <a href="#droit-du-travail-&-salaire" className="group rounded-lg border-2 border-gray-100 bg-gray-50 p-5 text-center transition-all hover:border-emerald-200 hover:bg-emerald-50">
              <p className="text-2xl">&#128188;</p>
              <p className="mt-2 text-sm font-semibold text-gray-900 group-hover:text-emerald-700">Salarie</p>
              <p className="mt-1 text-xs text-gray-500">Rupture conventionnelle, brut/net, TMI</p>
            </a>
            <a href="#freelance-&-societe" className="group rounded-lg border-2 border-gray-100 bg-gray-50 p-5 text-center transition-all hover:border-emerald-200 hover:bg-emerald-50">
              <p className="text-2xl">&#128187;</p>
              <p className="mt-2 text-sm font-semibold text-gray-900 group-hover:text-emerald-700">Freelance / Dirigeant</p>
              <p className="mt-1 text-xs text-gray-500">SASU, auto-entrepreneur, TMI</p>
            </a>
            <a href="#immobilier" className="group rounded-lg border-2 border-gray-100 bg-gray-50 p-5 text-center transition-all hover:border-emerald-200 hover:bg-emerald-50">
              <p className="text-2xl">&#127968;</p>
              <p className="mt-2 text-sm font-semibold text-gray-900 group-hover:text-emerald-700">Proprietaire / Bailleur</p>
              <p className="mt-1 text-xs text-gray-500">Loyer, frais de notaire, rendement</p>
            </a>
          </div>
        </div>
      </section>

      {/* Outils par categorie */}
      <section id="outils" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {CATEGORIES.map((cat) => (
            <div key={cat.title}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">{cat.title}</h2>
                <p className="text-sm text-gray-500">{cat.description}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.tools.map((tool) => (
                  <a
                    key={tool.url}
                    href={tool.url}
                    className="group rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-emerald-200"
                  >
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-emerald-700">
                      {tool.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">{tool.desc}</p>
                    <p className="mt-3 text-xs font-medium text-emerald-700">
                      Utiliser &rarr;
                    </p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-sm text-gray-500">
              Ecosysteme — Calculateurs utilitaires de reference
            </p>
            <p className="text-xs text-gray-400">
              Resultats a titre indicatif. Sources officielles citees sur chaque outil.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
