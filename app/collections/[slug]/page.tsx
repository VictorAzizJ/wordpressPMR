import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { UnderConstruction } from "@/components/archive/UnderConstruction";

export const metadata: Metadata = {
  title: "Collection",
  description:
    "Collection detail pages will be available once the digital catalog is connected to this site.",
};

export default function CollectionDetailPage() {
  return (
    <PageShell title="Collection">
      <UnderConstruction
        title="Collection pages under construction"
        message="Collection detail pages will return here once the People's Media Record digital catalog is connected to this site."
      />
    </PageShell>
  );
}
