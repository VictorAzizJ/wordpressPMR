import Image from "next/image";
import { notFound } from "next/navigation";
import {
  collections,
  getCollectionBySlug,
  getRecordsForCollection,
} from "@/lib/mock-data";
import { PageShell } from "@/components/layout/PageShell";
import { RecordCard } from "@/components/archive/RecordCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const records = getRecordsForCollection(collection.id);

  return (
    <PageShell>
      <div className="pmr-card overflow-hidden">
        <div className="relative aspect-[21/9] bg-pmr-black">
          <Image
            src={collection.coverImage}
            alt=""
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-pmr-offwhite sm:text-4xl">
            {collection.title}
          </h1>
          <p className="mt-4 max-w-3xl text-pmr-muted">
            {collection.description}
          </p>
          <dl className="mt-6 flex flex-wrap gap-6 text-sm">
            {collection.steward && (
              <div>
                <dt className="font-bold text-pmr-coral">Steward</dt>
                <dd className="text-pmr-offwhite">{collection.steward}</dd>
              </div>
            )}
            {collection.dateRange && (
              <div>
                <dt className="font-bold text-pmr-coral">Date range</dt>
                <dd className="text-pmr-offwhite">{collection.dateRange}</dd>
              </div>
            )}
            <div>
              <dt className="font-bold text-pmr-coral">Records</dt>
              <dd className="text-pmr-offwhite">{records.length}</dd>
            </div>
          </dl>
          {collection.accessNotes && (
            <p className="mt-4 rounded-lg border-2 border-pmr-border bg-pmr-black/50 p-4 text-sm text-pmr-muted">
              {collection.accessNotes}
            </p>
          )}
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-pmr-offwhite">Records in this collection</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {records.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
