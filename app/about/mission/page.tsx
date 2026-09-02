import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { HashRedirect } from "@/components/about/HashRedirect";

export const metadata: Metadata = {
  title: "Mission, Vision, and Values",
  description:
    "People's Media Record's mission, vision, values, and theory of change.",
};

export default function MissionPage() {
  return (
    <PageShell title="Mission, Vision, and Values">
      <HashRedirect href="/about#mission-vision-values" />
    </PageShell>
  );
}
