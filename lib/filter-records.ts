import type { ArchiveRecord, ArchiveSort, MediaType } from "./types";

export interface FilterState {
  topics: string[];
  activities: string[];
  organizations: string[];
  locations: string[];
  years: string[];
  mediaTypes: MediaType[];
  languages: string[];
  rights: string[];
}

export const emptyFilters: FilterState = {
  topics: [],
  activities: [],
  organizations: [],
  locations: [],
  years: [],
  mediaTypes: [],
  languages: [],
  rights: [],
};

export const PAGE_SIZE_OPTIONS = [15, 25, 50, 75, 100] as const;
export type PageSize = (typeof PAGE_SIZE_OPTIONS)[number];

function matchesAny(selected: string[], value: string | undefined): boolean {
  if (!selected.length) return true;
  if (!value) return false;
  return selected.includes(value);
}

function matchesAnyOf(
  selected: string[],
  values: string[] | undefined
): boolean {
  if (!selected.length) return true;
  if (!values?.length) return false;
  return values.some((value) => selected.includes(value));
}

export function filterRecords(
  records: ArchiveRecord[],
  query: string,
  filters: FilterState
): ArchiveRecord[] {
  const q = query.trim().toLowerCase();

  return records.filter((record) => {
    if (q) {
      const haystack = [
        record.title,
        record.description,
        record.organization,
        record.location,
        record.activity,
        record.language,
        record.rightsStatus,
        ...(record.people ?? []),
        ...record.topics,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    if (!matchesAnyOf(filters.topics, record.topics)) return false;
    if (!matchesAny(filters.activities, record.activity)) return false;
    if (!matchesAny(filters.organizations, record.organization)) return false;
    if (!matchesAny(filters.locations, record.location)) return false;
    if (!matchesAny(filters.languages, record.language)) return false;
    if (!matchesAny(filters.rights, record.rightsStatus)) return false;

    if (
      filters.mediaTypes.length &&
      !filters.mediaTypes.includes(record.mediaType)
    ) {
      return false;
    }

    if (filters.years.length) {
      const year = new Date(record.date).getFullYear().toString();
      if (!filters.years.includes(year)) return false;
    }

    return true;
  });
}

function relevanceScore(record: ArchiveRecord, query: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return record.featured ? 1 : 0;

  let score = 0;
  if (record.title.toLowerCase().includes(q)) score += 8;
  if (record.topics.some((topic) => topic.toLowerCase().includes(q))) score += 5;
  if (record.activity?.toLowerCase().includes(q)) score += 4;
  if (record.organization?.toLowerCase().includes(q)) score += 3;
  if (record.description.toLowerCase().includes(q)) score += 2;
  if (record.featured) score += 1;
  return score;
}

export function sortRecords(
  records: ArchiveRecord[],
  sort: ArchiveSort,
  query = ""
): ArchiveRecord[] {
  const copy = [...records];
  if (sort === "title") {
    copy.sort((a, b) => a.title.localeCompare(b.title));
    return copy;
  }
  if (sort === "relevance") {
    copy.sort((a, b) => relevanceScore(b, query) - relevanceScore(a, query));
    return copy;
  }
  copy.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return copy;
}

export function isMediaType(value: string): value is MediaType {
  return (
    value === "video" ||
    value === "audio" ||
    value === "image" ||
    value === "document"
  );
}

export function parsePageSize(value: string | null): PageSize {
  const n = Number(value);
  return PAGE_SIZE_OPTIONS.includes(n as PageSize) ? (n as PageSize) : 15;
}

export function parseSort(value: string | null): ArchiveSort {
  if (value === "title" || value === "relevance" || value === "year") {
    return value;
  }
  return "year";
}
