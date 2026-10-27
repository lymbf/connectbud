"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/components/UI/animation/gsap";

type HeroParallaxProps = {
  children: ReactNode;
  className?: string;
};

/** Delikatne przesunięcie zdjęcia tła, gdy hero znika z ekranu (efekt głębi). */
export function HeroParallax({ children, className }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(el, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
