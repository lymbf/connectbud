import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export type SectionTone = "light" | "white" | "dark" | "accent";

type SectionProps = {
  id?: string;
  /** id nagłówka sekcji – dla czytników ekranu */
  labelledBy?: string;
  tone?: SectionTone;
  className?: string;
  children: ReactNode;
};

const tones: Record<SectionTone, string> = {
  light: "bg-light text-dark",
  white: "bg-white text-dark",
  dark: "bg-dark text-white focus-light",
  accent: "bg-accent text-white focus-light",
};

/** Sekcja strony ze wspólnym rytmem odstępów i kolorem tła. */
export function Section({ id, labelledBy, tone = "light", className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-20 md:py-28", tones[tone], className)}>
      {children}
    </section>
  );
}
