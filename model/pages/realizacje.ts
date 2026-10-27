import heroImage from "@/public/images/hero/realizacje.jpg";

import { contactFormHref } from "@/model/data/navigation";
import type { PhotoStage } from "@/model/data/projects";
import type { BeforeAfterContent } from "@/model/pages/home";
import type { CtaBandContent, Link, PageHeroContent } from "@/model/pages/shared";

/*
 * Teksty podstrony Realizacje (/realizacje). Same projekty (zdjęcia, opisy) są w model/data/projects.ts,
 * pary przed/po w model/data/realizations.ts.
 */

export type GalleryContent = {
  id: string;
  title: string;
  filtersLabel: string;
  allLabel: string;
  /** Odmiana słowa „zdjęcie” po liczbie: [1, 2–4, 5+] */
  photoForms: [string, string, string];
  /** Odmiana słowa „realizacja” – komunikat dla czytników ekranu po zmianie filtra */
  resultForms: [string, string, string];
  openLabel: string;
  dialog: {
    close: string;
    prev: string;
    next: string;
    counterOf: string;
    thumbnailsLabel: string;
    scopeTitle: string;
    stageLabels: Record<PhotoStage, string>;
    cta: Link;
  };
};

export type RealizationsPage = {
  meta: { title: string; description: string };
  hero: PageHeroContent;
  gallery: GalleryContent;
  beforeAfter: BeforeAfterContent;
  cta: CtaBandContent;
};

export const realizacje: RealizationsPage = {
  meta: {
    title: "Realizacje",
    description:
      "Zobacz nasze realizacje: remonty i wykończenia mieszkań, domów i łazienek w Warszawie i okolicach — zdjęcia po odbiorze i z placu budowy.",
  },

  hero: {
    image: heroImage,
    imagePosition: "center 60%",
    breadcrumb: "Realizacje",
    path: "/realizacje",
    eyebrow: "Nasze realizacje",
    title: ["Efekty mówią", "same za siebie."],
    subtitle: "Ponad 200 projektów w Warszawie i okolicach. Zajrzyj do wybranych z nich.",
    aside: "Zdjęcia z naszych budów — po odbiorze i w trakcie prac",
  },

  gallery: {
    id: "galeria",
    title: "Wybrane realizacje",
    filtersLabel: "Pokaż realizacje według rodzaju prac",
    allLabel: "Wszystkie",
    photoForms: ["zdjęcie", "zdjęcia", "zdjęć"],
    resultForms: ["realizacja", "realizacje", "realizacji"],
    openLabel: "Zobacz zdjęcia",
    dialog: {
      close: "Zamknij",
      prev: "Poprzednie zdjęcie",
      next: "Następne zdjęcie",
      counterOf: "z",
      thumbnailsLabel: "Wszystkie zdjęcia projektu",
      scopeTitle: "Zakres prac",
      stageLabels: { przed: "Przed remontem", "w-trakcie": "W trakcie prac" },
      cta: { label: "Chcę podobny remont", href: contactFormHref },
    },
  },

  beforeAfter: {
    id: "przed-i-po",
    eyebrow: "Przed i po",
    title: "Te same ujęcia przed remontem i po nim",
    subtitle: "Przesuń suwak, żeby porównać zdjęcie z placu budowy ze zdjęciem po odbiorze.",
    tabsLabel: "Wybierz realizację",
    labels: { before: "Przed", after: "Po" },
    sliderLabel: "Porównanie przed i po",
    caption: "Przeciągnij suwak lub użyj strzałek na klawiaturze.",
    cta: { label: "Zamów darmową wycenę", href: contactFormHref },
  },

  cta: {
    title: "Chcesz, żeby Twój remont trafił na tę listę?",
    text: "Opisz, co chcesz zrobić — przygotujemy bezpłatną wycenę w ciągu 48 godzin.",
    cta: { label: "Zamów darmową wycenę", href: contactFormHref },
    callLabel: "Zadzwoń",
  },
};
