import type { Metadata } from "next";
import { TMIPage } from "./TMIPage";

export const metadata: Metadata = {
  title: "Simulateur TMI 2024 — Calculez votre taux marginal d'imposition",
  description:
    "Calculez votre taux marginal d'imposition (TMI) et le montant de votre impot sur le revenu. Bareme progressif 2024 a jour.",
};

export default function Page() {
  return <TMIPage />;
}
