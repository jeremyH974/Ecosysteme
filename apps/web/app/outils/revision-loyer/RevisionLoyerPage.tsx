"use client";

import { useEffect } from "react";
import { ToolLayout, TrustFooter, FAQ } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { RevisionLoyerForm } from "./RevisionLoyerForm";
import { RevisionLoyerResult } from "./RevisionLoyerResult";
import { useRevisionLoyer } from "./useRevisionLoyer";
import { NextStepBlock } from "../../lib/NextStepBlock";
import { FAQ_LOYER } from "../../lib/faq-data";
import { RevisionLoyerContent } from "./RevisionLoyerContent";
import { IRLAlertOptIn } from "./IRLAlertOptIn";

export function RevisionLoyerPage() {
  const { result, error, calculate, irlOptions } = useRevisionLoyer();

  useEffect(() => {
    track({ name: "tool_start", props: { tool: "revision-loyer" } });
  }, []);

  useEffect(() => {
    if (result) {
      track({ name: "tool_complete", props: { tool: "revision-loyer", completion_pct: 100 } });
    }
  }, [result]);

  return (
    <ToolLayout
      title="Calcul de revision de loyer (IRL)"
      description="Calculez le nouveau montant de votre loyer apres revision annuelle"
      footer={
        <TrustFooter
          baremeNom="Indice de Reference des Loyers (IRL) — INSEE"
          dateBareme="Publication trimestrielle"
          sources={[
            {
              label: "INSEE — Indice de reference des loyers",
              url: "https://www.insee.fr/fr/statistiques/serie/001515333",
            },
          ]}
          verifieLe="20 janvier 2025"
          casCouverts="les baux d'habitation soumis a la loi du 6 juillet 1989 (locations nues et meublees a titre de residence principale)"
          casNonCouverts="les baux commerciaux, les locations meublees touristiques, les HLM, les logements conventionnes avec plafonnement specifique"
        />
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <RevisionLoyerForm onSubmit={calculate} irlOptions={irlOptions} />
        </div>

        <div>
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {result && (
            <>
              <RevisionLoyerResult result={result} />
              <IRLAlertOptIn />
              <NextStepBlock currentToolSlug="revision-loyer" />
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

      <RevisionLoyerContent />
      <FAQ items={FAQ_LOYER} />
    </ToolLayout>
  );
}
