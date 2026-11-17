import { ServiceProjectsGrid, type ServiceProjectItem } from "@/components/pages/oferta/projects/ServiceProjectsGrid";
import { Reveal } from "@/components/UI/animation/Reveal";
import { ArrowLink } from "@/components/UI/ArrowLink";
import { Container } from "@/components/UI/Container";
import { Section } from "@/components/UI/Section";
import { SectionHeader } from "@/components/UI/SectionHeader";
import type { Project } from "@/model/data/projects";
import type { ServiceProjectsContent } from "@/model/pages/oferta";

type ServiceProjectsSectionProps = {
  content: ServiceProjectsContent;
  projects: Project[];
};

/** Realizacje tej usługi – 2–3 karty z podglądem zdjęć i link do całej kategorii w galerii. */
export function ServiceProjectsSection({ content, projects }: ServiceProjectsSectionProps) {
  const titleId = `${content.id}-title`;

  // literówka w id realizacji ma zatrzymać budowanie strony, a nie po cichu ukryć kartę
  const items: ServiceProjectItem[] = content.items.map(({ id, cover = 0 }) => {
    const project = projects.find((item) => item.id === id);
    if (!project) throw new Error(`Brak realizacji o id „${id}” w model/data/projects.ts`);
    return { project, cover };
  });

  return (
    <Section id={content.id} labelledBy={titleId} tone="light">
      <Reveal>
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader id={titleId} eyebrow={content.eyebrow} title={content.title} subtitle={content.subtitle} />
            <div data-reveal className="lg:shrink-0 lg:pb-2">
              <ArrowLink href={content.allLink.href}>{content.allLink.label}</ArrowLink>
            </div>
          </div>

          <ServiceProjectsGrid
            items={items}
            content={{ photoForms: content.photoForms, openLabel: content.openLabel, dialog: content.dialog }}
          />
        </Container>
      </Reveal>
    </Section>
  );
}
