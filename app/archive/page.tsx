import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { archiveHub, archiveSections } from "@/lib/archive";

export const metadata: Metadata = {
  title: archiveHub.title,
  description: archiveHub.intro,
};

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim();
  if (query) {
    redirect(`/archive/browse?q=${encodeURIComponent(query)}`);
  }

  return (
    <>
      <section
        className="relative isolate overflow-hidden border-b-4 border-pmr-border bg-pmr-dark"
        aria-labelledby="archive-heading"
      >
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={archiveHub.photo.src}
            alt={archiveHub.photo.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pmr-dark/80 via-pmr-dark/45 to-pmr-dark/20"
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex min-h-[min(52svh,28rem)] max-w-7xl flex-col justify-end px-4 py-12 sm:px-6 sm:py-16">
          <h1
            id="archive-heading"
            className="max-w-4xl text-3xl font-bold tracking-tight text-pmr-offwhite sm:text-4xl lg:text-5xl"
          >
            {archiveHub.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-pmr-cream sm:text-lg">
            {archiveHub.intro}
          </p>
        </div>
      </section>

      <PageShell>
        <div className="grid gap-6 sm:grid-cols-2">
          {archiveSections.map((section) => (
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
                {section.cta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </p>
            </Link>
          ))}
        </div>
      </PageShell>
    </>
  );
}
