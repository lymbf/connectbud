import { IconBase } from "./IconBase";
import type { IconProps } from "./IconBase";

/** Strzałka w dół – rozwijane listy (menu „Oferta”). Ikona liniowa 24×24 – grubość linii zmienisz propem strokeWidth. */
export function ChevronDownIcon({ strokeWidth = 1.75, ...props }: IconProps) {
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
      <path d="m6 9 6 6 6-6" />
    </IconBase>
  );
}
