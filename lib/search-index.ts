import { events, glossaryTerms, resources } from "@/lib/mock-data";

export type SearchKind = "page" | "program" | "resource" | "glossary" | "event";

export interface SearchDoc {
  title: string;
  href: string;
  kind: SearchKind;
  excerpt: string;
}

const pages: SearchDoc[] = [
  {
    title: "People's Media Record",
    href: "/",
    kind: "page",
    excerpt: "Community archive home, updates, and ways to get involved.",
  },
  {
    title: "Search the archive",
    href: "/archive",
    kind: "page",
    excerpt: "Find records by keyword, topic, year, media type, and access level.",
  },
  {
    title: "Collections",
    href: "/collections",
    kind: "page",
    excerpt: "Browse stewarded collections of movement media and oral history.",
  },
  {
    title: "Archive policy",
    href: "/archive/policy",
    kind: "page",
    excerpt: "Access, collecting, and care policies for the archive.",
  },
  {
    title: "Glossary",
    href: "/glossary",
    kind: "page",
    excerpt: "Terms for community archives, stewardship, and PMR practice.",
  },
  {
    title: "Resources",
    href: "/resources",
    kind: "page",
    excerpt: "Toolkits, guides, teaching materials, and community archiving resources.",
  },
  {
    title: "About",
    href: "/about",
    kind: "page",
    excerpt: "Mission and people behind People's Media Record.",
  },
  {
    title: "Mission",
    href: "/about/mission",
    kind: "page",
    excerpt: "What People's Media Record is building and why.",
  },
  {
    title: "People",
    href: "/about/people",
    kind: "page",
    excerpt: "Staff, fellows, community advisory board, and partners.",
  },
  {
    title: "Contact",
    href: "/contact",
    kind: "page",
    excerpt: "Questions about the archive, press, and general information.",
  },
  {
    title: "Donate",
    href: "/donate",
    kind: "page",
    excerpt: "Support the archive and community stewardship work.",
  },
  {
    title: "Subscribe",
    href: "/subscribe",
    kind: "page",
    excerpt: "Get updates from People's Media Record.",
  },
];

const programs: SearchDoc[] = [
  {
    title: "Programs",
    href: "/programs",
    kind: "program",
    excerpt: "PACME, People's Media Camp, Movement Memory Jams, and workshops.",
  },
  {
    title: "PACME",
    href: "/programs/pacme",
    kind: "program",
    excerpt: "Philadelphia-area community media education program.",
  },
  {
    title: "People's Media Camp",
    href: "/camp",
    kind: "program",
    excerpt:
      "Hands-on workshops in oral history, digitization, and community archival care.",
  },
  {
    title: "Movement Memory Jams",
    href: "/programs/movement-memory-jams",
    kind: "program",
    excerpt: "Gatherings to share, digitize, and celebrate movement memory.",
  },
  {
    title: "Workshops",
    href: "/events",
    kind: "program",
    excerpt: "Upcoming and past workshops, trainings, and public programs.",
  },
];

function haystack(doc: SearchDoc) {
  return `${doc.title} ${doc.excerpt} ${doc.kind}`.toLowerCase();
}

export function getSearchIndex(): SearchDoc[] {
  return [
    ...pages,
    ...programs,
    ...resources.map((item) => ({
      title: item.title,
      href: `/resources#${item.slug}`,
      kind: "resource" as const,
      excerpt: item.description,
    })),
    ...glossaryTerms.map((item) => ({
      title: item.term,
      href: `/glossary#${item.slug}`,
      kind: "glossary" as const,
      excerpt: item.definition,
    })),
    ...events.map((item) => ({
      title: item.title,
      href: "/events",
      kind: "event" as const,
      excerpt: `${item.location}. ${item.description}`,
    })),
  ];
}

export function searchAll(query: string): SearchDoc[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return getSearchIndex().filter((doc) => {
    const text = haystack(doc);
    return terms.every((term) => text.includes(term));
  });
}

export const searchKindLabel: Record<SearchKind, string> = {
  page: "Pages",
  program: "Programs",
  resource: "Resources",
  glossary: "Glossary",
  event: "Events",
};
