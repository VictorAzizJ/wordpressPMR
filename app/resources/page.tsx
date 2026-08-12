"use client";

import { useMemo, useState } from "react";
import { resources, resourceCategories } from "@/lib/mock-data";
import { PageShell } from "@/components/layout/PageShell";
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
      subtitle="Toolkits, guides, teaching materials, and community archiving resources."
    >
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={`rounded-lg border-2 border-pmr-border px-4 py-2 text-sm font-bold ${
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
            className={`rounded-lg border-2 border-pmr-border px-4 py-2 text-sm font-bold ${
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
        {filtered.map((resource) => (
          <article
            key={resource.id}
            className="pmr-card flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between"
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
            </div>
            {resource.link && (
              <a
                href={resource.link}
                className="pmr-btn shrink-0 self-start text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                View resource
              </a>
            )}
          </article>
        ))}
      </div>
    </PageShell>
  );
}
