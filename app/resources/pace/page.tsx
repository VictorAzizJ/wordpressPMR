import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { resourceSections } from "@/lib/resources";

const pace = resourceSections[1];

export const metadata: Metadata = {
  title: pace.label,
  description: pace.description,
};

export default function PacePage() {
  return (
    <PageShell title={pace.label} subtitle={pace.description}>
      <div className="flex flex-wrap gap-4 pt-2">
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
