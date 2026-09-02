import { CampHero } from "@/components/camp/CampHero";
import { CampFAQ } from "@/components/camp/CampFAQ";
import { CampInfoCards } from "@/components/camp/CampInfoCards";
import { TapeLabel } from "@/components/camp/TapeLabel";
import { SignalGlitchBg } from "@/components/shared/SignalGlitchBg";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "People’s Media Camp",
  description:
    "People’s Media Camp is an annual convening for grassroots preservationists, archivists, community historians, and memory workers. Register for October 3–4, 2026 in Philadelphia.",
};

export default function CampPage() {
  return (
    <div className="camp-signal relative overflow-hidden">
      <CampHero />

      <SignalGlitchBg className="border-t-4 border-pmr-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <CampInfoCards />
        </div>
      </SignalGlitchBg>

      <section className="relative border-t-4 border-pmr-border bg-pmr-cream">
        <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6 sm:py-16">
          <CampFAQ />

          <div className="flex flex-col items-start gap-4 border-4 border-pmr-border bg-pmr-offwhite p-6 shadow-cassette sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <TapeLabel>Ready to join?</TapeLabel>
              <p className="mt-3 max-w-xl text-pmr-charcoal">
                Only name and contact information are required. Everything else
                helps us plan sessions, meals, and childcare.
              </p>
            </div>
            <Link href="/camp/register" className="pmr-btn shrink-0 text-base">
              Register for Camp
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
