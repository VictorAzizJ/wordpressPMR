"use client";

import type { ArchiveSort } from "@/lib/types";
import { PAGE_SIZE_OPTIONS, type PageSize } from "@/lib/filter-records";

interface ArchiveResultsToolbarProps {
  total: number;
  page: number;
  pageSize: PageSize;
  sort: ArchiveSort;
  rangeStart: number;
  rangeEnd: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSize) => void;
  onSortChange: (sort: ArchiveSort) => void;
}

export function ArchiveResultsToolbar({
  total,
  page,
  pageSize,
  sort,
  rangeStart,
  rangeEnd,
  onPageChange,
  onPageSizeChange,
  onSortChange,
}: ArchiveResultsToolbarProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < pageCount;

  return (
    <div className="flex flex-col gap-3 border-y-2 border-pmr-dark/40 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-pmr-dark">
        <button
          type="button"
          className="min-h-11 rounded-lg px-3 py-1.5 hover:bg-pmr-offwhite/70 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!canPrev}
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </button>
        <p role="status" aria-live="polite">
          {total === 0 ? "0 of 0" : `${rangeStart}–${rangeEnd} of ${total}`}
        </p>
        <button
          type="button"
          className="min-h-11 rounded-lg px-3 py-1.5 hover:bg-pmr-offwhite/70 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!canNext}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 font-mono text-sm text-pmr-dark">
          Sort by
          <select
            className="min-h-11 rounded-lg border-2 border-pmr-dark bg-pmr-offwhite px-2 font-bold text-pmr-dark focus:border-pmr-coral focus:outline-none focus:ring-2 focus:ring-pmr-coral/35"
            value={sort}
            onChange={(event) =>
              onSortChange(event.target.value as ArchiveSort)
            }
          >
            <option value="year">Year</option>
            <option value="title">Title</option>
            <option value="relevance">Relevance</option>
          </select>
        </label>
        <label className="flex items-center gap-2 font-mono text-sm text-pmr-dark">
          Per page
          <select
            className="min-h-11 rounded-lg border-2 border-pmr-dark bg-pmr-offwhite px-2 font-bold text-pmr-dark focus:border-pmr-coral focus:outline-none focus:ring-2 focus:ring-pmr-coral/35"
            value={pageSize}
            onChange={(event) =>
              onPageSizeChange(Number(event.target.value) as PageSize)
            }
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
