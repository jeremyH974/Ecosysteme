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

  // 1 seule suggestion — jamais 2, jamais 3
  const step = steps[0]!;

  return (
    <div className="mt-8">
      <p className="mb-2 text-xs text-muted">Prochaine etape naturelle</p>
      <Link
        href={step.url}
        onClick={() => track({ name: "next_step_click", props: { from: currentToolSlug, to: step.url } })}
        className="group flex items-start gap-3 rounded-xl border border-border bg-surface-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
      >
        <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-primary" />
        <div>
          <p className="text-sm font-semibold text-foreground group-hover:text-primary">{step.titre}</p>
          <p className="mt-0.5 text-xs text-muted">{step.pourquoi}</p>
        </div>
      </Link>
    </div>
  );
}
