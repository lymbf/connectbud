import type { ComponentType } from "react";

import { BuilderIcon, HandshakeIcon, HourglassIcon, RulerIcon, type IconProps } from "@/components/UI/icons";
import type { FeatureIcon } from "@/model/pages/home";
import { nbsp } from "@/utils/nbsp";

const icons: Record<FeatureIcon, ComponentType<IconProps>> = {
  builder: BuilderIcon,
  hourglass: HourglassIcon,
  ruler: RulerIcon,
  handshake: HandshakeIcon,
};

type FeatureCardProps = {
  icon: FeatureIcon;
  title: string;
  text: string;
};

/** Karta wyróżnika. Po najechaniu wypełnia się kolorem marki (stan hover z projektu). */
export function FeatureCard({ icon, title, text }: FeatureCardProps) {
  const Icon = icons[icon];

  return (
    <article className="group flex h-full items-center gap-6 border border-dark/10 bg-white p-7 transition-colors duration-500 ease-out hover:border-accent hover:bg-accent sm:gap-8 sm:p-9">
      <Icon size={56} className="shrink-0 text-dark transition-colors duration-500 group-hover:text-white" />
      <div>
        <h3 className="font-heading text-lg leading-snug font-semibold text-balance transition-colors duration-500 group-hover:text-white">
          {nbsp(title)}
        </h3>
        <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-pretty text-dark/70 transition-colors duration-500 group-hover:text-white/85">
          {nbsp(text)}
        </p>
      </div>
    </article>
  );
}
