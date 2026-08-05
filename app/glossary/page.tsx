"use client";

import { useState } from "react";
import { glossaryTerms } from "@/lib/mock-data";
import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function GlossaryPage() {
  const [openId, setOpenId] = useState<string | null>(glossaryTerms[0]?.id ?? null);

  const sorted = [...glossaryTerms].sort((a, b) =>
    a.term.localeCompare(b.term)
  );

  return (
    <PageShell
      title="Glossary"
      subtitle="Terms and concepts for understanding community archives and PMR practices."
    >
      <div className="max-w-3xl space-y-2">
        {sorted.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg border-2 border-pmr-dark bg-pmr-offwhite"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between px-4 py-4 text-left font-bold text-pmr-dark"
              >
                {item.term}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="border-t-2 border-pmr-dark/20 px-4 pb-4">
                  <p className="pt-3 leading-relaxed text-pmr-charcoal">
                    {item.definition}
                  </p>
                  {(item.relatedRecordIds?.length ||
                    item.relatedResourceIds?.length) && (
                    <p className="mt-4 text-sm">
                      <span className="font-bold">Related: </span>
                      <Link
                        href="/archive"
                        className="text-pmr-coral hover:underline"
                      >
                        Browse archive
                      </Link>
                      {" · "}
                      <Link
                        href="/resources"
                        className="text-pmr-coral hover:underline"
                      >
                        Resources
                      </Link>
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
