import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import {
  currentPacmeFellows,
  pacmeFellows2024,
  pacmeFellows2025,
  type PacmeFellow,
} from "@/lib/pacme";

function FellowPortrait({ fellow }: { fellow: PacmeFellow }) {
  const frame =
    "relative h-24 w-24 shrink-0 overflow-hidden rounded-pmr border-2 border-pmr-dark bg-pmr-dark sm:h-28 sm:w-28";

  if (fellow.imageSrc) {
    return (
      <div className={frame}>
        <Image
          src={fellow.imageSrc}
          alt=""
          fill
          className="object-cover object-top"
          sizes="112px"
        />
      </div>
    );
  }

  return (
    <div className={`${frame} flex items-center justify-center`} aria-hidden>
      <span className="font-mono text-lg font-bold text-pmr-coral sm:text-xl">
        {fellow.initials}
      </span>
    </div>
  );
}

function FellowList({ fellows }: { fellows: PacmeFellow[] }) {
  return (
    <ul className="space-y-8">
      {fellows.map((fellow) => {
        const hasBody = Boolean(fellow.affiliation || fellow.bio?.length);
        return (
          <li
            key={fellow.id}
            className={`flex gap-4 sm:gap-5 ${hasBody ? "items-start" : "items-center"}`}
          >
            <FellowPortrait fellow={fellow} />
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-pmr-offwhite">
                {fellow.name}
                {fellow.pronouns ? (
                  <>
                    {" "}
                    <span className="font-normal text-pmr-cream">
                      ({fellow.pronouns})
                    </span>
                  </>
                ) : null}
              </h3>
              {fellow.affiliation ? (
                <p className="mt-1 text-sm text-pmr-coral">
                  {fellow.affiliation}
                </p>
              ) : null}
              {fellow.bio?.length ? (
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-pmr-cream sm:text-base">
                  {fellow.bio.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function CohortDisclosure({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <details
      id={id}
      className="group scroll-mt-28 overflow-hidden rounded-lg border-2 border-pmr-border bg-pmr-elevated [&>summary::-webkit-details-marker]:hidden"
    >
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-left font-bold text-pmr-offwhite transition hover:text-pmr-coral sm:px-5 sm:py-4">
        <span>{title}</span>
        <ChevronDown
          className="h-5 w-5 shrink-0 text-pmr-coral motion-safe:transition-transform group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="border-t-2 border-pmr-border px-4 py-5 sm:px-5 sm:py-6">
        {children}
      </div>
    </details>
  );
}

export function PacmeFellows() {
  return (
    <div className="mt-14 max-w-3xl space-y-10">
      <section
        aria-labelledby="pacme-fellows-heading"
        className="rounded-lg border-2 border-pmr-border bg-pmr-elevated p-5 sm:p-8"
      >
        <h2
          id="pacme-fellows-heading"
          className="text-2xl font-bold tracking-tight text-pmr-offwhite sm:text-3xl"
        >
          Current PACME Fellows
        </h2>
        <div className="mt-8">
          <FellowList fellows={currentPacmeFellows} />
        </div>
      </section>

      <div className="space-y-3">
        <CohortDisclosure id="pacme-fellows-2025" title="2025 Fellows">
          <FellowList fellows={pacmeFellows2025} />
        </CohortDisclosure>
        <CohortDisclosure id="pacme-fellows-2024" title="2024 Fellows">
          <FellowList fellows={pacmeFellows2024} />
        </CohortDisclosure>
      </div>
    </div>
  );
}
