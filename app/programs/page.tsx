import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { ForthcomingHero } from "@/components/shared/ForthcomingHero";
import { programSections, programsHub } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Programs",
  description: programsHub.intro,
};

export default function ProgramsPage() {
  return (
    <>
      <ForthcomingHero
        labelledBy="programs-heading"
        title={programsHub.title}
        intro={programsHub.intro}
        photo={programsHub.photo.src ? programsHub.photo : undefined}
      />

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
