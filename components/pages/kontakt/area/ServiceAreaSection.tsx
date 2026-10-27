import { ServiceAreaMap } from "@/components/pages/kontakt/area/ServiceAreaMap";
import { Reveal } from "@/components/UI/animation/Reveal";
import { Container } from "@/components/UI/Container";
import { Section } from "@/components/UI/Section";
import { SectionHeader } from "@/components/UI/SectionHeader";
import { serviceAreaCenter, serviceAreaPlaces, serviceAreaRings, vistulaPath } from "@/model/data/serviceArea";
import type { ServiceAreaContent } from "@/model/pages/kontakt";
import { nbsp } from "@/utils/nbsp";

type ServiceAreaSectionProps = {
  content: ServiceAreaContent;
};

/** Obszar działania: tekst + schematyczna mapa z zasięgiem 70 km. */
export function ServiceAreaSection({ content }: ServiceAreaSectionProps) {
  const titleId = `${content.id}-title`;

  return (
    <Section id={content.id} labelledBy={titleId} tone="dark" className="overflow-hidden">
      <Reveal>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader id={titleId} tone="dark" eyebrow={content.eyebrow} title={content.title} subtitle={content.subtitle} />
              {/* lista miejscowości dla czytników ekranu – mapa jest dla nich jednym obrazkiem */}
              <p className="sr-only">
                {serviceAreaPlaces.map((place) => place.name).join(", ")}
              </p>
              <p data-reveal className="mt-8 text-sm text-steel">
                {nbsp(content.note)}
              </p>
            </div>

            <div data-reveal="fade" className="mx-auto w-full max-w-[38rem] lg:col-span-7">
              <ServiceAreaMap
                center={serviceAreaCenter}
                places={serviceAreaPlaces}
                rings={serviceAreaRings}
                river={vistulaPath}
                label={content.mapLabel}
                centerLabel={content.centerLabel}
                ringUnit={content.ringUnit}
                riverLabel={content.riverLabel}
              />
            </div>
          </div>
        </Container>
      </Reveal>
    </Section>
  );
}
