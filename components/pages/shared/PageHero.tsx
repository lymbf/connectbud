import Image from "next/image";
import Link from "next/link";

import { HeroParallax } from "@/components/pages/home/hero/HeroParallax";
import { Container } from "@/components/UI/Container";
import { Wire } from "@/components/UI/Wire";
import { company } from "@/model/data/company";
import type { PageHeroContent } from "@/model/pages/shared";
import { cn } from "@/utils/cn";
import { nbsp } from "@/utils/nbsp";

type PageHeroProps = {
  content: PageHeroContent;
  /** compact – niższy nagłówek, gdy najważniejsza treść ma być od razu pod nim (np. Kontakt) */
  size?: "default" | "compact";
};

const homeLabel = "Strona główna";

/**
 * Nagłówek podstrony w stylu hero ze strony głównej: przyciemnione zdjęcie, ścieżka nawigacji
 * i blok w kolorze marki z tytułem – tu po lewej stronie (na stronie głównej jest po prawej).
 */
export function PageHero({ content, size = "default" }: PageHeroProps) {
  const { image, imagePosition, breadcrumb, path, eyebrow, title, subtitle, aside } = content;

  // dane strukturalne ścieżki nawigacji (SEO)
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel, item: company.url },
      { "@type": "ListItem", position: 2, name: breadcrumb, item: `${company.url}${path}` },
    ],
  };

  return (
    <section
      aria-labelledby="page-title"
      className={cn(
        "relative isolate flex flex-col overflow-hidden bg-dark text-white focus-light",
        size === "compact" ? "min-h-[31rem] lg:min-h-[36rem]" : "min-h-[34rem] sm:min-h-[38rem] lg:min-h-[44rem]",
      )}
    >
      <HeroParallax className="absolute inset-0 -z-20">
        <Image
          src={image}
          alt=""
          fill
          preload
          sizes="100vw"
          placeholder="blur"
          className="intro-zoom object-cover"
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
      </HeroParallax>
      {/* przyciemnienie zdjęcia: mocniej pod headerem i przy dolnej krawędzi, gdzie stoi tekst */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dark/50" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-56 bg-linear-to-b from-dark/85 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-linear-to-t from-dark/85 to-transparent" />

      <Container size="wide" className="flex flex-1 flex-col justify-end pt-32 pb-10 sm:pb-14 lg:pt-40 lg:pb-16">
        <nav aria-label="Ścieżka nawigacji" className="intro-fade-in mb-6" style={{ animationDelay: "0.3s" }}>
          <ol className="flex items-center gap-2.5 text-xs text-white/70">
            <li>
              <Link href="/" className="transition-colors duration-300 hover:text-white">
                {homeLabel}
              </Link>
            </li>
            <li aria-hidden="true" className="h-px w-4 bg-white/40" />
            <li aria-current="page" className="text-white">
              {breadcrumb}
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="intro-box-left @container bg-accent/85 px-6 py-8 backdrop-blur-[2px] sm:px-10 sm:py-10 lg:w-[min(46rem,60%)] lg:px-14 lg:py-12">
            <p
              className="intro-fade-up flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-white/75 uppercase"
              style={{ animationDelay: "0.35s" }}
            >
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {eyebrow}
            </p>
            <h1
              id="page-title"
              className="mt-5 font-heading text-[clamp(1.75rem,6.5cqw,2.75rem)] leading-[1.06] font-semibold tracking-[-0.01em] uppercase"
            >
              {title.map((line, index) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <span className="intro-rise block" style={{ animationDelay: `${0.45 + index * 0.12}s` }}>
                    {nbsp(line)}
                  </span>
                </span>
              ))}
            </h1>
            <p
              className="intro-fade-up mt-5 max-w-xl text-base leading-relaxed text-pretty text-white/80 sm:text-lg"
              style={{ animationDelay: "0.85s" }}
            >
              {nbsp(subtitle)}
            </p>
          </div>

          {aside ? (
            <div className="hidden shrink-0 lg:block">
              <Wire animated delay={1.1}>
                <p className="max-w-xs text-right text-[0.6875rem] leading-relaxed font-semibold tracking-[0.16em] text-white/85 uppercase">
                  {aside}
                </p>
              </Wire>
            </div>
          ) : null}
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
    </section>
  );
}
