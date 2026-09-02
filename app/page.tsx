import { getUpdates } from "@/lib/updates";
import { HomeHero } from "@/components/home/HomeHero";
import { UpdatesFeed } from "@/components/home/UpdatesFeed";
import { CampaignBanner } from "@/components/campaign/CampaignBanner";
import { CampaignLandingHero } from "@/components/campaign/CampaignLandingHero";
import {
  isCampaignActive,
  isCampaignLandingMode,
} from "@/lib/campaign/isCampaignActive";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const updates = await getUpdates();
  const campaignActive = isCampaignActive();
  const landingHero = isCampaignLandingMode();

  return (
    <>
      {landingHero ? (
        <CampaignLandingHero continueHref="#pmr-content" />
      ) : (
        campaignActive && <CampaignBanner />
      )}

      <div id="pmr-content" className="scroll-mt-24">
        <HomeHero titleAs={landingHero ? "h2" : "h1"} />
      </div>

      <UpdatesFeed posts={updates} />
    </>
  );
}
