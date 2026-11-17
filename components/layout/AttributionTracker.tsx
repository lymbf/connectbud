"use client";

import { useEffect } from "react";

import { captureAttribution } from "@/utils/attribution";

/**
 * Zapamiętuje źródło wizyty (gclid, utm_*, strona wejścia) zaraz po wejściu na stronę –
 * formularz wyceny dołącza je potem do zapytania. Szczegóły: utils/attribution.ts. Nic nie wyświetla.
 */
export function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
