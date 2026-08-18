import Link from "next/link";
import { getFeaturedCollections } from "@/lib/mock-data";
import { getUpdates } from "@/lib/updates";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CollectionCard } from "@/components/collections/CollectionCard";
import { CallToAction } from "@/components/shared/CallToAction";
import { HomeHero } from "@/components/home/HomeHero";
import { UpdatesFeed } from "@/components/home/UpdatesFeed";
import { CampaignBanner } from "@/components/campaign/CampaignBanner";
import { CampaignLandingHero } from "@/components/campaign/CampaignLandingHero";
import {
  isCampaignActive,
  isCampaignLandingMode,
} from "@/lib/campaign/isCampaignActive";
import { ArrowRight, Radio } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredCollections = getFeaturedCollections();
  const updates = await getUpdates();
  const campaignActive = isCampaignActive();
  const landingHero = isCampaignLandingMode();

  return (
    <>
      {landingHero ? (
        <CampaignLandingHero continueHref="#pmr-content" />
      ) : (
        campaignActive && <CampaignBanner />
      )}

      <div id="pmr-content" className="scroll-mt-24">
        <HomeHero titleAs={landingHero ? "h2" : "h1"} />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <SectionHeading title="What PMR does" href="/about" linkLabel="About us" />
        <p className="max-w-3xl text-lg text-pmr-muted">
          People&apos;s Media Record stewards oral histories, community radio,
          strike footage, and youth media — with search, collections, and
          responsible access so movement memory stays public, usable, and cared
          for by the communities who made it.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            "Preserve fragile tapes and born-digital media",
            "Describe materials with community-informed metadata",
            "Train stewards and open responsible access pathways",
          ].map((item) => (
            <li
              key={item}
              className="border-l-4 border-pmr-green pl-4 text-sm text-pmr-offwhite"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <UpdatesFeed posts={updates} />

      <section className="border-y-4 border-pmr-border bg-pmr-black py-12 sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-sm font-bold uppercase tracking-widest text-pmr-coral">
              Programs
            </p>
            <h2 className="mt-2 text-2xl font-bold text-pmr-offwhite sm:text-3xl">
              Media Camp &amp; community programs
            </h2>
            <p className="mt-3 text-pmr-muted">
              Hands-on workshops for young people and neighbors who want to
              record, digitize, and tell community stories. Dates, FAQ, and
              registration live on the Camp page.
            </p>
          </div>
          <Link href="/camp" className="pmr-btn shrink-0 text-base">
            <Radio className="h-5 w-5" aria-hidden />
            Explore Camp
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <SectionHeading title="Explore the archive" href="/collections" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCollections.map((col) => (
            <CollectionCard key={col.id} collection={col} />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/archive" className="pmr-btn-secondary text-sm">
            Search all records
          </Link>
          <Link href="/collections" className="pmr-btn-secondary text-sm">
            Browse collections
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <h2 className="sr-only">Stay involved</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <CallToAction
            title="Stay in the loop"
            description="Join the community list for archive drops, events, and ways to dig into movement media with us."
            href="/subscribe"
            buttonLabel="Subscribe"
          />
          <CallToAction
            title="Build with us"
            description="Volunteer, steward a collection, partner with PMR, or share your skills and resources."
            href="/build-with-us"
            buttonLabel="Get involved"
            variant="charcoal"
          />
        </div>
      </section>
    </>
  );
}
