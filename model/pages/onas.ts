import type { StaticImageData } from "next/image";

import heroImage from "@/public/images/hero/onas.jpg";
import storyFinished from "@/public/images/realizacje/apartament-trawertyn/02.jpg";
import storyInProgress from "@/public/images/realizacje/adaptacja-poddasza/06.jpg";

import { contactFormHref } from "@/model/data/navigation";
import { home, type FeatureIcon, type SectionIntro, type StatsContent } from "@/model/pages/home";
import type { CtaBandContent, Link, PageHeroContent } from "@/model/pages/shared";

/*
 * Teksty podstrony O nas (/onas), sekcja po sekcji.
 * Szkic na podstawie planu strony – historia firmy do uzupełnienia z klientem.
 */

export type StoryContent = SectionIntro & {
  paragraphs: string[];
  quote: string;
  images: { main: { src: StaticImageData; alt: string }; detail: { src: StaticImageData; alt: string; caption: string } };
};

export type ValuesContent = SectionIntro & {
  items: { icon: FeatureIcon; title: string; text: string }[];
};

export type WorkPreviewContent = SectionIntro & {
  /** id projektów z model/data/projects.ts, w kolejności wyświetlania */
  projectIds: string[];
  cta: Link;
};

export type AboutPage = {
  meta: { title: string; description: string };
  hero: PageHeroContent;
  story: StoryContent;
  stats: StatsContent;
  values: ValuesContent;
  work: WorkPreviewContent;
  cta: CtaBandContent;
};

export const onas: AboutPage = {
  meta: {
    title: "O nas",
    description:
      "ConnectBud to ekipa remontowa z Warszawy. Od ponad 10 lat remontujemy i wykańczamy mieszkania i domy — z jedną osobą kontaktową i bezpłatną wyceną w 48 godzin.",
  },

  hero: {
    image: heroImage,
    imagePosition: "center 35%",
    breadcrumb: "O nas",
    path: "/onas",
    eyebrow: "O nas",
    title: ["Fachowo, ale po\u00a0ludzku", "od ponad 10 lat."],
    subtitle: "Jesteśmy ekipą, która rozumie, że remont to stres. Robimy wszystko, żeby nie był.",
    aside: "Mieszkania i domy · Warszawa i okolice",
  },

  // TODO: historia firmy do uzupełnienia z klientem (skąd pomysł, jak zaczęło się od pierwszego zlecenia) – 3–5 zdań
  story: {
    id: "kim-jestesmy",
    eyebrow: "Kim jesteśmy",
    title: "Ekipa remontowa z Warszawy, z którą łatwo się dogadać",
    subtitle: "",
    paragraphs: [
      "ConnectBud to ekipa remontowa z Warszawy. Od ponad 10 lat remontujemy i wykańczamy mieszkania i domy — od pojedynczych łazienek po całe wnętrza oddawane pod klucz.",
      "Przez ten czas dobrze poznaliśmy to, co w remoncie męczy najbardziej: kilka firm, które się nie dogadują, przesuwane terminy i koszty, o których dowiadujesz się na końcu. Dlatego pracujemy inaczej — z jedną osobą kontaktową, jednym harmonogramem i wyceną rozpisaną na konkretne prace, zanim cokolwiek zaczniemy.",
      "Jeśli masz projekt wnętrza, zrealizujemy go co do detalu. Jeśli go nie masz, polecimy sprawdzonego architekta lub projektanta, z którym współpracujemy.",
    ],
    quote: "Każdy remont prowadzimy tak, jakby to był nasz własny dom.",
    images: {
      main: {
        src: storyFinished,
        alt: "Salon z jasnymi sofami i drewnianą ścianą telewizyjną w wykończonym apartamencie",
      },
      detail: {
        src: storyInProgress,
        alt: "Ocieplenie skosów i stelaż pod płyty gipsowo-kartonowe podczas adaptacji poddasza",
        caption: "To, czego nie widać po remoncie, robimy równie starannie.",
      },
    },
  },

  // te same liczby co na stronie głównej – zmieniasz je w model/pages/home.ts (stats)
  stats: home.stats,

  values: {
    id: "wartosci",
    eyebrow: "Nasze zasady",
    title: "Co jest dla nas ważne?",
    subtitle: "Trzy rzeczy, których pilnujemy przy każdym remoncie — niezależnie od jego wielkości.",
    items: [
      {
        icon: "handshake",
        title: "Uczciwość",
        text: "Mówimy, ile co kosztuje, zanim zaczniemy. Wycena jest rozpisana na konkretne prace, a każdą zmianę w trakcie ustalamy z Tobą, zanim ją wykonamy.",
      },
      {
        icon: "ruler",
        title: "Precyzja",
        text: "Każdy detal ma znaczenie — od fugi po listwę przypodłogową. Przy odbiorze sprawdzamy go razem z Tobą.",
      },
      {
        icon: "hourglass",
        title: "Szacunek dla czasu",
        text: "Twój kalendarz to nie sugestia. Podajemy datę zakończenia prac i się jej trzymamy.",
      },
    ],
  },

  work: {
    id: "nasze-realizacje",
    eyebrow: "Nasze realizacje",
    title: "Jak to wygląda w praktyce?",
    subtitle: "Kilka wnętrz, które wyremontowaliśmy i wykończyliśmy. Więcej zdjęć — także z placu budowy — znajdziesz w realizacjach.",
    projectIds: ["apartament-trawertyn", "mieszkanie-grafit", "dom-z-poddaszem"],
    cta: { label: "Zobacz wszystkie realizacje", href: "/realizacje" },
  },

  cta: {
    title: "Chcesz poznać nas bliżej?",
    text: "Zadzwoń lub napisz — opowiemy, jak pracujemy, i przygotujemy bezpłatną wycenę w ciągu 48 godzin.",
    cta: { label: "Zamów darmową wycenę", href: contactFormHref },
    callLabel: "Zadzwoń",
  },
};
