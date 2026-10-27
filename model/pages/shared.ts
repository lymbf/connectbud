import type { StaticImageData } from "next/image";

/*
 * Typy sekcji wspólnych dla podstron (components/pages/shared).
 */

export type Link = { label: string; href: string };

/** Nagłówek podstrony: zdjęcie w tle, ścieżka nawigacji i blok z tytułem w kolorze marki. */
export type PageHeroContent = {
  image: StaticImageData;
  /** Kadrowanie zdjęcia (CSS object-position), np. "center 40%" */
  imagePosition?: string;
  /** Nazwa strony w ścieżce nawigacji (Strona główna / …) */
  breadcrumb: string;
  /** Adres strony – do danych strukturalnych ścieżki nawigacji */
  path: string;
  eyebrow: string;
  /** Nagłówek H1 – każdy element to osobna linia */
  title: string[];
  subtitle: string;
  /** Krótka linia w cienkiej ramce po prawej stronie (tylko desktop) */
  aside?: string;
};

/** Pas z wezwaniem do działania na końcu podstrony. */
export type CtaBandContent = {
  title: string;
  text: string;
  cta: Link;
  callLabel: string;
};
