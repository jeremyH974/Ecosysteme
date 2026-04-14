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
    <nav className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-emerald-700 text-xs font-bold text-white">E</span>
          <span className="text-sm font-semibold tracking-tight text-gray-900">Ecosysteme</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/outils" className="text-sm text-gray-600 hover:text-gray-900">Outils</Link>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-stone-50 font-sans text-gray-900 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
