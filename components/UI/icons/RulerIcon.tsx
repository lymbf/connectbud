import { IconBase } from "./IconBase";
import type { IconProps } from "./IconBase";

/** Ekierka / linijka (np. „Dbamy o milimetry”). */
export function RulerIcon({ strokeWidth = 12, ...props }: IconProps) {
  return (
    <IconBase strokeWidth={strokeWidth} {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" transform="matrix(1 0 0 -1 0 512)">
        <path d="M0 0h-21.166c-5.522 0-10-4.477-10-10v-477c0-5.523 4.478-10 10-10h477c5.522 0 10 4.477 10 10v75.486c0 5.523-4.478 10-10 10H316.668" transform="translate(38.666 504.5)" />
        <path d="M0 0v191.166c0 5.523-4.478 10-10 10h-20.319" transform="translate(102.986 303.334)" />
        <path d="M0 0h-218.347v166.347" transform="translate(321.333 102.986)" />
        <path d="M0 0h30.075" transform="translate(7.5 458.04)" />
        <path d="M0 0h30.075" transform="translate(7.5 420.785)" />
        <path d="M0 0h30.075" transform="translate(7.5 383.531)" />
        <path d="M0 0h30.075" transform="translate(7.5 346.277)" />
        <path d="M0 0h30.075" transform="translate(7.5 309.023)" />
        <path d="M0 0h30.075" transform="translate(7.5 271.77)" />
        <path d="M0 0h30.075" transform="translate(7.5 234.516)" />
        <path d="M0 0h30.075" transform="translate(7.5 197.262)" />
        <path d="M0 0h30.075" transform="translate(7.5 160.008)" />
        <path d="M0 0h30.075" transform="translate(7.5 122.754)" />
        <path d="M0 0h30.075" transform="translate(7.5 85.5)" />
        <path d="M0 0v-30.075" transform="translate(458.04 37.575)" />
        <path d="M0 0v-30.075" transform="translate(420.785 37.575)" />
        <path d="M0 0v-30.075" transform="translate(383.531 37.575)" />
        <path d="M0 0v-30.075" transform="translate(346.277 37.575)" />
        <path d="M0 0v-30.075" transform="translate(309.023 37.575)" />
        <path d="M0 0v-30.075" transform="translate(271.77 37.575)" />
        <path d="M0 0v-30.075" transform="translate(234.516 37.575)" />
        <path d="M0 0v-30.075" transform="translate(197.262 37.575)" />
        <path d="M0 0v-30.075" transform="translate(160.008 37.575)" />
        <path d="M0 0v-30.075" transform="translate(122.754 37.575)" />
        <path d="M0 0v-30.075" transform="translate(85.5 37.575)" />
        <path d="m0 0 4.242-4.243" transform="translate(132.07 484.965)" strokeMiterlimit="4" />
        <path d="m0 0 313.066-313.067" transform="translate(157.324 459.71)" strokeMiterlimit="4" strokeDasharray="11.886, 29.714" />
        <path d="m0 0 4.242-4.243" transform="translate(480.897 136.139)" strokeMiterlimit="4" />
      </g>
    </IconBase>
  );
}
