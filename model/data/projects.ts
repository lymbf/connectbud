import type { StaticImageData } from "next/image";

import apartment01 from "@/public/images/realizacje/apartament-trawertyn/01.jpg";
import apartment02 from "@/public/images/realizacje/apartament-trawertyn/02.jpg";
import apartment03 from "@/public/images/realizacje/apartament-trawertyn/03.jpg";
import apartment04 from "@/public/images/realizacje/apartament-trawertyn/04.jpg";
import apartment05 from "@/public/images/realizacje/apartament-trawertyn/05.jpg";
import apartment06 from "@/public/images/realizacje/apartament-trawertyn/06.jpg";
import apartment07 from "@/public/images/realizacje/apartament-trawertyn/07.jpg";
import apartment08 from "@/public/images/realizacje/apartament-trawertyn/08.jpg";
import graphite01 from "@/public/images/realizacje/mieszkanie-grafit/01.jpg";
import graphite02 from "@/public/images/realizacje/mieszkanie-grafit/02.jpg";
import graphite03 from "@/public/images/realizacje/mieszkanie-grafit/03.jpg";
import graphite04 from "@/public/images/realizacje/mieszkanie-grafit/04.jpg";
import graphite05 from "@/public/images/realizacje/mieszkanie-grafit/05.jpg";
import graphite06 from "@/public/images/realizacje/mieszkanie-grafit/06.jpg";
import graphite07 from "@/public/images/realizacje/mieszkanie-grafit/07.jpg";
import graphite08 from "@/public/images/realizacje/mieszkanie-grafit/08.jpg";
import graphite09 from "@/public/images/realizacje/mieszkanie-grafit/09.jpg";
import woodFlat01 from "@/public/images/realizacje/mieszkanie-drewno/01.jpg";
import woodFlat02 from "@/public/images/realizacje/mieszkanie-drewno/02.jpg";
import woodFlat03 from "@/public/images/realizacje/mieszkanie-drewno/03.jpg";
import woodFlat04 from "@/public/images/realizacje/mieszkanie-drewno/04.jpg";
import woodFlat05 from "@/public/images/realizacje/mieszkanie-drewno/05.jpg";
import woodFlat06 from "@/public/images/realizacje/mieszkanie-drewno/06.jpg";
import atticHouse01 from "@/public/images/realizacje/dom-z-poddaszem/01.jpg";
import atticHouse02 from "@/public/images/realizacje/dom-z-poddaszem/02.jpg";
import atticHouse03 from "@/public/images/realizacje/dom-z-poddaszem/03.jpg";
import atticHouse04 from "@/public/images/realizacje/dom-z-poddaszem/04.jpg";
import atticHouse05 from "@/public/images/realizacje/dom-z-poddaszem/05.jpg";
import atticHouse06 from "@/public/images/realizacje/dom-z-poddaszem/06.jpg";
import atticHouse07 from "@/public/images/realizacje/dom-z-poddaszem/07.jpg";
import attic01 from "@/public/images/realizacje/adaptacja-poddasza/01.jpg";
import attic02 from "@/public/images/realizacje/adaptacja-poddasza/02.jpg";
import attic03 from "@/public/images/realizacje/adaptacja-poddasza/03.jpg";
import attic04 from "@/public/images/realizacje/adaptacja-poddasza/04.jpg";
import attic05 from "@/public/images/realizacje/adaptacja-poddasza/05.jpg";
import attic06 from "@/public/images/realizacje/adaptacja-poddasza/06.jpg";
import attic07 from "@/public/images/realizacje/adaptacja-poddasza/07.jpg";
import marbleBathroom01 from "@/public/images/realizacje/lazienka-marmur/01.jpg";
import marbleBathroom02 from "@/public/images/realizacje/lazienka-marmur/02.jpg";
import marbleBathroom03 from "@/public/images/realizacje/lazienka-marmur/03.jpg";
import marbleBathroom04 from "@/public/images/realizacje/lazienka-marmur/04.jpg";
import marbleBathroom05 from "@/public/images/realizacje/lazienka-marmur/05.jpg";
import marbleBathroom06 from "@/public/images/realizacje/lazienka-marmur/06.jpg";
import herringbone01 from "@/public/images/realizacje/dom-jodelka/01.jpg";
import herringbone02 from "@/public/images/realizacje/dom-jodelka/02.jpg";
import herringbone03 from "@/public/images/realizacje/dom-jodelka/03.jpg";
import herringbone04 from "@/public/images/realizacje/dom-jodelka/04.jpg";

/*
 * Realizacje do galerii na podstronie /realizacje (i zajawki w O nas).
 *
 * Kolejność projektów = kolejność w galerii. Pierwsze zdjęcie projektu jest okładką karty.
 * Nowy projekt: dodaj folder ze zdjęciami w public/images/realizacje/<id>/, zaimportuj je wyżej i dopisz obiekt.
 *
 * TODO: tytuły, lokalizacje, kategorie i zakresy prac opisano na podstawie samych zdjęć –
 * do weryfikacji z klientem (szczególnie lokalizacje „okolice Warszawy”).
 */

export type ProjectCategoryId = "kompleksowe" | "pod-klucz" | "lazienki" | "z-projektem";

/** Kategorie filtrów. Kategoria bez żadnego projektu nie pokazuje się w filtrach. */
export const projectCategories: { id: ProjectCategoryId; label: string }[] = [
  { id: "kompleksowe", label: "Kompleksowe remonty" },
  { id: "pod-klucz", label: "Wykończenia pod klucz" },
  { id: "lazienki", label: "Łazienki" },
  { id: "z-projektem", label: "Remonty z projektem" },
];

/** Etap prac na zdjęciu – zdjęcia „przed” i „w trakcie” dostają w galerii etykietę. */
export type PhotoStage = "przed" | "w-trakcie";

export type ProjectPhoto = {
  src: StaticImageData;
  alt: string;
  stage?: PhotoStage;
};

export type Project = {
  /** Unikalny identyfikator (bez polskich znaków i spacji) */
  id: string;
  title: string;
  location: string;
  /** Główna kategoria – wyświetlana na karcie */
  category: ProjectCategoryId;
  /** Wszystkie kategorie, w których projekt pojawia się po filtrowaniu (razem z główną) */
  tags: ProjectCategoryId[];
  summary: string;
  scope: string[];
  photos: ProjectPhoto[];
};

export const projects: Project[] = [
  {
    id: "apartament-trawertyn",
    title: "Apartament w ciepłych, kamiennych tonach",
    location: "Warszawa",
    category: "pod-klucz",
    tags: ["pod-klucz", "lazienki"],
    summary:
      "Wykończenie apartamentu: kuchnia z wyspą, garderoba, zabudowy na wymiar i dwie łazienki z wielkoformatową okładziną w odcieniu trawertynu.",
    scope: [
      "Zabudowy na wymiar w kuchni, salonie i garderobie",
      "Dwie łazienki z wielkoformatową okładziną",
      "Podwójny prysznic i wolnostojąca wanna",
      "Oświetlenie wpuszczane i podświetlane wnęki",
    ],
    photos: [
      { src: apartment01, alt: "Kuchnia z wyspą obłożoną kamieniem i drewnianą zabudową na całą ścianę" },
      { src: apartment02, alt: "Salon z jasnymi sofami i drewnianą ścianą telewizyjną z kominkiem" },
      { src: apartment03, alt: "Garderoba z podświetlaną zabudową z ciemnego drewna" },
      { src: apartment04, alt: "Podwójna umywalka w kamiennym blacie z baterią w kolorze miedzi" },
      { src: apartment05, alt: "Podwójny prysznic z deszczownicami i odpływem liniowym" },
      { src: apartment06, alt: "Wolnostojąca wanna przy oknie w łazience z okładziną w odcieniu trawertynu" },
      { src: apartment07, alt: "Druga łazienka: umywalka nablatowa, podświetlane wnęki i prysznic za szkłem" },
      { src: apartment08, alt: "Strefa prysznica w trakcie prac: płyty wodoodporne i hydroizolacja", stage: "w-trakcie" },
    ],
  },
  {
    id: "mieszkanie-grafit",
    title: "Mieszkanie w grafitach i drewnie",
    location: "Warszawa",
    category: "kompleksowe",
    tags: ["kompleksowe", "lazienki"],
    summary:
      "Remont całego mieszkania: łazienka w grafitowych płytach wielkoformatowych, szafy na wymiar, nowa kuchnia i podświetlane sufity.",
    scope: [
      "Łazienka z płytami wielkoformatowymi i lustrem na całą ścianę",
      "Zabudowy na wymiar w sypialni i przedpokoju",
      "Kuchnia w grafitowych frontach",
      "Oświetlenie LED w suficie podwieszanym",
    ],
    photos: [
      { src: graphite01, alt: "Łazienka w grafitowych płytach z umywalką nablatową, lustrem na całą ścianę i wiszącymi lampami" },
      { src: graphite02, alt: "Prysznic za szklaną ścianką i szafka pod umywalką z ciemnego drewna" },
      { src: graphite03, alt: "Umywalka w jasnym blacie i strefa prysznica z wnęką na kosmetyki" },
      { src: graphite04, alt: "Przedpokój z ryflowaną zabudową i podświetleniem LED pod sufitem" },
      { src: graphite05, alt: "Sypialnia z szafami na wymiar do sufitu i tapicerowanym łóżkiem" },
      { src: graphite06, alt: "Kuchnia w grafitowych frontach z zabudowaną lodówką" },
      { src: graphite07, alt: "Salon połączony z kuchnią, podświetlany sufit i jasna drewniana podłoga" },
      { src: graphite08, alt: "Łazienka w trakcie prac: płyty wielkoformatowe i wnęka w strefie prysznica", stage: "w-trakcie" },
      { src: graphite09, alt: "Stelaż WC obłożony płytami w trakcie remontu łazienki", stage: "w-trakcie" },
    ],
  },
  {
    id: "mieszkanie-drewno",
    title: "Mieszkanie od stanu deweloperskiego",
    location: "Warszawa",
    category: "pod-klucz",
    tags: ["pod-klucz", "lazienki"],
    summary:
      "Wykończenie nowego mieszkania od gołych ścian: gładzie, podłogi, sypialnia z drewnianą zabudową i łazienka z podświetlanym lustrem.",
    scope: [
      "Gładzie, malowanie i podłogi w całym mieszkaniu",
      "Sypialnia z drewnianą zabudową i panelami ściennymi",
      "Łazienka z kabiną prysznicową i podświetlanym lustrem",
      "Instalacje przygotowane pod zabudowę kuchni",
    ],
    photos: [
      { src: woodFlat01, alt: "Sypialnia z drewnianą zabudową, tapicerowanym zagłówkiem i ścianą z geometrycznym wzorem" },
      { src: woodFlat02, alt: "Sypialnia widziana od wejścia: szafa z dębowymi frontami i panele ścienne" },
      { src: woodFlat03, alt: "Łazienka z okrągłym podświetlanym lustrem, czarną kabiną prysznicową i umywalką nablatową" },
      { src: woodFlat04, alt: "Salon po położeniu podłóg i malowaniu, przed montażem oświetlenia", stage: "w-trakcie" },
      { src: woodFlat05, alt: "Salon w trakcie prac wykończeniowych: zabezpieczona podłoga i materiały", stage: "w-trakcie" },
      { src: woodFlat06, alt: "Aneks kuchenny w trakcie prac: instalacje przygotowane pod zabudowę", stage: "w-trakcie" },
    ],
  },
  {
    id: "dom-z-poddaszem",
    title: "Dom z drewnem, cegłą i kolorowymi płytkami",
    location: "okolice Warszawy",
    category: "pod-klucz",
    tags: ["pod-klucz", "lazienki"],
    summary:
      "Wykończenie domu z użytkowym poddaszem: łazienka z płytkami we wzory, toaleta z drewnianą ścianą, sypialnia z cegłą i otwarta strefa dzienna.",
    scope: [
      "Łazienka z płytkami we wzory i wolnostojącą wanną",
      "Toaleta i prysznic pod skosami",
      "Sypialnia na poddaszu z ceglaną ścianą",
      "Drewniane podłogi i szafy na wymiar",
    ],
    photos: [
      { src: atticHouse01, alt: "Łazienka z płytkami w niebieskie wzory, wolnostojącą wanną i drewnianą podłogą" },
      { src: atticHouse02, alt: "Otwarty salon z kuchnią, szynoprzewodami z reflektorami i drewnianą podłogą" },
      { src: atticHouse03, alt: "Sypialnia na poddaszu z ceglaną ścianą i oknami dachowymi" },
      { src: atticHouse04, alt: "Toaleta pod skosem ze ścianą z drewnianych paneli, półkami i okrągłym lustrem" },
      { src: atticHouse05, alt: "Szafa z frontami ułożonymi w jodełkę pod belkowanym stropem" },
      { src: atticHouse06, alt: "Prysznic z płytkami w kolorze betonu i czarnym grzejnikiem drabinkowym" },
      { src: atticHouse07, alt: "Pokój na poddaszu z drewnianą podłogą i lampami w stylu industrialnym" },
    ],
  },
  {
    id: "adaptacja-poddasza",
    title: "Adaptacja poddasza na przestrzeń mieszkalną",
    location: "okolice Warszawy",
    category: "kompleksowe",
    tags: ["kompleksowe"],
    summary:
      "Z nieużytkowego strychu powstała jasna, ocieplona przestrzeń z odsłoniętymi belkami, oknami dachowymi i nowymi schodami.",
    scope: [
      "Ocieplenie i zabudowa skosów płytami g-k",
      "Okna dachowe i odsłonięta drewniana konstrukcja",
      "Schody z oświetleniem ściennym",
      "Instalacje, podłogi i malowanie",
    ],
    photos: [
      { src: attic01, alt: "Poddasze po adaptacji: otwarta przestrzeń z drewnianymi belkami, oknami dachowymi i jasną podłogą" },
      { src: attic02, alt: "Klatka schodowa na poddasze z drewnianymi schodami i kinkietami" },
      { src: attic03, alt: "Schody prowadzące na poddasze, widok z góry" },
      { src: attic04, alt: "Poddasze przed adaptacją: surowa więźba dachowa i betonowa posadzka", stage: "przed" },
      { src: attic05, alt: "Nieużytkowe poddasze z kominem i drewnianą konstrukcją dachu", stage: "przed" },
      { src: attic06, alt: "Ocieplenie skosów wełną mineralną i stelaż pod płyty gipsowo-kartonowe", stage: "w-trakcie" },
      { src: attic07, alt: "Skosy zabudowane płytami gipsowo-kartonowymi przed szpachlowaniem", stage: "w-trakcie" },
    ],
  },
  {
    id: "lazienka-marmur",
    title: "Jasna łazienka z wanną i prysznicem",
    location: "Warszawa",
    category: "lazienki",
    tags: ["lazienki"],
    summary:
      "Remont łazienki z wanną i prysznicem bez brodzika: płytki imitujące marmur, czarna armatura podtynkowa i podświetlenie LED.",
    scope: [
      "Hydroizolacja i odpływ liniowy",
      "Wanna w zabudowie z płytek",
      "Wnęki na kosmetyki w strefie prysznica",
      "Armatura podtynkowa w czerni",
    ],
    photos: [
      { src: marbleBathroom01, alt: "Jasna łazienka z płytkami imitującymi marmur, deszczownicą i podświetleniem LED" },
      { src: marbleBathroom02, alt: "Prysznic bez brodzika obok wanny w zabudowie z płytek" },
      { src: marbleBathroom03, alt: "Strefa prysznica z wnękami na kosmetyki i czarną armaturą" },
      { src: marbleBathroom04, alt: "Wanna w zabudowie z płytek i czarna bateria ścienna" },
      { src: marbleBathroom05, alt: "Układanie płytek ściennych w trakcie remontu łazienki", stage: "w-trakcie" },
      { src: marbleBathroom06, alt: "Posadzka i hydroizolacja przed montażem strefy prysznica", stage: "w-trakcie" },
    ],
  },
  {
    id: "dom-jodelka",
    title: "Dom z parkietem w jodełkę",
    location: "okolice Warszawy",
    category: "kompleksowe",
    tags: ["kompleksowe"],
    summary:
      "Remont domu: nowe instalacje, przygotowane podłoża i parkiet w jodełkę w jasnej strefie dziennej z ogrodem zimowym.",
    scope: [
      "Skucie starych posadzek i nowe instalacje",
      "Przygotowanie podłoża pod podłogi",
      "Parkiet w jodełkę",
      "Malowanie ścian i sufitów",
    ],
    photos: [
      { src: herringbone01, alt: "Pokój z ogrodem zimowym i parkietem w jodełkę" },
      { src: herringbone02, alt: "Salon z parkietem w jodełkę i białymi ścianami po remoncie" },
      { src: herringbone03, alt: "Wnętrze domu w trakcie remontu: skute posadzki i nowe instalacje", stage: "w-trakcie" },
      { src: herringbone04, alt: "Przygotowanie podłoża pod nowe podłogi w trakcie remontu", stage: "w-trakcie" },
    ],
  },
];
