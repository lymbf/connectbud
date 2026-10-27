"use client";

import { useState, type ReactNode } from "react";

import { BeforeAfterSlider } from "@/components/pages/home/before-after/BeforeAfterSlider";
import { ButtonLink } from "@/components/UI/Button";
import { CheckIcon } from "@/components/UI/icons";
import type { BeforeAfterComparison } from "@/model/data/realizations";
import type { BeforeAfterContent } from "@/model/pages/home";
import { cn } from "@/utils/cn";

type BeforeAfterShowcaseProps = {
  comparisons: BeforeAfterComparison[];
  /** Nagłówek sekcji wyrenderowany po stronie serwera */
  header: ReactNode;
  content: BeforeAfterContent;
};

/** Zakładki z realizacjami + opis zakresu prac + suwak przed/po. */
export function BeforeAfterShowcase({ comparisons, header, content }: BeforeAfterShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasSwitched, setHasSwitched] = useState(false);
  const active = comparisons[activeIndex];

  if (!active) return null;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
      <div className="lg:col-span-5">
        {header}

        {comparisons.length > 1 ? (
          <div role="group" aria-label={content.tabsLabel} data-reveal className="mt-10 flex flex-wrap gap-2">
            {comparisons.map((comparison, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={comparison.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveIndex(index);
                    setHasSwitched(true);
                  }}
                  className={cn(
                    "h-10 rounded-[3px] border px-4 text-sm font-medium transition-colors duration-300",
                    isActive
                      ? "border-white bg-white text-dark"
                      : "border-white/20 text-white/75 hover:border-white/50 hover:text-white",
                  )}
                >
                  {comparison.label}
                </button>
              );
            })}
          </div>
        ) : null}

        <div data-reveal className="mt-8 border-t border-white/10 pt-8" aria-live="polite">
          <div key={active.id} className={hasSwitched ? "intro-fade-in" : undefined}>
            <p className="text-sm text-steel">{active.place}</p>
            <h3 className="mt-2 font-heading text-2xl leading-tight font-medium">{active.title}</h3>
            <ul className="mt-6 space-y-3">
              {active.details.map((detail) => (
                <li key={detail} className="flex gap-3 text-[0.9375rem] leading-relaxed text-white/80">
                  <CheckIcon size={18} className="mt-0.5 shrink-0 text-steel" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-reveal className="mt-10">
          <ButtonLink href={content.cta.href} variant="light">
            {content.cta.label}
          </ButtonLink>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="relative mx-auto w-full max-w-[34rem] lg:mr-4">
          {/* cienka ramka przesunięta za zdjęciem – motyw rysunku technicznego */}
          <span
            aria-hidden="true"
            data-reveal="fade"
            className="pointer-events-none absolute -right-4 -bottom-4 hidden size-full border border-white/15 lg:block"
          />
          <div data-reveal="clip-left" className="relative">
            <div key={active.id} className={hasSwitched ? "intro-fade-in" : undefined}>
              <BeforeAfterSlider
                before={active.before}
                beforeAlt={active.beforeAlt}
                after={active.after}
                afterAlt={active.afterAlt}
                labels={content.labels}
                ariaLabel={`${content.sliderLabel}: ${active.title}`}
                playHint={!hasSwitched}
              />
            </div>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-[34rem] text-xs text-steel lg:mr-4">{content.caption}</p>
      </div>
    </div>
  );
}
