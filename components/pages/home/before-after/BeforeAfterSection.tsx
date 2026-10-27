import { BeforeAfterShowcase } from "@/components/pages/home/before-after/BeforeAfterShowcase";
import { Reveal } from "@/components/UI/animation/Reveal";
import { Container } from "@/components/UI/Container";
import { Section } from "@/components/UI/Section";
import { SectionHeader } from "@/components/UI/SectionHeader";
import type { BeforeAfterComparison } from "@/model/data/realizations";
import type { BeforeAfterContent } from "@/model/pages/home";

type BeforeAfterSectionProps = {
  content: BeforeAfterContent;
  comparisons: BeforeAfterComparison[];
};

export function BeforeAfterSection({ content, comparisons }: BeforeAfterSectionProps) {
  if (comparisons.length === 0) return null;

  const titleId = `${content.id}-title`;

  return (
    <Section id={content.id} labelledBy={titleId} tone="dark" className="overflow-hidden">
      <Reveal>
        <Container>
          <BeforeAfterShowcase
            comparisons={comparisons}
            content={content}
            header={
              <SectionHeader
                id={titleId}
                tone="dark"
                eyebrow={content.eyebrow}
                title={content.title}
                subtitle={content.subtitle}
              />
            }
          />
        </Container>
      </Reveal>
    </Section>
  );
}
