import type { Metadata } from "next";
import { SASUOptimPage } from "./SASUOptimPage";

export const metadata: Metadata = {
  title: "Optimisation remuneration SASU 2024 — Simulateur gratuit",
  description:
    "Trouvez la repartition optimale salaire/dividendes pour votre SASU. Bareme IR, IS et PFU a jour, comparaison des scenarios.",
};

export default function Page() {
  return <SASUOptimPage />;
}
