"use client";

import { useEffect, useState } from "react";
import { getResourceById, glossaryTerms } from "@/lib/mock-data";
import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function GlossaryPage() {
  const [openId, setOpenId] = useState<string | null>(glossaryTerms[0]?.id ?? null);

  useEffect(() => {
    const slug = window.location.hash.replace(/^#/, "");
    if (!slug) return;
    const match = glossaryTerms.find((term) => term.slug === slug);
    if (match) setOpenId(match.id);
  }, []);

  const sorted = [...glossaryTerms].sort((a, b) =>
    a.term.localeCompare(b.term)
  );

  return (
    <PageShell
      title="Glossary"
      subtitle="Terms and concepts for understanding community archives and PMR practices. See also links point to matching resources."
    >
      <div className="max-w-3xl space-y-2">
        {sorted.map((item) => {
          const isOpen = openId === item.id;
          const relatedResources = (item.relatedResourceIds ?? [])
            .map((id) => getResourceById(id))
            .filter(
              (resource): resource is NonNullable<typeof resource> =>
                resource != null
            );
          return (
            <div
              key={item.id}
              id={item.slug}
              className="scroll-mt-28 overflow-hidden rounded-lg border-2 border-pmr-border bg-pmr-elevated"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between px-4 py-4 text-left font-bold text-pmr-offwhite"
              >
                {item.term}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="border-t-2 border-pmr-border/20 px-4 pb-4">
                  <p className="pt-3 leading-relaxed text-pmr-muted">
                    {item.definition}
                  </p>
                  {relatedResources.length > 0 && (
                    <p className="mt-4 text-sm text-pmr-muted">
                      <span className="font-bold text-pmr-offwhite">See also: </span>
                      {relatedResources.map((resource, index) => (
                        <span key={resource.id}>
                          {index > 0 ? ", " : null}
                          <Link
                            href={`/resources#${resource.slug}`}
                            className="text-pmr-coral hover:underline"
                          >
                            {resource.title}
                          </Link>
                        </span>
                      ))}
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
