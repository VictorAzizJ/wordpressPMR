import { GlitchText } from "@/components/camp/GlitchText";

interface CampHeroProps {
  registerHref?: string;
}

export function CampHero({ registerHref = "#register" }: CampHeroProps) {
  return (
    <section
      className="relative flex min-h-[60svh] flex-col items-center justify-center px-4 py-16 sm:min-h-[72vh] sm:px-6"
      aria-labelledby="camp-hero-heading"
    >
      <p className="mb-8 font-mono text-xs font-bold uppercase tracking-[0.35em] text-pmr-coral sm:text-sm">
        <span aria-hidden>●</span> signal · programs · open
      </p>

      <GlitchText id="camp-hero-heading" text="MEDIA CAMP" as="h1" />

      <p className="mt-10 max-w-2xl text-center text-lg text-pmr-charcoal sm:text-xl">
        Hands-on workshops for young people and neighbors who want to record,
        digitize, and tell community stories — with tape, mics, and archival
        care at the center.
      </p>

      <p className="mt-6 font-mono text-sm text-pmr-dark">
        &gt; digitize · label · pass it on_
      </p>

      <a href={registerHref} className="pmr-btn mt-10 text-base">
        Register for Camp
      </a>
    </section>
  );
}
