export const programsHub = {
  title: "Programs",
  intro:
    "Across our programming we prioritize sharing knowledge, building connection, and thinking collectively to address challenges in grassroots archiving and preservation and create capacity for the stewardship of community memory over time.",
  /** Drop a hero at /images/programs/programs-hero.jpg and set src when available. */
  photo: {
    src: "" as string,
    alt: "",
  },
};

export const programSections = [
  {
    href: "/programs/pacme",
    label: "Preserving and Archiving Community Media (PACME) Fellowship",
    description:
      "Fellowships are one way we work intensively with practitioners to build the skills and knowledge for grassroots media stewardship. Check out information about our past, current and upcoming fellowship opportunities.",
  },
  {
    href: "/camp",
    label: "People's Media Camp",
    description:
      "This annual convening invites the region's grassroots preservationists, archivists, community historians, and memory workers to come together, connect, learn from one another, name the challenges we face, affirm each other's efforts, and develop collective strategies for sustaining our work.",
  },
  {
    href: "/programs/movement-memory-jams",
    label: "Movement Memory Jams",
    description:
      "These monthly community events are an invitation to share, discuss, and connect with other people interested in and practicing memory work, preservation and archiving of grassroots and community media and stories.",
  },
] as const;

export const movementMemoryJams = {
  title: "Movement Memory Jams",
  intro:
    "In 2026 PMR is hosting monthly \u201cMovement Memory Jams!\u201d These community events are an invitation to share, discuss, and connect with other people interested in and practicing memory work, preservation and archiving of grassroots and community media and stories. The aim is to learn about and support the stewardship of stories that are not only important for building past movements and community, but also illuminate our connections to our lineages, and offer us lessons for building movement, power, and action in the present time.",
  /** Swap in a 2026 jam still when the client shares one. */
  photo: {
    src: "" as string,
    alt: "People gathered at a 2026 Movement Memory Jam",
    caption: "A 2026 Movement Memory Jam",
  },
};
