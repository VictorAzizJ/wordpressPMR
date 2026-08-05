import Link from "next/link";
import {
  getFeaturedCollections,
  getFeaturedRecords,
  getFeaturedStories,
} from "@/lib/mock-data";
import { CassetteTape } from "@/components/shared/CassetteTape";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RecordCard } from "@/components/archive/RecordCard";
import { CollectionCard } from "@/components/collections/CollectionCard";
import { StoryCard } from "@/components/stories/StoryCard";
import { CallToAction } from "@/components/shared/CallToAction";
import { Search } from "lucide-react";

export default function HomePage() {
  const featuredRecords = getFeaturedRecords().slice(0, 4);
  const featuredCollections = getFeaturedCollections();
  const featuredStories = getFeaturedStories();

  return (
    <>
      <section className="border-b-4 border-pmr-dark bg-pmr-teal">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-pmr-coral">
              Community archive · Demo
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-pmr-dark sm:text-5xl lg:text-6xl">
              Movement memory, preserved &amp; shared
            </h1>
            <p className="mt-5 max-w-xl text-lg text-pmr-charcoal">
              People&apos;s Media Record stewards oral histories, community
              radio, strike footage, and youth media — with search, collections,
              and responsible access for the public.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/archive" className="pmr-btn text-base">
                <Search className="h-5 w-5" aria-hidden />
                Search the Archive
              </Link>
              <Link href="/collections" className="pmr-btn-secondary text-base">
                Browse Collections
              </Link>
            </div>
          </div>
          <CassetteTape className="lg:justify-self-end" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <SectionHeading title="Featured records" href="/archive" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredRecords.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </div>
      </section>

      <section className="border-y-4 border-pmr-dark bg-pmr-cream/50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading title="Collections" href="/collections" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredCollections.map((col) => (
              <CollectionCard key={col.id} collection={col} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <SectionHeading title="Stories & exhibitions" href="/stories" />
        <div className="grid gap-6 lg:grid-cols-2">
          {featuredStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <CallToAction
            title="Build with us"
            description="Volunteer, steward a collection, partner with PMR, or share your skills and resources."
            href="/build-with-us"
            buttonLabel="Get involved"
          />
          <CallToAction
            title="Support the archive"
            description="Your contribution helps digitize tapes, train stewards, and keep movement media accessible."
            href="/donate"
            buttonLabel="Donate"
            variant="charcoal"
          />
        </div>
      </section>
    </>
  );
}
