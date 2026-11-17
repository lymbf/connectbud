/*
 * Nazwy pól formularza wyceny wspólne dla formularza (QuoteForm) i obsługi po stronie serwera (quote.ts).
 * Osobny plik, bo plik z "use server" może eksportować tylko funkcje asynchroniczne.
 */

/**
 * Pole-pułapka na boty – ukryte dla ludzi, więc u nich zawsze puste.
 * Nazwa celowo nic nie mówi autouzupełnianiu przeglądarek: przy dawnej nazwie „company” przeglądarka
 * mogła wpisać tam nazwę firmy klienta, a formularz po cichu odrzuciłby prawdziwe zapytanie.
 */
export const honeypotField = "contact_time";

/** Ukryte pole z usługą (slug podstrony), z której wysłano formularz, np. „remonty-lazienek” */
export const serviceField = "service";
