"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { campFaqItems } from "@/lib/camp/faq";
import { TapeLabel } from "@/components/camp/TapeLabel";

export function CampFAQ() {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(campFaqItems[0]?.id ?? null);

  return (
    <section aria-labelledby={`${baseId}-heading`}>
      <TapeLabel as="h2" id={`${baseId}-heading`}>
        FAQ // signal check
      </TapeLabel>
      <p className="mt-3 max-w-2xl text-pmr-muted">
        Quick answers before you register. Still unsure? Reach out after you
        submit — staff will follow up.
      </p>

      <ul className="mt-8 space-y-3">
        {campFaqItems.map((item) => {
          const isOpen = openId === item.id;
          const panelId = `${baseId}-panel-${item.id}`;
          const buttonId = `${baseId}-btn-${item.id}`;

          return (
            <li
              key={item.id}
              className="border-2 border-pmr-border bg-pmr-elevated/80"
            >
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left font-mono text-sm font-bold text-pmr-offwhite transition hover:text-pmr-green-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pmr-green/50 sm:px-5 sm:py-4 sm:text-base"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-pmr-green transition ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="border-t-2 border-pmr-border px-4 py-3 text-sm text-pmr-muted sm:px-5 sm:py-4"
              >
                {item.answer}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
