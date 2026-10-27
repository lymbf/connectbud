import { Reveal } from "@/components/UI/animation/Reveal";
import { ButtonLink } from "@/components/UI/Button";
import { Container } from "@/components/UI/Container";
import { ArrowRightIcon, PhoneIcon } from "@/components/UI/icons";
import { company } from "@/model/data/company";
import type { CtaBandContent } from "@/model/pages/shared";
import { nbsp } from "@/utils/nbsp";

type CtaBandProps = {
  content: CtaBandContent;
};

/** Końcowe wezwanie do działania na podstronach: tytuł, jedno zdanie, przycisk wyceny i telefon. */
export function CtaBand({ content }: CtaBandProps) {
  const titleId = "cta-title";

  return (
    <section aria-labelledby={titleId} className="focus-light relative overflow-hidden bg-accent text-white">
      <Reveal>
        <Container className="relative py-16 md:py-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div className="max-w-xl">
              <h2
                id={titleId}
                data-reveal
                className="font-heading text-[1.875rem] leading-[1.12] font-medium tracking-[-0.02em] text-balance sm:text-4xl"
              >
                {nbsp(content.title)}
              </h2>
              <p data-reveal className="mt-4 text-lg leading-relaxed text-pretty text-white/80">
                {nbsp(content.text)}
              </p>
            </div>

            <div data-reveal className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <ButtonLink href={content.cta.href} variant="light">
                {content.cta.label}
                <ArrowRightIcon size={16} />
              </ButtonLink>
              <ButtonLink
                href={company.phone.href}
                variant="outline-light"
                aria-label={`${content.callLabel}: ${company.phone.display}`}
              >
                <PhoneIcon size={16} />
                {company.phone.display}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
