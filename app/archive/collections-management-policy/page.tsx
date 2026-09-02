import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { CollectionsManagementPolicyBody } from "@/components/archive/CollectionsManagementPolicyBody";
import { collectionsManagementPolicyMeta } from "@/lib/collections-management-policy";

export const metadata: Metadata = {
  title: collectionsManagementPolicyMeta.title,
  description: collectionsManagementPolicyMeta.description,
};

export default function CollectionsManagementPolicyPage() {
  return (
    <PageShell
      title={collectionsManagementPolicyMeta.title}
      subtitle={collectionsManagementPolicyMeta.description}
    >
      <CollectionsManagementPolicyBody />
      <div className="mx-auto mt-10 flex max-w-3xl flex-wrap gap-4">
        <Link href="/archive" className="pmr-btn-secondary">
          Back to Archive
        </Link>
        <Link href="/archive/mmp-community-policy" className="pmr-btn-secondary">
          MMP Collection Community Policy
        </Link>
        <Link href="/access-request" className="pmr-btn">
          Request access
        </Link>
      </div>
    </PageShell>
  );
}
