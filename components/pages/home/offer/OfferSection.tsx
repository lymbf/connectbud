import { OfferItem } from "@/components/pages/home/offer/OfferItem";
import { Reveal } from "@/components/UI/animation/Reveal";
import { Container } from "@/components/UI/Container";
import { Section } from "@/components/UI/Section";
import { SectionHeader } from "@/components/UI/SectionHeader";
import type { OfferContent } from "@/model/pages/home";

type OfferSectionProps = {
  content: OfferContent;
};

export function OfferSection({ content }: OfferSectionProps) {
  const { id, eyebrow, title, subtitle, items } = content;
  const titleId = `${id}-title`;

  return (
    <Section id={id} labelledBy={titleId} tone="light">
      <Reveal>
        <Container>
          <SectionHeader id={titleId} eyebrow={eyebrow} title={title} subtitle={subtitle} />

          <div className="mt-12 flex flex-col gap-4 md:mt-14 lg:gap-5">
            {items.map((item, index) => (
              <OfferItem key={item.name} item={item} imageFirst={index % 2 === 1} />
            ))}
          </div>
        </Container>
      </Reveal>
    </Section>
  );
}
