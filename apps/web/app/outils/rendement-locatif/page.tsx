import type { Metadata } from "next";
import { RendementLocatifPage } from "./RendementLocatifPage";
import { JsonLd, faqJsonLd, toolJsonLd } from "../../lib/JsonLd";
import { FAQ_RENDEMENT } from "../../lib/faq-data";

export const metadata: Metadata = {
  title: "Calcul rendement locatif 2024 — Simulateur gratuit",
  description: "Calculez le rendement brut et net de votre investissement locatif. Tenez compte des charges, frais et vacance locative.",
  openGraph: {
    title: "Calcul rendement locatif 2024",
    description: "Calculez le rendement brut et net de votre investissement locatif.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd type="FAQPage" data={faqJsonLd(FAQ_RENDEMENT)} />
      <JsonLd type="WebApplication" data={toolJsonLd("Calcul rendement locatif", "Evaluez la rentabilite de votre investissement immobilier", "/outils/rendement-locatif")} />
      <RendementLocatifPage />
    </>
  );
}
