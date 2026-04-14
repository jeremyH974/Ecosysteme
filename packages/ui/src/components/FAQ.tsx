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
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      <div className="mt-4 divide-y divide-gray-200 border-t border-gray-200">
        {items.map((item, i) => (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between py-4 text-left"
              aria-expanded={openIndex === i}
            >
              <span className="text-sm font-medium text-gray-900">{item.question}</span>
              <span className="ml-4 text-gray-400">{openIndex === i ? "−" : "+"}</span>
            </button>
            {openIndex === i && (
              <div className="pb-4 pr-8">
                <p className="text-sm leading-relaxed text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
