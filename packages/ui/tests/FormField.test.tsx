import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormField } from "../src/components/FormField.js";

describe("FormField", () => {
  test("affiche le label", () => {
    render(<FormField label="Salaire brut" name="salaire" />);
    expect(screen.getByLabelText("Salaire brut")).toBeInTheDocument();
  });

  test("affiche le helpText", () => {
    render(<FormField label="Salaire" name="salaire" helpText="Le montant sur votre fiche" />);
    expect(screen.getByText("Le montant sur votre fiche")).toBeInTheDocument();
  });

  test("affiche le message d'erreur", () => {
    render(<FormField label="Salaire" name="salaire" error="Ce champ est requis" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Ce champ est requis");
  });

  test("marque le champ comme invalide en cas d'erreur", () => {
    render(<FormField label="Salaire" name="salaire" error="Erreur" />);
    expect(screen.getByLabelText("Salaire")).toHaveAttribute("aria-invalid", "true");
  });

  test("affiche l'asterisque pour les champs requis", () => {
    render(<FormField label="Salaire" name="salaire" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });
});
