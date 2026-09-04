import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { UnderConstruction } from "@/components/archive/UnderConstruction";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Archive collections will be available once the digital catalog is connected to this site.",
};

export default function CollectionsPage() {
  return (
    <PageShell
      title="Collections"
      subtitle="Curated groupings of records by theme, organization, time period, or movement."
    >
      <UnderConstruction
        title="Collections under construction"
        message="Collection browsing will return here once the People's Media Record digital catalog is connected to this site."
      />
    </PageShell>
  );
}
