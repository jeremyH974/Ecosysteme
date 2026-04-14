import type { Metadata } from "next";
import { RuptureCalcPage } from "./RuptureCalcPage";
import { JsonLd, faqJsonLd, toolJsonLd } from "../../lib/JsonLd";
import { Breadcrumb } from "../../lib/Breadcrumb";
import { FAQ_RUPTURE } from "../../lib/faq-data";

export const metadata: Metadata = {
  title: "Calcul indemnite rupture conventionnelle 2024 — Simulateur gratuit",
  description:
    "Calculez en 30 secondes votre indemnite legale de rupture conventionnelle. Bareme officiel a jour, resultat explique et PDF telechargeable.",
  openGraph: {
    title: "Calcul indemnite rupture conventionnelle 2024",
    description: "Simulateur gratuit pour calculer votre indemnite de rupture conventionnelle.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Outils", href: "/outils" }, { label: "Rupture conventionnelle" }]} />
      <JsonLd type="FAQPage" data={faqJsonLd(FAQ_RUPTURE)} />
      <JsonLd type="WebApplication" data={toolJsonLd("Calcul rupture conventionnelle", "Calculez votre indemnite legale de rupture conventionnelle", "/outils/rupture-conventionnelle")} />
      <RuptureCalcPage />
    </>
  );
}
