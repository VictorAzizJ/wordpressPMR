/**
 * Homepage hero stills. Picsum seeds match existing mock archive records;
 * swap `src` for real PMR photographs when they are available.
 */
export interface HeroPhoto {
  id: string;
  src: string;
  /** Decorative background — keep empty; overlay copy is the accessible name. */
  alt: string;
}

const hero = (seed: number) =>
  `https://picsum.photos/seed/pmr${seed}/1920/1080`;

export const heroPhotos: HeroPhoto[] = [
  { id: "rec-1", src: hero(1), alt: "" },
  { id: "rec-3", src: hero(3), alt: "" },
  { id: "rec-6", src: hero(6), alt: "" },
  { id: "rec-9", src: hero(9), alt: "" },
  { id: "rec-13", src: hero(13), alt: "" },
  { id: "rec-14", src: hero(14), alt: "" },
  { id: "rec-17", src: hero(17), alt: "" },
  { id: "rec-18", src: hero(18), alt: "" },
  { id: "rec-21", src: hero(21), alt: "" },
  { id: "rec-22", src: hero(22), alt: "" },
];
