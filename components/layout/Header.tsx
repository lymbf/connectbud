"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { useScrolledPast } from "@/components/layout/useScrolledPast";
import { ButtonLink } from "@/components/UI/Button";
import { Container } from "@/components/UI/Container";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/UI/icons";
import { Logo } from "@/components/UI/Logo";
import { company } from "@/model/data/company";
import { darkHeroRoutes, getQuoteHref, mainNav } from "@/model/data/navigation";
import { layoutContent } from "@/model/pages/layout";
import { cn } from "@/utils/cn";

const MENU_ID = "menu-mobilne";

type DesktopNavProps = {
  label: string;
  /** start – menu w lewej kolumnie (pierwszy link przy krawędzi), end – w prawej, przed przyciskiem */
  align: "start" | "end";
  className?: string;
};

function DesktopNav({ label, align, className }: DesktopNavProps) {
  return (
    <nav aria-label={label} className={className}>
      <ul className="flex items-center">
        {mainNav.map((link, index) => (
          <li
            key={link.href}
            className={cn(
              "px-4",
              index > 0 && "border-l border-white/25",
              align === "start" && index === 0 && "pl-0",
              align === "end" && index === mainNav.length - 1 && "pr-0",
            )}
          >
            <Link
              href={link.href}
              className="text-sm font-medium whitespace-nowrap text-white/85 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Header przyklejony do góry. Na stronie głównej leży przezroczyście na zdjęciu hero,
 * a po przewinięciu zmienia się w zwarty, ciemny pasek z mniejszym logo.
 *
 * Układ: telefon | logo | menu + przycisk (od 1280 px). Na węższych laptopach (1024–1279 px)
 * prawa kolumna mieści już tylko przycisk, więc menu przechodzi na lewo w miejsce telefonu.
 * Poniżej 1024 px: logo po lewej, telefon i menu rozwijane po prawej.
 */
export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolledPast(24);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { header } = layoutContent;

  // na stronach z ciemnym zdjęciem u góry header jest przezroczysty do pierwszego przewinięcia
  const solid = scrolled || !darkHeroRoutes.includes(pathname) || menuOpen;
  const quoteLink = getQuoteHref(pathname);
  const closeMenu = () => setMenuOpen(false);

  // otwarte menu: blokada przewijania strony, Esc zamyka, przejście na desktop zamyka
  useEffect(() => {
    if (!menuOpen) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "intro-fade-in focus-light fixed inset-x-0 top-0 z-50 text-white transition-[background-color,box-shadow,padding] duration-500 ease-out",
          solid
            ? "bg-dark/90 py-3 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md"
            : "bg-transparent py-4 lg:py-6",
        )}
      >
        <Container size="wide" className="flex items-center justify-between gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          {/* lewa strona: telefon (od 1280 px) / menu (1024–1279 px) / logo (telefon i tablet) */}
          <div className="flex items-center">
            <a
              href={company.phone.href}
              className="group/phone hidden items-center text-sm font-medium tracking-[0.02em] whitespace-nowrap text-white/90 transition-colors hover:text-white xl:inline-flex"
            >
              <span className="relative inline-flex items-center pr-4 pb-2">
                {/* delikatne powiększenie po najechaniu – tylko numer z ikoną, linie ramki zostają na miejscu */}
                <span className="inline-flex origin-left items-center gap-2.5 transition-transform duration-300 ease-out group-hover/phone:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover/phone:scale-100">
                  <PhoneIcon size={16} className="text-white/70 transition-colors duration-300 group-hover/phone:text-white" />
                  {company.phone.display}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute right-0 bottom-0 left-0 h-px bg-white/40 transition-opacity duration-500",
                    solid && "opacity-0",
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute right-0 bottom-0 h-[calc(100%+0.375rem)] w-px bg-white/40 transition-opacity duration-500",
                    solid && "opacity-0",
                  )}
                />
              </span>
            </a>

            <DesktopNav label={header.navLabel} align="start" className="hidden lg:block xl:hidden" />

            <Link href="/" aria-label={header.homeLabel} onClick={closeMenu} className="lg:hidden">
              <Logo withTagline={false} aria-hidden="true" className="h-10 w-auto" />
            </Link>
          </div>

          {/* środek: logo (desktop) – pełne nad hero, zwarte po przewinięciu */}
          <Link href="/" aria-label={header.homeLabel} className="relative hidden items-center justify-center lg:flex">
            <Logo
              aria-hidden="true"
              className={cn(
                "w-auto transition-[height,opacity] duration-500 ease-out",
                solid ? "h-12 opacity-0" : "h-[4.75rem] opacity-100",
              )}
            />
            <Logo
              withTagline={false}
              aria-hidden="true"
              className={cn(
                "absolute h-11 w-auto transition-opacity duration-500 ease-out",
                solid ? "opacity-100" : "opacity-0",
              )}
            />
          </Link>

          {/* prawa strona: menu + przycisk (desktop) / telefon + hamburger (telefon) */}
          <div className="flex items-center justify-end gap-1 lg:gap-7">
            <DesktopNav label={header.navLabel} align="end" className="hidden xl:block" />

            <div className="hidden flex-col items-center lg:flex">
              <ButtonLink href={quoteLink} size="sm">
                {header.cta}
              </ButtonLink>
              <span
                className={cn(
                  "overflow-hidden text-[0.6875rem] text-white/70 italic transition-all duration-500",
                  solid ? "max-h-0 opacity-0" : "mt-2 max-h-6 opacity-100",
                )}
              >
                {header.ctaNote}
              </span>
            </div>

            <a
              href={company.phone.href}
              aria-label={`${header.callLabel}: ${company.phone.display}`}
              className="flex size-11 items-center justify-center lg:hidden"
            >
              <PhoneIcon size={20} />
            </a>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
              aria-label={menuOpen ? header.menuClose : header.menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="-mr-2 flex size-11 items-center justify-center lg:hidden"
            >
              {menuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu id={MENU_ID} open={menuOpen} quoteHref={quoteLink} onNavigate={closeMenu} />
    </>
  );
}
