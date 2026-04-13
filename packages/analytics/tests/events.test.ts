import { describe, test, expect, vi } from "vitest";
import { track } from "../src/tracker.js";
import type { AnalyticsEvent } from "../src/events.js";

describe("track", () => {
  test("ne leve pas d'erreur pour un evenement tool_start", () => {
    const event: AnalyticsEvent = { name: "tool_start", props: { tool: "rupture-calc" } };
    expect(() => track(event)).not.toThrow();
  });

  test("ne leve pas d'erreur pour un evenement tool_complete", () => {
    const event: AnalyticsEvent = {
      name: "tool_complete",
      props: { tool: "rupture-calc", completion_pct: 100 },
    };
    expect(() => track(event)).not.toThrow();
  });

  test("ne leve pas d'erreur pour un evenement signal_not_covered avec message optionnel", () => {
    const event: AnalyticsEvent = {
      name: "signal_not_covered",
      props: { tool: "rupture-calc", message: "CDD non couvert" },
    };
    expect(() => track(event)).not.toThrow();
  });

  test("ne leve pas d'erreur pour un evenement signal_not_covered sans message", () => {
    const event: AnalyticsEvent = {
      name: "signal_not_covered",
      props: { tool: "rupture-calc" },
    };
    expect(() => track(event)).not.toThrow();
  });
});
