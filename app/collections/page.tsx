import { collections } from "@/lib/mock-data";
import { PageShell } from "@/components/layout/PageShell";
import { CollectionCard } from "@/components/collections/CollectionCard";

export default function CollectionsPage() {
  return (
    <PageShell
      title="Collections"
      subtitle="Curated groupings of records by theme, organization, time period, or movement."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((col) => (
          <CollectionCard key={col.id} collection={col} />
        ))}
      </div>
    </PageShell>
  );
}
