"use client";

import { useEffect } from "react";
import { ToolLayout, TrustFooter, FAQ } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { RuptureForm } from "./RuptureForm";
import { RuptureResult } from "./RuptureResult";
import { useRuptureCalc } from "./useRuptureCalc";
import { ToolRecommendations } from "../../lib/ToolRecommendations";
import { FAQ_RUPTURE } from "../../lib/faq-data";

export function RuptureCalcPage() {
  const { result, error, warning, calculate } = useRuptureCalc();

  useEffect(() => {
    track({ name: "tool_start", props: { tool: "rupture-calc" } });
  }, []);

  useEffect(() => {
    if (result) {
      track({ name: "tool_complete", props: { tool: "rupture-calc", completion_pct: 100 } });
    }
  }, [result]);

  return (
    <ToolLayout
      title="Calcul indemnite rupture conventionnelle"
      description="Estimez votre indemnite minimale legale en 30 secondes"
      footer={
        <TrustFooter
          baremeNom="Indemnite de rupture conventionnelle — Art. L1237-19-1 Code du travail"
          dateBareme="23 septembre 2017"
          sources={[
            {
              label: "Code du travail — Art. L1237-19-1",
              url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036761986",
            },
          ]}
          verifieLe="15 janvier 2024"
          casCouverts="les CDI a temps plein avec anciennete superieure ou egale a 8 mois"
          casNonCouverts="les CDD, les temps partiels, les cadres dirigeants au forfait, les cas avec periodes de suspension de contrat, les conventions collectives specifiques"
        />
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <RuptureForm onSubmit={calculate} />
        </div>

        <div>
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {warning && !result && (
            <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm text-amber-800">{warning}</p>
            </div>
          )}

          {result && (
            <>
              <RuptureResult result={result} />
              <ToolRecommendations currentToolSlug="rupture-calc" />
            </>
          )}

          {!result && !error && !warning && (
            <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8">
              <p className="text-center text-sm text-gray-400">
                Remplissez le formulaire pour obtenir votre estimation
              </p>
            </div>
          )}
        </div>
      </div>

      <FAQ items={FAQ_RUPTURE} />
    </ToolLayout>
  );
}
