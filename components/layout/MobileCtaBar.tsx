"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useScrolledPast } from "@/components/layout/useScrolledPast";
import { ButtonLink } from "@/components/UI/Button";
import { PhoneIcon } from "@/components/UI/icons";
import { company } from "@/model/data/company";
import { getQuoteHref } from "@/model/data/navigation";
import { layoutContent } from "@/model/pages/layout";
import { cn } from "@/utils/cn";

/**
 * Dolny pasek na telefonach: „Zadzwoń” + „Darmowa wycena”. Pojawia się po zjechaniu z hero
 * i chowa, gdy na ekranie jest już sekcja z formularzem.
 */
export function MobileCtaBar() {
  const pathname = usePathname();
  const quoteLink = getQuoteHref(pathname);
  const pastHero = useScrolledPast(() => window.innerHeight * 0.7);
  const [quoteInView, setQuoteInView] = useState(false);
  const { mobileBar } = layoutContent;

  useEffect(() => {
    // formularz na bieżącej stronie (sekcja wyceny na głównej, formularz w Kontakcie) – gdy jest widoczny, pasek się chowa;
    // na stronach bez formularza elementu nie ma i pasek działa normalnie
    const targetId = quoteLink.split("#")[1];
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => setQuoteInView(entry?.isIntersecting ?? false), {
      threshold: 0.1,
    });
    observer.observe(target);
    return () => {
      observer.disconnect();
      // po przejściu na podstronę bez formularza pasek ma znów działać normalnie
      setQuoteInView(false);
    };
  }, [pathname, quoteLink]);

  const visible = pastHero && !quoteInView;

  return (
    <div
      inert={!visible}
      className={cn(
        "focus-light fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-dark/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-500 ease-out md:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="grid grid-cols-2 gap-2">
        <ButtonLink href={company.phone.href} variant="outline-light" className="w-full">
          <PhoneIcon size={16} />
          {mobileBar.call}
        </ButtonLink>
        <ButtonLink href={quoteLink} className="w-full">
          {mobileBar.quote}
        </ButtonLink>
      </div>
    </div>
  );
}
