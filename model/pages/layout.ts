/*
 * Teksty elementów wspólnych dla wszystkich stron: header, menu mobilne, dolny pasek na telefonach, stopka.
 */

export const layoutContent = {
  skipLink: "Przejdź do treści",

  header: {
    homeLabel: "ConnectBud – strona główna",
    navLabel: "Menu główne",
    cta: "Zamów darmową wycenę",
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
    services: [
      { label: "Kompleksowe remonty", href: "/#oferta" },
      { label: "Wykończenia pod klucz", href: "/#oferta" },
      { label: "Remonty z projektem", href: "/#oferta" },
      { label: "Remonty łazienek", href: "/#oferta" },
    ],
    rights: "Wszelkie prawa zastrzeżone.",
  },
};
