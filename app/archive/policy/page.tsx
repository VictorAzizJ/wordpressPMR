import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

export default function ArchivePolicyPage() {
  return (
    <PageShell
      title="Archive policy"
      subtitle="How PMR collects, describes, and shares materials — with consent and community care at the center."
    >
      <div className="max-w-3xl space-y-8 text-lg leading-relaxed text-pmr-muted">
        <section>
          <h2 className="text-2xl font-bold text-pmr-offwhite">Collecting</h2>
          <p className="mt-3">
            We take in movement media when communities ask us to, not by scraping
            or assuming public posting equals deposit. Donors and participants
            decide what can be described, what can be played, and what stays
            restricted. This collecting-policy language is a stub until the
            client publishes the full document.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-pmr-offwhite">Access</h2>
          <p className="mt-3">
            Metadata may be public even when media is not. Access levels on
            records:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2">
            <li>
              <strong className="text-pmr-offwhite">Public</strong> — anyone can
              view
            </li>
            <li>
              <strong className="text-pmr-offwhite">Request access</strong> —
              metadata public, media on approval
            </li>
            <li>
              <strong className="text-pmr-offwhite">Restricted</strong> — staff
              review required
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-pmr-offwhite">Use</h2>
          <p className="mt-3">
            Credit sources, honor restrictions, and do not republish restricted
            materials without written permission. Classroom and community use is
            welcome when the record says so.
          </p>
        </section>

        <div className="flex flex-wrap gap-4">
          <Link href="/access-request" className="pmr-btn">
            Request access
          </Link>
          <Link href="/glossary" className="pmr-btn-secondary">
            Glossary
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
