import { IconBase } from "./IconBase";
import type { IconProps } from "./IconBase";

/** Krzyżyk – zamykanie menu. Ikona liniowa 24×24 – grubość linii zmienisz propem strokeWidth. */
export function CloseIcon({ strokeWidth = 1.75, ...props }: IconProps) {
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
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </IconBase>
  );
}
