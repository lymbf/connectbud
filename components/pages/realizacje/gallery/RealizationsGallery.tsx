"use client";

import { useState } from "react";

import { ProjectCard } from "@/components/pages/realizacje/gallery/ProjectCard";
import { ProjectDialog } from "@/components/pages/realizacje/gallery/ProjectDialog";
import { setHash, useHash } from "@/components/pages/realizacje/gallery/useHash";
import { projectCategories, type Project } from "@/model/data/projects";
import type { GalleryContent } from "@/model/pages/realizacje";
import { cn } from "@/utils/cn";
import { plural } from "@/utils/plural";

type RealizationsGalleryProps = {
  projects: Project[];
  content: GalleryContent;
};

const ALL = "wszystkie";

/**
 * Filtry kategorii + siatka kart + podgląd zdjęć.
 * Wybrany filtr trafia do adresu (/realizacje#lazienki), więc można do niego linkować,
 * np. z oferty na stronie głównej.
 */
export function RealizationsGallery({ projects, content }: RealizationsGalleryProps) {
  const hash = useHash();
  const [openId, setOpenId] = useState<string | null>(null);
  const [hasFiltered, setHasFiltered] = useState(false);

  // w filtrach tylko kategorie, w których jest co najmniej jedna realizacja
  const categories = projectCategories
    .map((category) => ({ ...category, count: projects.filter((project) => project.tags.includes(category.id)).length }))
    .filter((category) => category.count > 0);

  const active = categories.find((category) => category.id === hash)?.id ?? ALL;
  const visible = active === ALL ? projects : projects.filter((project) => project.tags.some((tag) => tag === active));
  const openProject = projects.find((project) => project.id === openId);

  const filters = [{ id: ALL, label: content.allLabel, count: projects.length }, ...categories];

  // szerokie karty domykają ostatni rząd siatki: na desktopie (3 kolumny) jedna lub dwie,
  // na tablecie (2 kolumny) pierwsza karta, gdy kart jest nieparzyście
  const total = visible.length;
  const wideLg = new Set<number>();
  if (total > 1 && total % 3 === 2) wideLg.add(0);
  if (total > 2 && total % 3 === 1) wideLg.add(0).add(total - 2);
  const wideSm = total > 1 && total % 2 === 1;
  const spanClasses = (index: number) =>
    cn(index === 0 && wideSm && "sm:col-span-2", wideLg.has(index) ? "lg:col-span-2" : index === 0 && wideSm && "lg:col-span-1");

  return (
    <>
      <div
        role="group"
        aria-label={content.filtersLabel}
        data-reveal
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {filters.map((filter) => {
          const isActive = filter.id === active;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => {
                setHasFiltered(true);
                setHash(filter.id === ALL ? "" : filter.id);
              }}
              className={cn(
                "inline-flex h-10 shrink-0 items-center gap-2 rounded-[3px] border px-4 text-sm font-medium whitespace-nowrap transition-colors duration-300",
                isActive
                  ? "border-dark bg-dark text-white"
                  : "border-dark/15 bg-white text-dark/75 hover:border-dark/40 hover:text-dark",
              )}
            >
              {filter.label}
              <span className={cn("text-xs tabular-nums", isActive ? "text-white/60" : "text-dark/40")}>{filter.count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {hasFiltered ? `${visible.length} ${plural(visible.length, content.resultForms)}` : ""}
      </p>

      <ul data-reveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {visible.map((project, index) => (
          <li
            key={`${active}-${project.id}`}
            className={cn(spanClasses(index), hasFiltered && "intro-fade-up")}
            style={hasFiltered ? { animationDelay: `${index * 60}ms` } : undefined}
          >
            <ProjectCard
              project={project}
              photoForms={content.photoForms}
              actionLabel={content.openLabel}
              onOpen={() => setOpenId(project.id)}
            />
          </li>
        ))}
      </ul>

      {openProject ? (
        <ProjectDialog key={openProject.id} project={openProject} content={content.dialog} onClose={() => setOpenId(null)} />
      ) : null}
    </>
  );
}
