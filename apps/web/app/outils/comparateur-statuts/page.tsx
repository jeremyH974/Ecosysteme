import type { Metadata } from "next";
import { ComparateurStatutsPage } from "./ComparateurStatutsPage";
import { JsonLd, faqJsonLd, toolJsonLd } from "../../lib/JsonLd";
import { Breadcrumb } from "../../lib/Breadcrumb";
import { FAQ_COMPARATEUR } from "../../lib/faq-data";

export const metadata: Metadata = {
  title: "Comparateur SASU vs Auto-entrepreneur 2024 — Simulateur gratuit",
  description:
    "Comparez les revenus nets entre auto-entrepreneur et SASU. Cotisations, impots et protection sociale cote a cote.",
  openGraph: {
    title: "Comparateur SASU vs Auto-entrepreneur 2024",
    description: "Comparez les revenus nets entre auto-entrepreneur et SASU.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Outils", href: "/outils" }, { label: "Comparateur SASU vs AE" }]} />
      <JsonLd type="FAQPage" data={faqJsonLd(FAQ_COMPARATEUR)} />
      <JsonLd type="WebApplication" data={toolJsonLd("Comparateur SASU vs Auto-entrepreneur", "Comparez les revenus nets entre auto-entrepreneur et SASU", "/outils/comparateur-statuts")} />
      <ComparateurStatutsPage />
    </>
  );
}
