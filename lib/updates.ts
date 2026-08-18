import {
  instagramProfileUrl,
  updatesFeed,
} from "@/config/social";

/**
 * IG-card shape used by the homepage grid.
 * Live feeds (Behold JSON, Instagram Graph, etc.) should map into this.
 */
export interface UpdatePost {
  id: string;
  image: string;
  caption: string;
  postedAt: string;
  permalink: string;
}

const square = (seed: number) =>
  `https://picsum.photos/seed/pmrupd${seed}/800/800`;

const profile = instagramProfileUrl();

/**
 * Placeholder posts for this pass. Swap `updatesFeed.source` to `"json"`
 * and set `UPDATES_FEED_URL` when a live feed host is ready.
 */
export const mockUpdates: UpdatePost[] = [
  {
    id: "upd-1",
    image: square(1),
    caption:
      "New tapes on the bench — community radio reels waiting for transfer.",
    postedAt: "2026-08-16T14:20:00",
    permalink: profile,
  },
  {
    id: "upd-2",
    image: square(2),
    caption: "Finding-aid night. Labels, dates, and a lot of coffee.",
    postedAt: "2026-08-12T18:05:00",
    permalink: profile,
  },
  {
    id: "upd-3",
    image: square(3),
    caption: "Listening back to an oral history recorded in Kensington.",
    postedAt: "2026-08-08T11:40:00",
    permalink: profile,
  },
  {
    id: "upd-4",
    image: square(4),
    caption: "Youth media workshop stills from the digitization lab.",
    postedAt: "2026-08-03T16:15:00",
    permalink: profile,
  },
  {
    id: "upd-5",
    image: square(5),
    caption: "Strike footage frame: picket line, handmade signs, summer heat.",
    postedAt: "2026-07-28T09:50:00",
    permalink: profile,
  },
  {
    id: "upd-6",
    image: square(6),
    caption: "Cataloging photographs with community stewards.",
    postedAt: "2026-07-21T13:10:00",
    permalink: profile,
  },
  {
    id: "upd-7",
    image: square(7),
    caption:
      "A cassette hub, a leader tape, and the start of a new transfer.",
    postedAt: "2026-07-14T10:00:00",
    permalink: profile,
  },
  {
    id: "upd-8",
    image: square(8),
    caption: "Archive open hours: come search, listen, and ask questions.",
    postedAt: "2026-07-07T15:30:00",
    permalink: profile,
  },
  {
    id: "upd-9",
    image: square(9),
    caption:
      "Movement memory takes many forms — audio, video, zines, and stills.",
    postedAt: "2026-06-30T12:00:00",
    permalink: profile,
  },
];

function asString(value: unknown): string {
  return typeof value === "string" ? value : value == null ? "" : String(value);
}

function extractList(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    if (Array.isArray(record.posts)) return record.posts;
    if (Array.isArray(record.data)) return record.data;
    if (Array.isArray(record.items)) return record.items;
  }
  return [];
}

/** Normalize Behold-style JSON or Instagram Graph `data` arrays into UpdatePost. */
export function mapFeedPayload(payload: unknown): UpdatePost[] {
  return extractList(payload).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const raw = item as Record<string, unknown>;
    const mediaType = asString(raw.mediaType || raw.media_type).toUpperCase();
    const thumbnail = asString(raw.thumbnailUrl || raw.thumbnail_url);
    const media = asString(
      raw.image || raw.mediaUrl || raw.media_url || thumbnail,
    );
    const image = mediaType === "VIDEO" && thumbnail ? thumbnail : media;
    const id = asString(raw.id || raw.mediaId);
    if (!id || !image) return [];
    return [
      {
        id,
        image,
        caption: asString(raw.caption),
        postedAt: asString(raw.postedAt || raw.timestamp || raw.createdAt),
        permalink: asString(raw.permalink || raw.url),
      } satisfies UpdatePost,
    ];
  });
}

async function fetchJsonFeed(url: string, limit: number): Promise<UpdatePost[]> {
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`Updates feed responded ${res.status}`);
  }
  const payload: unknown = await res.json();
  return mapFeedPayload(payload).slice(0, limit);
}

function getMockUpdates(limit: number): UpdatePost[] {
  return mockUpdates.slice(0, limit);
}

/**
 * Single entry point for the homepage grid.
 * Flip `updatesFeed.source` in config — the card component stays the same.
 */
export async function getUpdates(): Promise<UpdatePost[]> {
  const { source, limit, jsonUrl } = updatesFeed;
  const liveUrl = process.env.UPDATES_FEED_URL || jsonUrl;

  if (source === "json" && liveUrl) {
    try {
      const posts = await fetchJsonFeed(liveUrl, limit);
      if (posts.length > 0) return posts;
    } catch (error) {
      console.error("Updates live feed failed; using mock posts.", error);
    }
  }

  return getMockUpdates(limit);
}
