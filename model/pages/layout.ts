import { designServiceLink, serviceLink } from "@/model/data/navigation";

/*
 * Teksty elementów wspólnych dla wszystkich stron: header, menu mobilne, dolny pasek na telefonach, stopka.
 * Pozycje menu i nazwy usług są w model/data/navigation.ts.
 */

export const layoutContent = {
  skipLink: "Przejdź do treści",

  header: {
    homeLabel: "ConnectBud – strona główna",
    navLabel: "Menu główne",
    cta: "Zamów darmową wycenę",
    // krótszy napis przy 1280–1439 px, gdzie przycisk dzieli prawą kolumnę z czterema pozycjami menu
    ctaShort: "Darmowa wycena",
    ctaNote: "Odpowiadamy w ciągu 48h",
    callLabel: "Zadzwoń",
    menuOpen: "Otwórz menu",
    menuClose: "Zamknij menu",
  },

  mobileMenu: {
    contactTitle: "Kontakt",
  },

  mobileBar: {
    call: "Zadzwoń",
    quote: "Darmowa wycena",
  },

  footer: {
    description:
      "Kompleksowe remonty i wykończenia wnętrz w Warszawie i okolicach. Jeden zespół, jeden harmonogram, jedna osoba kontaktowa.",
    navTitle: "Nawigacja",
    servicesTitle: "Usługi",
    contactTitle: "Kontakt",
    // podstrony usług; „Remonty z projektem” to sekcja na stronie kompleksowych remontów
    services: [
      serviceLink("kompleksowe-remonty"),
      serviceLink("wykonczenia-pod-klucz"),
      designServiceLink,
      serviceLink("remonty-lazienek"),
    ],
    rights: "Wszelkie prawa zastrzeżone.",
  },
};
