import type { Metadata } from "next";
import { PlusValueImmoPage } from "./PlusValueImmoPage";
import { JsonLd, faqJsonLd, toolJsonLd } from "../../lib/JsonLd";
import { FAQ_PV } from "../../lib/faq-data";

export const metadata: Metadata = {
  title: "Calcul plus-value immobiliere 2024 — Simulateur gratuit",
  description:
    "Calculez l'imposition sur la plus-value de revente de votre bien immobilier. IR, prelevements sociaux et abattements pour duree de detention.",
  openGraph: {
    title: "Calcul plus-value immobiliere 2024",
    description: "Calculez l'imposition sur la plus-value de revente de votre bien immobilier.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd type="FAQPage" data={faqJsonLd(FAQ_PV)} />
      <JsonLd type="WebApplication" data={toolJsonLd("Calcul plus-value immobiliere", "Calculez l'imposition sur la revente de votre bien immobilier", "/outils/plus-value-immobiliere")} />
      <PlusValueImmoPage />
    </>
  );
}
