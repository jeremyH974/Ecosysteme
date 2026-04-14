import type { Metadata } from "next";
import { RevisionLoyerPage } from "./RevisionLoyerPage";
import { JsonLd, faqJsonLd, toolJsonLd } from "../../lib/JsonLd";
import { FAQ_LOYER } from "../../lib/faq-data";

export const metadata: Metadata = {
  title: "Calcul revision de loyer IRL 2024 — Simulateur gratuit",
  description:
    "Calculez la revision de votre loyer avec l'Indice de Reference des Loyers (IRL) de l'INSEE. Resultat immediat et formule detaillee.",
  openGraph: {
    title: "Calcul revision de loyer IRL 2024",
    description: "Calculez la revision de votre loyer avec l'IRL de l'INSEE.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd type="FAQPage" data={faqJsonLd(FAQ_LOYER)} />
      <JsonLd type="WebApplication" data={toolJsonLd("Calcul revision de loyer", "Calculez le nouveau montant de votre loyer apres revision annuelle avec l'IRL", "/outils/revision-loyer")} />
      <RevisionLoyerPage />
    </>
  );
}
