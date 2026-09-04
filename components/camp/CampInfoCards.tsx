"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { TapeLabel, XeroxDivider } from "@/components/camp/TapeLabel";
import {
  CAMP_AUDIENCE_INTRO,
  CAMP_AUDIENCE_LIST,
} from "@/lib/camp/content";

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
            Saturday October 3rd, 9 am – 7 pm, and Sunday October 4th, 9 am –
            6 pm
          </p>
          <p className="mt-2">
            This is a two-day convening. Session times and full lineup will be
            announced in mid-September!
          </p>
        </div>
      </div>

      <div>
        <TapeLabel as="h3">Location</TapeLabel>
        <div className="mt-4 border-2 border-dashed border-pmr-border bg-pmr-cream p-4 font-mono text-sm text-pmr-charcoal">
          <p className="text-base font-bold text-pmr-dark">Philadelphia, PA</p>
          <p className="mt-2">
            Camp will mostly take place at the Folk Arts Cultural Treasures
            Charter School (FACTS) at 1023 Callowhill Street, an ADA accessible
            facility. Sunday’s program will also take place at a very special
            outdoor location, to be announced shortly!
          </p>
        </div>
      </div>

      <div>
        <TapeLabel as="h3">Meals, Care, and Access</TapeLabel>
        <ul className="mt-4 grid gap-2 text-sm text-pmr-dark">
          {[
            "Meals and refreshments are provided both days",
            "Childcare is offered to Camp participants — add names and ages on the registration form",
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
        <TapeLabel as="h3">Who is Camp for?</TapeLabel>
        <p className="mt-4 text-pmr-charcoal">{CAMP_AUDIENCE_INTRO}</p>
        <ul className="mt-4 grid gap-2 text-sm text-pmr-dark">
          {CAMP_AUDIENCE_LIST.map((line) => (
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
    <div className="space-y-6 text-pmr-charcoal">
      <p className="text-base sm:text-lg">
        Now in its second year, People’s Media Camp is a space where people
        across Greater Philadelphia gather, learn, and connect around
        grassroots and community media, archiving, preservation, storytelling,
        and memory work.
      </p>
      <p>
        Camp participants learn from one another, share resources and skills,
        build relationships, and uplift each other’s work by engaging in
        roundtables, workshops, art, screenings, and conversations.
      </p>
      <p>
        This year’s theme,{" "}
        <span className="font-bold text-pmr-dark">Push Back! Push Forward!</span>
        , invites everyone to collectively think about how we can push back
        against the forces that erase, distort, or silence our histories, and
        how we can push forward toward a future where today’s marginalized
        communities have the freedom to tell, preserve, and experience their
        own stories in their own terms.
      </p>
    </div>
  );
}
