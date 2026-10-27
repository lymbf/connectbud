export type NavLink = {
  label: string;
  href: string;
};

/** Główne menu (header, menu mobilne, stopka). */
export const mainNav: NavLink[] = [
  { label: "O nas", href: "/onas" },
  { label: "Realizacje", href: "/realizacje" },
  { label: "Kontakt", href: "/kontakt" },
];

/** Formularz wyceny na stronie głównej (sekcja „Darmowa wycena”) – cel przycisków w obrębie strony głównej. */
export const quoteHref = "/#kontakt";

/** Formularz wyceny na podstronie Kontakt. */
export const contactFormHref = "/kontakt#formularz";

/**
 * Dokąd prowadzi „Zamów darmową wycenę” w headerze, menu i dolnym pasku:
 * na stronie głównej przewija do formularza na dole, na podstronach otwiera formularz w Kontakcie.
 */
export function getQuoteHref(pathname: string): string {
  return pathname === "/" ? quoteHref : contactFormHref;
}

/**
 * Strony, które zaczynają się ciemnym zdjęciem – header jest na nich przezroczysty do pierwszego przewinięcia.
 * Nowa podstrona bez takiego zdjęcia (np. polityka prywatności) dostaje od razu ciemny header.
 */
export const darkHeroRoutes = ["/", "/onas", "/realizacje", "/kontakt"];

/** Linki prawne w stopce. TODO: podstrona polityki prywatności jeszcze nie istnieje. */
export const legalNav: NavLink[] = [{ label: "Polityka prywatności", href: "/polityka-prywatnosci" }];
