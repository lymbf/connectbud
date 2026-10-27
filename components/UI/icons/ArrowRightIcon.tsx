import { IconBase } from "./IconBase";
import type { IconProps } from "./IconBase";

/** Strzałka w prawo – linki i przyciski CTA. Ikona liniowa 24×24 – grubość linii zmienisz propem strokeWidth. */
export function ArrowRightIcon({ strokeWidth = 1.75, ...props }: IconProps) {
  return (
    <IconBase
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  );
}
