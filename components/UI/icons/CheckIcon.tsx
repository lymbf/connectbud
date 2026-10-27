import { IconBase } from "./IconBase";
import type { IconProps } from "./IconBase";

/** Haczyk – listy korzyści. Ikona liniowa 24×24 – grubość linii zmienisz propem strokeWidth. */
export function CheckIcon({ strokeWidth = 1.75, ...props }: IconProps) {
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
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </IconBase>
  );
}
