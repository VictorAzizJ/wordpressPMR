import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ResourcePoolList } from "@/components/resources/ResourcePoolList";
import { resourcePoolIntro, resourceSections } from "@/lib/resources";

const pool = resourceSections[0];

export const metadata: Metadata = {
  title: pool.label,
  description: resourcePoolIntro.join(" "),
};

export default function ResourcePoolPage() {
  return (
    <PageShell title={pool.label}>
      <div className="mb-8 max-w-3xl space-y-4 text-lg leading-relaxed text-pmr-charcoal">
        {resourcePoolIntro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <ResourcePoolList />
    </PageShell>
  );
}
