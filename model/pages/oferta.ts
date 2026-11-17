import type { StaticImageData } from "next/image";

import heroComplex from "@/public/images/hero/oferta-kompleksowe-remonty.jpg";
import heroTurnkey from "@/public/images/hero/oferta-wykonczenia-pod-klucz.jpg";
import heroBathrooms from "@/public/images/hero/oferta-remonty-lazienek.jpg";

import { quoteSectionId, servicePath, type ServiceSlug } from "@/model/data/navigation";
import type { ProjectCategoryId } from "@/model/data/projects";
import {
  home,
  type BeforeAfterContent,
  type FaqContent,
  type FeatureIcon,
  type ProcessContent,
  type QuoteContent,
  type SectionIntro,
} from "@/model/pages/home";
import { realizacje, type GalleryContent } from "@/model/pages/realizacje";
import type { Link, PageHeroContent, PageHeroCta } from "@/model/pages/shared";

/*
 * Teksty podstron usług /oferta/<slug> – stron docelowych kampanii Google Ads.
 * Jeden szablon (app/oferta/[slug]/page.tsx), trzy strony. Wspólny rdzeń przekazu (wycena w 48h,
 * jedna osoba kontaktowa, rozpisany zakres, proces, formularz) – różni się „wejście”: sytuacja klienta,
 * zakres prac, realizacje i pytania.
 *
 * Nazwy i adresy usług: model/data/navigation.ts (serviceNav).
 *
 * TODO: do potwierdzenia z klientem – zakresy prac, odpowiedzi w FAQ (szczególnie czasy prac
 * i korzystanie z mieszkania w trakcie) oraz teksty sekcji „Z projektem czy bez?” (poza zatwierdzoną kartą
 * o sieci architektów). Bez potwierdzenia nie dopisujemy liczb, czasów realizacji ani gwarancji.
 */

/** Dla kogo jest usługa i co obejmuje. */
export type ServiceIntroContent = {
  id: string;
  eyebrow: string;
  title: string;
  /** Sytuacja klienta – 2–3 zdania pod tytułem */
  situation: string;
  scopeTitle: string;
  /** Zakres prac – lista z haczykami */
  scope: string[];
  /** Zdanie pod listą zakresu */
  scopeNote: string;
  cta: Link;
};

/** Realizacje usługi – karty z podglądem zdjęć w oknie, bez wychodzenia ze strony. */
export type ServiceProjectsContent = SectionIntro & {
  /** Kategoria galerii – cel linku „Zobacz wszystkie” (/realizacje#<kategoria>) */
  category: ProjectCategoryId;
  /** id realizacji z model/data/projects.ts w kolejności wyświetlania; cover – numer zdjęcia na okładce */
  items: { id: string; cover?: number }[];
  allLink: Link;
  /** Odmiana słowa „zdjęcie” po liczbie: [1, 2–4, 5+] */
  photoForms: [string, string, string];
  openLabel: string;
  dialog: GalleryContent["dialog"];
};

/** „Z projektem czy bez?” – sekcja #z-projektem (cel linków „Remonty z projektem”). */
export type DesignOptionsContent = SectionIntro & {
  items: { icon: FeatureIcon; title: string; text: string }[];
  cta: Link;
};

/** Karty pozostałych usług na dole podstrony usługi. */
export type RelatedServicesContent = {
  id: string;
  eyebrow: string;
  title: string;
  linkLabel: string;
};

export type ServicePage = {
  meta: { title: string; description: string };
  /** Nazwa usługi w danych strukturalnych (schema.org Service) */
  serviceType: string;
  /** Karta tej usługi w sekcji „Pozostałe usługi” na innych podstronach */
  card: { title: string; image: StaticImageData };
  hero: PageHeroContent & { cta: PageHeroCta };
  intro: ServiceIntroContent;
  /** Przed i po – tylko tam, gdzie są pary zdjęć z tej usługi (łazienki) */
  beforeAfter?: BeforeAfterContent;
  projects: ServiceProjectsContent;
  /** Tylko kompleksowe remonty – „Remonty z projektem” nie mają osobnej strony */
  design?: DesignOptionsContent;
  process: ProcessContent;
  faq: FaqContent;
  quote: QuoteContent;
};

/* ------------------------------------------------------------------------------------------------
 * Elementy wspólne
 * ---------------------------------------------------------------------------------------------- */

/** Formularz wyceny na tej samej podstronie */
const quoteAnchor = (slug: ServiceSlug) => `${servicePath(slug)}#${quoteSectionId}`;

const heroCta = (slug: ServiceSlug): PageHeroCta => ({
  label: "Zamów darmową wycenę",
  href: quoteAnchor(slug),
  callLabel: "Zadzwoń",
});

const heroAside = "Mieszkania i domy · Warszawa i okolice";

const introCta = (slug: ServiceSlug): Link => ({ label: "Zamów bezpłatną wycenę", href: quoteAnchor(slug) });

/** Karty realizacji i okno podglądu – teksty jak w galerii, a „Chcę podobny remont” prowadzi do formularza na tej stronie */
const projectsCommon = (slug: ServiceSlug) => ({
  photoForms: realizacje.gallery.photoForms,
  openLabel: realizacje.gallery.openLabel,
  dialog: { ...realizacje.gallery.dialog, cta: { ...realizacje.gallery.dialog.cta, href: quoteAnchor(slug) } },
});

const faqCommon = {
  id: "faq",
  eyebrow: "Najczęstsze pytania",
  contact: home.faq.contact,
};

/** Formularz jak na stronie głównej – inny tytuł i przykład w polu opisu (podpowiada, co warto napisać) */
const quoteFor = (title: string, subtitle: string, messagePlaceholder: string): QuoteContent => ({
  ...home.quote,
  title,
  subtitle,
  form: {
    ...home.quote.form,
    fields: {
      ...home.quote.form.fields,
      message: { ...home.quote.form.fields.message, placeholder: messagePlaceholder },
    },
  },
});

export const relatedServices: RelatedServicesContent = {
  id: "pozostale-uslugi",
  eyebrow: "Nasza oferta",
  title: "Pozostałe usługi",
  linkLabel: "Zobacz szczegóły",
};

/* ------------------------------------------------------------------------------------------------
 * Strony usług
 * ---------------------------------------------------------------------------------------------- */

export const servicePages: Record<ServiceSlug, ServicePage> = {
  "kompleksowe-remonty": {
    meta: {
      title: "Kompleksowy remont mieszkania w Warszawie",
      description:
        "Kompleksowy remont mieszkania w Warszawie i okolicach — od wyburzeń i instalacji po malowanie. Jedna osoba kontaktowa i bezpłatna wycena w 48 godzin.",
    },
    serviceType: "Kompleksowy remont mieszkania",
    card: { title: "Remont od A do Z", image: heroComplex },

    hero: {
      image: heroComplex,
      imagePosition: "center 45%",
      breadcrumb: "Kompleksowe remonty",
      path: servicePath("kompleksowe-remonty"),
      eyebrow: "Kompleksowe remonty",
      title: ["Kompleksowy remont", "mieszkania w Warszawie"],
      subtitle:
        "Prowadzimy cały remont: od wyburzeń przez instalacje po ostatnią lampę. Jedna osoba kontaktowa i wycena z rozpisanym zakresem w 48 godzin.",
      aside: heroAside,
      cta: heroCta("kompleksowe-remonty"),
    },

    intro: {
      id: "zakres-prac",
      eyebrow: "Dla kogo",
      title: "Mieszkanie do remontu od podstaw?",
      situation:
        "Mieszkanie z rynku wtórnego albo wnętrze po latach użytkowania: stare instalacje, krzywe ściany, układ, który przestał pasować do Twojego życia. Taki remont to wiele prac i kilka ekip, które muszą się zazębiać. Bierzemy to na siebie — planujemy kolejność prac i prowadzimy wszystko według jednego harmonogramu.",
      scopeTitle: "Co obejmuje kompleksowy remont",
      // TODO: zakres do potwierdzenia z klientem
      scope: [
        "Wyburzenia i demontaże",
        "Nowe instalacje elektryczne",
        "Instalacje wodno-kanalizacyjne",
        "Tynki i gładzie",
        "Ścianki i zabudowy z płyt g-k",
        "Podłogi i listwy",
        "Łazienka i płytki",
        "Malowanie ścian i sufitów",
        "Montaż drzwi",
        "Oświetlenie i osprzęt elektryczny",
      ],
      scopeNote:
        "Zakres dopasowujemy do mieszkania. W wycenie każdą pracę rozpisujemy osobno, więc wiesz, za co płacisz, zanim cokolwiek podpiszesz.",
      cta: introCta("kompleksowe-remonty"),
    },

    projects: {
      id: "realizacje",
      eyebrow: "Realizacje",
      title: "Jak wyglądają nasze kompleksowe remonty?",
      subtitle:
        "Wybrane mieszkania i domy, które wyremontowaliśmy kompleksowo. Kliknij kartę, żeby zobaczyć wszystkie zdjęcia — także z placu budowy.",
      category: "kompleksowe",
      // okładka mieszkania w grafitach: salon z kuchnią (całe mieszkanie, a nie sama łazienka)
      items: [{ id: "mieszkanie-grafit", cover: 6 }, { id: "adaptacja-poddasza" }, { id: "dom-jodelka" }],
      allLink: { label: "Zobacz wszystkie kompleksowe remonty", href: "/realizacje#kompleksowe" },
      ...projectsCommon("kompleksowe-remonty"),
    },

    // TODO: teksty kart 1 i 3 na podstawie odpowiedzi z FAQ strony głównej – do potwierdzenia z klientem;
    // karta 2 to zatwierdzony tekst z sekcji „Co nas wyróżnia”
    design: {
      id: "z-projektem",
      eyebrow: "Remonty z projektem",
      title: "Z projektem czy bez?",
      subtitle:
        "Nie każdy remont wymaga projektu wnętrza. A jeśli Twój go wymaga, nie musisz szukać projektanta na własną rękę.",
      items: [
        {
          icon: "ruler",
          title: "Masz projekt wnętrza",
          text: "Realizujemy go co do detalu. Wycenę przygotowujemy na podstawie projektu, z zakresem rozpisanym na konkretne prace.",
        },
        {
          icon: "handshake",
          title: "Nie wiesz, od czego zacząć? Wiemy, kogo polecić.",
          text: "Współpracujemy z siecią zaufanych architektów i projektantów. Jeśli nie masz jeszcze projektu, pomożemy znaleźć właściwą osobę — zanim w ogóle zaczniemy remont.",
        },
        {
          icon: "builder",
          title: "Wystarczy Ci konkretny plan",
          text: "Przy prostszych remontach często wystarczy rozmowa i dobrze rozpisany zakres prac. Ustalamy go razem z Tobą przy wycenie.",
        },
      ],
      cta: { label: "Zapytaj o remont z projektem", href: quoteAnchor("kompleksowe-remonty") },
    },

    // wspólny rdzeń – ten sam proces co na stronie głównej
    process: home.process,

    // TODO: odpowiedzi do potwierdzenia z klientem (czas remontu, mieszkanie w trakcie, instalacje, materiały);
    // orientacyjny czas remontu dopisać dopiero po potwierdzeniu
    faq: {
      ...faqCommon,
      title: "Co warto wiedzieć przed remontem mieszkania?",
      subtitle: "Odpowiedzi na pytania, które najczęściej słyszymy przed kompleksowym remontem.",
      items: [
        {
          question: "Ile kosztuje kompleksowy remont mieszkania?",
          answer:
            "O koszcie decydują metraż, stan instalacji i to, co chcesz zmienić — dlatego nie podajemy cen z cennika. Po krótkiej rozmowie przygotowujemy indywidualną wycenę w ciągu 48 godzin, bezpłatnie i bez zobowiązań. Każdą pracę rozpisujemy w niej osobno.",
        },
        {
          question: "Ile trwa kompleksowy remont mieszkania?",
          answer:
            "To zależy od metrażu i zakresu: inaczej wygląda odświeżenie z nowymi podłogami, a inaczej remont z wymianą instalacji i zmianą układu ścian. Konkretną datę rozpoczęcia i zakończenia podajemy w harmonogramie, zanim zaczniemy — i się jej trzymamy.",
        },
        {
          question: "Czy mogę mieszkać w mieszkaniu w trakcie remontu?",
          answer:
            "Przy remoncie całego mieszkania raczej to odradzamy. Skuwanie i szlifowanie to pył i hałas, a wymiana instalacji oznacza przerwy w dostępie do wody i prądu. Jeśli nie masz innej możliwości, powiedz nam o tym przy pierwszej rozmowie — sprawdzimy, czy da się podzielić prace na etapy.",
        },
        {
          question: "Czy wymieniacie instalacje elektryczne i wodno-kanalizacyjne?",
          answer:
            "Tak — w starszych mieszkaniach to często pierwszy krok remontu. Instalacje wymieniamy przed tynkami i podłogami, żeby później niczego nie kuć. Zakres wymiany ustalamy z Tobą przy wycenie.",
        },
        {
          question: "Co, jeśli po skuciu ścian wyjdzie coś nieprzewidzianego?",
          answer:
            "W starych mieszkaniach to się zdarza: skorodowane rury, stare przewody, nierówne podłoża. Wtedy od razu Ci o tym mówimy, pokazujemy problem i proponujemy rozwiązanie razem z kosztem — zanim cokolwiek zrobimy.",
        },
        {
          question: "Kto kupuje materiały do remontu?",
          answer:
            "Jak wolisz: możesz kupić je samodzielnie albo zostawić zamówienia nam. W obu przypadkach pomagamy dobrać materiały do budżetu i stylu wnętrza.",
        },
        {
          question: "Kto będzie prowadził mój remont?",
          answer:
            "Jedna osoba kontaktowa — od pierwszych wyburzeń do odbioru. Koordynuje ekipy, pilnuje harmonogramu i na bieżąco informuje Cię o postępach, więc nie musisz dzwonić do kilku firm.",
        },
      ],
    },

    quote: quoteFor(
      "Ile będzie kosztował remont Twojego mieszkania?",
      "Opisz krótko mieszkanie i to, co chcesz zmienić. Przygotujemy indywidualną wycenę w ciągu 48 godzin — bezpłatnie i bez zobowiązań.",
      "Np. remont mieszkania 55 m² z wymianą instalacji, Warszawa – Wola",
    ),
  },

  "wykonczenia-pod-klucz": {
    meta: {
      title: "Wykończenie mieszkania pod klucz Warszawa",
      description:
        "Wykończenie mieszkania pod klucz w Warszawie i okolicach: od stanu deweloperskiego do mieszkania gotowego do wprowadzki. Bezpłatna wycena w 48 godzin.",
    },
    serviceType: "Wykończenie mieszkania pod klucz",
    card: { title: "Od gołych ścian do gotowego mieszkania", image: heroTurnkey },

    hero: {
      image: heroTurnkey,
      imagePosition: "center 55%",
      breadcrumb: "Wykończenia pod klucz",
      path: servicePath("wykonczenia-pod-klucz"),
      eyebrow: "Wykończenia pod klucz",
      title: ["Wykończenie mieszkania", "pod klucz w Warszawie"],
      subtitle:
        "Od stanu deweloperskiego do mieszkania gotowego do wprowadzki. Wycena z rozpisanym zakresem w 48 godzin.",
      aside: heroAside,
      cta: heroCta("wykonczenia-pod-klucz"),
    },

    intro: {
      id: "zakres-prac",
      eyebrow: "Dla kogo",
      title: "Odbierasz mieszkanie od dewelopera?",
      situation:
        "Masz klucze do nowego mieszkania i chcesz się do niego wprowadzić — bez szukania kilku ekip i pilnowania, kto wchodzi po kim. Bierzemy na siebie całe wykończenie, od gładzi po ostatnią listwę i lampę, a Ty dostajesz jeden konkretny termin oddania mieszkania.",
      scopeTitle: "Co obejmuje wykończenie pod klucz",
      // TODO: zakres do potwierdzenia z klientem; zabudowy i kuchnie na wymiar – decyzja klienta, na razie bez nich
      scope: [
        "Gładzie i malowanie",
        "Podłogi i listwy przypodłogowe",
        "Łazienka pod klucz",
        "Płytki ścienne i podłogowe",
        "Drzwi wewnętrzne",
        "Oświetlenie, gniazdka i włączniki",
      ],
      scopeNote:
        "Zakres ustalamy pod Twoje mieszkanie i budżet. W wycenie każdą pracę rozpisujemy osobno, więc wiesz, za co płacisz, zanim cokolwiek podpiszesz.",
      cta: introCta("wykonczenia-pod-klucz"),
    },

    projects: {
      id: "realizacje",
      eyebrow: "Realizacje",
      title: "Jak wyglądają wnętrza, które wykończyliśmy?",
      subtitle:
        "Wybrane realizacje — od stanu deweloperskiego do gotowego wnętrza. Kliknij kartę, żeby zobaczyć wszystkie zdjęcia, także z placu budowy.",
      category: "pod-klucz",
      // okładki inne niż zdjęcie w nagłówku strony: łazienka (mieszkanie od dewelopera) i salon z kuchnią (dom)
      items: [{ id: "apartament-trawertyn" }, { id: "mieszkanie-drewno", cover: 2 }, { id: "dom-z-poddaszem", cover: 1 }],
      allLink: { label: "Zobacz wszystkie wykończenia pod klucz", href: "/realizacje#pod-klucz" },
      ...projectsCommon("wykonczenia-pod-klucz"),
    },

    process: home.process,

    // TODO: odpowiedzi do potwierdzenia z klientem (start przed odbiorem kluczy, czas wykończenia, pomoc
    // w wyborze materiałów); pytanie o VAT 8% dopisać dopiero po potwierdzeniu
    faq: {
      ...faqCommon,
      title: "Co warto wiedzieć przed wykończeniem mieszkania?",
      subtitle: "Odpowiedzi na pytania, które najczęściej słyszymy od osób odbierających mieszkanie od dewelopera.",
      items: [
        {
          question: "Ile kosztuje wykończenie mieszkania pod klucz?",
          answer:
            "Zależy od metrażu, zakresu prac i standardu materiałów, dlatego nie podajemy cen z cennika. Po krótkiej rozmowie przygotowujemy indywidualną wycenę w ciągu 48 godzin, bezpłatnie i bez zobowiązań — z każdą pracą rozpisaną osobno.",
        },
        {
          question: "Kiedy się odezwać: przed odbiorem kluczy czy po?",
          answer:
            "Najlepiej jeszcze przed odbiorem. Będzie czas na wycenę i ustalenie terminu, a prace mogą ruszyć niedługo po tym, jak dostaniesz klucze.",
        },
        {
          question: "Ile trwa wykończenie mieszkania?",
          answer:
            "Zależy od metrażu, zakresu prac i czasu oczekiwania na materiały, np. drzwi czy płytki na zamówienie. Konkretną datę zakończenia podajemy w harmonogramie przed rozpoczęciem prac — i się jej trzymamy.",
        },
        {
          question: "Czy pomagacie w wyborze materiałów?",
          answer:
            "Tak. Doradzamy przy wyborze płytek, podłóg, drzwi i oświetlenia tak, żeby pasowały do budżetu i stylu wnętrza. Materiały możemy zamówić sami albo pracować na tych, które kupisz samodzielnie.",
        },
        {
          question: "Czy wykończycie mieszkanie według projektu architekta?",
          answer:
            "Tak — projekt realizujemy co do detalu. Jeśli go nie masz, a chcesz mieć, polecimy sprawdzonego architekta lub projektanta, z którym współpracujemy.",
        },
        {
          question: "Kto będzie koordynował prace?",
          answer:
            "Jedna osoba kontaktowa, od pierwszego dnia do odbioru. Układa kolejność prac, pilnuje harmonogramu i na bieżąco informuje Cię o postępach — nie musisz koordynować kilku ekip.",
        },
        {
          question: "Czy dojedziecie na nowe osiedle pod Warszawą?",
          answer:
            "Pracujemy w Warszawie i w promieniu około 70 km od miasta, więc także na osiedlach w okolicznych miejscowościach. Jeśli nie wiesz, czy Twoja mieści się w tym zasięgu, po prostu zapytaj.",
        },
      ],
    },

    quote: quoteFor(
      "Ile będzie kosztowało wykończenie Twojego mieszkania?",
      "Napisz, jaki ma metraż i kiedy odbierasz klucze. Przygotujemy indywidualną wycenę w ciągu 48 godzin — bezpłatnie i bez zobowiązań.",
      "Np. mieszkanie 48 m² w stanie deweloperskim, odbiór kluczy w marcu, Warszawa – Białołęka",
    ),
  },

  "remonty-lazienek": {
    meta: {
      title: "Remont łazienki Warszawa — wycena w 48 h",
      description:
        "Remont łazienki w Warszawie i okolicach: hydraulika, hydroizolacja, płytki i biały montaż w jednym zleceniu. Bezpłatna wycena w 48 godzin.",
    },
    serviceType: "Remont łazienki",
    card: { title: "Wszystkie prace w jednym zleceniu", image: heroBathrooms },

    hero: {
      image: heroBathrooms,
      // dół kadru: wanna i czarna armatura obok bloku z tytułem
      imagePosition: "center bottom",
      breadcrumb: "Remonty łazienek",
      path: servicePath("remonty-lazienek"),
      eyebrow: "Remonty łazienek",
      title: ["Remont łazienki", "w Warszawie"],
      subtitle:
        "Hydraulika, hydroizolacja, płytki i biały montaż w jednym zleceniu, z jedną osobą kontaktową. Wycena w 48 godzin.",
      aside: heroAside,
      cta: heroCta("remonty-lazienek"),
    },

    intro: {
      id: "zakres-prac",
      eyebrow: "Dla kogo",
      title: "Planujesz remont łazienki?",
      situation:
        "Łazienka to wiele różnych prac na małej powierzchni: hydraulika, hydroizolacja, płytki, zabudowy i biały montaż. Gdy każdą robi ktoś inny, terminy się rozjeżdżają, a przy problemie trudno ustalić, kto za niego odpowiada. U nas cały remont prowadzi jedna osoba kontaktowa — od demontażu po ostatni silikon.",
      scopeTitle: "Co obejmuje remont łazienki",
      // TODO: zakres na podstawie zdjęć z realizacji – do potwierdzenia z klientem (szczególnie płytki wielkoformatowe)
      scope: [
        "Demontaż starej łazienki",
        "Hydraulika i stelaże podtynkowe",
        "Płyty wodoodporne i hydroizolacja",
        "Płytki, także wielkoformatowe",
        "Odpływy liniowe",
        "Armatura podtynkowa",
        "Wnęki i zabudowy",
        "Szklane ścianki prysznicowe",
        "Biały montaż",
      ],
      scopeNote:
        "W wycenie rozpisujemy każdą pracę osobno — od demontażu po biały montaż — więc wiesz, za co płacisz, zanim cokolwiek podpiszesz.",
      cta: introCta("remonty-lazienek"),
    },

    // najmocniejszy dowód dla łazienek – od razu po zakresie prac
    beforeAfter: {
      ...realizacje.beforeAfter,
      title: "To samo ujęcie: w trakcie prac i po odbiorze",
      subtitle:
        "Przesuń suwak, żeby porównać. Widać na nim to, czego po remoncie już nie zobaczysz: hydroizolację, płyty i przygotowanie pod armaturę.",
      cta: { label: "Zamów darmową wycenę", href: quoteAnchor("remonty-lazienek") },
    },

    projects: {
      id: "realizacje",
      eyebrow: "Realizacje",
      title: "Jak wyglądają nasze łazienki?",
      subtitle:
        "Trzy różne łazienki z naszych realizacji. Kliknij kartę, żeby zobaczyć wszystkie zdjęcia — także z etapu hydroizolacji i układania płytek.",
      category: "lazienki",
      items: [{ id: "lazienka-marmur" }, { id: "mieszkanie-grafit" }, { id: "dom-z-poddaszem" }],
      allLink: { label: "Zobacz wszystkie realizacje łazienek", href: "/realizacje#lazienki" },
      ...projectsCommon("remonty-lazienek"),
    },

    process: home.process,

    // TODO: odpowiedzi do potwierdzenia z klientem – szczególnie „tygodnie, nie miesiące”, zakupy i korzystanie
    // z mieszkania w trakcie; pytanie o gwarancję dopisać dopiero po potwierdzeniu
    faq: {
      ...faqCommon,
      title: "Co warto wiedzieć przed remontem łazienki?",
      subtitle: "Odpowiedzi na pytania, które najczęściej słyszymy przed remontem łazienki.",
      items: [
        {
          question: "Ile kosztuje remont łazienki?",
          answer:
            "Zależy od metrażu, zakresu prac — na przykład tego, czy zamieniasz wannę na prysznic albo przenosisz odpływy — i od wybranych materiałów. Dlatego nie podajemy cen z cennika. Po krótkiej rozmowie przygotowujemy indywidualną wycenę w ciągu 48 godzin, z każdą pracą rozpisaną osobno.",
        },
        {
          question: "Ile trwa remont łazienki?",
          answer:
            "Zwykle to kwestia tygodni, nie miesięcy. Dokładny czas zależy od zakresu i przerw technologicznych — hydroizolacja i kleje muszą wyschnąć, zanim przejdziemy dalej. Datę zakończenia podajemy w harmonogramie przed rozpoczęciem prac.",
        },
        {
          question: "Kto kupuje płytki i armaturę?",
          answer:
            "Jak wolisz: możesz wybrać i kupić je samodzielnie albo zostawić zamówienia nam. Pomagamy dobrać płytki, armaturę i ceramikę do budżetu i stylu łazienki.",
        },
        {
          question: "Czy mogę korzystać z mieszkania w trakcie remontu łazienki?",
          answer:
            "Tak, ale łazienka przez czas prac jest wyłączona z użytku, a przy podłączeniach zdarzają się krótkie przerwy w dostawie wody. Jeśli to jedyna łazienka w mieszkaniu, powiedz nam o tym przy pierwszej rozmowie — uwzględnimy to w harmonogramie.",
        },
        {
          question: "Co, jeśli pod starymi płytkami wyjdzie coś nieprzewidzianego?",
          answer:
            "W starszych łazienkach to się zdarza: skorodowane rury, zawilgocone ściany, nierówne podłoże. Wtedy od razu Ci o tym mówimy, pokazujemy problem i proponujemy rozwiązanie razem z kosztem — zanim cokolwiek zrobimy.",
        },
        {
          question: "Kto będzie prowadził remont łazienki?",
          answer:
            "Jedna osoba kontaktowa, która koordynuje wszystkie prace — od hydrauliki po biały montaż — i na bieżąco informuje Cię o postępach. Nie musisz osobno szukać hydraulika i glazurnika.",
        },
      ],
    },

    quote: quoteFor(
      "Ile będzie kosztował remont Twojej łazienki?",
      "Napisz, jaki ma metraż i co chcesz w niej zmienić. Przygotujemy indywidualną wycenę w ciągu 48 godzin — bezpłatnie i bez zobowiązań.",
      "Np. łazienka 5 m², prysznic zamiast wanny, Warszawa – Mokotów",
    ),
  },
};
