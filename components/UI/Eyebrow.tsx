import type { ReactNode } from "react";

import type { SectionTone } from "@/components/UI/Section";
import { cn } from "@/utils/cn";

type EyebrowProps = {
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
};

const tones: Record<SectionTone, string> = {
  light: "text-accent",
  white: "text-accent",
  dark: "text-steel",
  accent: "text-white/80",
};

/** Etykieta nad nagłówkiem sekcji: cienka kreska + wersaliki. Kreska „rysuje się” przy przewijaniu. */
export function Eyebrow({ children, tone = "light", className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]",
        tones[tone],
        className,
      )}
    >
      <span aria-hidden="true" data-reveal="line" className="h-px w-8 origin-left bg-current" />
      <span data-reveal="fade">{children}</span>
    </p>
  );
}
