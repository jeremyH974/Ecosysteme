"use client";

import { type FormEvent, useState } from "react";
import { FormField } from "@ecosysteme/ui";
import type { SASUFormData } from "./useSASUOptim";

interface SASUOptimFormProps {
  onSubmit: (data: SASUFormData) => void;
}

export function SASUOptimForm({ onSubmit }: SASUOptimFormProps) {
  const [benefice, setBenefice] = useState("");
  const [nbParts, setNbParts] = useState("1");
  const [autresRevenus, setAutresRevenus] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    const b = parseFloat(benefice);

    if (!benefice || isNaN(b) || b <= 0) {
      newErrors.benefice = "Saisissez le benefice avant remuneration de votre SASU";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({ benefice, nbParts, autresRevenus });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Benefice avant remuneration"
        name="benefice"
        type="number"
        inputMode="decimal"
        placeholder="ex: 80 000"
        helpText="Le resultat de votre SASU avant votre remuneration de president"
        value={benefice}
        onChange={(e) => setBenefice(e.target.value)}
        error={errors.benefice}
        required
        min={0}
        step="any"
      />

      <div className="space-y-1.5">
        <label htmlFor="nbParts" className="block text-sm font-medium text-gray-900">
          Situation familiale
        </label>
        <p className="text-sm text-gray-500">Determine votre nombre de parts fiscales</p>
        <select
          id="nbParts"
          value={nbParts}
          onChange={(e) => setNbParts(e.target.value)}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
        >
          <option value="1">Celibataire (1 part)</option>
          <option value="1.5">Celibataire + 1 enfant (1.5 parts)</option>
          <option value="2">Couple (2 parts)</option>
          <option value="2.5">Couple + 1 enfant (2.5 parts)</option>
          <option value="3">Couple + 2 enfants (3 parts)</option>
          <option value="3.5">Couple + 3 enfants (3.5 parts)</option>
        </select>
      </div>

      <FormField
        label="Autres revenus du foyer"
        name="autresRevenus"
        type="number"
        inputMode="decimal"
        placeholder="ex: 25 000"
        helpText="Revenus annuels nets imposables du foyer hors SASU (optionnel)"
        value={autresRevenus}
        onChange={(e) => setAutresRevenus(e.target.value)}
        min={0}
        step="any"
      />

      <button
        type="submit"
        className="w-full rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Optimiser ma remuneration
      </button>
    </form>
  );
}
