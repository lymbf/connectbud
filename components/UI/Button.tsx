import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "light" | "outline-light" | "outline-dark";
export type ButtonSize = "md" | "sm";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2.5 rounded-[3px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-colors duration-300 ease-out disabled:pointer-events-none disabled:opacity-60";

const sizes: Record<ButtonSize, string> = {
  md: "h-12 px-6 text-[0.8125rem]",
  sm: "h-10 px-4 text-[0.6875rem]",
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent-dark",
  light: "bg-white text-dark hover:bg-light",
  "outline-light": "border border-white/40 text-white hover:border-white hover:bg-white/10",
  "outline-dark": "border border-dark/20 text-dark hover:border-dark hover:bg-dark/5",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, sizes[size], variants[variant], className);
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  "aria-label"?: string;
  tabIndex?: number;
  onClick?: () => void;
};

/** Link wyglądający jak przycisk. Dla tel:, mailto: i adresów zewnętrznych renderuje zwykłe <a>. */
export function ButtonLink({ href, children, variant, size, className, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);

  if (/^(tel:|mailto:|https?:)/.test(href)) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ variant, size, className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...rest} />;
}
