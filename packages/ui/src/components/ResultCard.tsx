"use client";

import { type ReactNode, useState } from "react";

export interface ResultCardProps {
  label: string;
  value: string;
  unit?: string;
  interpretation: string;
  detail?: ReactNode;
}

export function ResultCard({ label, value, unit, interpretation, detail }: ResultCardProps) {
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface-card shadow-sm">
      {/* Resultat principal */}
      <div className="border-b border-border/60 bg-primary-light px-5 py-5 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">{label}</p>
        <p className="mt-2.5 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{value}</span>
          {unit && <span className="text-sm font-medium text-muted">{unit}</span>}
        </p>
      </div>

      {/* Interpretation */}
      <div className="px-5 py-4 sm:px-6">
        <p className="text-[13px] leading-relaxed text-muted">{interpretation}</p>

        {detail && (
          <div className="mt-4 border-t border-border/60 pt-4">
            <button
              type="button"
              onClick={() => setDetailOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary transition-colors hover:text-primary-hover"
              aria-expanded={detailOpen}
            >
              <svg
                className="h-3 w-3 transition-transform duration-200"
                style={{ transform: detailOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
              {detailOpen ? "Masquer le detail" : "Detail du calcul"}
            </button>

            {detailOpen && (
              <div className="mt-3 rounded-lg bg-surface p-4 text-sm">
                {detail}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
