"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState, type PointerEvent } from "react";

import { gsap, useGSAP } from "@/components/UI/animation/gsap";
import { SliderHandleIcon } from "@/components/UI/icons";

type BeforeAfterSliderProps = {
  before: StaticImageData;
  beforeAlt: string;
  after: StaticImageData;
  afterAlt: string;
  labels: { before: string; after: string };
  ariaLabel: string;
  /** Krótka podpowiedź ruchem suwaka przy pierwszym pojawieniu się na ekranie */
  playHint?: boolean;
};

const clamp = (value: number) => Math.min(100, Math.max(0, value));

/**
 * Porównanie dwóch zdjęć suwakiem. Obsługa: przeciąganie myszą lub palcem (przewijanie strony
 * w pionie dalej działa), kliknięcie w dowolne miejsce oraz strzałki na klawiaturze
 * (ukryty input range – dostępny też dla czytników ekranu).
 */
export function BeforeAfterSlider({
  before,
  beforeAlt,
  after,
  afterAlt,
  labels,
  ariaLabel,
  playHint = false,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const interacted = useRef(false);

  const moveTo = (clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    interacted.current = true;
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) moveTo(event.clientX);
  };

  const stopDragging = () => {
    dragging.current = false;
  };

  useGSAP(
    () => {
      const frame = frameRef.current;
      if (!playHint || !frame) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const hint = { value: 50 };
        gsap
          .timeline({
            delay: 0.4,
            scrollTrigger: { trigger: frame, start: "top 70%", once: true },
            onUpdate: () => {
              if (!interacted.current) setPosition(hint.value);
            },
          })
          .to(hint, { value: 30, duration: 0.9, ease: "power2.inOut" })
          .to(hint, { value: 68, duration: 1.2, ease: "power2.inOut" })
          .to(hint, { value: 50, duration: 0.8, ease: "power2.out" });
      });

      return () => mm.revert();
    },
    { scope: frameRef, dependencies: [playHint] },
  );

  const rounded = Math.round(position);

  return (
    <div
      ref={frameRef}
      className="group/slider relative aspect-[4/5] w-full cursor-ew-resize touch-pan-y overflow-hidden bg-white/5 select-none has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-4 has-[input:focus-visible]:outline-white"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      <Image
        src={after}
        alt={afterAlt}
        fill
        sizes="(min-width: 1024px) 34rem, 100vw"
        placeholder="blur"
        draggable={false}
        className="pointer-events-none object-cover"
      />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image
          src={before}
          alt={beforeAlt}
          fill
          sizes="(min-width: 1024px) 34rem, 100vw"
          placeholder="blur"
          draggable={false}
          className="pointer-events-none object-cover"
        />
      </div>

      <span className="pointer-events-none absolute top-4 left-4 rounded-[2px] bg-dark/75 px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-sm">
        {labels.before}
      </span>
      <span className="pointer-events-none absolute top-4 right-4 rounded-[2px] bg-accent px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.14em] text-white uppercase">
        {labels.after}
      </span>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={rounded}
        onChange={(event) => {
          interacted.current = true;
          setPosition(Number(event.target.value));
        }}
        aria-label={ariaLabel}
        aria-valuetext={`${labels.before} ${rounded}%, ${labels.after} ${100 - rounded}%`}
        className="sr-only"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }}>
        <span className="absolute inset-y-0 -left-px w-0.5 bg-white/90" />
        <span className="absolute top-1/2 left-0 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-accent shadow-[0_12px_32px_-10px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out group-active/slider:scale-110">
          <SliderHandleIcon size={22} strokeWidth={2} />
        </span>
      </div>
    </div>
  );
}
