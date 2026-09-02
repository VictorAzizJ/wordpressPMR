export const archiveHub = {
  title: "Archive",
  intro:
    "Here you can explore everything related to our archive, from the items themselves to the protocols that have been created with the goal of managing and preserving these materials in the long term.",
  photo: {
    src: "/images/archive/archive_picture_website_08-2026.png",
    alt: "",
  },
};

export const archiveBrowse = {
  title: "People's Media Record's Archive",
  intro:
    "The People's Media Record's Archive was created to steward the Media Mobilizing Project (MMP) Collection and collections associated with organizations, campaigns, and projects related to MMP, such as the Kensington Welfare Rights Union, Poor People's Campaign, New Jersey Platform, and Philly We Rise. These materials include a wide variety of non-fiction video and audio content produced by organizers, activists, and citizen journalists in the Philadelphia region.",
  mmpLinkLabel: "Learn more about the MMP Collection here.",
  mmpHref: "/archive/mmp-collection",
} as const;

export const mmpCollectionPage = {
  title: "The Media Mobilizing Project Collection",
  intro:
    "The archive of People's Media Record houses the Media Mobilizing Project (MMP) Collection. On this page we describe MMP, the origins of the collection, and what it includes.",
  photo: {
    src: "/images/archive/mmp-collection-hero.png",
    alt: "",
  },
  history: [
    "The Media Mobilizing Project (MMP) was founded in 2005 by a small group of activists who experimented extensively with video and narrative strategies to support and strengthen local social movements in Philadelphia. MMP used community-based media production as a tool to foster unity and build community engagement among primarily poor and working people. These efforts focused on communities that have been historically excluded from media production, including high school students, activists, teachers, nurses, taxi drivers, service workers, artists, and organizers. In 2020, MMP shifted away from media production as a primary practice and changed its name to Movement Alliance Project (MAP). Through fiscal sponsorship and other forms of support, MAP works to build a healthy and sustainable movement ecosystem where organizations can succeed in making transformational social change.",
    "In 2017, MMP began to catalog and prepare MMP's media content for preservation. This process eventually became the People's Media Record (PMR). PMR now houses thousands of video and audio materials from MMP's documentation efforts, from its emergence in 2005 to its last productions in 2020. We call this the MMP Collection.",
  ],
  scopeTitle: "Scope",
  scope: [
    'The MMP Collection consists of audio and video files created by the Media Mobilizing Project from 2005 to 2020. These materials include a wide variety of non-fiction video and audio content produced by organizers, activists, and "citizen journalists" in Philadelphia, PA (and occasionally other locations inside the contiguous United States). The collection represents thousands of hours of unique footage that documents growing struggles for racial and economic justice in Philadelphia.',
    "The collection consists of edited and unedited raw footage that depicts meetings and workshops, interviews with public figures, and activists. Numerous political actions are covered in the form of marches, rallies, and direct actions. There are also many files associated with the video and audio files, including files produced by video editing software, documents, transcriptions, spreadsheets, scripts, and even internal organizational documents. Written content from across MAP Legacy Projects, such as blog entries from the former MMP Website and the New Jersey Platform, are also part of the collection. Selected social media content from the Philly We Rise platform is also included; Philly We Rise was created and maintained by MMP (and then MAP) from 2017 through 2021.",
  ],
} as const;

export const archiveSections = [
  {
    href: "/archive/browse",
    label: "Browse the Archive",
    description:
      "Discover materials produced by the Media Mobilizing Project (MMP), an organization that used community-based media production to foster political unity and build community among primarily poor and working people in the greater Philadelphia region.",
    cta: "Browse",
  },
  {
    href: "/archive/mmp-collection",
    label: "About the MMP Collection",
    description:
      "Learn more about the history of MMP and the scope of the MMP Collection.",
    cta: "Learn more",
  },
  {
    href: "/archive/collections-management-policy",
    label: "Collections Management Policy",
    description:
      "A system of guidelines for directing the responsible stewardship of the People's Media Record's Archive, based on the mission, vision, and principles of People's Media Record.",
    cta: "Learn more",
  },
  {
    href: "/archive/mmp-community-policy",
    label: "Media Mobilizing Project Collection Community Policy",
    description:
      "This document, created in agreement with former MMP members, determines People's Media Record's relationship with the Media Mobilizing Project Collection.",
    cta: "Learn more",
  },
] as const;
