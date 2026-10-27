import { RealizationsGallery } from "@/components/pages/realizacje/gallery/RealizationsGallery";
import { Reveal } from "@/components/UI/animation/Reveal";
import { Container } from "@/components/UI/Container";
import { Section } from "@/components/UI/Section";
import type { Project } from "@/model/data/projects";
import type { GalleryContent } from "@/model/pages/realizacje";

type GallerySectionProps = {
  content: GalleryContent;
  projects: Project[];
};

/** Galeria realizacji z filtrami – główna sekcja podstrony Realizacje. */
export function GallerySection({ content, projects }: GallerySectionProps) {
  const titleId = `${content.id}-title`;

  return (
    <Section id={content.id} labelledBy={titleId} className="md:py-24">
      <Reveal>
        <Container>
          <h2
            id={titleId}
            data-reveal
            className="mb-7 font-heading text-[1.75rem] leading-tight font-medium tracking-[-0.02em] sm:text-[2rem]"
          >
            {content.title}
          </h2>
          <RealizationsGallery projects={projects} content={content} />
        </Container>
      </Reveal>
    </Section>
  );
}
