import { describe, test, expect } from "vitest";
import { generatePdfFilename, generatePdfData } from "../src/generator.js";
import type { PdfTemplateData } from "../src/templates/base.js";

describe("generatePdfFilename", () => {
  test("genere un nom de fichier avec slug et date", () => {
    const result = generatePdfFilename("Rupture Conventionnelle", new Date("2024-06-15"));
    expect(result).toBe("rupture-conventionnelle-2024-06-15.pdf");
  });

  test("retire les caracteres speciaux", () => {
    const result = generatePdfFilename("Calcul IR (2024)", new Date("2024-01-01"));
    expect(result).toBe("calcul-ir-2024-2024-01-01.pdf");
  });
});

describe("generatePdfData", () => {
  test("retourne les donnees du template", () => {
    const template: PdfTemplateData = {
      title: "Test",
      toolName: "test",
      generatedAt: "2024-01-01T00:00:00Z",
      sections: [{ heading: "Resultat", rows: [{ label: "Total", value: "500 EUR" }] }],
      sources: [{ label: "Source", url: "https://example.com" }],
      disclaimer: "A titre indicatif",
    };

    const result = generatePdfData(template);
    expect(result.title).toBe("Test");
    expect(result.sections).toHaveLength(1);
    expect(result.generatedAt).toBe("2024-01-01T00:00:00Z");
  });
});
