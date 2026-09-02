import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import type { ArchiveRecord, MediaType } from "@/lib/types";

const mediaTypeLabels: Record<MediaType, string> = {
  video: "Video",
  audio: "Audio",
  image: "Image",
  document: "Document",
};

interface ArchiveResultItemProps {
  record: ArchiveRecord;
  index: number;
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ArchiveResultItem({ record, index }: ArchiveResultItemProps) {
  const needsAccess = record.accessLevel !== "public";
  const accessHref = `/access-request?record=${encodeURIComponent(record.slug)}`;
  const recordHref = `/records/${record.slug}`;

  const fields: { label: string; value: string }[] = [
    { label: "Location", value: record.location || "—" },
    { label: "Date", value: formatDate(record.date) },
    { label: "Topic", value: record.topics.join(", ") || "—" },
    { label: "Media Type", value: mediaTypeLabels[record.mediaType] },
    { label: "Length", value: record.clipLength || "—" },
    { label: "Description", value: record.description },
  ];

  return (
    <article className="border-b-2 border-pmr-dark/30 pb-6 last:border-0 last:pb-0">
      <h2 className="text-xl font-bold sm:text-2xl">
        <span className="text-pmr-dark">{index}. </span>
        <Link
          href={recordHref}
          className="text-pmr-blue hover:underline focus-visible:outline-none"
        >
          {record.title}
        </Link>
      </h2>
      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start">
        {needsAccess ? (
          <Link
            href={accessHref}
            className="relative block h-36 w-36 shrink-0 overflow-hidden rounded-md border-2 border-pmr-dark bg-pmr-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pmr-coral/70"
            aria-label={`Request access to ${record.title}`}
          >
            <Image
              src={record.thumbnail}
              alt=""
              fill
              className="object-cover opacity-30 blur-[1px]"
              sizes="144px"
              unoptimized
            />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-pmr-dark/55 px-2 text-center">
              <Lock className="h-6 w-6 text-pmr-offwhite" aria-hidden />
              <span className="text-xs font-bold uppercase tracking-wide text-pmr-offwhite">
                Request Access
              </span>
            </span>
          </Link>
        ) : (
          <Link
            href={recordHref}
            className="relative block h-36 w-36 shrink-0 overflow-hidden rounded-md border-2 border-pmr-dark bg-pmr-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pmr-coral/70"
          >
            <Image
              src={record.thumbnail}
              alt=""
              fill
              className="object-cover"
              sizes="144px"
              unoptimized
            />
          </Link>
        )}
        <dl className="min-w-0 flex-1 text-sm leading-relaxed text-pmr-dark">
          {fields.map((field) => (
            <div key={field.label} className="grid grid-cols-[7.5rem_1fr] gap-x-3 gap-y-1 sm:grid-cols-[8.5rem_1fr]">
              <dt className="font-bold">{field.label}:</dt>
              <dd>{field.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
