import type { PdfTemplateData } from "./templates/base.js";

/**
 * Genere un PDF a partir des donnees du template.
 *
 * Phase 0 : stub qui retourne les donnees serialisees.
 * L'implementation complete avec @react-pdf/renderer sera ajoutee
 * lorsque le premier outil (RuptureCalc) sera deploye.
 */
export function generatePdfData(template: PdfTemplateData): PdfTemplateData {
  return {
    ...template,
    generatedAt: template.generatedAt || new Date().toISOString(),
  };
}

/**
 * Genere le nom de fichier normalise pour le PDF.
 * Format : [tool-name]-[date].pdf
 */
export function generatePdfFilename(toolName: string, date: Date = new Date()): string {
  const dateStr = date.toISOString().split("T")[0];
  const slug = toolName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return `${slug}-${dateStr}.pdf`;
}
