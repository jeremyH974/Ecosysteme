import type { Metadata } from "next";
import { SimuBrutNetPage } from "./SimuBrutNetPage";

export const metadata: Metadata = {
  title: "Simulateur salaire brut net 2024 — Calcul gratuit",
  description:
    "Convertissez votre salaire brut en net en 30 secondes. Cotisations salariales detaillees, bareme officiel URSSAF a jour.",
};

export default function Page() {
  return <SimuBrutNetPage />;
}
