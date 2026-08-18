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

function FilterCheck({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
}) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-pmr-muted">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 shrink-0 accent-pmr-coral"
      />
      <span className="leading-snug">{children}</span>
    </label>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="border-b-2 border-pmr-border/40 pb-4 last:border-0">
      <legend className="mb-2 font-mono text-sm font-bold text-pmr-offwhite">
        {title}
      </legend>
      <div className="flex max-h-56 flex-col overflow-y-auto">{children}</div>
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
    <aside className="pmr-card p-4 sm:p-5" aria-label="Archive filters">
      <h2 className="mb-4 text-lg font-bold text-pmr-offwhite">Filters</h2>
      <div className="space-y-4">
        <FilterGroup title="Media type">
          {mediaTypes.map((type) => (
            <FilterCheck
              key={type}
              checked={filters.mediaTypes.includes(type)}
              onChange={() =>
                update({ mediaTypes: toggle(filters.mediaTypes, type) })
              }
            >
              <span className="capitalize">{type}</span>
            </FilterCheck>
          ))}
        </FilterGroup>

        <FilterGroup title="Year">
          {allYears.slice(0, 12).map((year) => (
            <FilterCheck
              key={year}
              checked={filters.years.includes(year)}
              onChange={() => update({ years: toggle(filters.years, year) })}
            >
              {year}
            </FilterCheck>
          ))}
        </FilterGroup>

        <FilterGroup title="Collection">
          {collections.map((col) => (
            <FilterCheck
              key={col.id}
              checked={filters.collectionIds.includes(col.id)}
              onChange={() =>
                update({
                  collectionIds: toggle(filters.collectionIds, col.id),
                })
              }
            >
              <span className="line-clamp-2">{col.title}</span>
            </FilterCheck>
          ))}
        </FilterGroup>

        <FilterGroup title="Topic">
          {allTopics.slice(0, 15).map((topic) => (
            <FilterCheck
              key={topic}
              checked={filters.topics.includes(topic)}
              onChange={() => update({ topics: toggle(filters.topics, topic) })}
            >
              <span className="line-clamp-1">{topic}</span>
            </FilterCheck>
          ))}
        </FilterGroup>

        <FilterGroup title="Access">
          {accessLevels.map((level) => (
            <FilterCheck
              key={level}
              checked={filters.accessLevels.includes(level)}
              onChange={() =>
                update({
                  accessLevels: toggle(filters.accessLevels, level),
                })
              }
            >
              <span className="capitalize">{level.replace("_", " ")}</span>
            </FilterCheck>
          ))}
        </FilterGroup>
      </div>

      <button
        type="button"
        className="pmr-btn-secondary mt-4 w-full text-sm"
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
