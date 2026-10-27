"use client";

import { useRef, type ReactNode } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/components/UI/animation/gsap";

/**
 * Typy animacji odkrywania – wpisuje się je w atrybucie elementu wewnątrz <Reveal>:
 *   data-reveal            – wjazd od dołu z zanikaniem (domyślny)
 *   data-reveal="fade"     – samo pojawienie się
 *   data-reveal="line"     – „rysowanie” poziomej kreski od lewej
 *   data-reveal="clip-left" / "clip-right" – odsłanianie zdjęcia od lewej / od prawej krawędzi
 */
type RevealType = "up" | "fade" | "line" | "clip-left" | "clip-right";

const FROM: Record<RevealType, gsap.TweenVars> = {
  up: { autoAlpha: 0, y: 28 },
  fade: { autoAlpha: 0 },
  line: { scaleX: 0, transformOrigin: "left center" },
  "clip-left": { clipPath: "inset(0% 100% 0% 0%)" },
  "clip-right": { clipPath: "inset(0% 0% 0% 100%)" },
};

const TO: Record<RevealType, gsap.TweenVars> = {
  up: { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", clearProps: "opacity,visibility,transform" },
  fade: { autoAlpha: 1, duration: 0.8, ease: "power2.out", clearProps: "opacity,visibility" },
  line: { scaleX: 1, duration: 1.1, ease: "expo.out", clearProps: "transform" },
  "clip-left": { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", clearProps: "clipPath" },
  "clip-right": { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", clearProps: "clipPath" },
};

function revealType(el: HTMLElement): RevealType {
  const value = el.dataset.reveal;
  return value && value in FROM ? (value as RevealType) : "up";
}

type RevealProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Opakowanie sekcji: elementy z atrybutem data-reveal pojawiają się, gdy wjadą w ekran
 * (te, które wchodzą razem, z lekkim przesunięciem w czasie). Przy włączonym w systemie
 * „ograniczeniu ruchu” animacje są pomijane, a treść jest widoczna od razu.
 * Nie zagnieżdżaj <Reveal> w innym <Reveal>.
 */
export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
        if (items.length === 0) return;

        items.forEach((el) => gsap.set(el, FROM[revealType(el)]));

        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            (batch as HTMLElement[]).forEach((el, index) => {
              gsap.to(el, { ...TO[revealType(el)], delay: index * 0.08, overwrite: true });
            });
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
