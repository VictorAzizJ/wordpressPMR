import Link from "next/link";
import Image from "next/image";
import type { Collection } from "@/lib/types";

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const count = collection.recordIds.length;

  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="pmr-card group block overflow-hidden transition hover:-translate-y-0.5"
    >
      <div className="relative aspect-[4/3] bg-pmr-black">
        <Image
          src={collection.coverImage}
          alt=""
          fill
          className="object-cover transition group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, 50vw"
          unoptimized
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-pmr-offwhite group-hover:text-pmr-green-bright">
          {collection.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-pmr-muted">
          {collection.description}
        </p>
        <p className="mt-3 text-xs font-bold text-pmr-coral">
          {count} records
          {collection.dateRange && ` · ${collection.dateRange}`}
        </p>
      </div>
    </Link>
  );
}
