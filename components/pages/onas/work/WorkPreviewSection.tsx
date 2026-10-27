import { ProjectCard } from "@/components/pages/realizacje/gallery/ProjectCard";
import { Reveal } from "@/components/UI/animation/Reveal";
import { ArrowLink } from "@/components/UI/ArrowLink";
import { Container } from "@/components/UI/Container";
import { Section } from "@/components/UI/Section";
import { SectionHeader } from "@/components/UI/SectionHeader";
import type { Project } from "@/model/data/projects";
import type { WorkPreviewContent } from "@/model/pages/onas";

type WorkPreviewSectionProps = {
  content: WorkPreviewContent;
  projects: Project[];
  photoForms: [string, string, string];
  actionLabel: string;
};

/** Zajawka realizacji – trzy karty prowadzące do galerii (od razu z filtrem kategorii danej realizacji). */
export function WorkPreviewSection({ content, projects, photoForms, actionLabel }: WorkPreviewSectionProps) {
  const titleId = `${content.id}-title`;
  const selected = content.projectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));

  if (selected.length === 0) return null;

  return (
    <Section id={content.id} labelledBy={titleId}>
      <Reveal>
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader id={titleId} eyebrow={content.eyebrow} title={content.title} subtitle={content.subtitle} />
            <div data-reveal className="lg:pb-2">
              <ArrowLink href={content.cta.href}>{content.cta.label}</ArrowLink>
            </div>
          </div>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {selected.map((project, index) => (
              <li key={project.id} data-reveal className={index === 2 ? "sm:hidden lg:block" : undefined}>
                <ProjectCard
                  project={project}
                  photoForms={photoForms}
                  actionLabel={actionLabel}
                  href={`/realizacje#${project.category}`}
                />
              </li>
            ))}
          </ul>
        </Container>
      </Reveal>
    </Section>
  );
}
