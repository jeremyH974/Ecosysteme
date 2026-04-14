import type { Metadata } from "next";
import { FraisReelsPage } from "./FraisReelsPage";
import { JsonLd, faqJsonLd, toolJsonLd } from "../../lib/JsonLd";
import { Breadcrumb } from "../../lib/Breadcrumb";
import { FAQ_FRAIS_REELS } from "../../lib/faq-data";

export const metadata: Metadata = {
  title: "Simulateur frais reels 2026 — Frais reels ou forfait 10% ?",
  description:
    "Comparez la deduction des frais reels (transport, repas, materiel) avec l'abattement forfaitaire de 10%. Resultat immediat, PDF telechargeable.",
  openGraph: {
    title: "Simulateur frais reels 2026 — Frais reels ou forfait 10% ?",
    description: "Comparez frais reels vs abattement forfaitaire de 10% pour votre declaration IR.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Outils", href: "/outils" }, { label: "Frais reels" }]} />
      <JsonLd type="FAQPage" data={faqJsonLd(FAQ_FRAIS_REELS)} />
      <JsonLd type="WebApplication" data={toolJsonLd("Simulateur frais reels", "Comparez frais reels vs forfait 10% pour votre declaration IR", "/outils/frais-reels-impots")} />
      <FraisReelsPage />
    </>
  );
}
