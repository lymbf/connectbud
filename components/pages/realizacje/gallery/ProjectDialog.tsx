"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type TouchEvent } from "react";

import { ButtonLink } from "@/components/UI/Button";
import { ArrowRightIcon, CheckIcon, CloseIcon, MapPinIcon } from "@/components/UI/icons";
import { projectCategories, type Project } from "@/model/data/projects";
import type { GalleryContent } from "@/model/pages/realizacje";
import { cn } from "@/utils/cn";
import { nbsp } from "@/utils/nbsp";

type ProjectDialogProps = {
  project: Project;
  content: GalleryContent["dialog"];
  onClose: () => void;
};

/** Strzałka „w lewo” – ta sama ikona co ArrowRight, obrócona */
function ChevronIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={22}
      height={22}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={direction === "prev" ? "rotate-180" : undefined}
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

/**
 * Podgląd realizacji na pełnym ekranie (natywny <dialog>: fokus zamknięty w oknie, Esc zamyka,
 * po zamknięciu fokus wraca na kartę). Zdjęcia przełącza się strzałkami, miniaturami, klawiaturą
 * (← →) i przesunięciem palcem.
 */
export function ProjectDialog({ project, content, onClose }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const titleId = useId();

  const count = project.photos.length;
  const photo = project.photos[index];
  const category = projectCategories.find((item) => item.id === project.category)?.label;

  const go = (delta: number) => setIndex((current) => (current + delta + count) % count);

  // otwarcie jako okno modalne + blokada przewijania strony pod spodem
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    // Bez dialog.close() w sprzątaniu: zdarzenie „close” przyszłoby z opóźnieniem i zamknęłoby okno
    // tuż po otwarciu (w trybie deweloperskim React uruchamia efekty dwa razy). Usunięcie okna
    // z dokumentu i tak zdejmuje je z ekranu.
    return () => {
      root.style.overflow = previousOverflow;
    };
  }, []);

  // aktywna miniatura zawsze widoczna w pasku
  useEffect(() => {
    const thumb = thumbsRef.current?.querySelector<HTMLElement>(`[data-index="${index}"]`);
    thumb?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [index]);

  const onTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (event: TouchEvent) => {
    const start = touchStartX.current;
    const end = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (start == null || end == null || Math.abs(end - start) < 50) return;
    go(end < start ? 1 : -1);
  };

  if (!photo) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
      }}
      className="focus-light fixed inset-0 m-0 h-full max-h-none w-full max-w-none border-0 bg-dark p-0 text-white backdrop:bg-dark/80"
    >
      {/* zamknięcie – pierwszy element w oknie, więc to on dostaje fokus po otwarciu */}
      <button
        type="button"
        onClick={() => dialogRef.current?.close()}
        aria-label={content.close}
        className="absolute top-3 right-3 z-20 flex size-11 items-center justify-center rounded-full bg-dark/70 text-white transition-colors hover:bg-white hover:text-dark lg:top-5 lg:right-5"
      >
        <CloseIcon size={22} />
      </button>

      <div className="intro-fade-in scrollbar-dark h-full w-full overflow-y-auto lg:grid lg:grid-cols-[minmax(0,1fr)_25rem] lg:overflow-hidden">
        {/* zdjęcia */}
        <div className="flex h-[72svh] flex-col bg-black/30 lg:h-full">
          <p className="px-5 pt-5 pb-3 text-xs font-semibold tracking-[0.14em] text-white/70 uppercase tabular-nums lg:px-8 lg:pt-7">
            {index + 1} {content.counterOf} {count}
          </p>

          <div className="relative min-h-0 flex-1" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <Image
              key={photo.src.src}
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) calc(100vw - 25rem), 100vw"
              placeholder="blur"
              className="intro-fade-in object-contain"
            />
            {photo.stage ? (
              <span className="absolute top-3 left-5 bg-accent px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.14em] uppercase lg:left-8">
                {content.stageLabels[photo.stage]}
              </span>
            ) : null}

            {count > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={content.prev}
                  className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-dark/70 transition-colors hover:bg-white hover:text-dark lg:left-6 lg:size-12"
                >
                  <ChevronIcon direction="prev" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={content.next}
                  className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-dark/70 transition-colors hover:bg-white hover:text-dark lg:right-6 lg:size-12"
                >
                  <ChevronIcon direction="next" />
                </button>
              </>
            ) : null}
          </div>

          <div
            ref={thumbsRef}
            role="group"
            aria-label={content.thumbnailsLabel}
            className="no-scrollbar flex shrink-0 gap-2 overflow-x-auto px-5 py-4 lg:px-8 lg:py-5"
          >
            {project.photos.map((item, itemIndex) => (
              <button
                key={item.src.src}
                type="button"
                data-index={itemIndex}
                onClick={() => setIndex(itemIndex)}
                aria-label={`${itemIndex + 1} ${content.counterOf} ${count}: ${item.alt}`}
                aria-current={itemIndex === index ? "true" : undefined}
                className={cn(
                  "relative h-14 w-[4.5rem] shrink-0 overflow-hidden transition-opacity duration-300 lg:h-16 lg:w-20",
                  itemIndex === index
                    ? "opacity-100 outline-2 outline-offset-2 outline-white"
                    : "opacity-45 hover:opacity-90",
                )}
              >
                <Image src={item.src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* opis projektu */}
        <div className="scrollbar-dark border-t border-white/10 px-6 py-9 sm:px-8 lg:h-full lg:overflow-y-auto lg:border-t-0 lg:border-l lg:px-9 lg:pt-20 lg:pb-10">
          {category ? <p className="text-[0.8125rem] font-semibold text-steel">{category}</p> : null}
          <h2 id={titleId} className="mt-2 font-heading text-2xl leading-tight font-medium text-balance sm:text-[1.75rem]">
            {nbsp(project.title)}
          </h2>
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-white/65">
            <MapPinIcon size={16} />
            {project.location}
          </p>
          <p className="mt-6 text-[0.9375rem] leading-relaxed text-pretty text-white/80">{nbsp(project.summary)}</p>

          <h3 className="mt-9 text-xs font-semibold tracking-[0.18em] text-steel uppercase">{content.scopeTitle}</h3>
          <ul className="mt-4 space-y-3">
            {project.scope.map((item) => (
              <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-white/85">
                <CheckIcon size={18} className="mt-0.5 shrink-0 text-steel" />
                {nbsp(item)}
              </li>
            ))}
          </ul>

          <ButtonLink href={content.cta.href} variant="light" className="mt-10 w-full sm:w-auto">
            {content.cta.label}
            <ArrowRightIcon size={16} />
          </ButtonLink>
        </div>
      </div>
    </dialog>
  );
}
