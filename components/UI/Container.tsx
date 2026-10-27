import type { ElementType, ReactNode } from "react";

import { cn } from "@/utils/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** default – treść sekcji (1152 px), wide – header i hero (1600 px) */
  size?: "default" | "wide";
  as?: ElementType;
};

const sizes = {
  default: "max-w-6xl",
  wide: "max-w-[100rem] lg:px-12",
};

/** Wyśrodkowana kolumna z bocznymi marginesami – wspólna szerokość treści na całej stronie. */
export function Container({ children, className, size = "default", as: Tag = "div" }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full px-5 sm:px-8", sizes[size], className)}>{children}</Tag>;
}
