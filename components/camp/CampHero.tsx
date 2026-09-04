import Image from "next/image";
import Link from "next/link";

interface CampHeroProps {
  registerHref?: string;
}

export function CampHero({ registerHref = "/camp/register" }: CampHeroProps) {
  return (
    <section
      className="relative isolate flex min-h-[min(88svh,44rem)] flex-col items-center justify-center overflow-hidden border-b-4 border-pmr-border bg-pmr-dark px-4 py-16 sm:min-h-[min(92svh,48rem)] sm:px-6"
      aria-labelledby="camp-hero-heading"
    >
      <Image
        src="/images/camp/hero-bg.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority
        unoptimized
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pmr-dark/50 via-pmr-dark/10 to-pmr-dark/25"
        aria-hidden
      />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
        <div className="camp-hero-title-pulse w-full">
          <CampHeroTitle />
        </div>

        <Link
          href={registerHref}
          className="camp-hero-cta pmr-btn-hero mt-10 text-base sm:mt-12"
        >
          Register for Camp
        </Link>
      </div>
    </section>
  );
}

function CampHeroTitle() {
  return (
    <h1
      id="camp-hero-heading"
      className="camp-hero-title mx-auto w-fit max-w-full text-pmr-offwhite"
    >
      <span className="camp-hero-title-row" aria-hidden="true">
        <span className="camp-hero-push camp-hero-push-red">PUSH</span>
        <span className="camp-hero-word">Back</span>
        <span className="camp-hero-colon">
          <span />
          <span />
        </span>
        <span className="camp-hero-forward-block">
          <span className="camp-hero-push camp-hero-push-green">PUSH</span>
          <span className="camp-hero-word">Forward</span>
          <span className="camp-hero-rule" />
          <span className="camp-hero-meta">
            <span className="camp-hero-brand">People&apos;s Media Camp</span>
            <span className="camp-hero-dates">October 3 – 4, 2026</span>
          </span>
        </span>
      </span>
      <span className="sr-only">
        Push Back Push Forward — People’s Media Camp, October 3–4, 2026
      </span>
    </h1>
  );
}
