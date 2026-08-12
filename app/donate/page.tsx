import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Heart, Radio, Users } from "lucide-react";

export default function DonatePage() {
  return (
    <PageShell title="Donate">
      <div className="max-w-3xl">
        <p className="text-lg text-pmr-muted">
          Your support helps PMR digitize aging tapes, train community stewards,
          and build a public archive that honors movement memory.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Radio,
              title: "Digitization",
              text: "Transfer magnetic media before it degrades.",
            },
            {
              icon: Users,
              title: "Stewardship",
              text: "Fund workshops on consent, metadata, and access.",
            },
            {
              icon: Heart,
              title: "Access",
              text: "Keep search and public programming free.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-pmr border-4 border-pmr-border bg-pmr-elevated p-5 text-center"
            >
              <Icon className="mx-auto h-8 w-8 text-pmr-coral" />
              <h3 className="mt-3 font-bold text-pmr-offwhite">{title}</h3>
              <p className="mt-2 text-sm text-pmr-muted">{text}</p>
            </div>
          ))}
        </div>

        <div className="pmr-card mt-10 p-8 text-center">
          <p className="text-pmr-offwhite">
            Online giving is not connected in this demo. In production, this page
            would link to your donation processor.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button type="button" className="pmr-btn" disabled>
              Give once (demo)
            </button>
            <button type="button" className="pmr-btn-secondary" disabled>
              Monthly (demo)
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-pmr-muted">
          Prefer to contribute time or collections?{" "}
          <Link href="/build-with-us" className="font-bold text-pmr-coral hover:underline">
            Build with us →
          </Link>
        </p>
      </div>
    </PageShell>
  );
}
