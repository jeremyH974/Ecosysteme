import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">404</p>
      <h1 className="mt-2 text-2xl font-bold text-foreground">Page introuvable</h1>
      <p className="mt-2 text-sm text-muted">
        La page que vous cherchez n&apos;existe pas ou a ete deplacee.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
          Accueil
        </Link>
        <Link href="/outils" className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface">
          Tous les outils
        </Link>
      </div>
    </main>
  );
}
