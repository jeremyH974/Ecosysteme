"use client";

import { useEffect, useState } from "react";
import { ToolLayout, TrustFooter } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { SimuBrutNetForm } from "./SimuBrutNetForm";
import { SimuBrutNetResult } from "./SimuBrutNetResult";
import { useSimuBrutNet } from "./useSimuBrutNet";
import { ToolRecommendations } from "../../lib/ToolRecommendations";

export function SimuBrutNetPage() {
  const { result, error, calculate } = useSimuBrutNet();
  const [lastBrut, setLastBrut] = useState(0);

  useEffect(() => {
    track({ name: "tool_start", props: { tool: "simu-brut-net" } });
  }, []);

  useEffect(() => {
    if (result) {
      track({ name: "tool_complete", props: { tool: "simu-brut-net", completion_pct: 100 } });
    }
  }, [result]);

  return (
    <ToolLayout
      title="Simulateur salaire brut / net"
      description="Convertissez votre salaire brut en net en tenant compte des cotisations salariales"
      footer={
        <TrustFooter
          baremeNom="Cotisations salariales 2024 — URSSAF"
          dateBareme="1er janvier 2024"
          sources={[
            {
              label: "URSSAF — Taux de cotisations secteur prive",
              url: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/taux-cotisations-secteur-prive.html",
            },
          ]}
          verifieLe="15 janvier 2024"
          casCouverts="les salaries du secteur prive (CDI/CDD), cadres et non-cadres"
          casNonCouverts="les fonctionnaires, les independants/TNS, les regimes speciaux, le prelevement a la source de l'impot sur le revenu"
        />
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <SimuBrutNetForm
            onSubmit={(data) => {
              setLastBrut(parseFloat(data.salaireBrut));
              calculate(data);
            }}
          />
        </div>

        <div>
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {result && (
            <>
              <SimuBrutNetResult result={result} salaireBrut={lastBrut} />
              <ToolRecommendations currentToolSlug="simu-brut-net" />
            </>
          )}

          {!result && !error && (
            <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8">
              <p className="text-center text-sm text-gray-400">
                Remplissez le formulaire pour obtenir votre estimation
              </p>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
