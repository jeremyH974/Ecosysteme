import type { Metadata } from "next";
import { RuptureCalcPage } from "./RuptureCalcPage";

export const metadata: Metadata = {
  title: "Calcul indemnite rupture conventionnelle 2024 — Simulateur gratuit",
  description:
    "Calculez en 30 secondes votre indemnite legale de rupture conventionnelle. Bareme officiel a jour, resultat explique et PDF telechargeable.",
};

export default function Page() {
  return <RuptureCalcPage />;
}
