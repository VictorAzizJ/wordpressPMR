import { GlitchText } from "@/components/camp/GlitchText";

interface CampHeroProps {
  registerHref?: string;
}

export function CampHero({ registerHref = "#register" }: CampHeroProps) {
  return (
    <section className="relative flex min-h-[72vh] flex-col items-center justify-center px-4 py-16 sm:px-6">
      <p className="mb-8 font-mono text-xs font-bold uppercase tracking-[0.35em] text-pmr-green sm:text-sm">
        <span className="text-pmr-coral">●</span> signal · programs · open
      </p>

      <GlitchText text="MEDIA CAMP" />

      <p className="mt-10 max-w-2xl text-center text-lg text-pmr-muted sm:text-xl">
        Hands-on workshops for young people and neighbors who want to record,
        digitize, and tell community stories — with tape, mics, and archival
        care at the center.
      </p>

      <p className="mt-6 font-mono text-sm text-pmr-green-bright/90">
        &gt; digitize · label · pass it on_
      </p>

      <a href={registerHref} className="pmr-btn mt-10 text-base">
        Register for Camp
      </a>
    </section>
  );
}
