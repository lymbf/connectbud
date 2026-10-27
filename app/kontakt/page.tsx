import type { Metadata } from "next";

import { ContactSection, ServiceAreaSection } from "@/components/pages/kontakt";
import { PageHero } from "@/components/pages/shared";
import { kontakt } from "@/model/pages/kontakt";

export const metadata: Metadata = {
  title: kontakt.meta.title,
  description: kontakt.meta.description,
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: `${kontakt.meta.title} | ConnectBud`,
    description: kontakt.meta.description,
    locale: "pl_PL",
    type: "website",
    images: [{ url: kontakt.hero.image.src, width: kontakt.hero.image.width, height: kontakt.hero.image.height }],
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero content={kontakt.hero} size="compact" />
      <ContactSection content={kontakt.contact} />
      <ServiceAreaSection content={kontakt.area} />
    </>
  );
}
