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
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{label}</p>

      <p className="mt-2 flex items-baseline gap-2">
        <span className="text-4xl font-bold tracking-tight text-gray-900">{value}</span>
        {unit && <span className="text-lg text-gray-500">{unit}</span>}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-gray-700">{interpretation}</p>

      {detail && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setDetailOpen((prev) => !prev)}
            className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
            aria-expanded={detailOpen}
          >
            {detailOpen ? "Masquer le detail du calcul" : "Voir le detail du calcul"}
          </button>

          {detailOpen && <div className="mt-3 rounded-md bg-gray-50 p-4 text-sm">{detail}</div>}
        </div>
      )}
    </div>
  );
}
