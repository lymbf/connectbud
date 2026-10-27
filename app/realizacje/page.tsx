import type { Metadata } from "next";

import { BeforeAfterSection } from "@/components/pages/home";
import { GallerySection } from "@/components/pages/realizacje";
import { CtaBand, PageHero } from "@/components/pages/shared";
import { projects } from "@/model/data/projects";
import { beforeAfterComparisons } from "@/model/data/realizations";
import { realizacje } from "@/model/pages/realizacje";

export const metadata: Metadata = {
  title: realizacje.meta.title,
  description: realizacje.meta.description,
  alternates: { canonical: "/realizacje" },
  openGraph: {
    title: `${realizacje.meta.title} | ConnectBud`,
    description: realizacje.meta.description,
    locale: "pl_PL",
    type: "website",
    images: [{ url: realizacje.hero.image.src, width: realizacje.hero.image.width, height: realizacje.hero.image.height }],
  },
};

export default function RealizationsPage() {
  return (
    <>
      <PageHero content={realizacje.hero} />
      <GallerySection content={realizacje.gallery} projects={projects} />
      <BeforeAfterSection content={realizacje.beforeAfter} comparisons={beforeAfterComparisons} />
      <CtaBand content={realizacje.cta} />
    </>
  );
}
