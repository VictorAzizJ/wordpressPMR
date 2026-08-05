import Image from "next/image";
import { notFound } from "next/navigation";
import { stories, getStoryBySlug, getRecordById } from "@/lib/mock-data";
import { PageShell } from "@/components/layout/PageShell";
import { StoryBody } from "@/components/stories/StoryBody";
import { RecordCard } from "@/components/archive/RecordCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export default async function StoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const relatedRecords = story.relatedRecordIds
    .map((id) => getRecordById(id))
    .filter(Boolean);

  return (
    <PageShell>
      <article>
        <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-pmr border-4 border-pmr-dark bg-pmr-dark">
          <Image
            src={story.heroImage}
            alt=""
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
        <p className="text-sm font-bold uppercase tracking-wider text-pmr-coral">
          Exhibition
        </p>
        <h1 className="mt-2 text-3xl font-bold text-pmr-dark sm:text-4xl">
          {story.title}
        </h1>
        <p className="mt-4 max-w-3xl text-xl text-pmr-charcoal">{story.intro}</p>

        <div className="mt-10 max-w-3xl">
          <StoryBody sections={story.sections} />
        </div>

        {story.credits && (
          <p className="mt-10 border-t-2 border-pmr-dark/20 pt-6 text-sm text-pmr-charcoal">
            {story.credits}
          </p>
        )}
      </article>

      {relatedRecords.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-pmr-dark">
            Related archive records
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedRecords.map(
              (record) => record && <RecordCard key={record.id} record={record} />
            )}
          </div>
        </section>
      )}
    </PageShell>
  );
}
