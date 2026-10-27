import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { ArrowRightIcon, MapPinIcon } from "@/components/UI/icons";
import { projectCategories, type Project } from "@/model/data/projects";
import { cn } from "@/utils/cn";
import { nbsp } from "@/utils/nbsp";
import { plural } from "@/utils/plural";

type ProjectCardProps = {
  project: Project;
  photoForms: [string, string, string];
  actionLabel: string;
  /** Galeria: otwiera podgląd zdjęć. Zajawka (np. w O nas): zamiast tego podaj href. */
  onOpen?: () => void;
  href?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Karta realizacji: okładka, kategoria, tytuł, lokalizacja i liczba zdjęć.
 * Klikalny jest tytuł, a jego obszar rozciąga się na całą kartę (dostępny wzorzec „stretched link”).
 * Gdy karta jest szeroka (np. zajmuje dwie kolumny siatki), sama przechodzi w układ poziomy
 * ze zdjęciem po lewej i krótkim opisem – reaguje na własną szerokość (container query).
 */
export function ProjectCard({ project, photoForms, actionLabel, onOpen, href, className, style }: ProjectCardProps) {
  const cover = project.photos[0];
  const category = projectCategories.find((item) => item.id === project.category)?.label;
  const count = project.photos.length;

  const triggerClasses = "after:absolute after:inset-0 focus-visible:outline-none";

  return (
    <div className={cn("@container/card h-full", className)} style={style}>
      <article className="group relative flex h-full flex-col overflow-hidden bg-white text-dark transition-shadow duration-500 hover:shadow-[0_18px_40px_-24px_rgba(18,23,26,0.45)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-accent @xl/card:flex-row">
        <div className="relative aspect-[4/3] overflow-hidden bg-dark/10 @xl/card:aspect-auto @xl/card:min-h-[20rem] @xl/card:w-[52%] @xl/card:shrink-0">
          {cover ? (
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(min-width: 1152px) 440px, (min-width: 640px) 50vw, 100vw"
              placeholder="blur"
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
            />
          ) : null}
          {/* po najechaniu (lub fokusie z klawiatury): przyciemnienie i podpis z akcją */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-end bg-linear-to-t from-dark/70 via-dark/10 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
              {actionLabel}
              <ArrowRightIcon size={16} />
            </span>
          </div>
          <span className="absolute top-4 right-4 bg-dark/75 px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.06em] text-white">
            {count} {plural(count, photoForms)}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7 @xl/card:justify-center @xl/card:p-10">
          {category ? <p className="text-[0.8125rem] font-semibold text-accent">{category}</p> : null}
          <h3 className="mt-2 font-heading text-xl leading-snug font-medium text-balance @xl/card:text-2xl">
            {href ? (
              <Link href={href} className={triggerClasses}>
                {nbsp(project.title)}
              </Link>
            ) : (
              <button type="button" onClick={onOpen} aria-haspopup="dialog" className={cn(triggerClasses, "text-left")}>
                {nbsp(project.title)}
              </button>
            )}
          </h3>
          {/* krótki opis tylko w szerokiej karcie */}
          <p className="mt-4 hidden text-[0.9375rem] leading-relaxed text-pretty text-dark/70 @xl/card:block">
            {nbsp(project.summary)}
          </p>
          <p className="mt-auto inline-flex items-center gap-2 pt-4 text-sm text-dark/60 @xl/card:mt-6 @xl/card:pt-0">
            <MapPinIcon size={16} className="shrink-0" />
            {project.location}
          </p>
        </div>
      </article>
    </div>
  );
}
