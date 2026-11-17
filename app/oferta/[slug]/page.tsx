import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BeforeAfterSection, FaqSection, ProcessSection, QuoteSection } from "@/components/pages/home";
import {
  DesignOptionsSection,
  RelatedServicesSection,
  ServiceIntroSection,
  ServiceProjectsSection,
} from "@/components/pages/oferta";
import { PageHero } from "@/components/pages/shared";
import { company } from "@/model/data/company";
import { isServiceSlug, serviceNav, serviceSlugs } from "@/model/data/navigation";
import { projects } from "@/model/data/projects";
import { beforeAfterComparisons } from "@/model/data/realizations";
import { relatedServices, servicePages } from "@/model/pages/oferta";

/*
 * Podstrony usług: /oferta/kompleksowe-remonty, /oferta/wykonczenia-pod-klucz, /oferta/remonty-lazienek.
 * Jeden szablon, treść w model/pages/oferta.ts. Strony są generowane przy budowaniu,
 * a nieznany adres (np. /oferta/budowa-domow bez przekierowania) daje 404.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceSlug(slug)) return {};

  const { meta, hero } = servicePages[slug];
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: hero.path },
    openGraph: {
      title: `${meta.title} | ConnectBud`,
      description: meta.description,
      url: hero.path,
      locale: "pl_PL",
      type: "website",
      images: [{ url: hero.image.src, width: hero.image.width, height: hero.image.height }],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();

  const page = servicePages[slug];

  // pozostałe usługi – karty na dole strony
  const related = serviceNav
    .filter((service) => service.slug !== slug)
    .map((service) => ({ ...service, ...servicePages[service.slug].card }));

  // dane strukturalne usługi (SEO): rodzaj usługi, firma i obszar działania
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: page.serviceType,
    name: page.hero.title.join(" "),
    description: page.meta.description,
    url: `${company.url}${page.hero.path}`,
    areaServed: company.area,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: company.name,
      url: company.url,
      telephone: company.phone.display,
      email: company.email,
      areaServed: company.area,
    },
  };

  return (
    <>
      <PageHero content={page.hero} />
      <ServiceIntroSection content={page.intro} />
      {page.beforeAfter ? (
        <BeforeAfterSection content={page.beforeAfter} comparisons={beforeAfterComparisons} />
      ) : null}
      <ServiceProjectsSection content={page.projects} projects={projects} />
      {page.design ? <DesignOptionsSection content={page.design} /> : null}
      <ProcessSection content={page.process} />
      <FaqSection content={page.faq} />
      <QuoteSection content={page.quote} service={slug} />
      <RelatedServicesSection content={relatedServices} items={related} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
