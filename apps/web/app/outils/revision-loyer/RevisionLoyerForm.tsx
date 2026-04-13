"use client";

import { type FormEvent, useState } from "react";
import { FormField } from "@ecosysteme/ui";
import type { RevisionLoyerFormData, IRLOption } from "./useRevisionLoyer";

interface RevisionLoyerFormProps {
  onSubmit: (data: RevisionLoyerFormData) => void;
  irlOptions: IRLOption[];
}

export function RevisionLoyerForm({ onSubmit, irlOptions }: RevisionLoyerFormProps) {
  const [loyerActuel, setLoyerActuel] = useState("");
  const [irlAncien, setIrlAncien] = useState("");
  const [irlNouveau, setIrlNouveau] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    const loyer = parseFloat(loyerActuel);

    if (!loyerActuel || isNaN(loyer) || loyer <= 0) {
      newErrors.loyerActuel = "Saisissez votre loyer hors charges";
    }
    if (!irlAncien) {
      newErrors.irlAncien = "Selectionnez l'IRL de reference de votre bail";
    }
    if (!irlNouveau) {
      newErrors.irlNouveau = "Selectionnez le nouvel IRL";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({ loyerActuel, irlAncien, irlNouveau });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Loyer actuel hors charges"
        name="loyerActuel"
        type="number"
        inputMode="decimal"
        placeholder="ex: 800"
        helpText="Le montant du loyer mensuel hors charges, tel qu'inscrit sur votre bail"
        value={loyerActuel}
        onChange={(e) => setLoyerActuel(e.target.value)}
        error={errors.loyerActuel}
        required
        min={0}
        step="any"
      />

      <div className="space-y-1.5">
        <label htmlFor="irlAncien" className="block text-sm font-medium text-gray-900">
          IRL de reference (ancien) <span className="ml-0.5 text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-500">
          Le trimestre IRL mentionne dans votre bail ou utilise lors de la derniere revision
        </p>
        <select
          id="irlAncien"
          value={irlAncien}
          onChange={(e) => setIrlAncien(e.target.value)}
          className={[
            "block w-full rounded-md border px-3 py-2 text-sm shadow-sm",
            "focus:outline-none focus:ring-2 focus:ring-offset-1",
            errors.irlAncien
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500",
          ].join(" ")}
        >
          <option value="">Selectionnez un trimestre</option>
          {irlOptions.map((opt) => (
            <option key={`ancien-${String(opt.value)}`} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.irlAncien && (
          <p role="alert" className="text-sm text-red-600">
            {errors.irlAncien}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="irlNouveau" className="block text-sm font-medium text-gray-900">
          IRL actuel (nouveau) <span className="ml-0.5 text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-500">
          Le trimestre IRL le plus recent correspondant (meme trimestre, annee suivante)
        </p>
        <select
          id="irlNouveau"
          value={irlNouveau}
          onChange={(e) => setIrlNouveau(e.target.value)}
          className={[
            "block w-full rounded-md border px-3 py-2 text-sm shadow-sm",
            "focus:outline-none focus:ring-2 focus:ring-offset-1",
            errors.irlNouveau
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500",
          ].join(" ")}
        >
          <option value="">Selectionnez un trimestre</option>
          {irlOptions.map((opt) => (
            <option key={`nouveau-${String(opt.value)}`} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.irlNouveau && (
          <p role="alert" className="text-sm text-red-600">
            {errors.irlNouveau}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Calculer le nouveau loyer
      </button>
    </form>
  );
}
