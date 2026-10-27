import type { ComponentType } from "react";

import { Reveal } from "@/components/UI/animation/Reveal";
import { Container } from "@/components/UI/Container";
import { BuilderIcon, HandshakeIcon, HourglassIcon, RulerIcon, type IconProps } from "@/components/UI/icons";
import { Section } from "@/components/UI/Section";
import { SectionHeader } from "@/components/UI/SectionHeader";
import type { FeatureIcon } from "@/model/pages/home";
import type { ValuesContent } from "@/model/pages/onas";
import { cn } from "@/utils/cn";
import { nbsp } from "@/utils/nbsp";

const icons: Record<FeatureIcon, ComponentType<IconProps>> = {
  builder: BuilderIcon,
  hourglass: HourglassIcon,
  ruler: RulerIcon,
  handshake: HandshakeIcon,
};

type ValuesSectionProps = {
  content: ValuesContent;
};

/** Zasady firmy: trzy kolumny rozdzielone cienkimi liniami (jak tabelka na rysunku technicznym). */
export function ValuesSection({ content }: ValuesSectionProps) {
  const titleId = `${content.id}-title`;

  return (
    <Section id={content.id} labelledBy={titleId} tone="white">
      <Reveal>
        <Container>
          <SectionHeader id={titleId} eyebrow={content.eyebrow} title={content.title} subtitle={content.subtitle} />

          <ul className="mt-14 grid border-t border-dark/10 md:grid-cols-3">
            {content.items.map((item, index) => {
              const Icon = icons[item.icon];
              return (
                <li
                  key={item.title}
                  data-reveal
                  className={cn(
                    "py-9 md:py-11 md:pr-8 lg:pr-10",
                    index > 0 && "border-t border-dark/10 md:border-t-0 md:border-l md:pl-8 lg:pl-10",
                  )}
                >
                  <Icon size={52} className="text-accent" />
                  <h3 className="mt-7 font-heading text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-pretty text-dark/70">{nbsp(item.text)}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </Reveal>
    </Section>
  );
}
