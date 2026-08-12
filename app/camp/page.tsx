import { CampHero } from "@/components/camp/CampHero";
import { CampFAQ } from "@/components/camp/CampFAQ";
import { CampRegistrationForm } from "@/components/camp/CampRegistrationForm";
import { TapeLabel, XeroxDivider } from "@/components/camp/TapeLabel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Camp",
  description:
    "Register for People's Media Record Media Camp — hands-on workshops in oral history, digitization, and community archival care.",
};

export default function CampPage() {
  return (
    <div className="camp-signal relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 scanlines opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 grain-texture animate-static opacity-[0.1]"
        aria-hidden
      />

      <CampHero />

      <section className="relative border-t-4 border-pmr-border bg-pmr-elevated/50">
        <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6 sm:py-16">
          {/* What */}
          <div>
            <TapeLabel>What Camp is</TapeLabel>
            <p className="mt-4 max-w-3xl text-lg text-pmr-muted">
              Media Camp is a short, intensive program where participants learn
              to interview, digitize magnetic and born-digital media, and
              steward community memory with care — the same practices that keep
              People&apos;s Media Record alive.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: "Interview",
                  body: "Basics of oral history — mics, consent, and listening with care.",
                },
                {
                  title: "Digitize",
                  body: "Work with magnetic media and born-digital files for long-term access.",
                },
                {
                  title: "Steward",
                  body: "Label, describe, and share work back with community archives.",
                },
              ].map((item) => (
                <div key={item.title} className="border-l-4 border-pmr-green pl-4">
                  <h3 className="font-mono text-base font-bold text-pmr-offwhite">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-pmr-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <XeroxDivider />

          {/* Who */}
          <div>
            <TapeLabel>Who Camp is for</TapeLabel>
            <p className="mt-4 max-w-3xl text-pmr-muted">
              Youth, neighbors, organizers, and anyone curious about public
              media history. Sessions mix ages intentionally when possible;
              under-18 participants can include optional guardian contacts on
              the form.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-pmr-offwhite sm:grid-cols-2">
              {[
                "No prior AV experience required",
                "Community members stewarding family or org tapes",
                "Students exploring journalism & oral history",
                "Neighbors who want hands-on archive skills",
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="font-mono text-pmr-green" aria-hidden>
                    &gt;
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <XeroxDivider />

          {/* Dates + location placeholders */}
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <TapeLabel>Dates / schedule</TapeLabel>
              <div className="mt-4 border-2 border-dashed border-pmr-border bg-pmr-black/50 p-5 font-mono text-sm text-pmr-muted">
                <p className="text-pmr-green">// placeholder</p>
                <p className="mt-2 text-pmr-offwhite">
                  Summer / fall session dates TBD
                </p>
                <p className="mt-1">Weekday evenings + one Saturday intensive</p>
                <p className="mt-3 text-xs">
                  Staff will publish exact times when Campaign Mode opens
                  registration.
                </p>
              </div>
            </div>
            <div>
              <TapeLabel>Location</TapeLabel>
              <div className="mt-4 border-2 border-dashed border-pmr-border bg-pmr-black/50 p-5 font-mono text-sm text-pmr-muted">
                <p className="text-pmr-green">// placeholder</p>
                <p className="mt-2 text-pmr-offwhite">Philadelphia, PA</p>
                <p className="mt-1">Venue announced with confirmation email</p>
                <p className="mt-3 text-xs">
                  Transit-accessible site; accessibility notes collected on the
                  form.
                </p>
              </div>
            </div>
          </div>

          <XeroxDivider />

          {/* Description */}
          <div>
            <TapeLabel>Camp description</TapeLabel>
            <div className="mt-4 max-w-3xl space-y-4 text-pmr-muted">
              <p>
                Expect a mix of short demos, paired practice, and time with real
                community media. You will leave with basic recording and
                digitization skills, a sense of ethical archival practice, and
                a connection to PMR&apos;s wider steward network.
              </p>
              <p>
                Camp is free. Materials are provided. Bring curiosity, care for
                other people&apos;s stories, and whatever questions you have
                about keeping movement memory alive.
              </p>
            </div>
          </div>

          <XeroxDivider />

          <CampFAQ />

          <XeroxDivider />

          {/* Registration */}
          <div id="register" className="scroll-mt-24">
            <TapeLabel>Register</TapeLabel>
            <p className="mt-3 mb-8 max-w-2xl text-pmr-muted">
              Secure your spot. Submissions route through PMR&apos;s registration
              API to a Google Sheet in production (Phase 6 wiring).
            </p>
            <div className="max-w-2xl">
              <CampRegistrationForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
