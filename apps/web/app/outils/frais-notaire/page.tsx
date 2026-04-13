import type { Metadata } from "next";
import { FraisNotairePage } from "./FraisNotairePage";

export const metadata: Metadata = {
  title: "Calcul frais de notaire 2024 — Simulateur gratuit",
  description: "Estimez les frais de notaire pour votre achat immobilier. Ancien ou neuf, droits de mutation et emoluments detailles.",
};

export default function Page() {
  return <FraisNotairePage />;
}
