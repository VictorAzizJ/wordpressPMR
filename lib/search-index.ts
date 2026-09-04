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
    title: "Archive",
    href: "/archive",
    kind: "page",
    excerpt:
      "Explore archive materials and the protocols for managing and preserving them long term.",
  },
  {
    title: "Browse the Archive",
    href: "/archive/browse",
    kind: "page",
    excerpt:
      "The People's Media Record's Archive stewards the MMP Collection and related community media from the Philadelphia region.",
  },
  {
    title: "The Media Mobilizing Project Collection",
    href: "/archive/mmp-collection",
    kind: "page",
    excerpt:
      "The archive of People's Media Record houses the Media Mobilizing Project (MMP) Collection. On this page we describe MMP, the origins of the collection, and what it includes.",
  },
  {
    title: "Collections Management Policy",
    href: "/archive/collections-management-policy",
    kind: "page",
    excerpt:
      "Guidelines for stewarding the People's Media Record's Archive, covering acquisitions, postcustodial care, removal, access, and privacy.",
  },
  {
    title: "Media Mobilizing Project Collection Community Policy",
    href: "/archive/mmp-community-policy",
    kind: "page",
    excerpt:
      "People's Media Record's relationship with the Media Mobilizing Project Collection, created in agreement with former MMP members.",
  },
  {
    title: "Collections",
    href: "/collections",
    kind: "page",
    excerpt: "Browse stewarded collections of movement media and oral history.",
  },
  {
    title: "Archiving and Preservation Resources",
    href: "/resources",
    kind: "page",
    excerpt:
      "Knowledge and tools for archiving and preserving grassroots media.",
  },
  {
    title: "Resource Pool",
    href: "/resources/pool",
    kind: "page",
    excerpt:
      "Tools, references, service providers, and other resources for archiving grassroots media.",
  },
  {
    title: "Philadelphia Audiovisual Collections Evaluation (PACE)",
    href: "/resources/pace",
    kind: "page",
    excerpt:
      "Year-long evaluation of local community media collections with Scribe Video Center and Philadelphia Community Access Media.",
  },
  {
    title: "Glossary",
    href: "/resources/glossary",
    kind: "page",
    excerpt:
      "Key concepts for archiving and preserving grassroots media.",
  },
  {
    title: "About",
    href: "/about",
    kind: "page",
    excerpt:
      "Mission, vision, values, and people behind People's Media Record.",
  },
  {
    title: "Mission, Vision, and Values",
    href: "/about#mission-vision-values",
    kind: "page",
    excerpt:
      "Build power and capacity for Philadelphians to save and share their stories on their own terms.",
  },
  {
    title: "PMR Staff",
    href: "/about#pmr-staff",
    kind: "page",
    excerpt: "Meet the people who steward People's Media Record.",
  },
  {
    title: "Community Advisory Board",
    href: "/about#community-advisory-board",
    kind: "page",
    excerpt: "Community advisors who guide People's Media Record.",
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
    excerpt:
      "PACME Fellowship, People's Media Camp, and Movement Memory Jams.",
  },
  {
    title: "PACME Fellowship",
    href: "/programs/pacme",
    kind: "program",
    excerpt:
      "A nine-month fellowship supporting Philadelphia-based media creators and stewards in preserving and archiving community media collections.",
  },
  {
    title: "People's Media Camp",
    href: "/camp",
    kind: "program",
    excerpt:
      "An annual convening for grassroots preservationists, archivists, community historians, and memory workers.",
  },
  {
    title: "Camp Registration",
    href: "/camp/register",
    kind: "program",
    excerpt:
      "Register for People's Media Camp. First name, last name, email, and which days you plan to attend are required.",
  },
  {
    title: "Movement Memory Jams",
    href: "/programs/movement-memory-jams",
    kind: "program",
    excerpt:
      "In 2026 PMR is hosting monthly Movement Memory Jams — community events to share, discuss, and connect around grassroots memory work, preservation, and archiving.",
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
      href: `/resources/pool#${item.slug}`,
      kind: "resource" as const,
      excerpt: item.description,
    })),
    ...glossaryTerms.map((item) => ({
      title: item.term,
      href: `/resources/glossary#${item.slug}`,
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
