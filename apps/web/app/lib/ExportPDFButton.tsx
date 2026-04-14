"use client";

import { useState } from "react";
import { track } from "@ecosysteme/analytics";
import type { PdfTemplateData } from "@ecosysteme/pdf";

interface ExportPDFButtonProps {
  templateData: PdfTemplateData;
  toolSlug: string;
}

export function ExportPDFButton({ templateData, toolSlug }: ExportPDFButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function generateTextFallback(): string {
    const lines: string[] = [
      templateData.title,
      `Genere le ${templateData.generatedAt}`,
      "",
    ];
    for (const section of templateData.sections) {
      lines.push(section.heading);
      lines.push("-".repeat(40));
      for (const row of section.rows) {
        lines.push(`${row.label}: ${row.value}`);
      }
      lines.push("");
    }
    for (const source of templateData.sources) {
      lines.push(`Source: ${source.label} — ${source.url}`);
    }
    lines.push("", templateData.disclaimer);
    return lines.join("\n");
  }

  async function handleExport() {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(templateData),
      });

      if (!response.ok) throw new Error("PDF generation failed");

      const blob = await response.blob();
      if (blob.size < 100) throw new Error("PDF too small");

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${toolSlug}-${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      track({ name: "pdf_download", props: { tool: toolSlug } });
    } catch {
      // Fallback : telecharger en texte
      const text = generateTextFallback();
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${toolSlug}-${new Date().toISOString().split("T")[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setError(true);
      track({ name: "pdf_download", props: { tool: toolSlug } });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleExport}
        disabled={loading}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-card px-3 py-2 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-surface disabled:opacity-50"
      >
        {loading ? "Generation..." : "Telecharger ce calcul (PDF)"}
      </button>
      {error && (
        <p className="mt-1 text-[10px] text-muted">
          Le PDF n&apos;a pas pu etre genere. Un fichier texte a ete telecharge a la place.
        </p>
      )}
    </div>
  );
}
