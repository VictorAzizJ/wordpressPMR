import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";

export default function AboutPage() {
  return (
    <PageShell title="What We're Up To">
      <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-pmr-muted">
        <p>
          People&apos;s Media Record is a community-governed archive dedicated to
          preserving and sharing movement media — community radio, oral histories,
          strike footage, prison solidarity broadcasts, and youth documentaries.
        </p>
        <p>
          We believe archives should be accountable to the communities they
          document. That means consent-based collecting, thoughtful access levels,
          and training stewards to care for materials long-term.
        </p>
        <div className="pmr-card p-6 text-pmr-offwhite">
          <h2 className="text-xl font-bold text-pmr-green">Current priorities</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-pmr-muted">
            <li>Digitizing magnetic tape collections from the 1980s–2000s</li>
            <li>Expanding public search and collection browsing</li>
            <li>Training community stewards in metadata and access policy</li>
            <li>Partnering with schools for media literacy programs</li>
          </ul>
        </div>
        <p>
          This site is a <strong>demo prototype</strong> showing the future
          headless WordPress + custom frontend direction — with mock data and no
          live CMS connection yet.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <Link href="/archive" className="pmr-btn">
            Search the archive
          </Link>
          <Link href="/build-with-us" className="pmr-btn-secondary">
            Build with us
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
