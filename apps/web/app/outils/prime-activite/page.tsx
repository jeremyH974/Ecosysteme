import type { Metadata } from "next";
import { PrimeActivitePage } from "./PrimeActivitePage";
import { JsonLd, faqJsonLd, toolJsonLd } from "../../lib/JsonLd";
import { Breadcrumb } from "../../lib/Breadcrumb";
import { FAQ_PRIME } from "../../lib/faq-data";

export const metadata: Metadata = {
  title: "Simulateur prime d'activite 2026 — Estimation gratuite",
  description:
    "Estimez votre prime d'activite CAF en 30 secondes. Calcul base sur le montant forfaitaire 2026 et la bonification individuelle.",
  openGraph: {
    title: "Simulateur prime d'activite 2026 — Estimation gratuite",
    description: "Estimez votre prime d'activite CAF gratuitement.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Outils", href: "/outils" }, { label: "Prime d'activite" }]} />
      <JsonLd type="FAQPage" data={faqJsonLd(FAQ_PRIME)} />
      <JsonLd type="WebApplication" data={toolJsonLd("Simulateur prime d'activite", "Estimez votre prime d'activite CAF", "/outils/prime-activite")} />
      <PrimeActivitePage />
    </>
  );
}
