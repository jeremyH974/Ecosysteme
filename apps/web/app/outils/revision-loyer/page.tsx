import type { Metadata } from "next";
import { RevisionLoyerPage } from "./RevisionLoyerPage";

export const metadata: Metadata = {
  title: "Calcul revision de loyer IRL 2024 — Simulateur gratuit",
  description:
    "Calculez la revision de votre loyer avec l'Indice de Reference des Loyers (IRL) de l'INSEE. Resultat immediat et formule detaillee.",
};

export default function Page() {
  return <RevisionLoyerPage />;
}
