import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { paceCopy, resourceSections } from "@/lib/resources";

const pace = resourceSections[1];

export const metadata: Metadata = {
  title: pace.label,
  description: pace.description,
};

export default function PacePage() {
  return (
    <PageShell title={pace.label} subtitle={pace.description}>
      <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-pmr-charcoal">
        {paceCopy.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/resources/pool" className="pmr-btn">
          Resource Pool
        </Link>
        <Link href="/resources/glossary" className="pmr-btn-secondary">
          Glossary
        </Link>
      </div>
    </PageShell>
  );
}
