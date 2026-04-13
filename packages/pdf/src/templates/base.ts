export interface PdfSection {
  heading: string;
  rows: Array<{ label: string; value: string }>;
}

export interface PdfSource {
  label: string;
  url: string;
}

export interface PdfTemplateData {
  title: string;
  toolName: string;
  generatedAt: string;
  sections: PdfSection[];
  sources: PdfSource[];
  disclaimer: string;
}
