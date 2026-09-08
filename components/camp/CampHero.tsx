import Image from "next/image";
import Link from "next/link";

interface CampHeroProps {
  registerHref?: string;
}

export function CampHero({ registerHref = "/camp/register" }: CampHeroProps) {
  return (
    <section
      className="relative isolate overflow-hidden border-b-4 border-pmr-border bg-pmr-dark"
      aria-labelledby="camp-hero-heading"
    >
      <div className="relative aspect-[16/9] w-full lg:aspect-auto lg:min-h-[min(88svh,44rem)]">
        <Image
          src="/images/camp/hero-bg.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
          unoptimized
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pmr-dark/40 via-transparent to-pmr-dark/10"
          aria-hidden
        />

        {/* Same frame as the photo so PUSH sits on the reels and the title stays in the gap. */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/images/camp/hero-title.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            unoptimized
          />
        </div>

        <h1 id="camp-hero-heading" className="sr-only">
          Push Back Push Forward — People’s Media Camp, October 3–4, 2026
        </h1>
      </div>

      <div className="relative z-10 flex justify-center px-4 py-4 lg:absolute lg:bottom-8 lg:left-1/2 lg:px-0 lg:py-0 lg:-translate-x-1/2">
        <Link
          href={registerHref}
          className="camp-hero-cta pmr-btn-hero w-full max-w-xs text-base lg:w-auto"
        >
          Register for Camp
        </Link>
      </div>
    </section>
  );
}
