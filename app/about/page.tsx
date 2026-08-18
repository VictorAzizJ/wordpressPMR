import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { ArrowRight } from "lucide-react";

const aboutSections = [
  {
    href: "/about/mission",
    label: "Mission",
    description:
      "What People’s Media Record is building, how we care for movement media, and why community governance matters.",
  },
  {
    href: "/about/people",
    label: "People",
    description:
      "Staff, fellows, the Community Advisory Board, and partners — including PACME.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      title="About"
      subtitle="People’s Media Record is a community-governed archive. Start with our mission, or meet the people who steward the work."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {aboutSections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="pmr-card group flex flex-col p-6 transition hover:ring-2 hover:ring-pmr-coral/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pmr-coral/70"
          >
            <h2 className="text-xl font-bold text-pmr-offwhite group-hover:text-pmr-green-bright">
              {section.label}
            </h2>
            <p className="mt-3 flex-1 text-sm text-pmr-muted">
              {section.description}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-pmr-coral">
              Read more
              <ArrowRight className="h-4 w-4" aria-hidden />
            </p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
