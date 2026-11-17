"use client";

import { useState } from "react";

import { ProjectCard } from "@/components/pages/realizacje/gallery/ProjectCard";
import { ProjectDialog } from "@/components/pages/realizacje/gallery/ProjectDialog";
import type { Project } from "@/model/data/projects";
import type { ServiceProjectsContent } from "@/model/pages/oferta";
import { cn } from "@/utils/cn";

export type ServiceProjectItem = {
  project: Project;
  /** Numer zdjęcia na okładce – od niego zaczyna się też podgląd */
  cover: number;
};

type ServiceProjectsGridProps = {
  items: ServiceProjectItem[];
  content: Pick<ServiceProjectsContent, "photoForms" | "openLabel" | "dialog">;
};

/**
 * Karty realizacji z podglądem zdjęć w oknie (to samo okno co w galerii), bez wychodzenia ze strony usługi.
 * Przy nieparzystej liczbie kart pierwsza na tablecie zajmuje cały wiersz (i sama przechodzi w układ poziomy).
 */
export function ServiceProjectsGrid({ items, content }: ServiceProjectsGridProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = items.find((item) => item.project.id === openId);

  const total = items.length;
  const wideFirst = total > 1 && total % 2 === 1;

  return (
    <>
      <ul className={cn("mt-12 grid gap-6 sm:grid-cols-2 lg:gap-7", total >= 3 && "lg:grid-cols-3")}>
        {items.map(({ project, cover }, index) => (
          <li key={project.id} data-reveal className={cn(index === 0 && wideFirst && "sm:col-span-2 lg:col-span-1")}>
            <ProjectCard
              project={project}
              coverIndex={cover}
              photoForms={content.photoForms}
              actionLabel={content.openLabel}
              onOpen={() => setOpenId(project.id)}
            />
          </li>
        ))}
      </ul>

      {open ? (
        <ProjectDialog
          key={open.project.id}
          project={open.project}
          initialIndex={open.cover}
          content={content.dialog}
          onClose={() => setOpenId(null)}
        />
      ) : null}
    </>
  );
}
