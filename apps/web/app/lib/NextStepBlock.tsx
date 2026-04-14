"use client";

import Link from "next/link";
import { track } from "@ecosysteme/analytics";
import { NEXT_STEPS } from "./next-steps";

interface NextStepBlockProps {
  currentToolSlug: string;
}

export function NextStepBlock({ currentToolSlug }: NextStepBlockProps) {
  const steps = NEXT_STEPS[currentToolSlug];
  if (!steps || steps.length === 0) return null;

  const displayed = steps.slice(0, 2);

  return (
    <div className="mt-8">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        Etape suivante
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {displayed.map((step) => (
          <Link
            key={step.url}
            href={step.url}
            onClick={() =>
              track({
                name: "next_step_click",
                props: { from: currentToolSlug, to: step.url },
              })
            }
            className="group rounded-xl border border-border bg-surface-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
          >
            <p className="text-sm font-semibold text-foreground group-hover:text-primary">
              {step.titre}
            </p>
            <p className="mt-1 text-xs text-muted">{step.description}</p>
            <p className="mt-2 text-xs text-muted-light italic">
              {step.pourquoi}
            </p>
            <p className="mt-3 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Calculer &rarr;
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
