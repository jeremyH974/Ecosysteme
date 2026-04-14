import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ThemeToggle } from "./lib/ThemeToggle";

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
    <nav className="sticky top-0 z-50 border-b border-border bg-surface-card/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">E</span>
          <span className="text-[15px] font-semibold tracking-tight text-foreground">Ecosysteme</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/outils" className="text-sm text-muted transition-colors hover:text-foreground">Outils</Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-surface-card">
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
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }
          } catch (_) {}
        `}} />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased transition-colors">
        <Navbar />
        <div className="min-h-[calc(100vh-120px)]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
