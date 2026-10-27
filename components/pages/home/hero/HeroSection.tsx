import Image from "next/image";

import { HeroParallax } from "@/components/pages/home/hero/HeroParallax";
import { ButtonLink } from "@/components/UI/Button";
import { Container } from "@/components/UI/Container";
import { Wire } from "@/components/UI/Wire";
import type { HeroContent } from "@/model/pages/home";
import { nbsp } from "@/utils/nbsp";

type HeroSectionProps = {
  content: HeroContent;
};

export function HeroSection({ content }: HeroSectionProps) {
  const { image, tags, title, subtitle, quote, cta } = content;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-dark text-white focus-light"
    >
      <HeroParallax className="absolute inset-0 -z-20">
        <Image
          src={image}
          alt=""
          fill
          preload
          sizes="100vw"
          placeholder="blur"
          className="intro-zoom object-cover object-[8%_center] lg:object-[60%_center]"
        />
      </HeroParallax>
      {/* przyciemnienie zdjęcia + mocniejszy cień pod headerem i u dołu (czytelność tekstu) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dark/45" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-64 bg-linear-to-b from-dark/85 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-linear-to-t from-dark/80 to-transparent lg:h-1/3 lg:from-dark/40" />

      <Container size="wide" className="flex flex-1 flex-col justify-end pt-32 pb-8 sm:pb-12 lg:justify-center lg:pt-44 lg:pb-16">
        <div className="hidden justify-end text-white lg:flex">
          <Wire animated delay={0.5}>
            <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-white/85 uppercase">
              {tags.join(" · ")}
            </p>
          </Wire>
        </div>

        <div className="intro-box @container bg-accent/85 px-6 py-8 backdrop-blur-[2px] sm:px-10 sm:py-10 lg:mt-12 lg:ml-auto lg:w-[min(48rem,58%)] lg:px-14 lg:py-14 lg:text-right">
          <h1
            id="hero-title"
            className="font-heading text-[clamp(1.75rem,7cqw,3rem)] leading-[1.06] font-semibold tracking-[-0.01em] uppercase"
          >
            {title.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span className="intro-rise block" style={{ animationDelay: `${0.45 + index * 0.12}s` }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p
            className="intro-fade-up mt-5 font-heading text-sm font-semibold tracking-[0.14em] text-white/70 uppercase sm:text-base"
            style={{ animationDelay: "0.85s" }}
          >
            {subtitle}
          </p>

          <div
            className="intro-fade-up mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:hidden"
            style={{ animationDelay: "1s" }}
          >
            <ButtonLink href={cta.href} variant="light">
              {cta.label}
            </ButtonLink>
            <p className="text-xs text-white/75 italic">{cta.note}</p>
          </div>
        </div>

        <div className="mt-10 hidden justify-end lg:flex">
          <Wire animated delay={1.1} className="max-w-sm">
            <p className="text-right text-sm leading-relaxed text-white/80">„{nbsp(quote)}”</p>
          </Wire>
        </div>
      </Container>
    </section>
  );
}
