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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Resultat principal */}
      <div className="border-b border-gray-100 bg-gradient-to-br from-emerald-50/50 to-white p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-emerald-700">{label}</p>

        <p className="mt-3 flex items-baseline gap-2">
          <span className="text-4xl font-extrabold tracking-tight text-gray-900">{value}</span>
          {unit && <span className="text-base font-medium text-gray-400">{unit}</span>}
        </p>
      </div>

      {/* Interpretation */}
      <div className="p-6">
        <p className="text-sm leading-relaxed text-gray-600">{interpretation}</p>

        {detail && (
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setDetailOpen((prev) => !prev)}
              className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
              aria-expanded={detailOpen}
            >
              <span className="inline-block transition-transform duration-200" style={{ transform: detailOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
                &#9654;
              </span>
              {detailOpen ? "Masquer le detail" : "Voir le detail du calcul"}
            </button>

            {detailOpen && (
              <div className="mt-4 rounded-lg border border-gray-100 bg-stone-50 p-5 text-sm animate-in fade-in duration-200">
                {detail}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
