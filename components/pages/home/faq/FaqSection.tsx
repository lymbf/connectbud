import { FaqAccordion } from "@/components/pages/home/faq/FaqAccordion";
import { Reveal } from "@/components/UI/animation/Reveal";
import { Container } from "@/components/UI/Container";
import { PhoneIcon } from "@/components/UI/icons";
import { Section } from "@/components/UI/Section";
import { SectionHeader } from "@/components/UI/SectionHeader";
import { company } from "@/model/data/company";
import type { FaqContent } from "@/model/pages/home";
import { nbsp } from "@/utils/nbsp";

type FaqSectionProps = {
  content: FaqContent;
};

export function FaqSection({ content }: FaqSectionProps) {
  const { id, eyebrow, title, subtitle, contact, items } = content;
  const titleId = `${id}-title`;

  // dane strukturalne FAQ – Google może pokazać pytania bezpośrednio w wynikach wyszukiwania
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <Section id={id} labelledBy={titleId} tone="light">
      <Reveal>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader id={titleId} eyebrow={eyebrow} title={title} subtitle={subtitle} />

              <div data-reveal className="mt-10 border border-dark/10 bg-white p-7 sm:p-8">
                <p className="font-heading text-lg font-medium">{nbsp(contact.title)}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-dark/70">{nbsp(contact.text)}</p>
                <a
                  href={company.phone.href}
                  className="mt-5 inline-flex items-center gap-3 font-heading text-2xl font-semibold text-accent transition-colors duration-300 hover:text-accent-dark"
                >
                  <PhoneIcon size={22} />
                  {company.phone.display}
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pt-2">
              <FaqAccordion items={items} />
            </div>
          </div>
        </Container>
      </Reveal>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
    </Section>
  );
}
