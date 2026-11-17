/*
 * Źródło wizyty (kampanie Google Ads, linki z UTM) dołączane do zapytania o wycenę.
 *
 * Przy wejściu na stronę AttributionTracker (app/layout.tsx) odczytuje parametry z adresu, stronę wejścia
 * i stronę odsyłającą, a formularz wyceny wysyła je w ukrytych polach. Dzięki temu w zapytaniu widać,
 * z której kampanii i strony przyszedł klient (później: import konwersji offline do Google Ads po gclid).
 *
 * Nowe kliknięcie reklamy albo link z UTM zastępuje wcześniejsze źródło; wejście bez parametrów
 * zostawia pierwsze źródło z tej sesji przeglądarki (karty).
 *
 * TODO: przed startem kampanii sprawdzić z polityką prywatności i banerem zgód, czy zapis w sessionStorage
 * może się odbywać przed zgodą (ad_storage). Bez zapisu dane i tak działają do pełnego przeładowania strony.
 */

/** Parametry z adresu strony (np. ?gclid=…&utm_campaign=…) */
export const attributionParams = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

/** Wszystkie pola wysyłane z formularzem: parametry z adresu, strona wejścia i strona odsyłająca */
export const attributionFields = [...attributionParams, "landing_page", "referrer"] as const;

export type AttributionField = (typeof attributionFields)[number];
export type Attribution = Partial<Record<AttributionField, string>>;

/** Najdłuższa zapisywana wartość – ochrona przed bardzo długimi adresami */
export const ATTRIBUTION_MAX_LENGTH = 300;

const STORAGE_KEY = "connectbud:attribution";
const CHANGE_EVENT = "connectbud:attribution";

/** Dane jako tekst JSON – niezmieniona wartość jest dla useSyncExternalStore tą samą wartością */
let snapshot: string | null = null;

function readStored(): string | null {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // np. zablokowane dane witryn
  }
}

function store(value: string) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, value);
  } catch {
    // brak zapisu – dane zostają w pamięci do przeładowania strony
  }
}

/** Zapamiętuje źródło wizyty. Wywoływane raz po pełnym załadowaniu strony. */
export function captureAttribution() {
  const url = new URL(window.location.href);

  const fromUrl: Attribution = {};
  for (const key of attributionParams) {
    const value = url.searchParams.get(key)?.trim();
    if (value) fromUrl[key] = value.slice(0, ATTRIBUTION_MAX_LENGTH);
  }

  const previous = snapshot ?? readStored();

  if (previous && Object.keys(fromUrl).length === 0) {
    snapshot = previous;
  } else {
    // strona odsyłająca tylko spoza serwisu (np. google.com), a nie poprzednia podstrona
    const referrer = document.referrer && !document.referrer.startsWith(url.origin) ? document.referrer : "";
    const data: Attribution = {
      ...fromUrl,
      landing_page: `${url.pathname}${url.search}`.slice(0, ATTRIBUTION_MAX_LENGTH),
      ...(referrer ? { referrer: referrer.slice(0, ATTRIBUTION_MAX_LENGTH) } : {}),
    };
    snapshot = JSON.stringify(data);
    store(snapshot);
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeAttribution(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

export function getAttributionSnapshot(): string | null {
  return snapshot;
}

/** Tekst JSON → obiekt z samymi znanymi polami tekstowymi */
export function parseAttribution(json: string | null): Attribution {
  if (!json) return {};
  try {
    const raw: unknown = JSON.parse(json);
    if (!raw || typeof raw !== "object") return {};
    const result: Attribution = {};
    for (const field of attributionFields) {
      const value = (raw as Record<string, unknown>)[field];
      if (typeof value === "string" && value) result[field] = value.slice(0, ATTRIBUTION_MAX_LENGTH);
    }
    return result;
  } catch {
    return {};
  }
}
