export type Sponsor = {
  id: string;
  name: string;
  /** When set, renders the logo; otherwise shows a placeholder tile. */
  src?: string;
  alt?: string;
  href?: string;
};

/** Drop logos in /public/images/sponsors/ and fill `src` when Winter sends files. */
export const sponsors: Sponsor[] = [
  { id: "funder-1", name: "Funder" },
  { id: "funder-2", name: "Funder" },
  { id: "funder-3", name: "Funder" },
  { id: "funder-4", name: "Funder" },
];
