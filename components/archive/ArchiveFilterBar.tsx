"use client";

import type { MediaType } from "@/lib/types";
import type { FilterState } from "@/lib/filter-records";
import {
  allActivities,
  allLanguages,
  allLocations,
  allOrganizations,
  allRights,
  allTopics,
  allYears,
} from "@/lib/mock-data";
import { MultiSelectFilter } from "./MultiSelectFilter";

const mediaTypeOptions: { value: MediaType; label: string }[] = [
  { value: "video", label: "Video" },
  { value: "audio", label: "Audio" },
  { value: "image", label: "Image" },
  { value: "document", label: "Document" },
];

interface ArchiveFilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onSearch: () => void;
  onClear: () => void;
}

function toOptions(values: string[]) {
  return values.map((value) => ({ value, label: value }));
}

export function ArchiveFilterBar({
  filters,
  onChange,
  onSearch,
  onClear,
}: ArchiveFilterBarProps) {
  const update = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filters, [key]: value });

  const hasFilters = Object.values(filters).some((value) => value.length > 0);

  return (
    <form
      className="pmr-card p-4 sm:p-5"
      aria-label="Archive filters"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MultiSelectFilter
          label="Topic"
          options={toOptions(allTopics)}
          selected={filters.topics}
          onChange={(topics) => update("topics", topics)}
        />
        <MultiSelectFilter
          label="Activity"
          options={toOptions(allActivities)}
          selected={filters.activities}
          onChange={(activities) => update("activities", activities)}
        />
        <MultiSelectFilter
          label="Organization"
          options={toOptions(allOrganizations)}
          selected={filters.organizations}
          onChange={(organizations) => update("organizations", organizations)}
        />
        <MultiSelectFilter
          label="Location"
          options={toOptions(allLocations)}
          selected={filters.locations}
          onChange={(locations) => update("locations", locations)}
        />
        <MultiSelectFilter
          label="Year"
          options={toOptions(allYears)}
          selected={filters.years}
          onChange={(years) => update("years", years)}
        />
        <MultiSelectFilter
          label="Media Type"
          options={mediaTypeOptions}
          selected={filters.mediaTypes}
          onChange={(mediaTypes) => update("mediaTypes", mediaTypes as MediaType[])}
        />
        <MultiSelectFilter
          label="Language"
          options={toOptions(allLanguages)}
          selected={filters.languages}
          onChange={(languages) => update("languages", languages)}
        />
        <MultiSelectFilter
          label="Rights"
          options={toOptions(allRights)}
          selected={filters.rights}
          onChange={(rights) => update("rights", rights)}
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="submit" className="pmr-btn">
          Search
        </button>
        {hasFilters ? (
          <button type="button" className="pmr-btn-secondary" onClick={onClear}>
            Clear
          </button>
        ) : null}
      </div>
    </form>
  );
}
