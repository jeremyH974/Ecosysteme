"use client";

import { useEffect } from "react";
import { ToolLayout, TrustFooter, FAQ } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { SASUOptimForm } from "./SASUOptimForm";
import { SASUOptimResult } from "./SASUOptimResult";
import { useSASUOptim } from "./useSASUOptim";
import { NextStepBlock } from "../../lib/NextStepBlock";
import { FAQ_SASU } from "../../lib/faq-data";
import { SASUContent } from "./SASUContent";

export function SASUOptimPage() {
  const { result, error, calculate } = useSASUOptim();

  useEffect(() => {
    track({ name: "tool_start", props: { tool: "sasu-optim" } });
  }, []);

  useEffect(() => {
    if (result) {
      track({ name: "tool_complete", props: { tool: "sasu-optim", completion_pct: 100 } });
    }
  }, [result]);

  return (
    <ToolLayout
      title="Optimisation remuneration SASU"
      description="Trouvez la repartition optimale entre salaire et dividendes pour votre SASU"
      footer={
        <TrustFooter
          baremeNom="Bareme IR 2024, IS 2024, PFU 30%"
          dateBareme="1er janvier 2024"
          sources={[
            {
              label: "Service-Public.fr — Bareme IR 2024",
              url: "https://www.service-public.fr/particuliers/vosdroits/F1419",
            },
            {
              label: "Service-Public Entreprendre — IS 2024",
              url: "https://entreprendre.service-public.fr/vosdroits/F23575",
            },
          ]}
          verifieLe="15 janvier 2024"
          casCouverts="les presidents de SASU (assimiles salaries), regime IS, PFU par defaut"
          casNonCouverts="les EURL/SARL a l'IR, les auto-entrepreneurs, les TNS, l'option au bareme progressif pour les dividendes, les holding, les conventions de tresorerie"
        />
      }
    >
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SASUOptimForm onSubmit={calculate} />
        </div>

        <div className="lg:col-span-3">
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {result && (
            <>
              <SASUOptimResult result={result} />
              <NextStepBlock currentToolSlug="sasu-optim" />
            </>
          )}

          {!result && !error && (
            <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8">
              <p className="text-center text-sm text-gray-400">
                Remplissez le formulaire pour obtenir votre optimisation
              </p>
            </div>
          )}
        </div>
      </div>

      <SASUContent />
      <FAQ items={FAQ_SASU} />
    </ToolLayout>
  );
}
