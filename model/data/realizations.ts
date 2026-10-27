import type { StaticImageData } from "next/image";

import showerBefore from "@/public/images/realizacje/lazienka-prysznic-przed.jpg";
import showerAfter from "@/public/images/realizacje/lazienka-prysznic-po.jpg";
import wcBefore from "@/public/images/realizacje/lazienka-wc-przed.jpg";
import wcAfter from "@/public/images/realizacje/lazienka-wc-po.jpg";

/**
 * Porównania „przed i po” w sekcji Realizacje na stronie głównej.
 * Każdy element to jedna zakładka. Zdjęcia przed/po muszą mieć te same proporcje i podobny kadr
 * (najlepiej robione z tego samego miejsca) – inaczej suwak pokazuje „przeskakujące” wnętrze.
 * Nowe pary: wrzuć zdjęcia do public/images/realizacje/, zaimportuj i dopisz element do listy.
 */
export type BeforeAfterComparison = {
  id: string;
  /** Napis na zakładce */
  label: string;
  title: string;
  place: string;
  /** Zakres prac widoczny na zdjęciach – 2–4 krótkie punkty */
  details: string[];
  before: StaticImageData;
  beforeAlt: string;
  after: StaticImageData;
  afterAlt: string;
};

export const beforeAfterComparisons: BeforeAfterComparison[] = [
  {
    id: "lazienka-prysznic",
    label: "Podwójny prysznic",
    title: "Łazienka z podwójnym prysznicem",
    place: "Apartament, Warszawa",
    details: [
      "Płyty wodoodporne i hydroizolacja strefy prysznica",
      "Okładzina wielkoformatowa na ścianach i podłodze",
      "Armatura podtynkowa i odpływ liniowy",
    ],
    before: showerBefore,
    beforeAlt:
      "Strefa prysznica w trakcie prac: płyty wodoodporne, zaślepione podejścia pod baterie, folia ochronna na podłodze",
    after: showerAfter,
    afterAlt:
      "Ta sama strefa po remoncie: dwie deszczownice i baterie termostatyczne w kolorze miedzi, odpływ liniowy, okładzina w odcieniu trawertynu",
  },
  {
    id: "lazienka-wc",
    label: "Prysznic i WC",
    title: "Łazienka z prysznicem i WC",
    place: "Apartament, Warszawa",
    details: [
      "Wnęki na kosmetyki wbudowane w ścianę",
      "Szklana ścianka prysznicowa i odpływ liniowy",
      "Szafka pod umywalkę i podwieszana miska WC",
    ],
    before: wcBefore,
    beforeAlt: "Wąska łazienka w trakcie prac: położone płytki, wnęki w ścianie, wyprowadzone przewody",
    after: wcAfter,
    afterAlt: "Ta sama łazienka po remoncie: szklana ścianka prysznicowa, deszczownica, szafka z umywalką i miska WC",
  },
];
