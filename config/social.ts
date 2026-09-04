/**
 * Public social links and the homepage updates-feed source.
 *
 * Do not put Meta tokens, app secrets, or private feed URLs in this file.
 */

export type UpdatesFeedSource = "mock" | "json";

export const social = {
  instagramHandle: "peoplesmediarecord",
} as const;

/**
 * Homepage “What’s Current?” grid.
 *
 * - `mock` — `lib/updates.ts` placeholders.
 * - `json` — GET a public JSON feed (Behold) and map to `UpdatePost`.
 *
 * `jsonUrl` is the public Behold feed. `UPDATES_FEED_URL` overrides it if set.
 * Failed fetches fall back to mock posts. Never commit Meta / Graph tokens.
 */
export const updatesFeed: {
  source: UpdatesFeedSource;
  limit: number;
  jsonUrl: string;
} = {
  source: "json",
  limit: 6,
  jsonUrl: "https://feeds.behold.so/vFQtlQMC6z3k1tcUV7b6",
};

export function instagramHandleDisplay(
  handle: string = social.instagramHandle,
): string {
  return `@${handle.replace(/^@/, "")}`;
}

export function instagramProfileUrl(
  handle: string = social.instagramHandle,
): string {
  return `https://www.instagram.com/${handle.replace(/^@/, "")}/`;
}
