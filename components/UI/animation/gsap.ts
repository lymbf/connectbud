/*
 * Jedno miejsce rejestracji wtyczek GSAP. Importuj gsap/ScrollTrigger/useGSAP stąd,
 * wyłącznie w komponentach klienckich ("use client").
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
