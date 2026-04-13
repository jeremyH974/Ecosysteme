import type { PdfTemplateData } from "./templates/base.js";

/**
 * Genere un buffer PDF a partir des donnees du template.
 * Utilise @react-pdf/renderer pour le rendu.
 */
export async function generatePdf(template: PdfTemplateData): Promise<Buffer> {
  // Dynamic import pour eviter les problemes de types au build
  const { Document, Page, Text, View, StyleSheet, renderToBuffer } = await import(
    "@react-pdf/renderer"
  );
  const React = await import("react");

  const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: "Helvetica", fontSize: 10, color: "#1a1a1a" },
    title: { fontSize: 18, fontFamily: "Helvetica-Bold", marginBottom: 4 },
    subtitle: { fontSize: 10, color: "#666", marginBottom: 20 },
    sectionHeading: {
      fontSize: 12,
      fontFamily: "Helvetica-Bold",
      marginBottom: 8,
      marginTop: 12,
      color: "#0F6E56",
    },
    row: {
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
      paddingVertical: 3,
      borderBottomWidth: 0.5,
      borderBottomColor: "#e5e5e5",
    },
    label: { fontSize: 10, color: "#555" },
    value: { fontSize: 10, fontFamily: "Helvetica-Bold" },
    sourceText: { fontSize: 8, color: "#888", marginTop: 16, marginBottom: 2 },
    disclaimer: { fontSize: 8, color: "#888", fontStyle: "italic" as const, marginTop: 8 },
  });

  const doc = React.createElement(
    Document,
    {},
    React.createElement(
      Page,
      { size: "A4" as const, style: styles.page },
      React.createElement(Text, { style: styles.title }, template.title),
      React.createElement(Text, { style: styles.subtitle }, `Genere le ${template.generatedAt}`),
      ...template.sections.flatMap((section, si) => [
        React.createElement(Text, { key: `h${si}`, style: styles.sectionHeading }, section.heading),
        ...section.rows.map((row, ri) =>
          React.createElement(
            View,
            { key: `r${si}-${ri}`, style: styles.row },
            React.createElement(Text, { style: styles.label }, row.label),
            React.createElement(Text, { style: styles.value }, row.value),
          ),
        ),
      ]),
      ...template.sources.map((source, i) =>
        React.createElement(
          Text,
          { key: `s${i}`, style: styles.sourceText },
          `Source : ${source.label} — ${source.url}`,
        ),
      ),
      React.createElement(Text, { style: styles.disclaimer }, template.disclaimer),
    ),
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return renderToBuffer(doc as any);
}

/**
 * Genere les donnees du template (pour usage sans rendu PDF).
 */
export function generatePdfData(template: PdfTemplateData): PdfTemplateData {
  return {
    ...template,
    generatedAt: template.generatedAt || new Date().toISOString(),
  };
}

/**
 * Genere le nom de fichier normalise pour le PDF.
 */
export function generatePdfFilename(toolName: string, date: Date = new Date()): string {
  const dateStr = date.toISOString().split("T")[0];
  const slug = toolName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return `${slug}-${dateStr}.pdf`;
}
