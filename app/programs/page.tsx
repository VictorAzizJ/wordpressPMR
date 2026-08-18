import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { pastWorkshopVideosUrl } from "@/config/programs";
import { ArrowRight, ExternalLink } from "lucide-react";

const programs = [
  {
    href: "/programs/pacme",
    label: "PACME",
    description:
      "Community media education — fellows, classrooms, and neighborhood media skills.",
  },
  {
    href: "/camp",
    label: "People’s Media Camp",
    description:
      "Hands-on workshops in oral history, digitization, and archival care.",
  },
  {
    href: "/programs/movement-memory-jams",
    label: "Movement Memory Jams",
    description:
      "Gatherings to share, digitize, and celebrate movement memory.",
  },
  {
    href: "/events",
    label: "Workshops",
    description: "Upcoming and past workshops, trainings, and public programs.",
  },
];

export default function ProgramsPage() {
  return (
    <PageShell
      title="Programs"
      subtitle="Education, camp, jams, and workshops — ways to make, care for, and share movement media with PMR."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {programs.map((program) => (
          <Link
            key={program.href}
            href={program.href}
            className="pmr-card group flex flex-col p-6 transition hover:ring-2 hover:ring-pmr-coral/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pmr-coral/70"
          >
            <h2 className="text-xl font-bold text-pmr-offwhite group-hover:text-pmr-green-bright">
              {program.label}
            </h2>
            <p className="mt-3 flex-1 text-sm text-pmr-muted">
              {program.description}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-pmr-coral">
              Learn more
              <ArrowRight className="h-4 w-4" aria-hidden />
            </p>
          </Link>
        ))}
      </div>
      <p className="mt-10">
        <a
          href={pastWorkshopVideosUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pmr-btn-secondary inline-flex text-sm"
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
          Past workshop videos
        </a>
      </p>
    </PageShell>
  );
}
