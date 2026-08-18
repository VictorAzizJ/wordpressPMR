"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CAMPAIGN_DISMISS_KEY,
  campaignMode,
  type CampaignMode,
} from "@/config/campaign";
import {
  isCampaignActive,
  isCampaignLandingMode,
  isCampaignPopupMode,
} from "@/lib/campaign/isCampaignActive";

export interface CampaignState {
  active: boolean;
  dismissed: boolean;
  hydrated: boolean;
  config: CampaignMode;
  showPopup: boolean;
  showBanner: boolean;
  showLandingHero: boolean;
  dismiss: () => void;
}

function readDismissed(): boolean {
  try {
    return sessionStorage.getItem(CAMPAIGN_DISMISS_KEY) === campaignMode.campaign;
  } catch {
    return false;
  }
}

function writeDismissed() {
  try {
    sessionStorage.setItem(CAMPAIGN_DISMISS_KEY, campaignMode.campaign);
  } catch {
    // Private mode / blocked storage — in-memory dismiss still works this session.
  }
}

/**
 * Client campaign helper. Popup wait until after hydration so a dismissed
 * session does not flash the modal. Dismissal key: `pmr-campaign-dismissed`.
 */
export function useCampaignState(): CampaignState {
  const [hydrated, setHydrated] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const active = isCampaignActive();

  useEffect(() => {
    setDismissed(readDismissed());
    setHydrated(true);
  }, []);

  const dismiss = useCallback(() => {
    setDismissed(true);
    writeDismissed();
  }, []);

  return {
    active,
    dismissed,
    hydrated,
    config: campaignMode,
    showPopup:
      hydrated &&
      isCampaignPopupMode() &&
      !dismissed,
    showBanner: active,
    showLandingHero: isCampaignLandingMode(),
    dismiss,
  };
}
