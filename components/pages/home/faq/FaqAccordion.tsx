"use client";

import { useId, useState } from "react";

import type { FaqContent } from "@/model/pages/home";
import { cn } from "@/utils/cn";
import { nbsp } from "@/utils/nbsp";

type FaqAccordionProps = {
  items: FaqContent["items"];
};

/** Lista pytań – kliknięcie rozwija odpowiedź (jedna otwarta naraz). */
export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="border-t border-dark/15">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;

        return (
          <div key={item.question} data-reveal className="border-b border-dark/15">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left font-heading text-lg leading-snug font-medium transition-colors duration-300 hover:text-accent sm:text-xl"
              >
                <span>{nbsp(item.question)}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                    isOpen ? "border-accent bg-accent text-white" : "border-dark/20 text-dark group-hover:border-accent group-hover:text-accent",
                  )}
                >
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span
                    className={cn(
                      "absolute h-3.5 w-px bg-current transition-transform duration-300 ease-out",
                      isOpen && "scale-y-0",
                    )}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pr-12 pb-7 text-[0.9375rem] leading-relaxed text-pretty text-dark/70">
                  {nbsp(item.answer)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
