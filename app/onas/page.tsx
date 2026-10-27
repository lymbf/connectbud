import type { Metadata } from "next";

import { StatsSection } from "@/components/pages/home";
import { StorySection, ValuesSection, WorkPreviewSection } from "@/components/pages/onas";
import { CtaBand, PageHero } from "@/components/pages/shared";
import { projects } from "@/model/data/projects";
import { onas } from "@/model/pages/onas";
import { realizacje } from "@/model/pages/realizacje";

export const metadata: Metadata = {
  title: onas.meta.title,
  description: onas.meta.description,
  alternates: { canonical: "/onas" },
  openGraph: {
    title: `${onas.meta.title} | ConnectBud`,
    description: onas.meta.description,
    locale: "pl_PL",
    type: "website",
    images: [{ url: onas.hero.image.src, width: onas.hero.image.width, height: onas.hero.image.height }],
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero content={onas.hero} />
      <StorySection content={onas.story} />
      <StatsSection content={onas.stats} />
      <ValuesSection content={onas.values} />
      <WorkPreviewSection
        content={onas.work}
        projects={projects}
        photoForms={realizacje.gallery.photoForms}
        actionLabel={realizacje.gallery.openLabel}
      />
      <CtaBand content={onas.cta} />
    </>
  );
}
