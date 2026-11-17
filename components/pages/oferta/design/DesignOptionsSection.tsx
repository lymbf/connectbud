import type { ComponentType } from "react";

import { Reveal } from "@/components/UI/animation/Reveal";
import { ButtonLink } from "@/components/UI/Button";
import { Container } from "@/components/UI/Container";
import { ArrowRightIcon, BuilderIcon, HandshakeIcon, HourglassIcon, RulerIcon, type IconProps } from "@/components/UI/icons";
import { Section } from "@/components/UI/Section";
import { SectionHeader } from "@/components/UI/SectionHeader";
import type { FeatureIcon } from "@/model/pages/home";
import type { DesignOptionsContent } from "@/model/pages/oferta";
import { cn } from "@/utils/cn";
import { nbsp } from "@/utils/nbsp";

const icons: Record<FeatureIcon, ComponentType<IconProps>> = {
  builder: BuilderIcon,
  hourglass: HourglassIcon,
  ruler: RulerIcon,
  handshake: HandshakeIcon,
};

type DesignOptionsSectionProps = {
  content: DesignOptionsContent;
};

/**
 * „Z projektem czy bez?” – trzy sytuacje klienta w kolumnach rozdzielonych cienkimi liniami
 * (jak w zasadach na stronie O nas), na ciemnym tle. Cel linków „Remonty z projektem” (#z-projektem).
 */
export function DesignOptionsSection({ content }: DesignOptionsSectionProps) {
  const titleId = `${content.id}-title`;

  return (
    <Section id={content.id} labelledBy={titleId} tone="dark" className="overflow-hidden">
      <Reveal>
        <Container>
          <SectionHeader
            id={titleId}
            tone="dark"
            eyebrow={content.eyebrow}
            title={content.title}
            subtitle={content.subtitle}
          />

          <ul className="mt-14 grid border-t border-white/10 md:grid-cols-3">
            {content.items.map((item, index) => {
              const Icon = icons[item.icon];
              return (
                <li
                  key={item.title}
                  data-reveal
                  className={cn(
                    "py-9 md:py-11 md:pr-8 lg:pr-10",
                    index > 0 && "border-t border-white/10 md:border-t-0 md:border-l md:pl-8 lg:pl-10",
                  )}
                >
                  <Icon size={52} className="text-steel" />
                  <h3 className="mt-7 font-heading text-xl leading-snug font-semibold text-balance">{nbsp(item.title)}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-pretty text-white/70">{nbsp(item.text)}</p>
                </li>
              );
            })}
          </ul>

          <div data-reveal className="mt-6 md:mt-4">
            <ButtonLink href={content.cta.href} variant="light">
              {content.cta.label}
              <ArrowRightIcon size={16} />
            </ButtonLink>
          </div>
        </Container>
      </Reveal>
    </Section>
  );
}
