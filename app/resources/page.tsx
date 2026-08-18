"use client";

import { useMemo, useState } from "react";
import {
  getGlossaryTermsForResource,
  resourceCategories,
  resources,
} from "@/lib/mock-data";
import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function ResourcesPage() {
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    if (category === "all") return resources;
    return resources.filter((r) => r.category === category);
  }, [category]);

  return (
    <PageShell
      title="Resources"
      subtitle="What we currently have: toolkits, guides, teaching materials, and community archiving resources."
    >
      <p className="mb-8 max-w-3xl text-pmr-muted">
        Use these materials as they are. Terms like access, consent, and
        stewardship are defined in the{" "}
        <Link href="/glossary" className="font-bold text-pmr-coral hover:underline">
          glossary
        </Link>
        , with see-also links back here.
      </p>

      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Resource categories">
        <button
          type="button"
          onClick={() => setCategory("all")}
          aria-pressed={category === "all"}
          className={`min-h-11 rounded-lg border-2 border-pmr-border px-4 py-2 text-sm font-bold ${
            category === "all"
              ? "bg-pmr-coral text-pmr-offwhite"
              : "bg-pmr-elevated text-pmr-offwhite hover:bg-pmr-black"
          }`}
        >
          All
        </button>
        {resourceCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            aria-pressed={category === cat}
            className={`min-h-11 rounded-lg border-2 border-pmr-border px-4 py-2 text-sm font-bold ${
              category === cat
                ? "bg-pmr-coral text-pmr-offwhite"
                : "bg-pmr-elevated text-pmr-offwhite hover:bg-pmr-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.map((resource) => {
          const seeAlso = getGlossaryTermsForResource(resource.id);
          return (
            <article
              key={resource.id}
              id={resource.slug}
              className="pmr-card flex flex-col gap-4 scroll-mt-28 p-5 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <p className="text-xs font-bold uppercase text-pmr-coral">
                  {resource.category}
                </p>
                <h2 className="mt-1 text-lg font-bold text-pmr-offwhite">
                  {resource.title}
                </h2>
                <p className="mt-2 text-sm text-pmr-muted">
                  {resource.description}
                </p>
                {resource.audience && (
                  <p className="mt-2 text-xs text-pmr-muted">
                    Audience: {resource.audience}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-pmr-border/50 px-2 py-0.5 text-xs text-pmr-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {seeAlso.length > 0 && (
                  <p className="mt-3 text-sm text-pmr-muted">
                    <span className="font-bold text-pmr-offwhite">See also: </span>
                    {seeAlso.map((term, index) => (
                      <span key={term.id}>
                        {index > 0 ? ", " : null}
                          <Link
                            href={`/glossary#${term.slug}`}
                            className="text-pmr-coral hover:underline"
                          >
                          {term.term}
                        </Link>
                      </span>
                    ))}
                  </p>
                )}
              </div>
              {resource.link && (
                <a
                  href={resource.link}
                  className="pmr-btn shrink-0 self-start text-sm"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  View resource
                </a>
              )}
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}
