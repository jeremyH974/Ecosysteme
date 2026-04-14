import type { Metadata } from "next";
import { JsonLd } from "../lib/JsonLd";
import { Breadcrumb } from "../lib/Breadcrumb";
import { OutilsFilter } from "./OutilsFilter";

export const metadata: Metadata = {
  title: "Tous les outils — Ecosysteme",
  description: "18 calculateurs gratuits pour les Francais : droit du travail, freelance, immobilier, fiscalite.",
  openGraph: { title: "Tous les outils — Ecosysteme", description: "18 calculateurs gratuits et precis.", type: "website" },
};

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Outils" }]} />
      <JsonLd type="WebApplication" data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Ecosysteme — Tous les outils", description: "18 calculateurs gratuits", url: "/outils" }} />
      <main className="mx-auto max-w-5xl px-5 py-10">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">Tous les outils</h1>
          <p className="mt-1.5 text-sm text-muted">18 calculateurs gratuits, precis et transparents.</p>
        </div>

        <OutilsFilter />
      </main>
    </>
  );
}
