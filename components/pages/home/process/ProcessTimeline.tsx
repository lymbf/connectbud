"use client";

import { useRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/components/UI/animation/gsap";
import type { ProcessContent } from "@/model/pages/home";
import { nbsp } from "@/utils/nbsp";

type ProcessTimelineProps = {
  steps: ProcessContent["steps"];
};

/**
 * Kroki współpracy na osi. Linia „rysuje się” razem z przewijaniem, a numer kroku
 * wypełnia się kolorem marki, gdy linia do niego dojdzie.
 */
export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const list = ref.current;
      if (!list) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-step]", list);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrub = { trigger: list, start: "top 75%", end: "bottom 60%", scrub: 0.6 };
        gsap.fromTo('[data-progress="x"]', { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: scrub });
        gsap.fromTo('[data-progress="y"]', { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { ...scrub } });

        items.forEach((item) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top 72%",
            once: true,
            onEnter: () => item.classList.add("is-active"),
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        items.forEach((item) => item.classList.add("is-active"));
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="relative mt-14 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-4 lg:gap-8">
      {/* linia pozioma (desktop) */}
      <span aria-hidden="true" className="absolute top-6 right-0 left-0 hidden h-px bg-dark/10 lg:block">
        <span data-progress="x" className="absolute inset-0 origin-left bg-accent" />
      </span>
      {/* linia pionowa (telefon) */}
      <span aria-hidden="true" className="absolute top-0 bottom-0 left-6 w-px bg-dark/10 md:hidden">
        <span data-progress="y" className="absolute inset-0 origin-top bg-accent" />
      </span>

      {steps.map((step, index) => (
        <li key={step.title} data-step data-reveal className="process-step relative pl-20 md:pl-0">
          <span className="process-step-number absolute top-0 left-0 z-10 flex size-12 items-center justify-center border font-heading text-sm font-semibold tabular-nums md:relative">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="pt-2.5 font-heading text-xl font-medium md:mt-7 md:pt-0">{nbsp(step.title)}</h3>
          <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-pretty text-dark/70">{nbsp(step.text)}</p>
        </li>
      ))}
    </ol>
  );
}
