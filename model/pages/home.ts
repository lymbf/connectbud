import type { StaticImageData } from "next/image";

import heroImage from "@/public/images/hero/salon.jpg";
import offerComplex from "@/public/images/oferta/kompleksowe-remonty.jpg";
import offerTurnkey from "@/public/images/oferta/wykonczenia-pod-klucz.jpg";
import offerDesign from "@/public/images/oferta/remonty-z-projektem.jpg";
import offerBathrooms from "@/public/images/oferta/remonty-lazienek.jpg";

import { quoteHref } from "@/model/data/navigation";

/*
 * Wszystkie teksty strony głównej, sekcja po sekcji.
 * Komponenty w components/pages/home/* tylko je wyświetlają – żeby zmienić tekst, edytuj go tutaj.
 */

export type Link = { label: string; href: string };

export type SectionIntro = {
  /** id sekcji – cel kotwic, np. /#oferta */
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
};

export type HeroContent = {
  image: StaticImageData;
  /** Krótkie hasła w cienkiej ramce nad blokiem z nagłówkiem */
  tags: string[];
  /** Nagłówek H1 – każdy element to osobna linia */
  title: string[];
  subtitle: string;
  quote: string;
  /** Przycisk w bloku hero – widoczny na telefonach i tabletach (na desktopie jest w headerze) */
  cta: Link & { note: string };
};

export type FeatureIcon = "builder" | "hourglass" | "ruler" | "handshake";

export type FeaturesContent = SectionIntro & {
  items: { icon: FeatureIcon; title: string; text: string }[];
  testimonial: { quote: string; author: string; project: string };
};

export type StatsContent = {
  label: string;
  items: { value: number; suffix: string; label: string }[];
};

export type OfferContent = SectionIntro & {
  items: {
    name: string;
    title: string;
    text: string;
    cta: Link;
    image: StaticImageData;
    imageAlt: string;
  }[];
};

export type BeforeAfterContent = SectionIntro & {
  tabsLabel: string;
  labels: { before: string; after: string };
  sliderLabel: string;
  caption: string;
  cta: Link;
};

export type ProcessContent = SectionIntro & {
  steps: { title: string; text: string }[];
};

export type FaqContent = SectionIntro & {
  contact: { title: string; text: string };
  items: { question: string; answer: string }[];
};

export type QuoteContent = SectionIntro & {
  benefits: string[];
  callLabel: string;
  areaNote: string;
  form: QuoteFormContent;
};

export type QuoteFormContent = {
  title: string;
  subtitle: string;
  fields: {
    name: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    email: { label: string; placeholder: string; optional: string };
    message: { label: string; placeholder: string; optional: string };
    consent: { label: string; policyLabel: string; policyHref: string };
  };
  submit: string;
  pending: string;
  note: string;
  success: { title: string; text: string; again: string };
};

export type HomePage = {
  meta: { title: string; description: string };
  hero: HeroContent;
  features: FeaturesContent;
  stats: StatsContent;
  offer: OfferContent;
  beforeAfter: BeforeAfterContent;
  process: ProcessContent;
  faq: FaqContent;
  quote: QuoteContent;
};

export const home: HomePage = {
  meta: {
    title: "ConnectBud — kompleksowe remonty i wykończenia wnętrz w Warszawie",
    description:
      "Remonty mieszkań, domów i łazienek w Warszawie i okolicach. Bez stresu, na czas, pod klucz. Bezpłatna wycena w 48 godzin. Zadzwoń: +48 609 888 456.",
  },

  hero: {
    image: heroImage,
    tags: ["Warszawa i okolice", "Kompleksowe remonty", "Wykończenia pod klucz"],
    title: ["Remontujemy Warszawę", "od ponad 10 lat."],
    subtitle: "Bez stresu. Na czas. Pod klucz.",
    quote: "Każdy remont prowadzimy tak, jakby to był nasz własny dom.",
    cta: { label: "Zamów darmową wycenę", href: quoteHref, note: "Odpowiadamy w ciągu 48h" },
  },

  features: {
    id: "wyrozniki",
    eyebrow: "Co nas wyróżnia",
    title: "Dlaczego klienci wybierają ConnectBud",
    subtitle:
      "Niezależnie od skali projektu, dbamy o to samo: dotrzymane terminy, precyzję wykonania i pełną przejrzystość kosztów.",
    items: [
      {
        icon: "builder",
        title: "Doświadczenie, które widać",
        text: "Setki zrealizowanych projektów nauczyły nas, gdzie kryją się problemy, zanim się pojawią.",
      },
      {
        icon: "hourglass",
        title: "Termin to nie sugestia",
        text: "Podajemy konkretną datę zakończenia prac i się jej trzymamy. Bez niespodzianek w kalendarzu.",
      },
      {
        icon: "ruler",
        title: "Dbamy o milimetry",
        text: "Każdy detal — od fugi po listwę przypodłogową — sprawdzamy jak we własnym domu.",
      },
      {
        icon: "handshake",
        title: "Nie wiesz, od czego zacząć? Wiemy, kogo polecić.",
        text: "Współpracujemy z siecią zaufanych architektów i projektantów. Jeśli nie masz jeszcze projektu, pomożemy znaleźć właściwą osobę — zanim w ogóle zaczniemy remont.",
      },
    ],
    // TODO: przed publikacją podmienić na prawdziwą opinię klienta (w makiecie zdanie było ucięte)
    testimonial: {
      quote:
        "Pełen profesjonalizm, super rozumieją klienta i jego wizję, a i sami potrafią wiele podpowiedzieć dzięki swojemu doświadczeniu.",
      author: "Anna K., Warszawa",
      project: "remont mieszkania pod klucz",
    },
  },

  // TODO: liczby do potwierdzenia z klientem
  stats: {
    label: "ConnectBud w liczbach",
    items: [
      { value: 10, suffix: "+ lat", label: "na rynku" },
      { value: 200, suffix: "+", label: "realizacji" },
      { value: 70, suffix: " km", label: "zasięg" },
      { value: 48, suffix: "h", label: "wycena" },
    ],
  },

  offer: {
    id: "oferta",
    eyebrow: "Nasza oferta",
    title: "Co możemy dla Ciebie zrobić?",
    subtitle:
      "Niezależnie od zakresu prac, działamy tak samo: z konkretnym planem, jasną komunikacją i dbałością o każdy detal.",
    items: [
      {
        name: "Kompleksowe remonty",
        title: "Remont od A do Z",
        text: "Bez żonglowania kilkoma firmami. Jeden punkt kontaktu, jeden harmonogram, zero niespodzianek — od wyburzeń przez elektrykę i hydraulikę aż po ostatnią lampę na suficie.",
        cta: { label: "Pokaż mi, jak to wygląda w praktyce", href: "/realizacje" },
        image: offerComplex,
        imageAlt: "Otwarty salon z kuchnią po kompleksowym remoncie: drewniana zabudowa, szara sofa, dębowa podłoga",
      },
      {
        name: "Wykończenia pod klucz",
        title: "Od gołych ścian do gotowego mieszkania",
        text: "Odbierasz mieszkanie w stanie deweloperskim? Prowadzimy je od gładzi na ścianach po ostatnią listwę i lampę — podłogi, glazura, łazienka, malowanie, oświetlenie. Wprowadzasz się z walizkami, nie z listą rzeczy do zrobienia.",
        cta: { label: "Zamów wycenę wykończenia", href: quoteHref },
        image: offerTurnkey,
        imageAlt: "Wykończony salon z ciemną ścianą telewizyjną z drewna i skórzanymi sofami",
      },
      {
        name: "Remonty z projektem",
        title: "Masz wizję? Dopracujemy ją do milimetra.",
        text: "Nie wiesz, jak przełożyć swoją wizję na realny plan? Współpracujemy z projektantami wnętrz — dostajesz spójną przestrzeń, zaplanowaną w najmniejszym detalu, zanim wbijemy pierwszy gwóźdź.",
        cta: { label: "Umów się na bezpłatną konsultację", href: quoteHref },
        image: offerDesign,
        imageAlt: "Dłoń trzymająca przezroczysty rysunek techniczny kuchni na tle marmurowego blatu i baterii",
      },
      {
        name: "Remonty łazienek",
        title: "Łazienka bez miesięcy chaosu",
        text: "Hydraulika, płytki, wyposażenie — wszystko w jednym zleceniu. Roboty trwają tygodnie, nie miesiące, a na końcu dostajesz dokładnie to, co miałeś w głowie.",
        cta: { label: "Zobacz nasze realizacje łazienek", href: "/realizacje#lazienki" },
        image: offerBathrooms,
        imageAlt: "Nowoczesna łazienka z podświetlanymi wnękami, umywalką nablatową i prysznicem za szklaną ścianką",
      },
    ],
  },

  beforeAfter: {
    id: "realizacje",
    eyebrow: "Przed i po",
    title: "Te same wnętrza przed remontem i po nim",
    subtitle:
      "Przesuń suwak, żeby porównać. To zdjęcia z naszych realizacji — robione w trakcie prac i po odbiorze.",
    tabsLabel: "Wybierz realizację",
    labels: { before: "Przed", after: "Po" },
    sliderLabel: "Porównanie przed i po",
    caption: "Przeciągnij suwak lub użyj strzałek na klawiaturze.",
    cta: { label: "Zamów darmową wycenę", href: quoteHref },
  },

  process: {
    id: "jak-pracujemy",
    eyebrow: "Jak pracujemy",
    title: "Jak wygląda remont krok po kroku?",
    subtitle: "Od pierwszego telefonu do odbioru wiesz, co się dzieje, kto za to odpowiada i kiedy skończymy.",
    steps: [
      {
        title: "Rozmowa",
        text: "Dzwonisz albo wypełniasz formularz. Pytamy o zakres prac, metraż i termin, który Ci odpowiada.",
      },
      {
        title: "Wycena w 48h",
        text: "Przygotowujemy indywidualną wycenę z rozpisanym zakresem. Wiesz, za co płacisz, zanim cokolwiek podpiszesz.",
      },
      {
        title: "Harmonogram",
        text: "Ustalamy datę rozpoczęcia i zakończenia prac. Jedna osoba prowadzi Twój remont i jest z Tobą w stałym kontakcie.",
      },
      {
        title: "Odbiór",
        text: "Sprawdzamy z Tobą każdy detal — od fugi po listwę przypodłogową. Odbierasz gotowe wnętrze.",
      },
    ],
  },

  // TODO: odpowiedzi do potwierdzenia z klientem (szczególnie zakup materiałów)
  faq: {
    id: "faq",
    eyebrow: "Najczęstsze pytania",
    title: "O co pytają nas klienci?",
    subtitle: "Zebraliśmy odpowiedzi na pytania, które słyszymy najczęściej przed rozpoczęciem remontu.",
    contact: {
      title: "Nie ma tu Twojego pytania?",
      text: "Zadzwoń — o zakresie, terminach i kosztach najszybciej porozmawiamy przez telefon.",
    },
    items: [
      {
        question: "Ile kosztuje remont mieszkania?",
        answer:
          "Każde wnętrze jest inne, dlatego nie podajemy cen z cennika. Po krótkiej rozmowie o zakresie prac przygotowujemy indywidualną wycenę — w ciągu 48 godzin i bez zobowiązań. Dostajesz rozpisany zakres, więc wiesz, za co płacisz, zanim cokolwiek podpiszesz.",
      },
      {
        question: "Na jakim terenie działacie?",
        answer:
          "Pracujemy w Warszawie i w promieniu około 70 km od miasta. Jeśli nie wiesz, czy Twoja miejscowość mieści się w tym zasięgu, po prostu zapytaj.",
      },
      {
        question: "Jak szybko możecie zacząć?",
        answer:
          "Termin startu ustalamy przy wycenie — zależy od zakresu prac i naszego kalendarza. Zawsze podajemy konkretną datę rozpoczęcia i zakończenia, a potem się jej trzymamy.",
      },
      {
        question: "Czy muszę mieć projekt wnętrza?",
        answer:
          "Nie. Jeśli masz projekt, realizujemy go co do detalu. Jeśli go nie masz, a jest potrzebny, polecimy sprawdzonego architekta lub projektanta, z którym współpracujemy. Przy prostszych remontach często wystarczy rozmowa i konkretny plan.",
      },
      {
        question: "Kto kupuje materiały?",
        answer:
          "Jak Ci wygodniej. Pomagamy dobrać materiały do budżetu i stylu wnętrza, a potem możemy je zamówić albo pracować na tych, które kupisz sam.",
      },
      {
        question: "Kto będzie prowadził mój remont?",
        answer:
          "Przez cały remont masz jedną osobę kontaktową. Koordynuje ekipy — od elektryków po glazurników — i na bieżąco informuje Cię o postępach. Nie musisz dzwonić do kilku firm.",
      },
      {
        question: "Co, jeśli w trakcie prac wyjdzie coś nieprzewidzianego?",
        answer:
          "Przy starszych instalacjach i ścianach to się zdarza. Wtedy od razu o tym mówimy, pokazujemy problem i proponujemy rozwiązanie wraz z kosztem — zanim cokolwiek zrobimy. Bez niespodzianek na końcowym rachunku.",
      },
    ],
  },

  quote: {
    id: "kontakt",
    eyebrow: "Darmowa wycena",
    title: "Ile będzie kosztował Twój remont?",
    subtitle:
      "Opisz krótko, co chcesz zrobić. Przygotujemy indywidualną wycenę w ciągu 48 godzin — bezpłatnie i bez zobowiązań.",
    benefits: [
      "Indywidualna wycena w ciągu 48 godzin",
      "Rozpisany zakres prac zamiast kwoty „na oko”",
      "Jedna osoba kontaktowa przez cały remont",
    ],
    callLabel: "Wolisz porozmawiać? Zadzwoń",
    areaNote: "do 70 km od Warszawy",
    form: {
      title: "Zapytaj o wycenę",
      subtitle: "Pola oznaczone gwiazdką są wymagane. Odpowiadamy w ciągu 48 godzin.",
      fields: {
        name: { label: "Imię i nazwisko", placeholder: "Jan Kowalski" },
        phone: { label: "Telefon", placeholder: "600 123 456" },
        email: { label: "E-mail", placeholder: "jan@przyklad.pl", optional: "opcjonalnie" },
        message: {
          label: "Co chcesz wyremontować i gdzie?",
          placeholder: "Np. remont łazienki 6 m², Warszawa – Mokotów",
          optional: "opcjonalnie",
        },
        consent: {
          label: "Zgadzam się na kontakt w sprawie wyceny. Szczegóły w",
          policyLabel: "polityce prywatności",
          policyHref: "/polityka-prywatnosci",
        },
      },
      submit: "Wyślij zapytanie",
      pending: "Wysyłanie…",
      note: "Bez zobowiązań. Twoje dane wykorzystamy tylko do odpowiedzi na to zapytanie.",
      success: {
        title: "Dziękujemy, zapytanie dotarło.",
        text: "Odezwiemy się w ciągu 48 godzin. Jeśli sprawa jest pilna, zadzwoń:",
        again: "Wyślij kolejne zapytanie",
      },
    },
  },
};

/** Komunikaty walidacji formularza – używane po stronie serwera (app/actions/quote.ts). */
export const quoteValidation = {
  name: "Wpisz imię i nazwisko.",
  phone: "Wpisz numer telefonu, np. 600 123 456.",
  phoneInvalid: "Numer telefonu powinien mieć co najmniej 9 cyfr.",
  emailInvalid: "Sprawdź adres e-mail — brakuje w nim znaku @ lub domeny.",
  consent: "Zaznacz zgodę na kontakt, żebyśmy mogli odpowiedzieć.",
  summary: "Formularz nie został wysłany. Popraw zaznaczone pola.",
};
