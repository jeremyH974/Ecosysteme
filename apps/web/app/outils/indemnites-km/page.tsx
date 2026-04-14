import type { Metadata } from "next";
import { IndemniteKmPage } from "./IndemniteKmPage";
import { JsonLd, faqJsonLd, toolJsonLd } from "../../lib/JsonLd";
import { Breadcrumb } from "../../lib/Breadcrumb";
import { FAQ_KM } from "../../lib/faq-data";

export const metadata: Metadata = {
  title: "Calculateur indemnites kilometriques 2024 — Frais reels",
  description:
    "Calculez vos indemnites kilometriques pour la declaration de frais reels. Bareme fiscal 2024 a jour selon la puissance fiscale et la distance.",
  openGraph: {
    title: "Calculateur indemnites kilometriques 2024",
    description: "Calculez vos indemnites kilometriques pour la declaration de frais reels.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Outils", href: "/outils" }, { label: "Indemnites kilometriques" }]} />
      <JsonLd type="FAQPage" data={faqJsonLd(FAQ_KM)} />
      <JsonLd type="WebApplication" data={toolJsonLd("Calculateur indemnites kilometriques", "Calculez vos frais kilometriques deductibles pour la declaration IR", "/outils/indemnites-km")} />
      <IndemniteKmPage />
    </>
  );
}
