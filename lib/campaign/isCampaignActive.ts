import {
  campaignMode,
  type CampaignMode,
} from "@/config/campaign";

function parseWindowDate(value: string): Date | null {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** True when Campaign Mode is enabled and `now` falls inside the config window. */
export function isCampaignActive(
  now: Date = new Date(),
  config: CampaignMode = campaignMode,
): boolean {
  if (!config.enabled) return false;
  const start = parseWindowDate(config.startDate);
  const end = parseWindowDate(config.endDate);
  if (!start || !end) return false;
  const t = now.getTime();
  return t >= start.getTime() && t <= end.getTime();
}

export function isCampaignPopupMode(
  now: Date = new Date(),
  config: CampaignMode = campaignMode,
): boolean {
  return isCampaignActive(now, config) && config.behavior === "popup";
}

export function isCampaignLandingMode(
  now: Date = new Date(),
  config: CampaignMode = campaignMode,
): boolean {
  return isCampaignActive(now, config) && config.behavior === "landing";
}

/** Short end-date label for banners (e.g. "Sep 15, 2026"). */
export function formatCampaignEndDate(
  config: CampaignMode = campaignMode,
): string | null {
  const end = parseWindowDate(config.endDate);
  if (!end) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(end);
}
