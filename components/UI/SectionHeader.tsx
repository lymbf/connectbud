import type { ReactNode } from "react";

import { Eyebrow } from "@/components/UI/Eyebrow";
import type { SectionTone } from "@/components/UI/Section";
import { cn } from "@/utils/cn";
import { nbsp } from "@/utils/nbsp";

type SectionHeaderProps = {
  /** id nagłówka H2 – podaj ten sam w Section labelledBy */
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  tone?: SectionTone;
  className?: string;
  children?: ReactNode;
};

/** Wspólny nagłówek sekcji: etykieta, tytuł H2 i podtytuł. Ten sam styl w całym serwisie. */
export function SectionHeader({ id, eyebrow, title, subtitle, tone = "light", className, children }: SectionHeaderProps) {
  const onDark = tone === "dark" || tone === "accent";

  return (
    <div className={cn("max-w-2xl", className)}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        data-reveal
        className="mt-5 font-heading text-[2rem] leading-[1.1] font-medium tracking-[-0.02em] text-balance sm:text-4xl lg:text-[2.625rem]"
      >
        {nbsp(title)}
      </h2>
      {subtitle ? (
        <p
          data-reveal
          className={cn("mt-5 text-lg leading-relaxed text-pretty", onDark ? "text-white/75" : "text-dark/70")}
        >
          {nbsp(subtitle)}
        </p>
      ) : null}
      {children}
    </div>
  );
}
