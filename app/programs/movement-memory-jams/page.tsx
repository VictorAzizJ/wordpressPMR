import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

export default function MovementMemoryJamsPage() {
  return (
    <PageShell
      title="Movement Memory Jams"
      subtitle="Gatherings to share, digitize, and celebrate movement memory. Dates and details forthcoming."
    >
      <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-pmr-muted">
        <p>
          Movement Memory Jams bring neighbors together around tapes, photos,
          and stories — listening, labeling, and deciding together what should
          live in the archive.
        </p>
        <p>
          This page is placeholder copy. When the client shares the real
          description, schedule, and photos, they will replace this stub. Check
          the workshops calendar for public dates, or People&apos;s Media Camp
          for the intensive track.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Link href="/events" className="pmr-btn">
            Workshops calendar
          </Link>
          <Link href="/camp" className="pmr-btn-secondary">
            People&apos;s Media Camp
          </Link>
          <Link href="/programs/pacme" className="pmr-btn-secondary">
            PACME
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
