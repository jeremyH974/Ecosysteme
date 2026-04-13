import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ecosysteme — Calculateurs utilitaires de reference",
    template: "%s | Ecosysteme",
  },
  description:
    "Calculateurs, simulateurs et generateurs utilitaires de reference pour les Francais. Droit du travail, fiscalite, immobilier, freelance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
