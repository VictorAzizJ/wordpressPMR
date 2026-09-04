import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { MmpCommunityPolicyBody } from "@/components/archive/MmpCommunityPolicyBody";
import { mmpCommunityPolicyMeta } from "@/lib/mmp-community-policy";

export const metadata: Metadata = {
  title: mmpCommunityPolicyMeta.title,
  description: mmpCommunityPolicyMeta.description,
};

export default function MmpCommunityPolicyPage() {
  return (
    <PageShell
      title={mmpCommunityPolicyMeta.title}
      subtitle={mmpCommunityPolicyMeta.description}
    >
      <MmpCommunityPolicyBody />
      <div className="mx-auto mt-10 flex max-w-3xl flex-wrap gap-4">
        <Link href="/archive" className="pmr-btn-secondary">
          Back to Archive
        </Link>
        <Link href="/archive/mmp-collection" className="pmr-btn-secondary">
          About the MMP Collection
        </Link>
        <Link href="/access-request" className="pmr-btn">
          Request access
        </Link>
      </div>
    </PageShell>
  );
}
