"use client";

import { useMemo, useState } from "react";
import { archiveRecords } from "@/lib/mock-data";
import { filterRecords } from "@/lib/filter-records";
import { PageShell } from "@/components/layout/PageShell";
import { SearchBar } from "@/components/archive/SearchBar";
import {
  FilterPanel,
  type FilterState,
} from "@/components/archive/FilterPanel";
import { RecordCard } from "@/components/archive/RecordCard";

const emptyFilters: FilterState = {
  topics: [],
  years: [],
  mediaTypes: [],
  collectionIds: [],
  accessLevels: [],
};

export default function ArchivePage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(emptyFilters);

  const results = useMemo(
    () => filterRecords(archiveRecords, query, filters),
    [query, filters]
  );

  return (
    <PageShell
      title="Search the Archive"
      subtitle="Filter by topic, year, media type, collection, and access level. Demo uses mock records."
    >
      <div className="mb-6">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <FilterPanel filters={filters} onChange={setFilters} />

        <div>
          <p className="mb-4 text-sm font-bold text-pmr-charcoal">
            {results.length} record{results.length !== 1 ? "s" : ""} found
          </p>
          {results.length === 0 ? (
            <div className="pmr-card p-8 text-center text-pmr-silver">
              No records match your search. Try clearing filters or broadening
              your keywords.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((record) => (
                <RecordCard key={record.id} record={record} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
