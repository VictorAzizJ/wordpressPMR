"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import {
  communityAdvisoryBoard,
  missionParagraphs,
  pmrStaff,
  theoryOfChange,
  values,
  visionParagraph,
  type StaffMember,
} from "@/lib/about";

const HASH_IDS = new Set([
  "mission-vision-values",
  "people",
  "pmr-staff",
  "community-advisory-board",
  ...pmrStaff.map((person) => person.id),
]);

/** Legacy #people bookmarks open Staff. */
const HASH_ALIASES: Record<string, string> = {
  people: "pmr-staff",
};

function openDetailsForHash(hash: string) {
  const raw = hash.replace(/^#/, "");
  if (!raw || !HASH_IDS.has(raw)) return;
  const id = HASH_ALIASES[raw] ?? raw;
  const target = document.getElementById(id);
  if (!target) return;

  let node: HTMLElement | null = target;
  while (node) {
    if (node instanceof HTMLDetailsElement) node.open = true;
    node = node.parentElement;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Disclosure({
  id,
  title,
  children,
  className = "",
}: {
  id: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <details
      id={id}
      className={`group scroll-mt-28 overflow-hidden rounded-lg border-2 border-pmr-border bg-pmr-elevated [&>summary::-webkit-details-marker]:hidden ${className}`}
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

function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="mt-3 space-y-4 text-base leading-relaxed text-pmr-muted sm:text-lg">
      {children}
    </div>
  );
}

function StaffPortrait({ person }: { person: StaffMember }) {
  const frame =
    "relative h-24 w-24 shrink-0 overflow-hidden rounded-pmr border-2 border-pmr-dark bg-pmr-dark sm:h-28 sm:w-28";

  if (person.imageSrc) {
    return (
      <div className={frame}>
        <Image
          src={person.imageSrc}
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
        {person.initials}
      </span>
    </div>
  );
}

function StaffCard({ person }: { person: StaffMember }) {
  return (
    <li className="flex items-start gap-4 sm:gap-5">
      <StaffPortrait person={person} />
      <details
        id={person.id}
        className="group min-w-0 flex-1 scroll-mt-28 [&>summary::-webkit-details-marker]:hidden"
      >
        <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-3 text-left">
          <span>
            <span className="block font-bold text-pmr-offwhite">
              {person.name}{" "}
              <span className="font-normal text-pmr-muted">
                ({person.pronouns})
              </span>
            </span>
            <span className="mt-1 block text-sm text-pmr-coral">
              {person.title}
            </span>
          </span>
          <ChevronDown
            className="mt-1 h-5 w-5 shrink-0 text-pmr-coral motion-safe:transition-transform group-open:rotate-180"
            aria-hidden
          />
        </summary>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-pmr-muted sm:text-base">
          {person.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </details>
    </li>
  );
}

export function AboutPageBody() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const apply = () => openDetailsForHash(window.location.hash);
    apply();
    // Re-apply after paint — campaign popup / hydration can remount and reset <details>.
    const t0 = window.setTimeout(apply, 0);
    const t1 = window.setTimeout(apply, 100);
    window.addEventListener("hashchange", apply);
    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.removeEventListener("hashchange", apply);
    };
  }, [pathname]);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      <Disclosure
        id="mission-vision-values"
        title="Mission, Vision, and Values"
      >
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-pmr-offwhite">Mission</h2>
            <Prose>
              {missionParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </Prose>
          </section>

          <section>
            <h2 className="text-xl font-bold text-pmr-offwhite">Vision</h2>
            <Prose>
              <p>{visionParagraph}</p>
            </Prose>
          </section>

          <section>
            <h2 className="text-xl font-bold text-pmr-offwhite">Values</h2>
            <div className="mt-4 space-y-6">
              {values.map((value) => (
                <div key={value.id}>
                  <h3 className="text-lg font-bold text-pmr-coral">
                    {value.title}
                  </h3>
                  <Prose>
                    {value.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </Prose>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-pmr-offwhite">
              Theory of Change
            </h2>
            <Prose>
              <p>{theoryOfChange}</p>
            </Prose>
          </section>
        </div>
      </Disclosure>

      <Disclosure id="pmr-staff" title="PMR Staff">
        <ul className="space-y-6">
          {pmrStaff.map((person) => (
            <StaffCard key={person.id} person={person} />
          ))}
        </ul>
      </Disclosure>

      <Disclosure
        id="community-advisory-board"
        title="Community Advisory Board"
      >
        <ul className="space-y-2">
          {communityAdvisoryBoard.map((member) => (
            <li key={member.id} className="font-bold text-pmr-offwhite">
              {member.name}
            </li>
          ))}
        </ul>
      </Disclosure>
    </div>
  );
}
