import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <p className="text-sm font-medium uppercase tracking-widest text-emerald-700">404</p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900">Page introuvable</h1>
      <p className="mt-3 text-sm text-gray-500">
        La page que vous cherchez n&apos;existe pas ou a ete deplacee.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          Retour a l&apos;accueil
        </Link>
        <Link
          href="/outils"
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Voir les outils
        </Link>
      </div>
    </main>
  );
}
