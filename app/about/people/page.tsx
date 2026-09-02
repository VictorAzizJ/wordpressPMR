import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { HashRedirect } from "@/components/about/HashRedirect";

export const metadata: Metadata = {
  title: "People",
  description: "Staff behind People's Media Record.",
};

export default function PeoplePage() {
  return (
    <PageShell title="People">
      <HashRedirect href="/about#people" />
    </PageShell>
  );
}
