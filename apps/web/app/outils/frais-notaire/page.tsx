import type { Metadata } from "next";
import { FraisNotairePage } from "./FraisNotairePage";
import { JsonLd, faqJsonLd, toolJsonLd } from "../../lib/JsonLd";
import { Breadcrumb } from "../../lib/Breadcrumb";
import { FAQ_NOTAIRE } from "../../lib/faq-data";

export const metadata: Metadata = {
  title: "Calcul frais de notaire 2024 — Simulateur gratuit",
  description: "Estimez les frais de notaire pour votre achat immobilier. Ancien ou neuf, droits de mutation et emoluments detailles.",
  openGraph: {
    title: "Calcul frais de notaire 2024",
    description: "Estimez les frais de notaire pour votre achat immobilier, ancien ou neuf.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Outils", href: "/outils" }, { label: "Frais de notaire" }]} />
      <JsonLd type="FAQPage" data={faqJsonLd(FAQ_NOTAIRE)} />
      <JsonLd type="WebApplication" data={toolJsonLd("Calcul frais de notaire", "Estimez les frais de notaire pour votre achat immobilier", "/outils/frais-notaire")} />
      <FraisNotairePage />
    </>
  );
}
