"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/components/UI/animation/gsap";

type StatCounterProps = {
  value: number;
  suffix?: string;
};

/** Liczba, która „odlicza” od zera, gdy pojawi się na ekranie. Bez JS i przy ograniczeniu ruchu – od razu wartość końcowa. */
export function StatCounter({ value, suffix = "" }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const finalText = `${value}${suffix}`;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = { current: 0 };
        const render = () => {
          el.textContent = `${Math.round(counter.current)}${suffix}`;
        };
        render();

        gsap.to(counter, {
          current: value,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: render,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });

        return () => {
          el.textContent = finalText;
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <>
      <span className="sr-only">{finalText}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {finalText}
      </span>
    </>
  );
}
