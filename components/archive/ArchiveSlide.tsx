import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CassetteTape } from "@/components/shared/CassetteTape";
import type { FeaturedSlide } from "@/lib/featured-slides";

interface ArchiveSlideProps {
  slide: FeaturedSlide;
  active: boolean;
  slideId: string;
  headingAs?: "h1" | "h2";
  /** Prefer LCP for the first slide's image when it is shown. */
  priorityImage?: boolean;
}

export function ArchiveSlide({
  slide,
  active,
  slideId,
  headingAs = "h1",
  priorityImage = false,
}: ArchiveSlideProps) {
  // Only the visible slide exposes a heading so order stays intact.
  const HeadingTag = active ? headingAs : "p";

  return (
    <div
      id={slideId}
      role="group"
      aria-roledescription="slide"
      aria-label={`${slide.title}${slide.year ? `, ${slide.year}` : ""}`}
      className={`mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-12 lg:grid-cols-2 lg:items-center lg:py-16 ${
        active ? "relative" : "hidden"
      }`}
      aria-hidden={!active}
      inert={active ? undefined : true}
    >
      <div className="relative z-10">
        {slide.tag && (
          <p className="font-mono text-sm font-bold uppercase tracking-widest text-pmr-green-bright">
            {slide.tag}
          </p>
        )}
        <HeadingTag className="mt-3 text-3xl font-bold leading-tight text-pmr-offwhite sm:text-4xl lg:text-5xl">
          {slide.title}
        </HeadingTag>
        <p className="mt-4 max-w-xl text-base text-pmr-muted sm:text-lg">
          {slide.description}
        </p>
        {slide.year && (
          <p className="mt-3 font-mono text-sm text-pmr-green-bright">
            {slide.year}
          </p>
        )}
        {(slide.cta || slide.secondaryCta) && (
          <div className="mt-8 flex flex-wrap gap-4">
            {slide.cta && (
              <Link
                href={slide.cta.href}
                className="pmr-btn text-base"
                tabIndex={active ? undefined : -1}
              >
                {slide.cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            )}
            {slide.secondaryCta && (
              <Link
                href={slide.secondaryCta.href}
                className="pmr-btn-secondary text-base"
                tabIndex={active ? undefined : -1}
              >
                {slide.secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>

      {slide.media.kind === "cassette" ? (
        // Direct grid child — same placement as the pre-carousel hero.
        <CassetteTape className="w-full max-w-sm sm:max-w-md lg:justify-self-end" />
      ) : (
        <div className="relative aspect-[3/2] w-full max-w-lg justify-self-stretch overflow-hidden rounded-pmr border-4 border-pmr-border bg-pmr-elevated shadow-cassette lg:justify-self-end">
          <Image
            src={slide.media.src}
            alt={slide.media.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 512px"
            unoptimized
            priority={priorityImage}
          />
          {/* Scrim so overlay/label text stays readable against media */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pmr-black/70 via-pmr-black/20 to-transparent"
            aria-hidden
          />
          <div className="pmr-tracking" aria-hidden />
        </div>
      )}
    </div>
  );
}
