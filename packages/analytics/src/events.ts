export type AnalyticsEvent =
  | { name: "tool_start"; props: { tool: string } }
  | { name: "tool_complete"; props: { tool: string; completion_pct: number } }
  | { name: "pdf_download"; props: { tool: string } }
  | { name: "email_capture"; props: { tool: string; source: string } }
  | { name: "cross_promo_click"; props: { from: string; to: string } }
  | { name: "trust_footer_click"; props: { tool: string; source: string } }
  | { name: "detail_expanded"; props: { tool: string } }
  | { name: "signal_not_covered"; props: { tool: string; message?: string } }
  | { name: "situation_click"; props: { situation: string } }
  | { name: "next_step_click"; props: { from: string; to: string } }
  | { name: "outils_filter"; props: { situation: string } };
