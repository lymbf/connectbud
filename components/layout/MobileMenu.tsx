"use client";

import Link from "next/link";

import { ButtonLink } from "@/components/UI/Button";
import { Container } from "@/components/UI/Container";
import { ArrowRightIcon, MailIcon, PhoneIcon } from "@/components/UI/icons";
import { company } from "@/model/data/company";
import { mainNav } from "@/model/data/navigation";
import { layoutContent } from "@/model/pages/layout";
import { cn } from "@/utils/cn";

type MobileMenuProps = {
  id: string;
  open: boolean;
  /** Bieżący adres – oznacza aktywną pozycję menu */
  pathname: string;
  /** Cel przycisku wyceny – zależy od strony (patrz getQuoteHref) */
  quoteHref: string;
  onNavigate: () => void;
};

/**
 * Pełnoekranowe menu na telefonach i tabletach (poniżej 1024 px).
 * Usługi z „Oferty” są widoczne od razu pod nią (wcięte, mniejsze) – bez dodatkowego rozwijania.
 */
export function MobileMenu({ id, open, pathname, quoteHref, onNavigate }: MobileMenuProps) {
  const { header, mobileMenu } = layoutContent;

  // pozycje wjeżdżają po kolei – licznik obejmuje też usługi pod „Ofertą”
  let order = 0;
  const enter = (className: string) => {
    const delay = open ? `${120 + order++ * 60}ms` : "0ms";
    return {
      className: cn(
        className,
        "transition-[transform,opacity] duration-700 ease-out",
        open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      ),
      style: { transitionDelay: delay },
    };
  };

  return (
    <div
      id={id}
      inert={!open}
      className={cn(
        "focus-light fixed inset-0 z-40 flex flex-col overflow-y-auto bg-dark pt-24 text-white transition-[opacity,visibility] duration-500 ease-out lg:hidden",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <Container className="flex flex-1 flex-col pb-10">
        <nav aria-label={header.navLabel}>
          <ul className="border-t border-white/10">
            {mainNav.map((item) => (
              <li key={item.href} className="overflow-hidden border-b border-white/10">
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={item.href === pathname ? "page" : undefined}
                  {...enter("flex items-center justify-between py-5 font-heading text-[1.875rem] font-medium")}
                >
                  {item.label}
                  <ArrowRightIcon size={22} className="text-steel" />
                </Link>

                {item.children ? (
                  <ul className="-mt-1 pb-5 pl-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={onNavigate}
                          aria-current={child.href === pathname ? "page" : undefined}
                          {...enter(
                            cn(
                              "flex items-center justify-between border-l py-2.5 pl-5 text-lg font-medium",
                              child.href === pathname ? "border-white text-white" : "border-white/20 text-white/75",
                            ),
                          )}
                        >
                          {child.label}
                          <ArrowRightIcon size={18} className="text-steel" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-12">
          <ButtonLink href={quoteHref} onClick={onNavigate} className="w-full">
            {header.cta}
          </ButtonLink>
          <p className="mt-3 text-center text-xs text-white/60 italic">{header.ctaNote}</p>

          <p className="mt-10 text-xs font-semibold tracking-[0.16em] text-steel uppercase">{mobileMenu.contactTitle}</p>
          <div className="mt-4 flex flex-col gap-3 text-[0.9375rem] text-white/85">
            <a href={company.phone.href} className="inline-flex items-center gap-3">
              <PhoneIcon size={18} className="text-steel" />
              {company.phone.display}
            </a>
            <a href={`mailto:${company.email}`} className="inline-flex items-center gap-3">
              <MailIcon size={18} className="text-steel" />
              {company.email}
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
