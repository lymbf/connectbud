import { IconBase } from "./IconBase";
import type { IconProps } from "./IconBase";

/** Słuchawka telefonu. Ikona liniowa 24×24 – grubość linii zmienisz propem strokeWidth. */
export function PhoneIcon({ strokeWidth = 1.75, ...props }: IconProps) {
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
      <path d="M8.6 3.4 6.3 4c-1.2.3-2 1.5-1.8 2.7.9 4.9 3.8 9.4 7.9 12.2 1 .7 2.1 1.2 3.3 1.6 1.2.4 2.5-.2 3-1.4l.8-1.9c.3-.7 0-1.5-.6-1.9l-2.4-1.6c-.6-.4-1.4-.3-1.9.2l-1 1.1c-1.9-1-3.4-2.5-4.4-4.4l1.1-1c.5-.5.6-1.3.2-1.9L10.9 4c-.5-.6-1.4-.9-2.3-.6Z" />
    </IconBase>
  );
}
