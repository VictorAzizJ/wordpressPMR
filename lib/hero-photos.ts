/**
 * Homepage hero stills. Files live in `public/images/home/`.
 */
export interface HeroPhoto {
  id: string;
  src: string;
  /** Decorative background — keep empty; overlay copy is the accessible name. */
  alt: string;
}

export const heroPhotos: HeroPhoto[] = [
  { id: "hero-01", src: "/images/home/hero-01-we-are.jpg", alt: "" },
  { id: "hero-02", src: "/images/home/hero-02-immigrant-community.jpg", alt: "" },
  { id: "hero-03", src: "/images/home/hero-03-workshop-group.jpg", alt: "" },
  { id: "hero-04", src: "/images/home/hero-04-community-circle.jpg", alt: "" },
  { id: "hero-05", src: "/images/home/hero-05-teachers-march.jpg", alt: "" },
  { id: "hero-06", src: "/images/home/hero-06-video-archive.jpg", alt: "" },
  { id: "hero-07", src: "/images/home/hero-07-collective-screening.jpg", alt: "" },
  { id: "hero-08", src: "/images/home/hero-08-digitization.jpg", alt: "" },
];
