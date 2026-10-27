/**
 * Dane firmy – używane w nagłówku, stopce, formularzu, FAQ, na podstronie Kontakt i w danych strukturalnych (SEO).
 * Zmiana tutaj aktualizuje je w całym serwisie.
 */
export const company = {
  name: "ConnectBud",
  // TODO: potwierdzić z klientem – w pierwszym briefie był numer +48 513 096 503
  phone: {
    display: "+48 609 888 456",
    href: "tel:+48609888456",
  },
  email: "kontakt@connectbud.pl",
  area: "Warszawa i okolice",
  areaRadiusKm: 70,
  quoteTimeHours: 48,
  // TODO: godziny z planu strony – do potwierdzenia z klientem; pusta lista = sekcja godzin się nie wyświetla
  hours: [
    { days: "Poniedziałek – piątek", time: "8:00–18:00" },
    { days: "Sobota", time: "9:00–14:00" },
  ],
  // TODO: uzupełnić; pusty tekst = NIP nie wyświetla się w stopce ani w Kontakcie
  nip: "",
  url: "https://connectbud.pl",
};
