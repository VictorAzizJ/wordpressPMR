import type { ArchiveRecord } from "./types";
import type { FilterState } from "@/components/archive/FilterPanel";

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
        ...(record.people ?? []),
        ...record.topics,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

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

    if (
      filters.collectionIds.length &&
      !record.collectionIds.some((id) => filters.collectionIds.includes(id))
    ) {
      return false;
    }

    if (
      filters.topics.length &&
      !record.topics.some((t) => filters.topics.includes(t))
    ) {
      return false;
    }

    if (
      filters.accessLevels.length &&
      !filters.accessLevels.includes(record.accessLevel)
    ) {
      return false;
    }

    return true;
  });
}
