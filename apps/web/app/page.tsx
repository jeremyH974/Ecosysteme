export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Ecosysteme
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Calculateurs utilitaires de reference pour les Francais
        </p>
        <p className="mt-2 text-sm text-gray-500">
          L&apos;outil que votre expert-comptable aurait fait si vous lui aviez demande de le rendre
          gratuit et accessible.
        </p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <a
          href="/outils/rupture-conventionnelle"
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-900">Rupture conventionnelle</h2>
          <p className="mt-1 text-sm text-gray-500">
            Calculez votre indemnite legale de rupture conventionnelle en 30 secondes.
          </p>
          <p className="mt-3 text-xs font-medium text-emerald-700">Simuler maintenant &rarr;</p>
        </a>

        <a
          href="/outils/simulateur-brut-net"
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-900">Simulateur brut/net</h2>
          <p className="mt-1 text-sm text-gray-500">
            Convertissez votre salaire brut en net en tenant compte des charges sociales.
          </p>
          <p className="mt-3 text-xs font-medium text-emerald-700">Simuler maintenant &rarr;</p>
        </a>

        <a
          href="/outils/optimisation-sasu"
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-900">Optimisation SASU</h2>
          <p className="mt-1 text-sm text-gray-500">
            Trouvez la repartition optimale salaire/dividendes pour votre SASU.
          </p>
          <p className="mt-3 text-xs font-medium text-emerald-700">Optimiser maintenant &rarr;</p>
        </a>

        <a
          href="/outils/revision-loyer"
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-900">Revision de loyer (IRL)</h2>
          <p className="mt-1 text-sm text-gray-500">
            Calculez le nouveau montant de votre loyer avec l&apos;indice IRL de l&apos;INSEE.
          </p>
          <p className="mt-3 text-xs font-medium text-emerald-700">Calculer maintenant &rarr;</p>
        </a>

        <a
          href="/outils/simulateur-tmi"
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-900">Simulateur TMI</h2>
          <p className="mt-1 text-sm text-gray-500">
            Calculez votre taux marginal d&apos;imposition et le detail de votre IR.
          </p>
          <p className="mt-3 text-xs font-medium text-emerald-700">Calculer maintenant &rarr;</p>
        </a>

        <a
          href="/outils/frais-notaire"
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-900">Frais de notaire</h2>
          <p className="mt-1 text-sm text-gray-500">
            Estimez les frais de notaire pour votre achat immobilier (ancien ou neuf).
          </p>
          <p className="mt-3 text-xs font-medium text-emerald-700">Calculer maintenant &rarr;</p>
        </a>

        <a
          href="/outils/rendement-locatif"
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-900">Rendement locatif</h2>
          <p className="mt-1 text-sm text-gray-500">
            Evaluez la rentabilite brute et nette de votre investissement locatif.
          </p>
          <p className="mt-3 text-xs font-medium text-emerald-700">Calculer maintenant &rarr;</p>
        </a>

        <a
          href="/outils/simulateur-auto-entrepreneur"
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-900">Auto-entrepreneur</h2>
          <p className="mt-1 text-sm text-gray-500">
            Simulez vos cotisations sociales et votre revenu net en micro-entreprise.
          </p>
          <p className="mt-3 text-xs font-medium text-emerald-700">Simuler maintenant &rarr;</p>
        </a>
      </div>
    </main>
  );
}
