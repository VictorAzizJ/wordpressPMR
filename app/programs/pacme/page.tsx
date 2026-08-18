import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

export default function PacmePage() {
  return (
    <PageShell
      title="PACME"
      subtitle="Philadelphia-area community media education. Full program copy is forthcoming from the client."
    >
      <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-pmr-muted">
        <p>
          PACME is PMR&apos;s education program: fellows, classrooms, and
          neighborhood workshops that teach people how to record, describe, and
          care for movement media.
        </p>
        <p>
          This page is a stub. Names, curriculum, and partner schools will land
          here once the client shares copy. Until then, meet PACME fellows on
          the People page and see related programs below.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Link href="/about/people" className="pmr-btn">
            People &amp; fellows
          </Link>
          <Link href="/camp" className="pmr-btn-secondary">
            People&apos;s Media Camp
          </Link>
          <Link href="/events" className="pmr-btn-secondary">
            Workshops
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
