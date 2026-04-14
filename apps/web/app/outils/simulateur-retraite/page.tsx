import type { Metadata } from "next";
import { SimulateurRetraitePage } from "./SimulateurRetraitePage";
import { JsonLd, faqJsonLd, toolJsonLd } from "../../lib/JsonLd";
import { Breadcrumb } from "../../lib/Breadcrumb";
import { FAQ_RETRAITE } from "../../lib/faq-data";

export const metadata: Metadata = {
  title: "Simulateur retraite 2024 — Estimez votre pension",
  description:
    "Estimez votre future pension de retraite (base + complementaire) en fonction de votre salaire, age et trimestres valides.",
  openGraph: {
    title: "Simulateur retraite 2024 — Estimez votre pension",
    description: "Estimez votre future pension de retraite gratuitement.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Outils", href: "/outils" }, { label: "Simulateur retraite" }]} />
      <JsonLd type="FAQPage" data={faqJsonLd(FAQ_RETRAITE)} />
      <JsonLd type="WebApplication" data={toolJsonLd("Simulateur retraite", "Estimez votre future pension de retraite", "/outils/simulateur-retraite")} />
      <SimulateurRetraitePage />
    </>
  );
}
