import { Bricolage_Grotesque, Inter } from "next/font/google";

/*
 * Czcionki z Google Fonts, hostowane lokalnie przez next/font (bez zapytań do Google w przeglądarce).
 * `latin-ext` jest potrzebny dla polskich znaków (ą, ę, ł, ś, ż…).
 * Zmienne CSS (--font-*) są mapowane na klasy Tailwinda w app/globals.css.
 * Poppins (czcionka logo) nie jest ładowany – logo ma napisy zamienione na krzywe (components/UI/Logo.tsx).
 */

/** Tekst główny – klasa `font-sans` (domyślna dla całej strony). Font zmienny, wszystkie wagi. */
export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

/** Nagłówki – klasa `font-heading` (domyślna dla h1–h6). Font zmienny, wagi 200–800. */
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
});

/** Wszystkie zmienne czcionek – do podpięcia na <html> w app/layout.tsx. */
export const fontVariables = [inter.variable, bricolage.variable].join(" ");
