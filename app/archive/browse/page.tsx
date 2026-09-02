"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { archiveBrowse } from "@/lib/archive";
import { archiveRecords } from "@/lib/mock-data";
import {
  emptyFilters,
  filterRecords,
  isMediaType,
  parsePageSize,
  parseSort,
  sortRecords,
  type FilterState,
  type PageSize,
} from "@/lib/filter-records";
import type { ArchiveSort } from "@/lib/types";
import { PageShell } from "@/components/layout/PageShell";
import { ArchiveFilterBar } from "@/components/archive/ArchiveFilterBar";
import { ArchiveResultItem } from "@/components/archive/ArchiveResultItem";
import { ArchiveResultsToolbar } from "@/components/archive/ArchiveResultsToolbar";

const FILTER_KEYS = [
  "topic",
  "activity",
  "org",
  "loc",
  "year",
  "type",
  "lang",
  "rights",
] as const;

function filtersFromParams(params: URLSearchParams): FilterState {
  const mediaTypes = params.getAll("type").filter(isMediaType);
  return {
    topics: params.getAll("topic"),
    activities: params.getAll("activity"),
    organizations: params.getAll("org"),
    locations: params.getAll("loc"),
    years: params.getAll("year"),
    mediaTypes,
    languages: params.getAll("lang"),
    rights: params.getAll("rights"),
  };
}

function writeFilters(params: URLSearchParams, filters: FilterState) {
  for (const key of FILTER_KEYS) params.delete(key);
  const entries: [string, string[]][] = [
    ["topic", filters.topics],
    ["activity", filters.activities],
    ["org", filters.organizations],
    ["loc", filters.locations],
    ["year", filters.years],
    ["type", filters.mediaTypes],
    ["lang", filters.languages],
    ["rights", filters.rights],
  ];
  for (const [key, values] of entries) {
    for (const value of values) params.append(key, value);
  }
}

function filterQueryString(params: URLSearchParams) {
  const next = new URLSearchParams();
  for (const key of FILTER_KEYS) {
    for (const value of params.getAll(key)) next.append(key, value);
  }
  return next.toString();
}

export default function ArchiveBrowsePage() {
  return (
    <Suspense fallback={<ArchiveBrowseFallback />}>
      <ArchiveBrowseContent />
    </Suspense>
  );
}

function ArchiveBrowseFallback() {
  return (
    <PageShell>
      <BrowseIntro />
      <p className="mt-8 text-pmr-dark">Loading archive…</p>
    </PageShell>
  );
}

function BrowseIntro() {
  return (
    <header className="mb-8 sm:mb-10">
      <h1 className="text-3xl font-bold tracking-tight text-pmr-dark sm:text-4xl">
        {archiveBrowse.title}
      </h1>
      <p className="mt-4 max-w-4xl text-base leading-relaxed text-pmr-dark sm:text-lg">
        {archiveBrowse.intro}{" "}
        <Link
          href={archiveBrowse.mmpHref}
          className="font-bold text-pmr-blue underline decoration-2 underline-offset-2 hover:text-pmr-dark"
        >
          {archiveBrowse.mmpLinkLabel}
        </Link>
      </p>
    </header>
  );
}

function ArchiveBrowseContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const appliedFilters = useMemo(
    () => filtersFromParams(searchParams),
    [searchParams]
  );
  const filterKey = filterQueryString(searchParams);
  const query = searchParams.get("q") ?? "";
  const sort = parseSort(searchParams.get("sort"));
  const pageSize = parsePageSize(searchParams.get("per"));
  const pageFromUrl = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

  const [draftFilters, setDraftFilters] = useState<FilterState>(appliedFilters);

  useEffect(() => {
    setDraftFilters(filtersFromParams(searchParams));
  }, [filterKey, searchParams]);

  const results = useMemo(() => {
    const filtered = filterRecords(archiveRecords, query, appliedFilters);
    return sortRecords(filtered, sort, query);
  }, [appliedFilters, query, sort]);

  const pageCount = Math.max(1, Math.ceil(results.length / pageSize));
  const page = Math.min(pageFromUrl, pageCount);
  const rangeStart = results.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, results.length);
  const pageItems = results.slice((page - 1) * pageSize, page * pageSize);

  const replaceParams = useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      mutate(params);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  function handleSearch() {
    replaceParams((params) => {
      writeFilters(params, draftFilters);
      params.delete("page");
    });
  }

  function handleClear() {
    setDraftFilters(emptyFilters);
    replaceParams((params) => {
      writeFilters(params, emptyFilters);
      params.delete("page");
    });
  }

  function handleSortChange(next: ArchiveSort) {
    replaceParams((params) => {
      if (next === "year") params.delete("sort");
      else params.set("sort", next);
      params.delete("page");
    });
  }

  function handlePageSizeChange(next: PageSize) {
    replaceParams((params) => {
      if (next === 15) params.delete("per");
      else params.set("per", String(next));
      params.delete("page");
    });
  }

  function handlePageChange(next: number) {
    replaceParams((params) => {
      if (next <= 1) params.delete("page");
      else params.set("page", String(next));
    });
  }

  return (
    <PageShell>
      <BrowseIntro />

      <ArchiveFilterBar
        filters={draftFilters}
        onChange={setDraftFilters}
        onSearch={handleSearch}
        onClear={handleClear}
      />

      {query ? (
        <p className="mt-4 text-sm text-pmr-dark">
          Showing matches for “{query}”.{" "}
          <button
            type="button"
            className="font-bold text-pmr-blue underline"
            onClick={() =>
              replaceParams((params) => {
                params.delete("q");
                params.delete("page");
              })
            }
          >
            Clear keyword
          </button>
        </p>
      ) : null}

      <div className="mt-8 space-y-6">
        <ArchiveResultsToolbar
          total={results.length}
          page={page}
          pageSize={pageSize}
          sort={sort}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onSortChange={handleSortChange}
        />

        {pageItems.length === 0 ? (
          <p className="py-10 text-center text-pmr-dark">
            No records match your search. Try clearing filters or choosing
            different topics.
          </p>
        ) : (
          <div className="space-y-6">
            {pageItems.map((record, i) => (
              <ArchiveResultItem
                key={record.id}
                record={record}
                index={rangeStart + i}
              />
            ))}
          </div>
        )}

        {results.length > pageSize ? (
          <ArchiveResultsToolbar
            total={results.length}
            page={page}
            pageSize={pageSize}
            sort={sort}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            onSortChange={handleSortChange}
          />
        ) : null}
      </div>
    </PageShell>
  );
}
