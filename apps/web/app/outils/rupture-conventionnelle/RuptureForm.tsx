"use client";

import { type FormEvent, useState } from "react";
import { FormField } from "@ecosysteme/ui";
import type { RuptureFormData } from "./useRuptureCalc";

interface RuptureFormProps {
  onSubmit: (data: RuptureFormData) => void;
}

export function RuptureForm({ onSubmit }: RuptureFormProps) {
  const [salaireBrut, setSalaireBrut] = useState("");
  const [ancienneteAnnees, setAncienneteAnnees] = useState("");
  const [ancienneteMois, setAncienneteMois] = useState("0");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    const salaire = parseFloat(salaireBrut);

    if (!salaireBrut || isNaN(salaire) || salaire <= 0) {
      newErrors.salaireBrut = "Saisissez un salaire brut valide";
    } else if (salaire < 1000) {
      newErrors.salaireBrut = "Le salaire semble trop bas. Verifiez le montant brut mensuel.";
    } else if (salaire > 30000) {
      newErrors.salaireBrut = "Le salaire semble tres eleve. Verifiez le montant brut mensuel.";
    }

    if (
      !ancienneteAnnees &&
      ancienneteMois === "0"
    ) {
      newErrors.ancienneteAnnees = "Saisissez votre anciennete";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({ salaireBrut, ancienneteAnnees, ancienneteMois });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Votre salaire brut mensuel"
        name="salaireBrut"
        type="number"
        inputMode="decimal"
        placeholder="ex: 2 800"
        helpText="Le montant ecrit sur votre bulletin de paie, avant impots"
        value={salaireBrut}
        onChange={(e) => setSalaireBrut(e.target.value)}
        error={errors.salaireBrut}
        required
        min={0}
        step="any"
      />

      <div>
        <label className="block text-sm font-medium text-foreground">
          Anciennete dans l&apos;entreprise <span className="ml-0.5 text-danger">*</span>
        </label>
        <p className="text-sm text-muted">
          Depuis votre date d&apos;entree dans l&apos;entreprise (CDI)
        </p>

        <div className="mt-1.5 flex gap-3">
          <div className="flex-1">
            <input
              type="number"
              inputMode="numeric"
              placeholder="Annees"
              value={ancienneteAnnees}
              onChange={(e) => setAncienneteAnnees(e.target.value)}
              min={0}
              max={50}
              className={[
                "block w-full rounded-md border px-3 py-2 text-sm shadow-sm",
                "placeholder:text-muted-light",
                "focus:outline-none focus:ring-2 focus:ring-offset-1",
                errors.ancienneteAnnees
                  ? "border-danger focus:border-danger focus:ring-danger"
                  : "border-border focus:border-primary focus:ring-primary",
              ].join(" ")}
              aria-label="Annees d'anciennete"
            />
            <span className="mt-0.5 block text-xs text-muted-light">annees</span>
          </div>

          <div className="flex-1">
            <select
              value={ancienneteMois}
              onChange={(e) => setAncienneteMois(e.target.value)}
              className="block w-full rounded-md border border-border px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              aria-label="Mois d'anciennete"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <span className="mt-0.5 block text-xs text-muted-light">mois</span>
          </div>
        </div>

        {errors.ancienneteAnnees && (
          <p role="alert" className="mt-1 text-sm text-danger">
            {errors.ancienneteAnnees}
          </p>
        )}

        <p className="mt-1.5 text-xs text-muted-light">
          Comptez depuis votre date d&apos;embauche officielle (sur votre contrat)
        </p>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Calculer mon indemnite
      </button>
    </form>
  );
}
