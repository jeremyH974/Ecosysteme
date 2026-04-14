import type { Metadata } from "next";
import { AllocationChomagePage } from "./AllocationChomagePage";
import { JsonLd, faqJsonLd, toolJsonLd } from "../../lib/JsonLd";
import { FAQ_CHOMAGE } from "../../lib/faq-data";

export const metadata: Metadata = {
  title: "Simulateur allocations chomage (ARE) 2024",
  description:
    "Estimez votre allocation chomage (ARE) en fonction de votre salaire brut, anciennete et age. Calcul base sur les regles France Travail.",
  openGraph: {
    title: "Simulateur allocations chomage (ARE) 2024",
    description: "Estimez votre allocation chomage (ARE) gratuitement.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd type="FAQPage" data={faqJsonLd(FAQ_CHOMAGE)} />
      <JsonLd type="WebApplication" data={toolJsonLd("Simulateur allocations chomage", "Estimez votre allocation chomage ARE", "/outils/allocation-chomage")} />
      <AllocationChomagePage />
    </>
  );
}
