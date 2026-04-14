"use client";

import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export function FAQ({ items, title = "Questions frequentes" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-12">
      <h2 className="text-base font-bold text-foreground">{title}</h2>
      <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-surface-card overflow-hidden">
        {items.map((item, i) => (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-surface"
              aria-expanded={openIndex === i}
            >
              <span className="text-sm font-medium text-foreground pr-4">{item.question}</span>
              <svg
                className="h-4 w-4 shrink-0 text-muted transition-transform duration-200"
                style={{ transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="border-t border-border/50 bg-surface px-5 py-4">
                <p className="text-sm leading-relaxed text-muted">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
