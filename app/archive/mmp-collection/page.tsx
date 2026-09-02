import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { mmpCollectionPage } from "@/lib/archive";

export const metadata: Metadata = {
  title: mmpCollectionPage.title,
  description: mmpCollectionPage.intro,
};

export default function MmpCollectionPage() {
  return (
    <>
      <section
        className="relative isolate overflow-hidden border-b-4 border-pmr-border bg-pmr-dark"
        aria-labelledby="mmp-collection-heading"
      >
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={mmpCollectionPage.photo.src}
            alt={mmpCollectionPage.photo.alt}
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
            id="mmp-collection-heading"
            className="max-w-4xl text-3xl font-bold tracking-tight text-pmr-offwhite sm:text-4xl lg:text-5xl"
          >
            {mmpCollectionPage.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-pmr-cream sm:text-lg">
            {mmpCollectionPage.intro}
          </p>
        </div>
      </section>

      <PageShell>
        <div className="max-w-3xl space-y-8 text-lg leading-relaxed text-pmr-dark">
          <div className="space-y-6">
            {mmpCollectionPage.history.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>

          <section aria-labelledby="mmp-scope-heading" className="space-y-6">
            <h2
              id="mmp-scope-heading"
              className="text-2xl font-bold tracking-tight text-pmr-dark sm:text-3xl"
            >
              {mmpCollectionPage.scopeTitle}
            </h2>
            {mmpCollectionPage.scope.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </section>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/archive/browse" className="pmr-btn">
              Browse the Archive
            </Link>
            <Link
              href="/archive/mmp-community-policy"
              className="pmr-btn-secondary"
            >
              MMP Collection Community Policy
            </Link>
          </div>
        </div>
      </PageShell>
    </>
  );
}
