import { Reveal } from "@/components/UI/animation/Reveal";
import { ArrowLink } from "@/components/UI/ArrowLink";
import { Container } from "@/components/UI/Container";
import { CheckIcon } from "@/components/UI/icons";
import { Section } from "@/components/UI/Section";
import { SectionHeader } from "@/components/UI/SectionHeader";
import type { ServiceIntroContent } from "@/model/pages/oferta";
import { nbsp } from "@/utils/nbsp";

type ServiceIntroSectionProps = {
  content: ServiceIntroContent;
};

/** „Dla kogo i co obejmuje”: sytuacja klienta po lewej, zakres prac z haczykami w karcie po prawej. */
export function ServiceIntroSection({ content }: ServiceIntroSectionProps) {
  const { id, eyebrow, title, situation, scopeTitle, scope, scopeNote, cta } = content;
  const titleId = `${id}-title`;

  return (
    <Section id={id} labelledBy={titleId} tone="white">
      <Reveal>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader id={titleId} eyebrow={eyebrow} title={title} />
              <p data-reveal className="mt-5 text-lg leading-relaxed text-pretty text-dark/70">
                {nbsp(situation)}
              </p>
              <div data-reveal className="mt-8">
                <ArrowLink href={cta.href}>{cta.label}</ArrowLink>
              </div>
            </div>

            {/* self-start: ramka ma wysokość karty, a nie całego wiersza siatki */}
            <div data-reveal className="relative lg:col-span-7 lg:self-start">
              {/* cienka ramka przesunięta za kartą – ten sam motyw co przy formularzu */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -bottom-4 hidden size-full border border-dark/15 lg:block"
              />
              <div className="relative bg-light p-7 sm:p-10">
                <h3 className="font-heading text-xl leading-snug font-medium sm:text-2xl">{nbsp(scopeTitle)}</h3>
                <ul className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {scope.map((item) => (
                    <li key={item} className="flex gap-3.5 text-[0.9375rem] leading-relaxed">
                      <span className="mt-px flex size-6 shrink-0 items-center justify-center rounded-full border border-accent/30 text-accent">
                        <CheckIcon size={14} strokeWidth={2.25} />
                      </span>
                      {nbsp(item)}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-t border-dark/10 pt-6 text-sm leading-relaxed text-pretty text-dark/65">
                  {nbsp(scopeNote)}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Reveal>
    </Section>
  );
}
