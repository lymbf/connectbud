import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  window.addEventListener("resize", callback);
  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}

/**
 * true, gdy strona jest przewinięta dalej niż podany próg.
 * Próg w pikselach albo funkcja (np. ułamek wysokości okna).
 */
export function useScrolledPast(threshold: number | (() => number)): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > (typeof threshold === "function" ? threshold() : threshold),
    () => false,
  );
}
