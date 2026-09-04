import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { UnderConstruction } from "@/components/archive/UnderConstruction";

export const metadata: Metadata = {
  title: "Archive record",
  description:
    "Individual archive records will be available once the digital catalog is connected to this site.",
};

export default function RecordDetailPage() {
  return (
    <PageShell title="Archive record">
      <UnderConstruction
        title="Record pages under construction"
        message="Individual archive records will return here once the People's Media Record digital catalog is connected to this site."
      />
    </PageShell>
  );
}
