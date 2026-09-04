import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PhotoCarousel } from "@/components/shared/PhotoCarousel";
import {
  programSections,
  programsHub,
  programsPhotos,
} from "@/lib/programs";

export const metadata: Metadata = {
  title: "Programs",
  description: programsHub.intro,
};

export default function ProgramsPage() {
  return (
    <>
      <PhotoCarousel
        photos={programsPhotos}
        labelledBy="programs-heading"
        minHeightClass="min-h-[min(52svh,28rem)]"
        contentClassName="justify-end py-12 sm:py-16"
      >
        <h1
          id="programs-heading"
          className="max-w-4xl text-3xl font-bold tracking-tight text-pmr-offwhite sm:text-4xl lg:text-5xl"
        >
          {programsHub.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-pmr-cream sm:text-lg">
          {programsHub.intro}
        </p>
      </PhotoCarousel>

      <PageShell>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="pmr-card group flex flex-col p-6 transition hover:ring-2 hover:ring-pmr-coral/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pmr-coral/70"
            >
              <h2 className="text-xl font-bold text-pmr-offwhite group-hover:text-pmr-green-bright">
                {section.label}
              </h2>
              <p className="mt-3 flex-1 text-sm text-pmr-cream">
                {section.description}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-pmr-coral">
                Learn more
                <ArrowRight className="h-4 w-4" aria-hidden />
              </p>
            </Link>
          ))}
        </div>
      </PageShell>
    </>
  );
}
