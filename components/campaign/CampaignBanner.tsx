import Link from "next/link";
import { Radio } from "lucide-react";
import { campaignMode } from "@/config/campaign";

/** Slim homepage strip while Campaign Mode is active (popup behavior). */
export function CampaignBanner() {
  return (
    <div
      className="border-b-4 border-pmr-border bg-pmr-elevated"
      role="region"
      aria-label="Campaign announcement"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-start gap-2 text-sm text-pmr-offwhite sm:items-center">
          <Radio
            className="mt-0.5 h-4 w-4 shrink-0 text-pmr-coral sm:mt-0"
            aria-hidden
          />
          <span>{campaignMode.bannerMessage}</span>
        </p>
        <Link
          href={campaignMode.ctaHref}
          className="pmr-btn shrink-0 text-sm"
        >
          {campaignMode.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
