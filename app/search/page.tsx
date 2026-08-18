import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { searchAll, searchKindLabel, type SearchKind } from "@/lib/search-index";

export const metadata: Metadata = {
  title: "Search",
};

const kindOrder: SearchKind[] = [
  "page",
  "program",
  "resource",
  "glossary",
  "event",
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = searchAll(query);

  const grouped = kindOrder
    .map((kind) => ({
      kind,
      items: results.filter((item) => item.kind === kind),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <PageShell
      title="Search all"
      subtitle="Pages, programs, resources, glossary, and events. Use Search the archive for records."
    >
      <form role="search" action="/search" method="get" className="mb-8 max-w-xl">
        <label htmlFor="site-search" className="sr-only">
          Search all
        </label>
        <div className="flex gap-2">
          <input
            id="site-search"
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search pages, programs, resources…"
            className="pmr-input"
          />
          <button type="submit" className="pmr-btn shrink-0">
            Search
          </button>
        </div>
      </form>

      {!query ? (
        <p className="text-pmr-muted">Enter a keyword to search the site.</p>
      ) : results.length === 0 ? (
        <div className="pmr-card p-8 text-center text-pmr-muted">
          No site results for “{query}”. Try another term, or{" "}
          <Link href={`/archive?q=${encodeURIComponent(query)}`} className="underline">
            search the archive
          </Link>
          .
        </div>
      ) : (
        <div className="space-y-10">
          <p className="text-sm font-bold text-pmr-muted" role="status" aria-live="polite">
            {results.length} result{results.length !== 1 ? "s" : ""} for “{query}”
          </p>
          {grouped.map((group) => (
            <section key={group.kind}>
              <h2 className="mb-4 text-xl font-bold text-pmr-offwhite">
                {searchKindLabel[group.kind]}
              </h2>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={`${item.kind}-${item.href}-${item.title}`}>
                    <Link
                      href={item.href}
                      className="pmr-card block p-4 transition hover:ring-2 hover:ring-pmr-coral/50"
                    >
                      <p className="font-bold text-pmr-offwhite">{item.title}</p>
                      <p className="mt-1 text-sm text-pmr-muted">{item.excerpt}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </PageShell>
  );
}
