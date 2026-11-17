"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { useScrolledPast } from "@/components/layout/useScrolledPast";
import { ButtonLink } from "@/components/UI/Button";
import { Container } from "@/components/UI/Container";
import { ArrowRightIcon, ChevronDownIcon, CloseIcon, MenuIcon, PhoneIcon } from "@/components/UI/icons";
import { Logo } from "@/components/UI/Logo";
import { company } from "@/model/data/company";
import { getQuoteHref, hasDarkHero, mainNav, type NavLink } from "@/model/data/navigation";
import { layoutContent } from "@/model/pages/layout";
import { cn } from "@/utils/cn";

const MENU_ID = "menu-mobilne";

const navItemClasses = "text-sm font-medium whitespace-nowrap transition-colors hover:text-white";

/** Linki listy w kolejności z DOM – do przenoszenia fokusu strzałkami */
const listLinks = (list: HTMLUListElement | null) => Array.from(list?.querySelectorAll<HTMLAnchorElement>("a") ?? []);

/** Po najechaniu myszą: krótka zwłoka, żeby przejechanie kursorem przez „Ofertę” nie otwierało listy */
const HOVER_OPEN_DELAY = 80;
/** Po zjechaniu kursorem: czas na powrót (np. ukośny ruch z przycisku na listę), zanim lista się zamknie */
const HOVER_CLOSE_DELAY = 200;

type OfferMenuProps = {
  label: string;
  items: NavLink[];
  pathname: string;
};

/**
 * „Oferta” w menu na komputerze: przycisk, który rozwija listę usług (wzorzec disclosure).
 * Myszą lista otwiera się po najechaniu na „Ofertę” i zamyka po zjechaniu kursorem z przycisku i listy.
 * Na ekranach dotykowych (bez najechania) i z klawiatury (Enter / spacja) przycisk przełącza listę kliknięciem.
 * Lista zamyka się też po Esc, kliknięciu poza nią, wyjściu z niej klawiszem Tab i po przejściu na inną stronę
 * (Header nadaje temu komponentowi key={pathname}, więc zmiana adresu zaczyna od zamkniętej listy).
 * Strzałki ↓ ↑ otwierają listę z przycisku i przenoszą fokus między usługami (Home / End – pierwsza / ostatnia).
 */
function OfferMenu({ label, items, pathname }: OfferMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const focusOnOpen = useRef<"first" | "last" | null>(null);
  const hoverTimer = useRef<number | null>(null);
  const lastPointerType = useRef("");
  const listId = useId();
  const active = items.some((item) => item.href === pathname);

  const clearHoverTimer = () => {
    if (hoverTimer.current === null) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  };

  // zaplanowane otwarcie/zamknięcie nie może zadziałać po odmontowaniu (np. po przejściu na inną stronę)
  useEffect(() => {
    const timer = hoverTimer;
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  // tylko mysz – dotyk też wysyła zdarzenia „pointer”, ale tam listę otwiera stuknięcie w przycisk
  const onPointerEnter = (event: ReactPointerEvent) => {
    if (event.pointerType !== "mouse") return;
    clearHoverTimer();
    if (!open) hoverTimer.current = window.setTimeout(() => setOpen(true), HOVER_OPEN_DELAY);
  };

  const onPointerLeave = (event: ReactPointerEvent) => {
    if (event.pointerType !== "mouse") return;
    clearHoverTimer();
    // lista obsługiwana z klawiatury (fokus w niej, widoczna obwódka) zostaje otwarta, dopóki fokus z niej nie wyjdzie
    const focused = document.activeElement;
    if (focused && rootRef.current?.contains(focused) && focused.matches(":focus-visible")) return;
    hoverTimer.current = window.setTimeout(() => setOpen(false), HOVER_CLOSE_DELAY);
  };

  const onButtonClick = (event: ReactMouseEvent) => {
    clearHoverTimer();
    // myszą lista jest już otwarta po najechaniu – kliknięcie jej nie zamyka (zamyka ją zjechanie kursorem);
    // klawiatura (event.detail === 0) i dotyk przełączają listę jak zwykły przycisk
    if (event.detail > 0 && lastPointerType.current === "mouse") setOpen(true);
    else setOpen((value) => !value);
  };

  // kliknięcie poza listą i Esc zamykają ją; po Esc fokus wraca na przycisk
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // lista otwarta strzałką z klawiatury – fokus od razu na pierwszej (↓) albo ostatniej (↑) usłudze
  useEffect(() => {
    if (!open || !focusOnOpen.current) return;
    const links = listLinks(listRef.current);
    (focusOnOpen.current === "first" ? links[0] : links[links.length - 1])?.focus();
    focusOnOpen.current = null;
  }, [open]);

  const onButtonKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const target = event.key === "ArrowDown" ? "first" : "last";
    if (open) {
      const links = listLinks(listRef.current);
      (target === "first" ? links[0] : links[links.length - 1])?.focus();
      return;
    }
    focusOnOpen.current = target;
    setOpen(true);
  };

  const onListKeyDown = (event: ReactKeyboardEvent) => {
    const links = listLinks(listRef.current);
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    const next =
      event.key === "ArrowDown"
        ? (index + 1) % links.length
        : event.key === "ArrowUp"
          ? (index - 1 + links.length) % links.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? links.length - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    links[next]?.focus();
  };

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onBlur={(event) => {
        // fokus wyszedł poza przycisk i listę (np. Tab za ostatnią usługą)
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onPointerDown={(event) => {
          lastPointerType.current = event.pointerType;
        }}
        onClick={onButtonClick}
        onKeyDown={onButtonKeyDown}
        className={cn(navItemClasses, "inline-flex items-center gap-1.5", active || open ? "text-white" : "text-white/85")}
      >
        {label}
        <ChevronDownIcon
          size={14}
          strokeWidth={2}
          className={cn("transition-transform duration-300 ease-out motion-reduce:transition-none", open && "rotate-180")}
        />
      </button>

      {/* przy otwieraniu widoczność zmienia się od razu (fokus ze strzałki może od razu trafić na usługę),
          przy zamykaniu – dopiero po wygaszeniu listy */}
      <div
        id={listId}
        className={cn(
          "absolute top-full -left-5 pt-4 duration-300 ease-out motion-reduce:transition-none",
          open
            ? "visible translate-y-0 opacity-100 transition-[opacity,translate]"
            : "invisible -translate-y-1 opacity-0 transition-[opacity,visibility,translate]",
        )}
      >
        <ul
          ref={listRef}
          onKeyDown={onListKeyDown}
          className="min-w-64 border-t-2 border-accent bg-dark py-2 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)]"
        >
          {items.map((item) => {
            const current = item.href === pathname;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group/item flex items-center justify-between gap-8 px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-300 hover:bg-white/5 hover:text-white focus-visible:-outline-offset-2",
                    current ? "text-white" : "text-white/80",
                  )}
                >
                  {item.label}
                  <ArrowRightIcon
                    size={14}
                    className={cn(
                      "transition-[opacity,translate] duration-300 ease-out group-hover/item:translate-x-0 group-hover/item:opacity-100 motion-reduce:transition-none",
                      current ? "opacity-100" : "-translate-x-1 opacity-0",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

type DesktopNavProps = {
  label: string;
  pathname: string;
  /** start – menu w lewej kolumnie (1024–1279 px), end – w prawej, przed przyciskiem (od 1280 px) */
  align: "start" | "end";
  className?: string;
};

/**
 * Odstępy między pozycjami menu. W prawej kolumnie (od 1280 px) menu dzieli miejsce z przyciskiem,
 * więc przy 1280–1439 px odstępy są ciaśniejsze, a od 1536 px takie jak w lewej kolumnie.
 */
const navSpacing = {
  start: { left: "pl-4", right: "pr-4" },
  end: { left: "pl-2.5 min-[90rem]:pl-3 2xl:pl-4", right: "pr-2.5 min-[90rem]:pr-3 2xl:pr-4" },
};

/** Menu na komputerze: w lewej kolumnie (1024–1279 px) albo w prawej, przed przyciskiem (od 1280 px). */
function DesktopNav({ label, pathname, align, className }: DesktopNavProps) {
  const spacing = navSpacing[align];

  return (
    <nav aria-label={label} className={className}>
      <ul className="flex items-center">
        {mainNav.map((item, index) => (
          <li
            key={item.href}
            className={cn(
              index > 0 && "border-l border-white/25",
              // pierwsza pozycja przy lewej krawędzi (start) / ostatnia tuż przed przyciskiem (end) – bez odstępu na zewnątrz
              !(align === "start" && index === 0) && spacing.left,
              !(align === "end" && index === mainNav.length - 1) && spacing.right,
            )}
          >
            {item.children ? (
              <OfferMenu key={pathname} label={item.label} items={item.children} pathname={pathname} />
            ) : (
              <Link
                href={item.href}
                aria-current={item.href === pathname ? "page" : undefined}
                className={cn(navItemClasses, item.href === pathname ? "text-white" : "text-white/85")}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Header przyklejony do góry. Na stronach z ciemnym zdjęciem u góry leży przezroczyście na zdjęciu,
 * a po przewinięciu zmienia się w zwarty, ciemny pasek z mniejszym logo.
 *
 * Układ: telefon | logo | menu + przycisk (od 1280 px). Na węższych laptopach (1024–1279 px)
 * prawa kolumna mieści już tylko przycisk, więc menu przechodzi na lewo w miejsce telefonu.
 * Poniżej 1024 px: logo po lewej, telefon i menu rozwijane po prawej.
 * Cztery pozycje menu i przycisk mieszczą się w prawej kolumnie przy 1280–1439 px dzięki ciaśniejszym
 * odstępom i krótszemu napisowi na przycisku (pomiar: menu ok. 293 px + przycisk 156 px przy kolumnie 484 px).
 */
export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolledPast(24);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { header } = layoutContent;

  // na stronach z ciemnym zdjęciem u góry header jest przezroczysty do pierwszego przewinięcia
  const solid = scrolled || !hasDarkHero(pathname) || menuOpen;
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

            <DesktopNav label={header.navLabel} pathname={pathname} align="start" className="hidden lg:block xl:hidden" />

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

          {/* prawa strona: menu + przycisk (desktop) / telefon + hamburger (telefon i tablet) */}
          <div className="flex items-center justify-end gap-1 lg:gap-7 xl:gap-5 min-[90rem]:gap-6 2xl:gap-7">
            <DesktopNav label={header.navLabel} pathname={pathname} align="end" className="hidden xl:block" />

            <div className="hidden flex-col items-center lg:flex">
              <ButtonLink href={quoteLink} size="sm">
                {/* 1280–1439 px: przycisk dzieli kolumnę z menu, więc krótszy napis */}
                <span className="xl:max-[90rem]:hidden">{header.cta}</span>
                <span className="hidden xl:max-[90rem]:inline">{header.ctaShort}</span>
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

      <MobileMenu id={MENU_ID} open={menuOpen} pathname={pathname} quoteHref={quoteLink} onNavigate={closeMenu} />
    </>
  );
}
