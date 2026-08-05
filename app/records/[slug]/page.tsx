import Link from "next/link";
import { notFound } from "next/navigation";
import {
  archiveRecords,
  collections,
  getRecordBySlug,
} from "@/lib/mock-data";
import { PageShell } from "@/components/layout/PageShell";
import { MediaPlayer } from "@/components/shared/MediaPlayer";
import { AccessBadge } from "@/components/archive/AccessBadge";
import { MediaTypeBadge } from "@/components/archive/MediaTypeBadge";
import { TagList } from "@/components/shared/TagList";
import { RecordCard } from "@/components/archive/RecordCard";
import { TranscriptToggle } from "./TranscriptToggle";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return archiveRecords.map((r) => ({ slug: r.slug }));
}

export default async function RecordDetailPage({ params }: Props) {
  const { slug } = await params;
  const record = getRecordBySlug(slug);
  if (!record) notFound();

  const related = archiveRecords.filter(
    (r) =>
      record.relatedRecordIds?.includes(r.id) ||
      (r.id !== record.id &&
        r.collectionIds.some((id) => record.collectionIds.includes(id)))
  ).slice(0, 3);

  const recordCollections = collections.filter((c) =>
    record.collectionIds.includes(c.id)
  );

  const showAccessCta =
    record.accessLevel === "request_access" ||
    record.accessLevel === "restricted";

  return (
    <PageShell>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <MediaTypeBadge type={record.mediaType} />
            <AccessBadge level={record.accessLevel} />
          </div>
          <h1 className="text-3xl font-bold text-pmr-dark sm:text-4xl">
            {record.title}
          </h1>
          <p className="mt-2 text-pmr-charcoal">
            {new Date(record.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {record.clipLength && ` · ${record.clipLength}`}
          </p>

          <div className="mt-6">
            <MediaPlayer
              thumbnail={record.thumbnail}
              title={record.title}
              mediaType={record.mediaType}
              clipLength={record.clipLength}
              accessLevel={record.accessLevel}
            />
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-bold text-pmr-dark">Description</h2>
            <p className="mt-2 leading-relaxed text-pmr-charcoal">
              {record.description}
            </p>
          </div>

          {record.transcript && (
            <TranscriptToggle transcript={record.transcript} />
          )}

          {showAccessCta && (
            <div className="mt-8 rounded-pmr border-4 border-pmr-coral bg-pmr-cream p-6">
              <h2 className="font-bold text-pmr-dark">Need access?</h2>
              <p className="mt-2 text-sm text-pmr-charcoal">
                This material requires review before viewing. Submit an access
                request describing your intended use.
              </p>
              <Link href="/access-request" className="pmr-btn mt-4 inline-flex">
                Request access
              </Link>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="pmr-card p-5">
            <h2 className="font-bold text-pmr-offwhite">Metadata</h2>
            <dl className="mt-4 space-y-3 text-sm">
              {recordCollections.length > 0 && (
                <div>
                  <dt className="text-pmr-silver">Collection</dt>
                  <dd className="mt-1 font-medium text-pmr-offwhite">
                    {recordCollections.map((c) => (
                      <Link
                        key={c.id}
                        href={`/collections/${c.slug}`}
                        className="block text-pmr-teal hover:underline"
                      >
                        {c.title}
                      </Link>
                    ))}
                  </dd>
                </div>
              )}
              {record.organization && (
                <div>
                  <dt className="text-pmr-silver">Organization</dt>
                  <dd className="text-pmr-offwhite">{record.organization}</dd>
                </div>
              )}
              {record.location && (
                <div>
                  <dt className="text-pmr-silver">Location</dt>
                  <dd className="text-pmr-offwhite">{record.location}</dd>
                </div>
              )}
              {record.language && (
                <div>
                  <dt className="text-pmr-silver">Language</dt>
                  <dd className="text-pmr-offwhite">{record.language}</dd>
                </div>
              )}
              {record.rightsStatus && (
                <div>
                  <dt className="text-pmr-silver">Rights</dt>
                  <dd className="text-pmr-offwhite">{record.rightsStatus}</dd>
                </div>
              )}
              {record.people && record.people.length > 0 && (
                <div>
                  <dt className="text-pmr-silver">People</dt>
                  <dd className="text-pmr-offwhite">
                    {record.people.join(", ")}
                  </dd>
                </div>
              )}
            </dl>
            <div className="mt-4">
              <dt className="mb-2 text-sm text-pmr-silver">Topics</dt>
              <TagList tags={record.topics} />
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-pmr-dark">
            Related records
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <RecordCard key={r.id} record={r} />
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}
