"use client";

import { CrossPromo } from "@ecosysteme/ui";
import { track } from "@ecosysteme/analytics";
import { getRecommendations } from "./recommendations";

interface ToolRecommendationsProps {
  currentToolSlug: string;
}

export function ToolRecommendations({ currentToolSlug }: ToolRecommendationsProps) {
  const recommendations = getRecommendations(currentToolSlug);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-8 space-y-3">
      {recommendations.map((rec) => (
        <div
          key={rec.toolUrl}
          onClick={() =>
            track({
              name: "cross_promo_click",
              props: { from: currentToolSlug, to: rec.toolUrl },
            })
          }
        >
          <CrossPromo
            toolName={rec.toolName}
            toolUrl={rec.toolUrl}
            description={rec.description}
          />
        </div>
      ))}
    </div>
  );
}
