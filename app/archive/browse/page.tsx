import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ArchiveSideMenu } from "@/components/archive/ArchiveSideMenu";
import { UnderConstruction } from "@/components/archive/UnderConstruction";
import { archiveBrowse } from "@/lib/archive";

export const metadata: Metadata = {
  title: archiveBrowse.title,
  description: archiveBrowse.intro,
};

export default function ArchiveBrowsePage() {
  return (
    <PageShell>
      <div className="grid gap-8 lg:grid-cols-[minmax(14rem,18rem)_1fr]">
        <ArchiveSideMenu />
        <div>
          <header className="mb-8 sm:mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-pmr-dark sm:text-4xl">
              {archiveBrowse.title}
            </h1>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-pmr-charcoal sm:text-lg">
              {archiveBrowse.intro}
            </p>
          </header>
          <UnderConstruction />
        </div>
      </div>
    </PageShell>
  );
}
