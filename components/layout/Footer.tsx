import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/UI/Container";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/UI/icons";
import { Logo } from "@/components/UI/Logo";
import { company } from "@/model/data/company";
import { legalNav, mainNav } from "@/model/data/navigation";
import { layoutContent } from "@/model/pages/layout";
import { cn } from "@/utils/cn";
import { nbsp } from "@/utils/nbsp";

function FooterColumn({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <h2 className="font-sans text-xs font-semibold tracking-[0.16em] text-steel uppercase">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

const linkClasses = "text-white/70 transition-colors duration-300 hover:text-white";

export function Footer() {
  const { header, footer } = layoutContent;
  const year = new Date().getFullYear();

  return (
    <footer className="focus-light bg-dark text-white">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" aria-label={header.homeLabel} className="inline-block">
              <Logo aria-hidden="true" className="h-[4.5rem] w-auto" />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">{nbsp(footer.description)}</p>
          </div>

          <FooterColumn title={footer.navTitle} className="lg:col-span-2">
            <ul className="space-y-3 text-sm">
              {mainNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title={footer.servicesTitle} className="lg:col-span-3">
            <ul className="space-y-3 text-sm">
              {footer.services.map((service) => (
                <li key={service.label}>
                  <Link href={service.href} className={linkClasses}>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title={footer.contactTitle} className="col-span-2 sm:col-span-1 lg:col-span-3">
            <ul className="space-y-3 text-sm">
              <li>
                <a href={company.phone.href} className={cn(linkClasses, "inline-flex items-center gap-2.5")}>
                  <PhoneIcon size={16} className="text-steel" />
                  {company.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className={cn(linkClasses, "inline-flex items-center gap-2.5")}>
                  <MailIcon size={16} className="text-steel" />
                  {company.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-white/70">
                <MapPinIcon size={16} className="text-steel" />
                {company.area}
              </li>
            </ul>
          </FooterColumn>
        </div>
      </Container>

      <div className="border-t border-white/10">
        {/* dolny margines na telefonach – miejsce na pasek z przyciskami */}
        <Container className="flex flex-col gap-3 pt-6 pb-24 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between md:pb-6">
          <p>
            © {year} {company.name}. {footer.rights}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors duration-300 hover:text-white">
                {link.label}
              </Link>
            ))}
            {company.nip ? <span>NIP: {company.nip}</span> : null}
          </div>
        </Container>
      </div>
    </footer>
  );
}
