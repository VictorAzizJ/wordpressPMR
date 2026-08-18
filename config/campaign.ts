/**
 * Campaign Mode — staff-facing switches for timed promos (Camp, etc.).
 *
 * Flip `enabled`, `behavior`, or the date window without touching UI code.
 * Dates are local wall time (no timezone suffix), matching the plan defaults.
 */

export type CampaignId = "camp";
export type CampaignBehavior = "popup" | "landing";

export interface CampaignMode {
  enabled: boolean;
  campaign: CampaignId;
  behavior: CampaignBehavior;
  startDate: string;
  endDate: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  continueLabel: string;
  bannerMessage: string;
  popupTitle: string;
}

export const campaignMode: CampaignMode = {
  enabled: true,
  campaign: "camp",
  behavior: "popup",
  startDate: "2026-08-15T00:00:00",
  endDate: "2026-09-15T23:59:59",
  eyebrow: "Campaign window",
  title: "Media Camp registration is open",
  description:
    "Hands-on workshops in oral history, digitization, and community archival care. Free. Philadelphia. Spots are limited — register while the window is open.",
  ctaLabel: "Register for Camp",
  ctaHref: "/camp",
  continueLabel: "Continue to the archive",
  bannerMessage:
    "Media Camp registration is open. Workshops in recording, digitization, and archival care.",
  popupTitle: "Media Camp is open",
};

export const CAMPAIGN_DISMISS_KEY = "pmr-campaign-dismissed";
