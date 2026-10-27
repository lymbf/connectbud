import { ProcessTimeline } from "@/components/pages/home/process/ProcessTimeline";
import { Reveal } from "@/components/UI/animation/Reveal";
import { Container } from "@/components/UI/Container";
import { Section } from "@/components/UI/Section";
import { SectionHeader } from "@/components/UI/SectionHeader";
import type { ProcessContent } from "@/model/pages/home";

type ProcessSectionProps = {
  content: ProcessContent;
};

export function ProcessSection({ content }: ProcessSectionProps) {
  const { id, eyebrow, title, subtitle, steps } = content;
  const titleId = `${id}-title`;

  return (
    <Section id={id} labelledBy={titleId} tone="white">
      <Reveal>
        <Container>
          <SectionHeader id={titleId} eyebrow={eyebrow} title={title} subtitle={subtitle} />
          <ProcessTimeline steps={steps} />
        </Container>
      </Reveal>
    </Section>
  );
}
