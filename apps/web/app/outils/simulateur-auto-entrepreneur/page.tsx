import type { Metadata } from "next";
import { AEPage } from "./AEPage";

export const metadata: Metadata = {
  title: "Simulateur auto-entrepreneur 2024 — Charges et revenus",
  description: "Simulez vos cotisations sociales et votre revenu net en auto-entrepreneur. Vente, prestation BIC ou BNC.",
};

export default function Page() {
  return <AEPage />;
}
