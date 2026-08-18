/**
 * Public social links and the homepage updates-feed source.
 *
 * Replace `instagramHandle` when the client shares the real account.
 * Do not put Meta tokens, app secrets, or private feed URLs in this file.
 */

export type UpdatesFeedSource = "mock" | "json";

export const social = {
  /** Placeholder handle — swap when the client confirms Instagram. */
  instagramHandle: "peoplesmediarecord",
} as const;

/**
 * Homepage “current things” grid.
 *
 * - `mock` — `lib/updates.ts` placeholders (this pass).
 * - `json` — GET a public JSON feed (Behold or similar) and map to `UpdatePost`.
 *
 * Set `UPDATES_FEED_URL` in env (preferred) or `jsonUrl` below, then flip
 * `source` to `"json"`. Instagram Graph API is a later option and needs a
 * server-only token — never commit it.
 */
export const updatesFeed: {
  source: UpdatesFeedSource;
  limit: number;
  /** Optional in-repo JSON URL. Prefer UPDATES_FEED_URL so private hosts stay out of git. */
  jsonUrl: string;
} = {
  source: "mock",
  limit: 9,
  jsonUrl: "",
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
