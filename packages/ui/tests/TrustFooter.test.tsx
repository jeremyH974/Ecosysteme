import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TrustFooter } from "../src/components/TrustFooter.js";

describe("TrustFooter", () => {
  const defaultProps = {
    baremeNom: "Indemnite rupture conventionnelle",
    dateBareme: "23 septembre 2017",
    sources: [
      {
        label: "Code du travail — Art. L1237-19-1",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036761986",
      },
    ],
    verifieLe: "15 janvier 2024",
    casCouverts: "les CDI a temps plein avec anciennete >= 8 mois",
    casNonCouverts: "les CDD, les temps partiels, les cadres dirigeants",
  };

  test("affiche le nom du bareme", () => {
    render(<TrustFooter {...defaultProps} />);
    expect(screen.getByText(/Indemnite rupture conventionnelle/)).toBeInTheDocument();
  });

  test("affiche le lien vers la source", () => {
    render(<TrustFooter {...defaultProps} />);
    const link = screen.getByRole("link", { name: "Voir la source" });
    expect(link).toHaveAttribute(
      "href",
      "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036761986",
    );
    expect(link).toHaveAttribute("target", "_blank");
  });

  test("affiche la date de verification", () => {
    render(<TrustFooter {...defaultProps} />);
    expect(screen.getByText(/15 janvier 2024/)).toBeInTheDocument();
  });

  test("affiche les cas couverts et non couverts", () => {
    render(<TrustFooter {...defaultProps} />);
    expect(screen.getByText(/CDI a temps plein/)).toBeInTheDocument();
    expect(screen.getByText(/CDD, les temps partiels/)).toBeInTheDocument();
  });

  test("affiche le disclaimer", () => {
    render(<TrustFooter {...defaultProps} />);
    expect(screen.getByText(/titre indicatif/)).toBeInTheDocument();
  });
});
