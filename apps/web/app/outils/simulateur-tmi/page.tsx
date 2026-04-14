import type { Metadata } from "next";
import { TMIPage } from "./TMIPage";
import { JsonLd, faqJsonLd, toolJsonLd } from "../../lib/JsonLd";
import { FAQ_TMI } from "../../lib/faq-data";

export const metadata: Metadata = {
  title: "Simulateur TMI 2024 — Calculez votre taux marginal d'imposition",
  description:
    "Calculez votre taux marginal d'imposition (TMI) et le montant de votre impot sur le revenu. Bareme progressif 2024 a jour.",
  openGraph: {
    title: "Simulateur TMI 2024",
    description: "Calculez votre taux marginal d'imposition et le montant de votre impot sur le revenu.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd type="FAQPage" data={faqJsonLd(FAQ_TMI)} />
      <JsonLd type="WebApplication" data={toolJsonLd("Simulateur TMI", "Calculez votre taux marginal d'imposition et votre impot sur le revenu", "/outils/simulateur-tmi")} />
      <TMIPage />
    </>
  );
}
