import type { ReactNode, SVGProps } from "react";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Szerokość i wysokość ikony (px lub dowolna jednostka CSS). Klasa Tailwinda, np. `size-10`, ma pierwszeństwo. */
  size?: number | string;
  /** Opis dla czytników ekranu. Bez niego ikona jest traktowana jako dekoracja (aria-hidden). */
  title?: string;
};

type IconBaseProps = IconProps & {
  children: ReactNode;
};

/**
 * Wspólny wrapper dla wszystkich ikon.
 * Kolor dziedziczy z `color` rodzica (currentColor), więc steruje się nim klasą `text-*`,
 * np. `<RulerIcon className="size-10 text-accent" />`.
 */
export function IconBase({ size = 24, title, children, ...props }: IconBaseProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}
