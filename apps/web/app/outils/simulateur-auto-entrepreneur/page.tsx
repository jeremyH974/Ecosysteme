import type { Metadata } from "next";
import { AEPage } from "./AEPage";
import { JsonLd, faqJsonLd, toolJsonLd } from "../../lib/JsonLd";
import { FAQ_AE } from "../../lib/faq-data";

export const metadata: Metadata = {
  title: "Simulateur auto-entrepreneur 2024 — Charges et revenus",
  description: "Simulez vos cotisations sociales et votre revenu net en auto-entrepreneur. Vente, prestation BIC ou BNC.",
  openGraph: {
    title: "Simulateur auto-entrepreneur 2024",
    description: "Simulez vos cotisations sociales et votre revenu net en auto-entrepreneur.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd type="FAQPage" data={faqJsonLd(FAQ_AE)} />
      <JsonLd type="WebApplication" data={toolJsonLd("Simulateur auto-entrepreneur", "Estimez vos cotisations sociales et votre revenu net en auto-entrepreneur", "/outils/simulateur-auto-entrepreneur")} />
      <AEPage />
    </>
  );
}
