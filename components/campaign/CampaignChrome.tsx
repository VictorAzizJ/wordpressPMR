"use client";

import { usePathname } from "next/navigation";
import { CampaignPopup } from "@/components/campaign/CampaignPopup";
import { useCampaignState } from "@/hooks/useCampaignState";

/**
 * Site-wide campaign chrome. Popup mounts here (not a redirect) so every
 * route can show it once per session without trapping navigation.
 */
export function CampaignChrome() {
  const pathname = usePathname();
  const { showPopup, dismiss, config } = useCampaignState();

  if (!showPopup || pathname === "/camp") return null;

  return <CampaignPopup config={config} onDismiss={dismiss} />;
}
