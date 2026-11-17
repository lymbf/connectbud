import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/UI/animation/Reveal";
import { Container } from "@/components/UI/Container";
import { ArrowRightIcon } from "@/components/UI/icons";
import { Section } from "@/components/UI/Section";
import { SectionHeader } from "@/components/UI/SectionHeader";
import type { RelatedServicesContent } from "@/model/pages/oferta";
import { nbsp } from "@/utils/nbsp";

export type RelatedServiceItem = {
  label: string;
  href: string;
  title: string;
  image: StaticImageData;
};

type RelatedServicesSectionProps = {
  content: RelatedServicesContent;
  items: RelatedServiceItem[];
};

/**
 * Pozostałe usługi – karty na dole podstrony usługi. Klikalny jest tytuł,
 * a jego obszar rozciąga się na całą kartę (wzorzec „stretched link”, jak w kartach realizacji).
 */
export function RelatedServicesSection({ content, items }: RelatedServicesSectionProps) {
  if (items.length === 0) return null;

  const titleId = `${content.id}-title`;

  return (
    <Section id={content.id} labelledBy={titleId} tone="light" className="md:py-24">
      <Reveal>
        <Container>
          <SectionHeader id={titleId} eyebrow={content.eyebrow} title={content.title} />

          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:gap-6">
            {items.map((item) => (
              <li key={item.href} data-reveal>
                <article className="group relative grid h-full overflow-hidden bg-white transition-shadow duration-500 hover:shadow-[0_18px_40px_-24px_rgba(18,23,26,0.45)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-accent sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-dark/10 sm:aspect-auto sm:min-h-48">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 1152px) 220px, (min-width: 768px) 18vw, (min-width: 640px) 40vw, 100vw"
                      placeholder="blur"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <h3 className="font-heading text-xl leading-snug font-medium">
                      <Link href={item.href} className="after:absolute after:inset-0 focus-visible:outline-none">
                        {item.label}
                      </Link>
                    </h3>
                    <p className="mt-2 text-[0.9375rem] font-medium text-pretty text-accent">{nbsp(item.title)}</p>
                    <span aria-hidden="true" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                      {content.linkLabel}
                      <ArrowRightIcon
                        size={16}
                        className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </Reveal>
    </Section>
  );
}
