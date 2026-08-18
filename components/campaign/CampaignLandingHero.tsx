import Link from "next/link";
import { ArrowDown, Radio } from "lucide-react";
import { campaignMode } from "@/config/campaign";
import { CassetteTape } from "@/components/shared/CassetteTape";
import { formatCampaignEndDate } from "@/lib/campaign/isCampaignActive";

interface CampaignLandingHeroProps {
  /** In-page skip into normal PMR content (not a redirect). */
  continueHref?: string;
}

/**
 * Home-top takeover when `campaignMode.behavior === "landing"`.
 * Stays on `/` — Register goes to Camp; Continue jumps to archive content below.
 */
export function CampaignLandingHero({
  continueHref = "#pmr-content",
}: CampaignLandingHeroProps) {
  const through = formatCampaignEndDate();

  return (
    <section
      className="camp-signal relative overflow-hidden border-b-4 border-pmr-border"
      aria-labelledby="campaign-landing-heading"
    >
      <div className="pointer-events-none absolute inset-0 scanlines opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 grain-texture animate-static opacity-[0.1]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.35em] text-pmr-coral sm:text-sm">
            <span aria-hidden>●</span>{" "}
            {campaignMode.eyebrow}
            {through ? ` · through ${through}` : ""}
          </p>
          <h1
            id="campaign-landing-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-pmr-dark sm:text-4xl lg:text-5xl"
          >
            {campaignMode.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-pmr-charcoal">
            {campaignMode.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href={campaignMode.ctaHref} className="pmr-btn text-base">
              <Radio className="h-5 w-5" aria-hidden />
              {campaignMode.ctaLabel}
            </Link>
            <a
              href={continueHref}
              className="pmr-btn-secondary text-base"
            >
              {campaignMode.continueLabel}
              <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <CassetteTape />
        </div>
      </div>
    </section>
  );
}
