import type { Metadata } from "next";

import {
  BeforeAfterSection,
  FaqSection,
  FeaturesSection,
  HeroSection,
  OfferSection,
  ProcessSection,
  QuoteSection,
  StatsSection,
} from "@/components/pages/home";
import { company } from "@/model/data/company";
import { beforeAfterComparisons } from "@/model/data/realizations";
import { home } from "@/model/pages/home";

export const metadata: Metadata = {
  title: { absolute: home.meta.title },
  description: home.meta.description,
  openGraph: {
    title: home.meta.title,
    description: home.meta.description,
    locale: "pl_PL",
    type: "website",
    images: [{ url: home.hero.image.src, width: home.hero.image.width, height: home.hero.image.height }],
  },
};

// dane strukturalne firmy lokalnej (SEO) – nazwa, kontakt i obszar działania
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: company.name,
  url: company.url,
  telephone: company.phone.display,
  email: company.email,
  areaServed: company.area,
  slogan: home.hero.subtitle,
};

export default function Home() {
  return (
    <>
      <HeroSection content={home.hero} />
      <FeaturesSection content={home.features} />
      <StatsSection content={home.stats} />
      <OfferSection content={home.offer} />
      <BeforeAfterSection content={home.beforeAfter} comparisons={beforeAfterComparisons} />
      <ProcessSection content={home.process} />
      <FaqSection content={home.faq} />
      <QuoteSection content={home.quote} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
