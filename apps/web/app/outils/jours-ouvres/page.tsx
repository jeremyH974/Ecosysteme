import type { Metadata } from "next";
import { JoursOuvresPage } from "./JoursOuvresPage";
import { JsonLd, faqJsonLd, toolJsonLd } from "../../lib/JsonLd";
import { Breadcrumb } from "../../lib/Breadcrumb";
import { FAQ_JOURS_OUVRES } from "../../lib/faq-data";

export const metadata: Metadata = {
  title: "Calculateur jours ouvres 2026 — Feries inclus",
  description:
    "Calculez le nombre de jours ouvres ou ouvrables entre deux dates. Jours feries francais inclus, detail complet et PDF telechargeable.",
  openGraph: {
    title: "Calculateur jours ouvres 2026 — Feries inclus",
    description: "Calculez le nombre de jours ouvres ou ouvrables entre deux dates en France.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Outils", href: "/outils" }, { label: "Jours ouvres" }]} />
      <JsonLd type="FAQPage" data={faqJsonLd(FAQ_JOURS_OUVRES)} />
      <JsonLd type="WebApplication" data={toolJsonLd("Calculateur jours ouvres", "Calculez le nombre de jours ouvres ou ouvrables entre deux dates", "/outils/jours-ouvres")} />
      <JoursOuvresPage />
    </>
  );
}
