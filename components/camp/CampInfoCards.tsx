"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { TapeLabel, XeroxDivider } from "@/components/camp/TapeLabel";

const cards = [
  {
    id: "know",
    title: "Know Before You Go",
  },
  {
    id: "about",
    title: "About People’s Media Camp",
  },
] as const;

export function CampInfoCards() {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
      {cards.map((card) => {
        const isOpen = openIds.has(card.id);
        const panelId = `${baseId}-panel-${card.id}`;
        const buttonId = `${baseId}-btn-${card.id}`;

        return (
          <article
            key={card.id}
            className="relative overflow-hidden border-4 border-pmr-border bg-pmr-offwhite shadow-cassette"
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-pmr-coral"
              aria-hidden
            />
            <h2>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
                onClick={() => toggle(card.id)}
              >
                <span className="font-mono text-lg font-bold uppercase tracking-wide text-pmr-dark sm:text-xl">
                  {card.title}
                </span>
                <ChevronDown
                  className={`h-6 w-6 shrink-0 text-pmr-dark motion-safe:transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
            </h2>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="border-t-2 border-pmr-border px-5 py-6 text-pmr-charcoal sm:px-7 sm:py-8"
            >
              {card.id === "know" ? <KnowBeforeYouGo /> : <AboutCamp />}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function KnowBeforeYouGo() {
  return (
    <div className="space-y-8">
      <div>
        <TapeLabel as="h3">Dates</TapeLabel>
        <div className="mt-4 border-2 border-dashed border-pmr-border bg-pmr-cream p-4 font-mono text-sm text-pmr-charcoal">
          <p className="text-base font-bold text-pmr-dark">
            Saturday, October 3 and Sunday, October 4, 2026
          </p>
          <p className="mt-2">
            A two-day convening. Session times will be confirmed with your
            registration.
          </p>
        </div>
      </div>

      <div>
        <TapeLabel as="h3">Location</TapeLabel>
        <div className="mt-4 border-2 border-dashed border-pmr-border bg-pmr-cream p-4 font-mono text-sm text-pmr-charcoal">
          <p className="text-base font-bold text-pmr-dark">Philadelphia, PA</p>
          <p className="mt-2">
            Camp will take place in an ADA accessible facility. The venue
            address is sent with your confirmation.
          </p>
        </div>
      </div>

      <div>
        <TapeLabel as="h3">Meals, care, and access</TapeLabel>
        <ul className="mt-4 grid gap-2 text-sm text-pmr-dark">
          {[
            "Meals and refreshments are provided both days",
            "Childcare is offered through the Philly Childcare Collective — add names and ages on the registration form",
            "Tell us about accessibility needs and dietary preferences when you register",
            "Camp is free. Materials are provided",
          ].map((line) => (
            <li key={line} className="flex gap-2">
              <span className="font-mono text-pmr-dark" aria-hidden>
                &gt;
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <XeroxDivider />

      <div>
        <TapeLabel as="h3">Who Camp is for</TapeLabel>
        <p className="mt-4 text-pmr-charcoal">
          Youth, neighbors, organizers, and anyone curious about public media
          history and grassroots preservation. No prior AV experience is
          required.
        </p>
        <ul className="mt-4 grid gap-2 text-sm text-pmr-dark">
          {[
            "Community members stewarding family or organization tapes",
            "Students exploring journalism and oral history",
            "Neighbors who want hands-on archive skills",
            "Memory workers looking to connect and plan together",
          ].map((line) => (
            <li key={line} className="flex gap-2">
              <span className="font-mono text-pmr-dark" aria-hidden>
                &gt;
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AboutCamp() {
  return (
    <div className="space-y-8">
      <div>
        <TapeLabel as="h3">What Camp is</TapeLabel>
        <p className="mt-4 text-base text-pmr-charcoal sm:text-lg">
          This annual convening invites the region’s grassroots
          preservationists, archivists, community historians, and memory
          workers to come together, connect, learn from one another, name the
          challenges we face, affirm each other’s efforts, and develop
          collective strategies for sustaining our work.
        </p>
      </div>

      <div className="grid gap-4">
        {[
          {
            title: "Interview",
            body: "Basics of oral history — mics, consent, and listening with care.",
          },
          {
            title: "Digitize",
            body: "Work with magnetic media and born-digital files for long-term access.",
          },
          {
            title: "Steward",
            body: "Label, describe, and share work back with community archives.",
          },
        ].map((item) => (
          <div key={item.title} className="border-l-4 border-pmr-coral pl-4">
            <h3 className="font-mono text-base font-bold text-pmr-dark">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-pmr-charcoal">{item.body}</p>
          </div>
        ))}
      </div>

      <XeroxDivider />

      <div>
        <TapeLabel as="h3">What to expect</TapeLabel>
        <div className="mt-4 space-y-4 text-pmr-charcoal">
          <p>
            Expect a mix of short demos, paired practice, and time with real
            community media. You will leave with basic recording and
            digitization skills, a sense of ethical archival practice, and a
            connection to PMR’s wider steward network.
          </p>
          <p>
            Bring curiosity, care for other people’s stories, and whatever
            questions you have about keeping movement memory alive.
          </p>
        </div>
      </div>
    </div>
  );
}
