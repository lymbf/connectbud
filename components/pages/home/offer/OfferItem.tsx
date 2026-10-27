import Image from "next/image";

import { ArrowLink } from "@/components/UI/ArrowLink";
import type { OfferContent } from "@/model/pages/home";
import { cn } from "@/utils/cn";
import { nbsp } from "@/utils/nbsp";

type OfferItemProps = {
  item: OfferContent["items"][number];
  /** Zdjęcie po lewej (co drugi wiersz – układ zig-zag) */
  imageFirst: boolean;
};

export function OfferItem({ item, imageFirst }: OfferItemProps) {
  return (
    <article className="group grid overflow-hidden bg-white lg:grid-cols-2">
      <div
        data-reveal={imageFirst ? "clip-right" : "clip-left"}
        className={cn(
          "relative order-1 aspect-[16/10] overflow-hidden bg-dark/5 lg:aspect-auto lg:min-h-[23rem]",
          imageFirst ? "lg:order-1" : "lg:order-2",
        )}
      >
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 1152px) 576px, (min-width: 1024px) 50vw, 100vw"
          placeholder="blur"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div
        className={cn(
          "order-2 flex flex-col justify-center px-7 py-9 sm:px-10 sm:py-11 lg:px-14 lg:py-14",
          imageFirst ? "lg:order-2" : "lg:order-1",
        )}
      >
        <h3 data-reveal className="font-heading text-[1.375rem] leading-tight font-medium sm:text-2xl">
          {item.name}
        </h3>
        <p data-reveal className="mt-2 font-medium text-pretty text-accent">
          {nbsp(item.title)}
        </p>
        <p data-reveal className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-pretty text-dark/70">
          {nbsp(item.text)}
        </p>
        <div data-reveal className="mt-7">
          <ArrowLink href={item.cta.href}>{item.cta.label}</ArrowLink>
        </div>
      </div>
    </article>
  );
}
