import type { Metadata } from "next";
import { NiveauRichessePage } from "./NiveauRichessePage";
import { JsonLd, faqJsonLd, toolJsonLd } from "../../lib/JsonLd";
import { FAQ_RICHESSE } from "../../lib/faq-data";

export const metadata: Metadata = {
  title: "Niveau de richesse 2024 — Ou vous situez-vous ?",
  description:
    "Comparez votre salaire net mensuel aux statistiques nationales INSEE : salaire moyen, median, SMIC et seuils de richesse en France.",
  openGraph: {
    title: "Niveau de richesse 2024 — Ou vous situez-vous ?",
    description: "Comparez votre salaire aux statistiques nationales INSEE.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd type="FAQPage" data={faqJsonLd(FAQ_RICHESSE)} />
      <JsonLd type="WebApplication" data={toolJsonLd("Niveau de richesse", "Comparez votre salaire net aux statistiques nationales", "/outils/niveau-richesse")} />
      <NiveauRichessePage />
    </>
  );
}
