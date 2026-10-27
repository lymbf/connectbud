import { QuoteForm } from "@/components/pages/home/quote/QuoteForm";
import { Reveal } from "@/components/UI/animation/Reveal";
import { Container } from "@/components/UI/Container";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/UI/icons";
import { Section } from "@/components/UI/Section";
import { company } from "@/model/data/company";
import type { ContactDetailsContent } from "@/model/pages/kontakt";
import { nbsp } from "@/utils/nbsp";

type ContactSectionProps = {
  content: ContactDetailsContent;
};

const labelClasses = "text-[0.8125rem] font-medium text-dark/55";

/** Dane kontaktowe, formularz wyceny i „co dalej” po wysłaniu zapytania. */
export function ContactSection({ content }: ContactSectionProps) {
  const titleId = `${content.id}-title`;

  return (
    <Section id={content.id} labelledBy={titleId} className="md:py-24">
      <Reveal>
        <Container>
          {/* kolejność w kodzie = kolejność na telefonie: dane kontaktowe → formularz → „co dalej”;
              na desktopie formularz zajmuje prawą kolumnę na wysokość obu bloków */}
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-12">
            <div className="lg:col-span-5">
              <h2
                id={titleId}
                data-reveal
                className="font-heading text-[1.75rem] leading-tight font-medium tracking-[-0.02em] text-balance sm:text-[2rem]"
              >
                {nbsp(content.title)}
              </h2>

              <dl className="mt-9 divide-y divide-dark/10 border-y border-dark/10">
                <div data-reveal className="py-6">
                  <dt className={labelClasses}>{content.phoneLabel}</dt>
                  <dd className="mt-2">
                    <a
                      href={company.phone.href}
                      className="inline-flex items-center gap-3 font-heading text-[1.75rem] font-semibold tracking-[-0.01em] text-accent transition-colors duration-300 hover:text-accent-dark sm:text-3xl"
                    >
                      <PhoneIcon size={26} />
                      {company.phone.display}
                    </a>
                    <p className="mt-2 text-sm text-dark/60">{nbsp(content.phoneNote)}</p>
                  </dd>
                </div>

                <div data-reveal className="py-6">
                  <dt className={labelClasses}>{content.emailLabel}</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${company.email}`}
                      className="inline-flex items-center gap-3 text-lg font-medium transition-colors duration-300 hover:text-accent"
                    >
                      <MailIcon size={20} className="text-accent" />
                      {company.email}
                    </a>
                  </dd>
                </div>

                {company.hours.length > 0 ? (
                  <div data-reveal className="py-6">
                    <dt className={labelClasses}>{content.hoursLabel}</dt>
                    <dd className="mt-3 space-y-1.5 text-[0.9375rem]">
                      {company.hours.map((row) => (
                        <p key={row.days} className="flex justify-between gap-6 sm:max-w-xs">
                          <span className="text-dark/70">{row.days}</span>
                          <span className="font-medium tabular-nums">{row.time}</span>
                        </p>
                      ))}
                    </dd>
                  </div>
                ) : null}

                <div data-reveal className="py-6">
                  <dt className={labelClasses}>{content.areaLabel}</dt>
                  <dd className="mt-2 inline-flex items-center gap-3 text-[0.9375rem]">
                    <MapPinIcon size={20} className="text-accent" />
                    {nbsp(content.areaText)}
                  </dd>
                </div>

                {company.nip ? (
                  <div data-reveal className="py-6">
                    <dt className={labelClasses}>{content.nipLabel}</dt>
                    <dd className="mt-2 text-[0.9375rem] tabular-nums">{company.nip}</dd>
                  </div>
                ) : null}
              </dl>
            </div>

            {/* cel linków „Zamów darmową wycenę” z podstron: /kontakt#formularz */}
            <div
              id={content.formId}
              data-reveal
              className="relative scroll-mt-28 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-start"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -bottom-4 hidden size-full border border-dark/15 lg:block"
              />
              <div className="relative shadow-[0_24px_60px_-40px_rgba(18,23,26,0.5)]">
                <QuoteForm content={content.form} phone={company.phone} />
              </div>
            </div>

            <div data-reveal className="lg:col-span-5 lg:col-start-1">
              <h3 className="font-heading text-lg font-semibold">{content.nextTitle}</h3>
              <ol className="mt-6 space-y-6">
                {content.nextSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center border border-accent font-heading text-sm font-semibold text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-semibold">{step.title}</p>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-pretty text-dark/70">{nbsp(step.text)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Reveal>
    </Section>
  );
}
