"use client";

import Link from "next/link";
import { Heart, Mail, Search } from "lucide-react";
import { useId } from "react";
import { PhotoCarousel } from "@/components/shared/PhotoCarousel";
import { heroPhotos, type HeroPhoto } from "@/lib/hero-photos";

interface HomeHeroProps {
  photos?: HeroPhoto[];
  /** Use h2 when another page-level h1 is already present (e.g. campaign landing). */
  titleAs?: "h1" | "h2";
}

export function HomeHero({ photos = heroPhotos, titleAs = "h1" }: HomeHeroProps) {
  const headingId = useId();
  const HeadingTag = titleAs;

  return (
    <PhotoCarousel
      photos={photos}
      labelledBy={headingId}
      frameClassName="lg:aspect-[16/9] lg:min-h-0 lg:max-w-[calc(min(85svh,42rem)*16/9)]"
    >
      <HeadingTag
        id={headingId}
        className="max-w-4xl text-4xl font-bold leading-tight text-pmr-offwhite sm:text-5xl lg:text-6xl"
      >
        Share knowledge. Build connections. Think collectively.
      </HeadingTag>
      <p className="mt-4 max-w-2xl text-base text-pmr-cream sm:text-lg">
        A digital archive and hub for the grassroots preservation,
        stewardship, and activation of community stories in the Philadelphia
        region.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
        <Link href="/archive/browse" className="pmr-btn-hero text-base">
          <Search className="h-4 w-4" aria-hidden />
          Search the Archive
        </Link>
        <Link href="/subscribe" className="pmr-btn text-base">
          <Mail className="h-4 w-4" aria-hidden />
          Subscribe
        </Link>
        <Link href="/donate" className="pmr-btn text-base">
          <Heart className="h-4 w-4" aria-hidden />
          Support
        </Link>
      </div>
    </PhotoCarousel>
  );
}
