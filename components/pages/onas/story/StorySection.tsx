import Image from "next/image";

import { Reveal } from "@/components/UI/animation/Reveal";
import { Container } from "@/components/UI/Container";
import { Section } from "@/components/UI/Section";
import { SectionHeader } from "@/components/UI/SectionHeader";
import { Wire } from "@/components/UI/Wire";
import type { StoryContent } from "@/model/pages/onas";
import { nbsp } from "@/utils/nbsp";

type StorySectionProps = {
  content: StoryContent;
};

/** Kim jesteśmy: krótka historia, manifest w cienkiej ramce i dwa zdjęcia – efekt i praca w trakcie. */
export function StorySection({ content }: StorySectionProps) {
  const { id, eyebrow, title, paragraphs, quote, images } = content;
  const titleId = `${id}-title`;

  return (
    <Section id={id} labelledBy={titleId} className="overflow-hidden">
      <Reveal>
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeader id={titleId} eyebrow={eyebrow} title={title} />

              <div className="mt-8 space-y-5">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph} data-reveal className="text-[1.0625rem] leading-relaxed text-pretty text-dark/75">
                    {nbsp(paragraph)}
                  </p>
                ))}
              </div>

              <div data-reveal className="mt-10 text-accent">
                <Wire className="max-w-md">
                  <blockquote className="font-heading text-xl leading-snug font-light text-dark sm:text-[1.375rem]">
                    „{nbsp(quote)}”
                  </blockquote>
                </Wire>
              </div>
            </div>

            {/* kolaż: duże zdjęcie efektu po prawej, mniejsze z budowy nachodzi na nie od lewej */}
            <div className="relative pb-20 sm:pb-24 lg:col-span-6 lg:pb-16">
              <div className="relative mr-4 ml-auto w-[82%] max-w-[26rem] sm:mr-6">
                {/* ramka przesunięta za zdjęciem – motyw linii z hero */}
                <span
                  aria-hidden="true"
                  data-reveal="fade"
                  className="pointer-events-none absolute -right-4 -bottom-4 size-full border border-dark/15 sm:-right-6 sm:-bottom-6"
                />
                <div data-reveal="clip-left" className="relative aspect-[4/5] overflow-hidden bg-dark/10">
                  <Image
                    src={images.main.src}
                    alt={images.main.alt}
                    fill
                    sizes="(min-width: 640px) 416px, 82vw"
                    placeholder="blur"
                    className="object-cover"
                  />
                </div>
              </div>

              <figure data-reveal className="absolute bottom-0 left-0 w-[46%] max-w-[15rem]">
                <div className="relative aspect-[3/4] overflow-hidden border-[6px] border-light bg-dark/10 sm:border-8">
                  <Image
                    src={images.detail.src}
                    alt={images.detail.alt}
                    fill
                    sizes="240px"
                    placeholder="blur"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 pr-2 text-[0.8125rem] leading-snug text-dark/60">
                  {nbsp(images.detail.caption)}
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </Reveal>
    </Section>
  );
}
