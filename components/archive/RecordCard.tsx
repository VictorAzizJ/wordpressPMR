import Link from "next/link";
import Image from "next/image";
import type { ArchiveRecord } from "@/lib/types";
import { AccessBadge } from "./AccessBadge";
import { MediaTypeBadge } from "./MediaTypeBadge";
import { Calendar } from "lucide-react";

interface RecordCardProps {
  record: ArchiveRecord;
}

export function RecordCard({ record }: RecordCardProps) {
  const year = new Date(record.date).getFullYear();

  return (
    <article className="pmr-card group overflow-hidden transition hover:-translate-y-0.5">
      <Link href={`/records/${record.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden bg-pmr-black">
          <Image
            src={record.thumbnail}
            alt=""
            fill
            className="object-cover transition group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
          <div className="absolute left-2 top-2 flex flex-wrap gap-1">
            <MediaTypeBadge type={record.mediaType} />
          </div>
        </div>
        <div className="p-4">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <AccessBadge level={record.accessLevel} />
            {record.clipLength && (
              <span className="text-xs text-pmr-muted">{record.clipLength}</span>
            )}
          </div>
          <h3 className="font-bold leading-snug text-pmr-offwhite group-hover:text-pmr-green-bright">
            {record.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-pmr-muted">
            {record.description}
          </p>
          <p className="mt-3 flex items-center gap-1 text-xs text-pmr-muted">
            <Calendar className="h-3 w-3" aria-hidden />
            {year}
            {record.organization && ` · ${record.organization}`}
          </p>
        </div>
      </Link>
    </article>
  );
}
