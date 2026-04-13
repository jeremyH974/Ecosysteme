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

  async function handleExport() {
    setLoading(true);
    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(templateData),
      });

      if (!response.ok) throw new Error("PDF generation failed");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        `${toolSlug}-${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      track({ name: "pdf_download", props: { tool: toolSlug } });
    } catch {
      // Silent fail — the user sees the button return to normal
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={loading}
      className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50"
    >
      {loading ? "Generation..." : "Telecharger ce recapitulatif (PDF)"}
    </button>
  );
}
