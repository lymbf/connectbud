import { IconBase } from "./IconBase";
import type { IconProps } from "./IconBase";

/** Hamburger – otwieranie menu mobilnego. Ikona liniowa 24×24 – grubość linii zmienisz propem strokeWidth. */
export function MenuIcon({ strokeWidth = 1.75, ...props }: IconProps) {
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
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h10" />
    </IconBase>
  );
}
