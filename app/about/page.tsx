import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { AboutPageBody } from "@/components/about/AboutPageBody";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mission, vision, values, and people behind People's Media Record — an archival and educational hub for community media in Philadelphia.",
};

export default function AboutPage() {
  return (
    <PageShell title="About People&apos;s Media Record">
      <AboutPageBody />
    </PageShell>
  );
}
