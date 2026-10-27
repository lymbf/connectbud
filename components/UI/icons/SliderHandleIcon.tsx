import { IconBase } from "./IconBase";
import type { IconProps } from "./IconBase";

/** Dwie strzałki – uchwyt suwaka przed/po. Ikona liniowa 24×24 – grubość linii zmienisz propem strokeWidth. */
export function SliderHandleIcon({ strokeWidth = 1.75, ...props }: IconProps) {
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
      <path d="m9 7-5 5 5 5" />
      <path d="m15 7 5 5-5 5" />
    </IconBase>
  );
}
