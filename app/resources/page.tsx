import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { resourceSections, resourcesHub } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Archiving and Preservation Resources",
  description: resourcesHub.intro,
};

export default function ResourcesPage() {
  return (
    <>
      <section
        className="relative isolate overflow-hidden border-b-4 border-pmr-border bg-pmr-elevated"
        aria-labelledby="resources-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgb(var(--pmr-dark)/0.35)_0_12px,transparent_12px_24px)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pmr-dark/80 via-pmr-dark/45 to-pmr-dark/20"
          aria-hidden
        />
        <p className="absolute right-4 top-4 z-10 font-mono text-xs text-pmr-muted sm:right-6">
          Background image forthcoming
        </p>
        <div className="relative z-10 mx-auto flex min-h-[min(52svh,28rem)] max-w-7xl flex-col justify-end px-4 py-12 sm:px-6 sm:py-16">
          <h1
            id="resources-heading"
            className="max-w-4xl text-3xl font-bold tracking-tight text-pmr-offwhite sm:text-4xl lg:text-5xl"
          >
            {resourcesHub.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-pmr-cream sm:text-lg">
            {resourcesHub.intro}
          </p>
        </div>
      </section>

      <PageShell>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resourceSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="pmr-card group flex flex-col p-6 transition hover:ring-2 hover:ring-pmr-coral/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pmr-coral/70"
            >
              <h2 className="text-xl font-bold text-pmr-offwhite group-hover:text-pmr-green-bright">
                {section.label}
              </h2>
              <p className="mt-3 flex-1 text-sm text-pmr-muted">
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
