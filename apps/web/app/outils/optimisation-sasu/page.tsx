import type { Metadata } from "next";
import { SASUOptimPage } from "./SASUOptimPage";
import { JsonLd, faqJsonLd, toolJsonLd } from "../../lib/JsonLd";
import { Breadcrumb } from "../../lib/Breadcrumb";
import { FAQ_SASU } from "../../lib/faq-data";

export const metadata: Metadata = {
  title: "Optimisation remuneration SASU 2024 — Simulateur gratuit",
  description:
    "Trouvez la repartition optimale salaire/dividendes pour votre SASU. Bareme IR, IS et PFU a jour, comparaison des scenarios.",
  openGraph: {
    title: "Optimisation remuneration SASU 2024",
    description: "Trouvez la repartition optimale salaire/dividendes pour votre SASU.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Outils", href: "/outils" }, { label: "Optimisation SASU" }]} />
      <JsonLd type="FAQPage" data={faqJsonLd(FAQ_SASU)} />
      <JsonLd type="WebApplication" data={toolJsonLd("Optimisation remuneration SASU", "Trouvez la repartition optimale entre salaire et dividendes pour votre SASU", "/outils/optimisation-sasu")} />
      <SASUOptimPage />
    </>
  );
}
