export type NavLink = {
  label: string;
  href: string;
};

/** Pozycja menu – z listą podstron (np. „Oferta”) albo zwykły link. */
export type NavItem = NavLink & {
  children?: NavLink[];
};

/* ---------------------------------------------------------------------------------------------
 * Podstrony usług (strony docelowe kampanii Google Ads) – /oferta/<slug>.
 * Adresy powtarzają zaindeksowane adresy starej strony, więc nie potrzebują przekierowań.
 * Treść stron: model/pages/oferta.ts.
 * ------------------------------------------------------------------------------------------- */

export const serviceSlugs = ["kompleksowe-remonty", "wykonczenia-pod-klucz", "remonty-lazienek"] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export function isServiceSlug(value: string): value is ServiceSlug {
  return (serviceSlugs as readonly string[]).includes(value);
}

export const servicePath = (slug: ServiceSlug) => `/oferta/${slug}`;

const serviceLabels: Record<ServiceSlug, string> = {
  "kompleksowe-remonty": "Kompleksowe remonty",
  "wykonczenia-pod-klucz": "Wykończenia pod klucz",
  "remonty-lazienek": "Remonty łazienek",
};

/** Lista usług – jedno źródło dla menu „Oferta”, menu mobilnego, stopki i kart oferty na stronie głównej. */
export const serviceNav: (NavLink & { slug: ServiceSlug })[] = serviceSlugs.map((slug) => ({
  slug,
  label: serviceLabels[slug],
  href: servicePath(slug),
}));

export const serviceLink = (slug: ServiceSlug): NavLink => ({ label: serviceLabels[slug], href: servicePath(slug) });

/** „Remonty z projektem” nie mają osobnej podstrony – to sekcja na stronie kompleksowych remontów. */
export const designServiceLink: NavLink = {
  label: "Remonty z projektem",
  href: `${servicePath("kompleksowe-remonty")}#z-projektem`,
};

/** Id sekcji z formularzem wyceny na stronie głównej i na podstronach usług. */
export const quoteSectionId = "kontakt";

/* ------------------------------------------------------------------------------------------- */

/**
 * Główne menu (header, menu mobilne, stopka). „Oferta” na komputerze rozwija listę usług,
 * a w menu mobilnym pokazuje je od razu pod sobą. Osobnej strony /oferta nie ma –
 * ten adres przekierowuje na sekcję oferty na stronie głównej (next.config.ts).
 */
export const mainNav: NavItem[] = [
  { label: "Oferta", href: "/#oferta", children: serviceNav },
  { label: "O nas", href: "/onas" },
  { label: "Realizacje", href: "/realizacje" },
  { label: "Kontakt", href: "/kontakt" },
];

/** Formularz wyceny na stronie głównej (sekcja „Darmowa wycena”) – cel przycisków w obrębie strony głównej. */
export const quoteHref = `/#${quoteSectionId}`;

/** Formularz wyceny na podstronie Kontakt. */
export const contactFormHref = "/kontakt#formularz";

/** true dla adresów podstron usług, np. /oferta/remonty-lazienek */
export function isServicePath(pathname: string): boolean {
  return serviceNav.some((service) => service.href === pathname);
}

/**
 * Dokąd prowadzi „Zamów darmową wycenę” w headerze, menu i dolnym pasku:
 * na stronie głównej i na podstronach usług przewija do formularza na tej samej stronie,
 * na pozostałych podstronach otwiera formularz w Kontakcie.
 */
export function getQuoteHref(pathname: string): string {
  if (pathname === "/") return quoteHref;
  if (isServicePath(pathname)) return `${pathname}#${quoteSectionId}`;
  return contactFormHref;
}

/** Strony, które zaczynają się ciemnym zdjęciem (PageHero / hero strony głównej). */
const darkHeroRoutes = ["/", "/onas", "/realizacje", "/kontakt"];

/**
 * true, gdy strona zaczyna się ciemnym zdjęciem – header jest na niej przezroczysty do pierwszego przewinięcia.
 * Nowa podstrona bez takiego zdjęcia (np. polityka prywatności, strona 404) dostaje od razu ciemny header.
 */
export function hasDarkHero(pathname: string): boolean {
  return darkHeroRoutes.includes(pathname) || isServicePath(pathname);
}

/** Linki prawne w stopce. TODO: podstrona polityki prywatności jeszcze nie istnieje. */
export const legalNav: NavLink[] = [{ label: "Polityka prywatności", href: "/polityka-prywatnosci" }];
