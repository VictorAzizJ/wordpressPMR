import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { MmpCommunityPolicyBody } from "@/components/archive/MmpCommunityPolicyBody";
import { archiveSections } from "@/lib/archive";

const policy = archiveSections[3];

export const metadata: Metadata = {
  title: policy.label,
  description: policy.description,
};

export default function MmpCommunityPolicyPage() {
  return (
    <PageShell title={policy.label}>
      <div className="max-w-3xl space-y-8">
        <MmpCommunityPolicyBody />
        <div className="flex flex-wrap gap-4">
          <Link href="/archive" className="pmr-btn-secondary">
            Back to Archive
          </Link>
          <Link href="/archive/mmp-collection" className="pmr-btn">
            About the MMP Collection
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
