import type { Metadata } from "next";
import { RendementLocatifPage } from "./RendementLocatifPage";

export const metadata: Metadata = {
  title: "Calcul rendement locatif 2024 — Simulateur gratuit",
  description: "Calculez le rendement brut et net de votre investissement locatif. Tenez compte des charges, frais et vacance locative.",
};

export default function Page() {
  return <RendementLocatifPage />;
}
