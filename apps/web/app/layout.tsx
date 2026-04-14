import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ecosysteme — Calculateurs utilitaires de reference pour la France",
    template: "%s | Ecosysteme",
  },
  description:
    "Calculateurs, simulateurs et generateurs utilitaires de reference pour les Francais. Droit du travail, fiscalite, immobilier, freelance.",
  metadataBase: new URL("https://ecosysteme-tools.vercel.app"),
  openGraph: {
    siteName: "Ecosysteme",
    locale: "fr_FR",
    type: "website",
  },
};

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">E</span>
          <span className="text-[15px] font-semibold tracking-tight text-foreground">Ecosysteme</span>
        </Link>
        <div className="flex items-center gap-5">
          <Link href="/outils" className="text-sm text-muted transition-colors hover:text-foreground">Tous les outils</Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-5xl px-5 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Ecosysteme</p>
            <p className="mt-0.5 text-xs text-muted">Calculateurs utilitaires de reference pour la France</p>
          </div>
          <p className="text-xs text-muted-light">Resultats indicatifs. Sources officielles citees sur chaque outil.</p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-surface font-sans text-foreground antialiased">
        <Navbar />
        <div className="min-h-[calc(100vh-120px)]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
