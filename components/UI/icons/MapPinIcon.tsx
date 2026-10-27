import { IconBase } from "./IconBase";
import type { IconProps } from "./IconBase";

/** Pinezka – obszar działania. Ikona liniowa 24×24 – grubość linii zmienisz propem strokeWidth. */
export function MapPinIcon({ strokeWidth = 1.75, ...props }: IconProps) {
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
      <path d="M12 21s7-6.1 7-11.5a7 7 0 0 0-14 0C5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </IconBase>
  );
}
