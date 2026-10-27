import { QuoteForm } from "@/components/pages/home/quote/QuoteForm";
import { Reveal } from "@/components/UI/animation/Reveal";
import { Container } from "@/components/UI/Container";
import { CheckIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/UI/icons";
import { Section } from "@/components/UI/Section";
import { SectionHeader } from "@/components/UI/SectionHeader";
import { company } from "@/model/data/company";
import type { QuoteContent } from "@/model/pages/home";
import { nbsp } from "@/utils/nbsp";

type QuoteSectionProps = {
  content: QuoteContent;
};

/** Końcowe wezwanie do działania: korzyści, dane kontaktowe i formularz wyceny. */
export function QuoteSection({ content }: QuoteSectionProps) {
  const { id, eyebrow, title, subtitle, benefits, callLabel, areaNote, form } = content;
  const titleId = `${id}-title`;

  return (
    <Section id={id} labelledBy={titleId} tone="accent" className="overflow-hidden">
      <Reveal>
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader id={titleId} tone="accent" eyebrow={eyebrow} title={title} subtitle={subtitle} />

              <ul className="mt-10 space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} data-reveal className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-white/90">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-white/30">
                      <CheckIcon size={14} strokeWidth={2.25} />
                    </span>
                    {nbsp(benefit)}
                  </li>
                ))}
              </ul>

              <div data-reveal className="mt-12 border-t border-white/15 pt-8">
                <p className="text-sm text-white/70">{callLabel}</p>
                <a
                  href={company.phone.href}
                  className="mt-2 inline-flex items-center gap-3 font-heading text-[1.75rem] font-semibold tracking-[-0.01em] transition-opacity duration-300 hover:opacity-80 sm:text-3xl"
                >
                  <PhoneIcon size={26} />
                  {company.phone.display}
                </a>
                <div className="mt-6 flex flex-col gap-2.5 text-sm text-white/80">
                  <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2.5 hover:text-white">
                    <MailIcon size={18} />
                    {company.email}
                  </a>
                  <p className="inline-flex items-center gap-2.5">
                    <MapPinIcon size={18} />
                    {company.area} ({areaNote})
                  </p>
                </div>
              </div>
            </div>

            {/* self-start: ramka ma wysokość formularza, a nie całego wiersza siatki */}
            <div data-reveal className="relative lg:col-span-7 lg:self-start">
              {/* cienka ramka przesunięta za formularzem – ten sam motyw co przy suwaku przed/po */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -bottom-4 hidden size-full border border-white/20 lg:block"
              />
              <div className="relative">
                <QuoteForm content={form} phone={company.phone} />
              </div>
            </div>
          </div>
        </Container>
      </Reveal>
    </Section>
  );
}
