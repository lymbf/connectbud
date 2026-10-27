import heroImage from "@/public/images/hero/kontakt.jpg";

import { home, type QuoteFormContent, type SectionIntro } from "@/model/pages/home";
import type { PageHeroContent } from "@/model/pages/shared";

/*
 * Teksty podstrony Kontakt (/kontakt). Telefon, e-mail, godziny i NIP są w model/data/company.ts,
 * miejscowości na mapie w model/data/serviceArea.ts.
 */

export type ContactDetailsContent = {
  id: string;
  title: string;
  phoneLabel: string;
  phoneNote: string;
  emailLabel: string;
  hoursLabel: string;
  areaLabel: string;
  areaText: string;
  nipLabel: string;
  nextTitle: string;
  nextSteps: { title: string; text: string }[];
  /** id formularza – cel linków „Zamów darmową wycenę” z podstron (/kontakt#formularz) */
  formId: string;
  form: QuoteFormContent;
};

export type ServiceAreaContent = SectionIntro & {
  mapLabel: string;
  centerLabel: string;
  ringUnit: string;
  riverLabel: string;
  note: string;
};

export type ContactPage = {
  meta: { title: string; description: string };
  hero: PageHeroContent;
  contact: ContactDetailsContent;
  area: ServiceAreaContent;
};

export const kontakt: ContactPage = {
  meta: {
    title: "Kontakt",
    description:
      "Zadzwoń lub wypełnij formularz — przygotujemy bezpłatną wycenę remontu w ciągu 48 godzin. Warszawa i okolice do 70 km.",
  },

  hero: {
    image: heroImage,
    imagePosition: "center 55%",
    breadcrumb: "Kontakt",
    path: "/kontakt",
    eyebrow: "Kontakt",
    title: ["Zacznijmy rozmowę"],
    subtitle: "Wypełnij formularz albo zadzwoń. Bezpłatną wycenę przygotujemy w ciągu 48 godzin.",
    aside: "Warszawa i okolice — do 70 km od miasta",
  },

  contact: {
    id: "dane-kontaktowe",
    title: "Porozmawiajmy o Twoim remoncie",
    phoneLabel: "Telefon",
    phoneNote: "Szczegóły najszybciej ustalisz przez telefon.",
    emailLabel: "E-mail",
    hoursLabel: "Godziny kontaktu",
    areaLabel: "Obszar działania",
    areaText: "Warszawa i okolice — do 70 km od miasta",
    nipLabel: "NIP",
    nextTitle: "Co dzieje się po wysłaniu zapytania?",
    nextSteps: [
      { title: "Oddzwaniamy", text: "Dopytujemy o zakres prac, metraż i termin, który Ci odpowiada." },
      { title: "Przygotowujemy wycenę", text: "W ciągu 48 godzin dostajesz indywidualną wycenę z rozpisanym zakresem prac." },
      { title: "Ustalamy termin", text: "Jeśli wycena Ci odpowiada, ustalamy datę rozpoczęcia i zakończenia remontu." },
    ],
    formId: "formularz",
    // ten sam formularz co na stronie głównej – jego teksty są w model/pages/home.ts (quote.form)
    form: home.quote.form,
  },

  area: {
    id: "obszar-dzialania",
    eyebrow: "Obszar działania",
    title: "Czy dojedziemy do Ciebie?",
    subtitle:
      "Pracujemy w Warszawie i w promieniu około 70 km od miasta. Na mapie zaznaczyliśmy przykładowe miejscowości — jeśli Twojej nie ma, po prostu zapytaj.",
    mapLabel: "Schematyczna mapa obszaru działania: Warszawa i miejscowości w promieniu 70 km",
    centerLabel: "Warszawa",
    ringUnit: "km",
    riverLabel: "Wisła",
    note: "Mapa poglądowa — odległości w linii prostej od centrum Warszawy.",
  },
};
