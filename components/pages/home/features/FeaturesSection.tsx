import { FeatureCard } from "@/components/pages/home/features/FeatureCard";
import { Testimonial } from "@/components/pages/home/features/Testimonial";
import { Reveal } from "@/components/UI/animation/Reveal";
import { Container } from "@/components/UI/Container";
import { Section } from "@/components/UI/Section";
import { SectionHeader } from "@/components/UI/SectionHeader";
import type { FeaturesContent } from "@/model/pages/home";

type FeaturesSectionProps = {
  content: FeaturesContent;
};

export function FeaturesSection({ content }: FeaturesSectionProps) {
  const { id, eyebrow, title, subtitle, items, testimonial } = content;
  const titleId = `${id}-title`;

  return (
    <Section id={id} labelledBy={titleId} tone="light">
      <Reveal>
        <Container>
          <SectionHeader id={titleId} eyebrow={eyebrow} title={title} subtitle={subtitle} />

          <ul className="mt-12 grid gap-4 md:mt-14 md:grid-cols-2 lg:gap-5">
            {items.map((item) => (
              <li key={item.title} data-reveal>
                <FeatureCard icon={item.icon} title={item.title} text={item.text} />
              </li>
            ))}
          </ul>

          <Testimonial {...testimonial} />
        </Container>
      </Reveal>
    </Section>
  );
}
