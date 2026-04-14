import type { Metadata } from "next";
import { SimuBrutNetPage } from "./SimuBrutNetPage";
import { JsonLd, faqJsonLd, toolJsonLd } from "../../lib/JsonLd";
import { Breadcrumb } from "../../lib/Breadcrumb";
import { FAQ_BRUT_NET } from "../../lib/faq-data";

export const metadata: Metadata = {
  title: "Simulateur salaire brut net 2024 — Calcul gratuit",
  description:
    "Convertissez votre salaire brut en net en 30 secondes. Cotisations salariales detaillees, bareme officiel URSSAF a jour.",
  openGraph: {
    title: "Simulateur salaire brut net 2024",
    description: "Convertissez votre salaire brut en net en 30 secondes. Cotisations salariales detaillees.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Outils", href: "/outils" }, { label: "Simulateur brut/net" }]} />
      <JsonLd type="FAQPage" data={faqJsonLd(FAQ_BRUT_NET)} />
      <JsonLd type="WebApplication" data={toolJsonLd("Simulateur salaire brut net", "Convertissez votre salaire brut en net avec les cotisations salariales", "/outils/simulateur-brut-net")} />
      <SimuBrutNetPage />
    </>
  );
}
