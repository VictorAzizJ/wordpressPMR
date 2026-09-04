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
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pmr-dark/45 via-pmr-dark/10 to-pmr-dark/25"
        aria-hidden
      />

      <h1 id="camp-hero-heading" className="sr-only">
        Push Back Push Forward — People’s Media Camp, October 3–4, 2026
      </h1>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
        <div className="camp-hero-title-pulse w-full">
          <Image
            src="/images/camp/hero-title.png"
            alt=""
            width={823}
            height={247}
            className="h-auto w-full"
            sizes="(max-width: 896px) 92vw, 56rem"
            priority
            unoptimized
            aria-hidden
          />
        </div>

        <Link
          href={registerHref}
          className="camp-hero-cta pmr-btn-hero mt-8 text-base sm:mt-10"
        >
          Register for Camp
        </Link>
      </div>
    </section>
  );
}
