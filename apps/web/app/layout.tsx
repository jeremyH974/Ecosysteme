import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ThemeToggle } from "./lib/ThemeToggle";

const BASE_URL = "https://ecosysteme-tools.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Ecosysteme — Calculateurs gratuits pour la France : salaire, impots, immobilier",
    template: "%s | Ecosysteme",
  },
  description:
    "14 calculateurs gratuits et precis pour les Francais : salaire brut/net, rupture conventionnelle, impots, SASU, auto-entrepreneur, immobilier. Sources officielles, resultats instantanes.",
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: BASE_URL },
  openGraph: {
    siteName: "Ecosysteme",
    locale: "fr_FR",
    type: "website",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecosysteme — Calculateurs gratuits pour la France",
    description: "14 outils financiers gratuits : salaire, impots, immobilier, freelance.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  other: {
    "google-site-verification": "",
  },
};

const FOOTER_TOOLS = [
  { name: "Brut/Net", href: "/outils/simulateur-brut-net" },
  { name: "Rupture conv.", href: "/outils/rupture-conventionnelle" },
  { name: "TMI", href: "/outils/simulateur-tmi" },
  { name: "SASU", href: "/outils/optimisation-sasu" },
  { name: "Auto-entrepreneur", href: "/outils/simulateur-auto-entrepreneur" },
  { name: "Chomage", href: "/outils/allocation-chomage" },
  { name: "Retraite", href: "/outils/simulateur-retraite" },
  { name: "Frais notaire", href: "/outils/frais-notaire" },
  { name: "Loyer IRL", href: "/outils/revision-loyer" },
  { name: "Rendement", href: "/outils/rendement-locatif" },
];

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
      <div className="mx-auto max-w-5xl px-5 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-foreground">Ecosysteme</p>
            <p className="mt-1 text-xs text-muted">14 calculateurs gratuits et precis pour les Francais. Sources officielles, resultats instantanes.</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Outils populaires</p>
            <ul className="mt-2 space-y-1">
              {FOOTER_TOOLS.slice(0, 5).map((t) => (
                <li key={t.href}><Link href={t.href} className="text-xs text-muted hover:text-primary transition-colors">{t.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Autres outils</p>
            <ul className="mt-2 space-y-1">
              {FOOTER_TOOLS.slice(5).map((t) => (
                <li key={t.href}><Link href={t.href} className="text-xs text-muted hover:text-primary transition-colors">{t.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-light">Resultats indicatifs. Sources officielles citees sur chaque outil.</p>
          <Link href="/outils" className="text-xs text-primary hover:underline">Voir les 14 outils</Link>
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Ecosysteme",
          url: BASE_URL,
          description: "Calculateurs gratuits pour les Francais",
          inLanguage: "fr",
          potentialAction: {
            "@type": "SearchAction",
            target: `${BASE_URL}/outils?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Ecosysteme",
          url: BASE_URL,
          logo: `${BASE_URL}/icon.png`,
          description: "Calculateurs utilitaires de reference pour la France",
        })}} />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased transition-colors">
        <Navbar />
        <div className="min-h-[calc(100vh-120px)]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
