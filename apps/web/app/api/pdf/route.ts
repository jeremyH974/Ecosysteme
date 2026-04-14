import { NextResponse } from "next/server";
import { generatePdf, generatePdfFilename } from "@ecosysteme/pdf";
import type { PdfTemplateData } from "@ecosysteme/pdf";

export const maxDuration = 30; // Vercel serverless timeout

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PdfTemplateData;

    if (!body.title || !body.toolName || !body.sections) {
      return NextResponse.json({ error: "Donnees invalides" }, { status: 400 });
    }

    const template: PdfTemplateData = {
      ...body,
      generatedAt: body.generatedAt || new Date().toLocaleDateString("fr-FR"),
    };

    const buffer = await generatePdf(template);
    const filename = generatePdfFilename(body.toolName);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[PDF] Generation error:", err);
    return NextResponse.json(
      { error: "Erreur lors de la generation du PDF" },
      { status: 500 },
    );
  }
}
