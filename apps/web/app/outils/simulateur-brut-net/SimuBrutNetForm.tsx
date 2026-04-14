"use client";

import { type FormEvent, useState } from "react";
import { FormField } from "@ecosysteme/ui";
import type { BrutNetFormData } from "./useSimuBrutNet";

interface SimuBrutNetFormProps {
  onSubmit: (data: BrutNetFormData) => void;
}

export function SimuBrutNetForm({ onSubmit }: SimuBrutNetFormProps) {
  const [salaireBrut, setSalaireBrut] = useState("");
  const [statut, setStatut] = useState<"non_cadre" | "cadre">("non_cadre");
  const [tempsPartiel, setTempsPartiel] = useState("1");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    const salaire = parseFloat(salaireBrut);

    if (!salaireBrut || isNaN(salaire) || salaire <= 0) {
      newErrors.salaireBrut = "Saisissez un salaire brut mensuel valide";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({
      salaireBrut,
      statut,
      tempsPartiel: parseFloat(tempsPartiel),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Salaire brut mensuel"
        name="salaireBrut"
        type="number"
        inputMode="decimal"
        placeholder="ex: 2 800"
        helpText="Le montant brut inscrit sur votre bulletin de paie"
        value={salaireBrut}
        onChange={(e) => setSalaireBrut(e.target.value)}
        error={errors.salaireBrut}
        required
        min={0}
        step="any"
      />

      <div className="space-y-1.5">
        <span className="block text-sm font-medium text-gray-900">Statut</span>
        <p className="text-sm text-gray-500">
          Indique sur votre contrat de travail ou bulletin de paie
        </p>
        <div className="mt-1.5 flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="statut"
              value="non_cadre"
              checked={statut === "non_cadre"}
              onChange={() => setStatut("non_cadre")}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700">Non-cadre</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="statut"
              value="cadre"
              checked={statut === "cadre"}
              onChange={() => setStatut("cadre")}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700">Cadre</span>
          </label>
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="tempsPartiel" className="block text-sm font-medium text-gray-900">
          Temps de travail <span className="text-xs text-gray-400">(optionnel)</span>
        </label>
        <select
          id="tempsPartiel"
          value={tempsPartiel}
          onChange={(e) => setTempsPartiel(e.target.value)}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
        >
          <option value="1">Temps plein (100%)</option>
          <option value="0.8">80%</option>
          <option value="0.5">50% (mi-temps)</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Calculer mon salaire net
      </button>
    </form>
  );
}
