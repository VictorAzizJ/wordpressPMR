import Image from "next/image";
import type { ReactNode } from "react";

interface ForthcomingHeroProps {
  labelledBy?: string;
  title: ReactNode;
  intro?: ReactNode;
  /** When set, shows the photo instead of the forthcoming placeholder. */
  photo?: { src: string; alt: string };
  forthcomingLabel?: string;
  minHeightClass?: string;
}

export function ForthcomingHero({
  labelledBy,
  title,
  intro,
  photo,
  forthcomingLabel = "Background image forthcoming",
  minHeightClass = "min-h-[min(52svh,28rem)]",
}: ForthcomingHeroProps) {
  const hasPhoto = Boolean(photo?.src);

  return (
    <section
      className={`relative isolate overflow-hidden border-b-4 border-pmr-border ${
        hasPhoto ? "bg-pmr-dark" : "bg-pmr-elevated"
      }`}
      aria-labelledby={labelledBy}
    >
      {hasPhoto && photo ? (
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgb(var(--pmr-dark)/0.35)_0_12px,transparent_12px_24px)]"
          aria-hidden
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pmr-dark/80 via-pmr-dark/45 to-pmr-dark/20"
        aria-hidden
      />
      {!hasPhoto ? (
        <p className="absolute right-4 top-4 z-10 font-mono text-xs text-pmr-cream sm:right-6">
          {forthcomingLabel}
        </p>
      ) : null}
      <div
        className={`relative z-10 mx-auto flex ${minHeightClass} max-w-7xl flex-col justify-end px-4 py-12 sm:px-6 sm:py-16`}
      >
        <h1
          id={labelledBy}
          className="max-w-4xl text-3xl font-bold tracking-tight text-pmr-offwhite sm:text-4xl lg:text-5xl"
        >
          {title}
        </h1>
        {intro ? (
          <div className="mt-4 max-w-3xl text-base leading-relaxed text-pmr-cream sm:text-lg">
            {intro}
          </div>
        ) : null}
      </div>
    </section>
  );
}
