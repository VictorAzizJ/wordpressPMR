import { CampRegistrationForm } from "@/components/camp/CampRegistrationForm";
import { SignalGlitchBg } from "@/components/shared/SignalGlitchBg";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Camp Registration",
  description:
    "Register for People’s Media Camp. First name, last name, email, and which days you plan to attend are required.",
};

export default function CampRegisterPage() {
  return (
    <div className="camp-signal relative overflow-hidden">
      <SignalGlitchBg>
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-pmr-dark">
            People’s Media Camp
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-pmr-dark sm:text-5xl">
            Registration
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pmr-charcoal">
            First name, last name, email, and which days you plan to attend are
            required. Everything else will help us plan for you to access Camp’s
            sessions, meals, and childcare. Thank you!
          </p>
          <p className="mt-4">
            <Link
              href="/camp"
              className="font-mono text-sm font-bold text-pmr-dark underline decoration-2 underline-offset-4 hover:text-pmr-blue"
            >
              ← Back to Camp
            </Link>
          </p>

          <div className="mt-10">
            <CampRegistrationForm />
          </div>
        </div>
      </SignalGlitchBg>
    </div>
  );
}
