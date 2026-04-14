import type { Metadata } from "next";
import { CongesPayesPage } from "./CongesPayesPage";
import { JsonLd, faqJsonLd, toolJsonLd } from "../../lib/JsonLd";
import { Breadcrumb } from "../../lib/Breadcrumb";
import { FAQ_CONGES } from "../../lib/faq-data";

export const metadata: Metadata = {
  title: "Calculateur conges payes 2026 — Indemnite gratuit",
  description:
    "Calculez votre indemnite de conges payes en 30 secondes. Comparaison methode maintien vs 1/10e, jours restants et PDF telechargeable.",
  openGraph: {
    title: "Calculateur conges payes 2026 — Indemnite gratuit",
    description: "Calculez votre indemnite de conges payes gratuitement.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Outils", href: "/outils" }, { label: "Conges payes" }]} />
      <JsonLd type="FAQPage" data={faqJsonLd(FAQ_CONGES)} />
      <JsonLd type="WebApplication" data={toolJsonLd("Calculateur conges payes", "Calculez votre indemnite de conges payes", "/outils/conges-payes")} />
      <CongesPayesPage />
    </>
  );
}
