const NBSP = " ";

/**
 * Polska typografia: wstawia twardą spację
 * - po jednoliterowych wyrazach (a, i, o, u, w, z), żeby nie zostawały na końcu linii,
 * - między liczbą a jednostką („48 godzin”, „70 km”),
 * - przed myślnikiem, żeby nie zaczynał nowej linii.
 */
export function nbsp(text: string): string {
  let out = text;

  // dwa przebiegi łapią ciągi typu „i w domu”
  for (let i = 0; i < 2; i++) {
    out = out.replace(/(^|[\s(„"])([aiouwzAIOUWZ])\s+/g, `$1$2${NBSP}`);
  }

  return out.replace(/(\d)\s+(?=[\p{L}%])/gu, `$1${NBSP}`).replace(/\s+—\s/g, `${NBSP}— `);
}
