import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

type WireProps = {
  children: ReactNode;
  className?: string;
  /** Rysowanie linii przy wejściu na stronę (animacja CSS z globals.css) */
  animated?: boolean;
  /** Opóźnienie animacji w sekundach */
  delay?: number;
};

/**
 * Motyw „architektonicznej linii” z projektu: cienkie podkreślenie z pionowym zakończeniem po prawej (_|).
 */
export function Wire({ children, className, animated = false, delay = 0 }: WireProps) {
  return (
    <div className={cn("relative inline-block pr-4 pb-3", className)}>
      {children}
      <span
        aria-hidden="true"
        className={cn("absolute right-0 bottom-0 left-0 h-px bg-current opacity-50", animated && "intro-draw-x")}
        style={animated ? { animationDelay: `${delay}s` } : undefined}
      />
      <span
        aria-hidden="true"
        className={cn("absolute right-0 bottom-0 h-[calc(100%+0.5rem)] w-px bg-current opacity-50", animated && "intro-draw-y")}
        style={animated ? { animationDelay: `${delay + 0.55}s` } : undefined}
      />
    </div>
  );
}
