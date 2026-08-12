export type FeaturedSlideMedia =
  | { kind: "cassette" }
  | { kind: "image"; src: string; alt: string };

export interface FeaturedSlideCta {
  label: string;
  href: string;
}

export interface FeaturedSlide {
  id: string;
  title: string;
  description: string;
  year?: string;
  tag?: string;
  cta?: FeaturedSlideCta;
  /** Optional secondary action (e.g. Browse Collections on the intro slide). */
  secondaryCta?: FeaturedSlideCta;
  media: FeaturedSlideMedia;
}

/** Staff can swap copy/media here without touching carousel logic. */
export const featuredSlides: FeaturedSlide[] = [
  {
    id: "intro-cassette",
    title: "Movement memory on tape",
    description:
      "People's Media Record stewards oral histories, community radio, strike footage, and youth media — so movement memory stays public, usable, and cared for.",
    tag: "Featured archive",
    cta: { label: "Search the Archive", href: "/archive" },
    secondaryCta: { label: "Browse Collections", href: "/collections" },
    media: { kind: "cassette" },
  },
  {
    id: "oral-history",
    title: "Kensington Oral Histories",
    description:
      "First-person accounts from residents, workers, and organizers spanning housing justice, factory closures, and mutual aid networks.",
    year: "1972–2008",
    tag: "Oral history",
    cta: {
      label: "Open collection",
      href: "/collections/kensington-oral-histories",
    },
    media: {
      kind: "image",
      src: "https://picsum.photos/seed/pmr102/960/640",
      alt: "Portrait still from the Kensington Oral Histories collection",
    },
  },
  {
    id: "recording",
    title: "West Philly FM Sign-On Broadcast",
    description:
      "A morning station ID and community calendar from West Philly FM — neighborhood organizing woven into everyday airwaves.",
    year: "1984",
    tag: "Recording",
    cta: {
      label: "Listen / view record",
      href: "/records/west-philly-fm-sign-on-1984",
    },
    media: {
      kind: "image",
      src: "https://picsum.photos/seed/pmr1/960/640",
      alt: "Studio still related to the West Philly FM sign-on broadcast",
    },
  },
  {
    id: "community-story",
    title: "Youth Media Labs",
    description:
      "Workshop footage, zines, and student documentaries from after-school media programs across Philadelphia.",
    year: "2005–2022",
    tag: "Community story",
    cta: {
      label: "Browse the labs",
      href: "/collections/youth-media-labs",
    },
    media: {
      kind: "image",
      src: "https://picsum.photos/seed/pmr104/960/640",
      alt: "Youth media workshop still from the Youth Media Labs collection",
    },
  },
  {
    id: "historic-moment",
    title: "Hospital Strike Picket Line",
    description:
      "Documentary clips from a Mid-Atlantic hospital strike — picket lines, chants, and the everyday labor of solidarity.",
    year: "1994",
    tag: "Historic moment",
    cta: {
      label: "View footage",
      href: "/records/hospital-strike-picket-line-1994",
    },
    media: {
      kind: "image",
      src: "https://picsum.photos/seed/pmr17/960/640",
      alt: "Still from hospital strike picket line footage",
    },
  },
  {
    id: "upcoming-campaign",
    title: "Media Camp is coming up",
    description:
      "Hands-on workshops for young people and neighbors who want to record, digitize, and tell community stories. Dates and registration live on the Camp page.",
    tag: "Upcoming campaign",
    cta: { label: "Explore Camp", href: "/camp" },
    media: {
      kind: "image",
      src: "https://picsum.photos/seed/pmrcamp/960/640",
      alt: "Community media workshop atmosphere for Media Camp",
    },
  },
];
