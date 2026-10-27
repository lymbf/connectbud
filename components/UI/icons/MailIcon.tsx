import { IconBase } from "./IconBase";
import type { IconProps } from "./IconBase";

/** Koperta – adres e-mail. Ikona liniowa 24×24 – grubość linii zmienisz propem strokeWidth. */
export function MailIcon({ strokeWidth = 1.75, ...props }: IconProps) {
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
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </IconBase>
  );
}
