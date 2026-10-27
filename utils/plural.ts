/**
 * Polska odmiana rzeczownika po liczebniku: [1, 2–4, 5+], np. ["zdjęcie", "zdjęcia", "zdjęć"].
 * plural(1, …) → zdjęcie, plural(3, …) → zdjęcia, plural(12, …) → zdjęć, plural(22, …) → zdjęcia.
 */
export function plural(count: number, forms: [string, string, string]): string {
  if (count === 1) return forms[0];
  const lastDigit = count % 10;
  const lastTwo = count % 100;
  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwo < 12 || lastTwo > 14)) return forms[1];
  return forms[2];
}
