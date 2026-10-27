"use client";

import { useSyncExternalStore } from "react";

const HASH_EVENT = "connectbud:hashchange";

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener(HASH_EVENT, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener(HASH_EVENT, onChange);
  };
}

const getSnapshot = () => decodeURIComponent(window.location.hash.slice(1));
const getServerSnapshot = () => "";

/** Aktualny fragment adresu po „#” (bez znaku #). Na serwerze – pusty. */
export function useHash(): string {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Zmienia fragment adresu bez przewijania strony i bez dokładania wpisów do historii,
 * np. setHash("lazienki") → /realizacje#lazienki, setHash("") → /realizacje.
 */
export function setHash(value: string) {
  const url = value ? `#${encodeURIComponent(value)}` : `${window.location.pathname}${window.location.search}`;
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(HASH_EVENT));
}
