"use client";

import type { ReactNode } from "react";
import type { AccessLevel, MediaType } from "@/lib/types";
import { collections, allTopics, allYears } from "@/lib/mock-data";

export interface FilterState {
  topics: string[];
  years: string[];
  mediaTypes: MediaType[];
  collectionIds: string[];
  accessLevels: AccessLevel[];
}

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

function toggle<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="border-b-2 border-pmr-dark/20 pb-4 last:border-0">
      <legend className="mb-2 text-sm font-bold text-pmr-dark">{title}</legend>
      <div className="flex max-h-36 flex-col gap-1.5 overflow-y-auto">{children}</div>
    </fieldset>
  );
}

export function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const update = (partial: Partial<FilterState>) =>
    onChange({ ...filters, ...partial });

  const mediaTypes: MediaType[] = ["video", "audio", "image", "document"];
  const accessLevels: AccessLevel[] = [
    "public",
    "request_access",
    "restricted",
  ];

  return (
    <aside className="pmr-card p-4 sm:p-5">
      <h2 className="mb-4 text-lg font-bold text-pmr-offwhite">Filters</h2>
      <div className="space-y-4">
        <FilterGroup title="Media type">
          {mediaTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm text-pmr-silver">
              <input
                type="checkbox"
                checked={filters.mediaTypes.includes(type)}
                onChange={() =>
                  update({
                    mediaTypes: toggle(filters.mediaTypes, type),
                  })
                }
                className="accent-pmr-coral"
              />
              <span className="capitalize">{type}</span>
            </label>
          ))}
        </FilterGroup>

        <FilterGroup title="Year">
          {allYears.slice(0, 12).map((year) => (
            <label key={year} className="flex items-center gap-2 text-sm text-pmr-silver">
              <input
                type="checkbox"
                checked={filters.years.includes(year)}
                onChange={() =>
                  update({ years: toggle(filters.years, year) })
                }
                className="accent-pmr-coral"
              />
              {year}
            </label>
          ))}
        </FilterGroup>

        <FilterGroup title="Collection">
          {collections.map((col) => (
            <label
              key={col.id}
              className="flex items-center gap-2 text-sm text-pmr-silver"
            >
              <input
                type="checkbox"
                checked={filters.collectionIds.includes(col.id)}
                onChange={() =>
                  update({
                    collectionIds: toggle(filters.collectionIds, col.id),
                  })
                }
                className="accent-pmr-coral"
              />
              <span className="line-clamp-2">{col.title}</span>
            </label>
          ))}
        </FilterGroup>

        <FilterGroup title="Topic">
          {allTopics.slice(0, 15).map((topic) => (
            <label key={topic} className="flex items-center gap-2 text-sm text-pmr-silver">
              <input
                type="checkbox"
                checked={filters.topics.includes(topic)}
                onChange={() =>
                  update({ topics: toggle(filters.topics, topic) })
                }
                className="accent-pmr-coral"
              />
              <span className="line-clamp-1">{topic}</span>
            </label>
          ))}
        </FilterGroup>

        <FilterGroup title="Access">
          {accessLevels.map((level) => (
            <label key={level} className="flex items-center gap-2 text-sm text-pmr-silver">
              <input
                type="checkbox"
                checked={filters.accessLevels.includes(level)}
                onChange={() =>
                  update({
                    accessLevels: toggle(filters.accessLevels, level),
                  })
                }
                className="accent-pmr-coral"
              />
              <span className="capitalize">{level.replace("_", " ")}</span>
            </label>
          ))}
        </FilterGroup>
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-lg border-2 border-pmr-dark bg-pmr-dark py-2 text-sm font-bold text-pmr-offwhite hover:bg-pmr-coral"
        onClick={() =>
          onChange({
            topics: [],
            years: [],
            mediaTypes: [],
            collectionIds: [],
            accessLevels: [],
          })
        }
      >
        Clear filters
      </button>
    </aside>
  );
}
