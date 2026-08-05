import type {
  ArchiveRecord,
  Collection,
  Event,
  GlossaryTerm,
  Resource,
  Story,
} from "./types";

const thumb = (id: number) =>
  `https://picsum.photos/seed/pmr${id}/640/360`;

export const collections: Collection[] = [
  {
    id: "col-1",
    slug: "philadelphia-community-radio-1980-1995",
    title: "Philadelphia Community Radio 1980–1995",
    description:
      "Broadcast recordings, station IDs, and oral histories from West Philly community radio collectives documenting neighborhood organizing and cultural programming.",
    coverImage: thumb(101),
    recordIds: ["rec-1", "rec-2", "rec-3", "rec-4", "rec-5"],
    steward: "West Philly Community Media Collective",
    dateRange: "1980–1995",
    accessNotes: "Most materials are public; some interviews require access request.",
    featured: true,
  },
  {
    id: "col-2",
    slug: "kensington-oral-histories",
    title: "Kensington Oral Histories",
    description:
      "First-person accounts from residents, workers, and organizers in Kensington spanning housing justice, factory closures, and mutual aid networks.",
    coverImage: thumb(102),
    recordIds: ["rec-6", "rec-7", "rec-8", "rec-9"],
    steward: "Kensington Memory Project",
    dateRange: "1972–2008",
    featured: true,
  },
  {
    id: "col-3",
    slug: "prison-radio-resistance",
    title: "Prison Radio & Resistance",
    description:
      "Audio letters, call-ins, and solidarity broadcasts connecting incarcerated journalists with outside movement media.",
    coverImage: thumb(103),
    recordIds: ["rec-10", "rec-11", "rec-12"],
    steward: "PMR Stewardship Circle",
    dateRange: "1998–2018",
    accessNotes: "Several items restricted to protect participant safety.",
    featured: false,
  },
  {
    id: "col-4",
    slug: "youth-media-labs",
    title: "Youth Media Labs",
    description:
      "Workshop footage, zines, and student documentaries from after-school media programs across the Philadelphia school district.",
    coverImage: thumb(104),
    recordIds: ["rec-13", "rec-14", "rec-15", "rec-16"],
    dateRange: "2005–2022",
    featured: true,
  },
  {
    id: "col-5",
    slug: "labor-strike-footage",
    title: "Labor Strike Footage",
    description:
      "Documentary clips and photographer stills from hospital, transit, and education strikes in the Mid-Atlantic region.",
    coverImage: thumb(105),
    recordIds: ["rec-17", "rec-18", "rec-19", "rec-20"],
    steward: "Tri-State Labor Archive Network",
    dateRange: "1987–2019",
    featured: false,
  },
];

export const archiveRecords: ArchiveRecord[] = [
  {
    id: "rec-1",
    slug: "west-philly-fm-sign-on-1984",
    title: "West Philly FM Sign-On Broadcast",
    description:
      "Opening night broadcast featuring station founders introducing community programming guidelines and listener call-ins.",
    date: "1984-03-12",
    clipLength: "42:18",
    mediaType: "audio",
    thumbnail: thumb(1),
    collectionIds: ["col-1"],
    organization: "West Philly Community Media Collective",
    location: "Philadelphia, PA",
    people: ["Maria Santos", "James Okonkwo"],
    topics: ["community radio", "West Philadelphia", "broadcast history"],
    language: "English",
    rightsStatus: "Community license — attribution required",
    accessLevel: "public",
    featured: true,
    transcript:
      "Welcome to West Philly FM. Tonight we open the airwaves to the voices that commercial radio won't carry...",
  },
  {
    id: "rec-2",
    slug: "housing-co-op-meeting-tape-1987",
    title: "Housing Co-op Organizing Meeting",
    description:
      "Audio recording of a tenant coalition planning session on cooperative ownership models.",
    date: "1987-11-03",
    clipLength: "1:05:02",
    mediaType: "audio",
    thumbnail: thumb(2),
    collectionIds: ["col-1"],
    location: "Philadelphia, PA",
    topics: ["housing justice", "cooperatives", "organizing"],
    accessLevel: "public",
    relatedRecordIds: ["rec-3"],
  },
  {
    id: "rec-3",
    slug: "eviction-blockade-interview-1988",
    title: "Eviction Blockade Interview",
    description:
      "Street interview with organizers during a successful eviction defense action in Mantua.",
    date: "1988-06-22",
    clipLength: "12:44",
    mediaType: "video",
    thumbnail: thumb(3),
    collectionIds: ["col-1"],
    topics: ["housing justice", "direct action", "Mantua"],
    accessLevel: "public",
    featured: true,
  },
  {
    id: "rec-4",
    slug: "pirate-radio-raid-aftermath",
    title: "Pirate Radio Raid Aftermath",
    description:
      "Documentary segment on FCC raid response and community legal support mobilization.",
    date: "1991-09-15",
    clipLength: "28:30",
    mediaType: "video",
    thumbnail: thumb(4),
    collectionIds: ["col-1"],
    topics: ["community radio", "legal defense", "FCC"],
    accessLevel: "request_access",
    rightsStatus: "Pending rights review",
  },
  {
    id: "rec-5",
    slug: "late-night-jazz-program-1993",
    title: "Late Night Jazz Program",
    description: "Full episode of volunteer-hosted jazz and poetry hour.",
    date: "1993-02-08",
    clipLength: "58:00",
    mediaType: "audio",
    thumbnail: thumb(5),
    collectionIds: ["col-1"],
    topics: ["music", "poetry", "cultural programming"],
    accessLevel: "public",
  },
  {
    id: "rec-6",
    slug: "kensington-mill-closure-1974",
    title: "Mill Closure Testimony",
    description:
      "Worker testimony on factory closure and displacement in Kensington textile mills.",
    date: "1974-08-19",
    clipLength: "35:12",
    mediaType: "audio",
    thumbnail: thumb(6),
    collectionIds: ["col-2"],
    location: "Kensington, Philadelphia, PA",
    topics: ["labor", "deindustrialization", "oral history"],
    accessLevel: "public",
    featured: true,
  },
  {
    id: "rec-7",
    slug: "mutual-aid-kitchen-1995",
    title: "Mutual Aid Kitchen Organizing",
    description:
      "Interview with volunteers establishing a community kitchen during economic downturn.",
    date: "1995-01-10",
    clipLength: "22:08",
    mediaType: "audio",
    thumbnail: thumb(7),
    collectionIds: ["col-2"],
    topics: ["mutual aid", "food justice", "Kensington"],
    accessLevel: "public",
  },
  {
    id: "rec-8",
    slug: "overdose-prevention-training-2008",
    title: "Overdose Prevention Training Session",
    description:
      "Community training workshop recording (identities redacted in public version).",
    date: "2008-04-14",
    clipLength: "48:55",
    mediaType: "video",
    thumbnail: thumb(8),
    collectionIds: ["col-2"],
    topics: ["harm reduction", "public health", "training"],
    accessLevel: "request_access",
  },
  {
    id: "rec-9",
    slug: "kensington-street-photographs-1982",
    title: "Kensington Street Photographs",
    description: "Digitized contact sheet from neighborhood photographer collective.",
    date: "1982-10-01",
    mediaType: "image",
    thumbnail: thumb(9),
    collectionIds: ["col-2"],
    topics: ["photography", "neighborhood history"],
    accessLevel: "public",
  },
  {
    id: "rec-10",
    slug: "prison-radio-call-in-2001",
    title: "Prison Radio Call-In Hour",
    description:
      "Solidarity broadcast featuring call-ins from incarcerated journalists.",
    date: "2001-07-22",
    clipLength: "55:40",
    mediaType: "audio",
    thumbnail: thumb(10),
    collectionIds: ["col-3"],
    topics: ["prison justice", "media activism", "solidarity"],
    accessLevel: "restricted",
    rightsStatus: "Restricted — safety review required",
  },
  {
    id: "rec-11",
    slug: "letter-reading-circle-2010",
    title: "Letter Reading Circle",
    description: "Community volunteers read and respond to incarcerated writers.",
    date: "2010-03-05",
    clipLength: "38:20",
    mediaType: "audio",
    thumbnail: thumb(11),
    collectionIds: ["col-3"],
    topics: ["prison justice", "correspondence"],
    accessLevel: "request_access",
  },
  {
    id: "rec-12",
    slug: "advocacy-handbook-scan",
    title: "Advocacy Handbook Scan",
    description: "PDF scan of prison media advocacy handbook, 2nd edition.",
    date: "2015-11-01",
    mediaType: "document",
    thumbnail: thumb(12),
    collectionIds: ["col-3"],
    topics: ["advocacy", "handbook", "prison media"],
    accessLevel: "public",
  },
  {
    id: "rec-13",
    slug: "student-documentary-gentrification",
    title: "Student Documentary: Gentrification",
    description:
      "High school media lab documentary on gentrification and school closures.",
    date: "2012-05-18",
    clipLength: "18:42",
    mediaType: "video",
    thumbnail: thumb(13),
    collectionIds: ["col-4"],
    topics: ["youth media", "gentrification", "education"],
    accessLevel: "public",
    featured: true,
  },
  {
    id: "rec-14",
    slug: "zine-making-workshop-2016",
    title: "Zine-Making Workshop",
    description: "Workshop footage teaching cut-and-paste zine production techniques.",
    date: "2016-02-27",
    clipLength: "24:15",
    mediaType: "video",
    thumbnail: thumb(14),
    collectionIds: ["col-4"],
    topics: ["zines", "workshop", "youth media"],
    accessLevel: "public",
  },
  {
    id: "rec-15",
    slug: "podcast-pilot-environmental-justice",
    title: "Podcast Pilot: Environmental Justice",
    description: "Student-produced podcast pilot on refinery pollution in South Philly.",
    date: "2019-10-03",
    clipLength: "32:00",
    mediaType: "audio",
    thumbnail: thumb(15),
    collectionIds: ["col-4"],
    topics: ["environmental justice", "podcast", "South Philadelphia"],
    accessLevel: "public",
  },
  {
    id: "rec-16",
    slug: "media-literacy-curriculum-packet",
    title: "Media Literacy Curriculum Packet",
    description: "Teaching packet for after-school facilitators.",
    date: "2020-01-15",
    mediaType: "document",
    thumbnail: thumb(16),
    collectionIds: ["col-4"],
    topics: ["education", "media literacy", "curriculum"],
    accessLevel: "public",
  },
  {
    id: "rec-17",
    slug: "hospital-strike-picket-line-1994",
    title: "Hospital Strike Picket Line",
    description: "Raw footage from nurses' strike picket line, day 12.",
    date: "1994-09-08",
    clipLength: "15:33",
    mediaType: "video",
    thumbnail: thumb(17),
    collectionIds: ["col-5"],
    topics: ["labor", "healthcare workers", "strike"],
    accessLevel: "public",
    featured: true,
  },
  {
    id: "rec-18",
    slug: "transit-workers-rally-2009",
    title: "Transit Workers Rally",
    description: "Speeches and interviews from regional transit workers rally.",
    date: "2009-04-21",
    clipLength: "41:07",
    mediaType: "video",
    thumbnail: thumb(18),
    collectionIds: ["col-5"],
    topics: ["labor", "transit", "rally"],
    accessLevel: "public",
  },
  {
    id: "rec-19",
    slug: "teacher-union-negotiation-audio",
    title: "Teacher Union Negotiation Session",
    description:
      "Public portion of contract negotiation forum (restricted sections withheld).",
    date: "2012-03-14",
    clipLength: "1:12:00",
    mediaType: "audio",
    thumbnail: thumb(19),
    collectionIds: ["col-5"],
    topics: ["education", "unions", "negotiation"],
    accessLevel: "request_access",
  },
  {
    id: "rec-20",
    slug: "solidarity-poster-archive",
    title: "Solidarity Poster Archive",
    description: "High-resolution scans of strike solidarity posters, 1987–2019.",
    date: "2019-06-01",
    mediaType: "image",
    thumbnail: thumb(20),
    collectionIds: ["col-5"],
    topics: ["labor", "graphics", "poster art"],
    accessLevel: "public",
  },
  {
    id: "rec-21",
    slug: "immigrant-rights-march-2006",
    title: "Immigrant Rights March Coverage",
    description: "Independent media coverage of regional immigrant rights march.",
    date: "2006-05-01",
    clipLength: "26:48",
    mediaType: "video",
    thumbnail: thumb(21),
    collectionIds: ["col-1", "col-5"],
    topics: ["immigration", "march", "independent media"],
    accessLevel: "public",
  },
  {
    id: "rec-22",
    slug: "community-archive-training-2023",
    title: "Community Archive Training Session",
    description:
      "PMR workshop on metadata, consent, and access levels for community stewards.",
    date: "2023-09-16",
    clipLength: "1:28:00",
    mediaType: "video",
    thumbnail: thumb(22),
    collectionIds: [],
    topics: ["archiving", "training", "stewardship"],
    accessLevel: "public",
    featured: true,
  },
];

export const stories: Story[] = [
  {
    id: "story-1",
    slug: "signals-from-the-basement",
    title: "Signals from the Basement: Community Radio in West Philly",
    heroImage: thumb(201),
    intro:
      "Before streaming and podcasts, West Philadelphia organizers claimed the airwaves from basements and rooftops. This exhibition traces four decades of pirate and licensed community radio.",
    sections: [
      {
        type: "paragraph",
        content:
          "In the early 1980s, a network of volunteers converted donated equipment into low-power transmitters. What began as late-night music programs became infrastructure for tenant organizing, prison solidarity, and multilingual news.",
      },
      {
        type: "pullquote",
        content:
          "We weren't trying to be professional broadcasters. We were trying to be accountable to our neighbors.",
      },
      {
        type: "embedded_record",
        content: "Listen: West Philly FM Sign-On Broadcast",
        recordId: "rec-1",
      },
      {
        type: "paragraph",
        content:
          "The archive holds hundreds of hours of tape — sign-on broadcasts, raid aftermath documentaries, and call-in shows that doubled as mutual aid hotlines during crises.",
      },
      {
        type: "gallery",
        content: "Station ephemera",
        images: [thumb(202), thumb(203), thumb(204)],
      },
    ],
    relatedRecordIds: ["rec-1", "rec-2", "rec-4", "rec-5"],
    credits: "Curated by PMR Editorial Collective, 2024",
    status: "published",
    featured: true,
  },
  {
    id: "story-2",
    slug: "kensington-memory-walk",
    title: "Kensington Memory Walk",
    heroImage: thumb(205),
    intro:
      "A walking exhibition pairing oral histories with neighborhood landmarks — mills, kitchens, and harm reduction sites.",
    sections: [
      {
        type: "paragraph",
        content:
          "Residents recorded memories at twelve stops along a two-mile route. Each stop links to archive audio and photographs in this digital companion.",
      },
      {
        type: "embedded_record",
        content: "Mill Closure Testimony",
        recordId: "rec-6",
      },
      {
        type: "paragraph",
        content:
          "The walk was co-designed with longtime organizers who emphasized consent and the right to withdraw stories from public view.",
      },
    ],
    relatedRecordIds: ["rec-6", "rec-7", "rec-9"],
    credits: "Kensington Memory Project & PMR",
    status: "published",
    featured: true,
  },
  {
    id: "story-3",
    slug: "youth-mic-open",
    title: "Youth Mic Open: Student Media Since 2005",
    heroImage: thumb(206),
    intro:
      "Classroom documentaries, zines, and podcast pilots from Philadelphia youth media labs.",
    sections: [
      {
        type: "paragraph",
        content:
          "After-school programs gave students tools to document their neighborhoods on their own terms — often challenging mainstream narratives about their schools and blocks.",
      },
      {
        type: "embedded_record",
        content: "Student Documentary: Gentrification",
        recordId: "rec-13",
      },
    ],
    relatedRecordIds: ["rec-13", "rec-14", "rec-15"],
    status: "published",
    featured: false,
  },
];

export const resources: Resource[] = [
  {
    id: "res-1",
    slug: "community-archiving-toolkit",
    title: "Community Archiving Toolkit",
    category: "Toolkits",
    description:
      "Step-by-step guide for community groups starting local archives: consent forms, metadata basics, and storage options.",
    link: "#",
    audience: "Community stewards",
    tags: ["archiving", "consent", "metadata"],
    featured: true,
  },
  {
    id: "res-2",
    slug: "oral-history-interview-guide",
    title: "Oral History Interview Guide",
    category: "Guides",
    description:
      "Questions, release forms, and equipment checklists for ethical oral history collection.",
    link: "#",
    audience: "Interviewers & volunteers",
    tags: ["oral history", "interviews", "ethics"],
    featured: true,
  },
  {
    id: "res-3",
    slug: "media-making-reading-list",
    title: "Media-Making Reading List",
    category: "Reading lists",
    description:
      "Books and articles on community media, prison radio, and independent journalism.",
    link: "#",
    tags: ["reading", "media making", "education"],
    featured: false,
  },
  {
    id: "res-4",
    slug: "preservation-best-practices",
    title: "Preservation Best Practices",
    category: "Preservation",
    description:
      "Handling magnetic tape, digitization workflows, and long-term storage for analog collections.",
    link: "#",
    audience: "Archivists",
    tags: ["preservation", "digitization", "tape"],
    featured: false,
  },
  {
    id: "res-5",
    slug: "classroom-archive-activities",
    title: "Classroom Archive Activities",
    category: "Teaching materials",
    description:
      "Lesson plans for grades 8–12 using PMR sample records to teach history and media literacy.",
    link: "#",
    audience: "Educators",
    tags: ["education", "lesson plans", "youth"],
    featured: true,
  },
  {
    id: "res-6",
    slug: "access-request-policy-template",
    title: "Access Request Policy Template",
    category: "Guides",
    description:
      "Model policy language for archives balancing public access with participant safety.",
    link: "#",
    audience: "Stewards & administrators",
    tags: ["access", "policy", "safety"],
    featured: false,
  },
  {
    id: "res-7",
    slug: "low-cost-audio-recording",
    title: "Low-Cost Audio Recording Setup",
    category: "Media-making",
    description:
      "Equipment recommendations under $200 for community interview projects.",
    link: "#",
    tags: ["audio", "equipment", "budget"],
    featured: false,
  },
  {
    id: "res-8",
    slug: "mutual-aid-media-directory",
    title: "Mutual Aid Media Directory",
    category: "Community resources",
    description:
      "Directory of regional community media groups, legal support, and training programs.",
    link: "#",
    tags: ["directory", "mutual aid", "networks"],
    featured: false,
  },
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "gloss-1",
    slug: "community-archive",
    term: "Community Archive",
    definition:
      "An archive governed and maintained by the community it documents, prioritizing collective memory and participatory stewardship over institutional control.",
    relatedResourceIds: ["res-1"],
    relatedRecordIds: ["rec-22"],
  },
  {
    id: "gloss-2",
    slug: "access-level",
    term: "Access Level",
    definition:
      "A classification describing who may view metadata and media: public, request access, restricted, or private/internal.",
    relatedResourceIds: ["res-6"],
  },
  {
    id: "gloss-3",
    slug: "oral-history",
    term: "Oral History",
    definition:
      "Recorded interviews capturing personal recollections of historical events, often collected with signed release and retention agreements.",
    relatedResourceIds: ["res-2"],
    relatedRecordIds: ["rec-6", "rec-7"],
  },
  {
    id: "gloss-4",
    slug: "metadata",
    term: "Metadata",
    definition:
      "Descriptive information about a record (title, date, topics, rights) that helps users find and understand materials without opening the media file.",
  },
  {
    id: "gloss-5",
    slug: "stewardship",
    term: "Stewardship",
    definition:
      "Ongoing care for collections including acquisition, description, access decisions, and community accountability.",
    relatedStoryIds: ["story-1"],
  },
  {
    id: "gloss-6",
    slug: "magnetic-tape",
    term: "Magnetic Tape",
    definition:
      "Analog audio/video storage format (cassette, reel-to-reel) requiring controlled climate and digitization before degradation.",
    relatedResourceIds: ["res-4"],
  },
  {
    id: "gloss-7",
    slug: "consent",
    term: "Consent",
    definition:
      "Documented agreement from participants about how their words, images, or likeness may be stored, shared, and accessed over time.",
  },
  {
    id: "gloss-8",
    slug: "pirate-radio",
    term: "Pirate Radio",
    definition:
      "Unlicensed broadcasting, often used by social movements when legal channels are inaccessible or censored.",
    relatedRecordIds: ["rec-4"],
    relatedStoryIds: ["story-1"],
  },
  {
    id: "gloss-9",
    slug: "harm-reduction",
    term: "Harm Reduction",
    definition:
      "Practices that minimize negative consequences of drug use and promote health, often documented in community health archives with careful access controls.",
    relatedRecordIds: ["rec-8"],
  },
  {
    id: "gloss-10",
    slug: "mutual-aid",
    term: "Mutual Aid",
    definition:
      "Collective coordination to meet community needs, contrasted with charity models that don't build shared power.",
    relatedRecordIds: ["rec-7"],
  },
];

export const events: Event[] = [
  {
    id: "evt-1",
    slug: "archive-open-house-spring-2026",
    title: "Archive Open House — Spring 2026",
    dateTime: "2026-04-18T14:00:00",
    location: "PMR Community Space, Philadelphia, PA",
    description:
      "Tour the archive, meet stewards, and learn how to request access to restricted collections.",
    registrationLink: "#",
    isUpcoming: true,
  },
  {
    id: "evt-2",
    slug: "oral-history-workshop",
    title: "Oral History Workshop",
    dateTime: "2026-05-09T10:00:00",
    location: "Virtual (Zoom)",
    description:
      "Hands-on training in interview techniques, release forms, and depositing materials with PMR.",
    registrationLink: "#",
    relatedResourceIds: ["res-2"],
    isUpcoming: true,
  },
  {
    id: "evt-3",
    slug: "kensington-memory-walk-launch",
    title: "Kensington Memory Walk Launch",
    dateTime: "2025-10-12T11:00:00",
    location: "Kensington Ave & Somerset St, Philadelphia, PA",
    description:
      "Public launch of the walking exhibition with live listening stations.",
    isUpcoming: false,
  },
  {
    id: "evt-4",
    slug: "youth-media-screening-2025",
    title: "Youth Media Screening Night",
    dateTime: "2025-06-20T18:30:00",
    location: "Neighborhood House, Philadelphia, PA",
    description:
      "Screening of student documentaries from 2024–2025 media lab cohort.",
    isUpcoming: false,
  },
];

// Helpers
export function getRecordBySlug(slug: string): ArchiveRecord | undefined {
  return archiveRecords.find((r) => r.slug === slug);
}

export function getRecordById(id: string): ArchiveRecord | undefined {
  return archiveRecords.find((r) => r.id === id);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}

export function getRecordsForCollection(collectionId: string): ArchiveRecord[] {
  const col = collections.find((c) => c.id === collectionId);
  if (!col) return [];
  return archiveRecords.filter((r) => col.recordIds.includes(r.id));
}

export function getFeaturedRecords(): ArchiveRecord[] {
  return archiveRecords.filter((r) => r.featured);
}

export function getFeaturedCollections(): Collection[] {
  return collections.filter((c) => c.featured);
}

export function getFeaturedStories(): Story[] {
  return stories.filter((s) => s.featured);
}

export const allTopics = [
  ...new Set(archiveRecords.flatMap((r) => r.topics)),
].sort();

export const allYears = [
  ...new Set(
    archiveRecords.map((r) => new Date(r.date).getFullYear().toString())
  ),
].sort((a, b) => Number(b) - Number(a));

export const resourceCategories = [
  ...new Set(resources.map((r) => r.category)),
].sort();
