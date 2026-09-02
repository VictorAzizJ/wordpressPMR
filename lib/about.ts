export type StaffMember = {
  id: string;
  name: string;
  pronouns: string;
  title: string;
  initials: string;
  imageSrc?: string;
  bio: string[];
};

export type AdvisoryBoardMember = {
  id: string;
  name: string;
};

export const missionParagraphs = [
  "People's Media Record's mission is to build power and capacity for Philadelphians to save and share their stories on their own terms.",
  "Our organization is committed to being an archival and educational hub that practices cooperation, raises critical awareness, and builds collective agency through local workshops, fellowships, and programs centered on the creation, documentation, preservation, archiving, and analysis of community media.",
];

export const visionParagraph =
  "We envision a sustainable support system for the long-term stewardship of community media in Philadelphia that honors radical lineages of community media organizing, reckons with the past, and uplifts the lived experiences of historically oppressed Philadelphians in service of building strong communities and a livable future together.";

export const values = [
  {
    id: "cooperation",
    title: "Cooperation",
    paragraphs: [
      "Our work is inspired by traditions of cooperative thought and practice rooted in shared responsibility, reciprocity, and solidarity within community organizing.",
      "We aim to facilitate the redistribution of resources, time, and capacity away from normative institutions like state and university archives and between people stewarding community media collections individually and collectively in the greater Philadelphia area.",
    ],
  },
  {
    id: "critical-consciousness",
    title: "Critical Consciousness",
    paragraphs: [
      "Our work seeks to cultivate critical consciousness through processes of collective learning and critique at the intersection of archival and political education.",
      "These processes of critical consciousness take place across our workplace and the offerings we create for and with others. In fostering attention to critical themes like context, positionality, ownership, and value in our practice, we aim to recognize and address patterns of extraction, capture, and dominance in the context of community media stewardship in Philly.",
    ],
  },
  {
    id: "collective-power",
    title: "Collective Power",
    paragraphs: [
      "Historically oppressed communities should have access to self-determination of how their stories are created, told, collected, archived, and preserved, and they should be the primary beneficiaries of this work.",
      "We believe that historically oppressed communities should have access to self-determination when it comes to how their stories are created, told, collected, archived, and preserved. We are committed to developing skills, resources and relationships to support everyone’s ability to preserve their stories as they choose, and that do not reproduce power asymmetries, such as the accumulation of value or the control of access to archived materials.",
    ],
  },
] as const;

export const theoryOfChange =
  "We believe that memory work is pivotal to the work of transformative change in service of justice and liberation. We believe that cultivating as many ways as possible to recognize and reckon with the past and how it shapes our present is vital to the work of freeing ourselves—and all historically marginalized and oppressed people—from systems of incarceration, policing, exploitation, dispossession, and displacement that deny a livable future on a global scale. We believe that memory work is pivotal to building the kinds of people power that can hold us through the processes of transformative change that we need in order to get free.";

export const pmrStaff: StaffMember[] = [
  {
    id: "lila-chaar-perez",
    name: "Lila Chaar-Pérez",
    pronouns: "she/they",
    title: "Director of Archiving and Preservation",
    initials: "LC",
    imageSrc: "/images/about/lila-chaar-perez.jpg",
    bio: [
      "Lila began with People’s Media Record as a LEADING fellow in the summer of 2021, when she focused on the refinement of descriptive metadata for the archive’s materials. As Director of Archiving and Preservation, she is in charge of managing and taking care of PMR’s repository and assisting with PMR's educational and outreach efforts. As a native of Puerto Rico who has taught and researched Caribbean cultures for many years, Lila is interested in liberatory approaches to archival, cultural, and movement work and in how oppressed communities can harness the power of data to their own ends. They hold a PhD in Latin American Literatures and Cultures from New York University and a Masters in Library Science and Information from the University of Pittsburgh. She loves hiking, the beach, and dancing in cemeteries.",
    ],
  },
  {
    id: "pep-marie",
    name: "pep marie",
    pronouns: "they/them",
    title: "PACME Fellowship Co-Facilitator",
    initials: "pm",
    imageSrc: "/images/about/pep-marie.jpg",
    bio: [
      "Born and raised in Philly, pep marie is a proud Black Queer community organizer invested in people centered structures. Since 2006, they have uplifted youth, caregiver, school staff & community expertise with attention to facing power dynamics between them directly. Through this work pep gained skills in both facilitation and conflict mediation, tools they've shared with organizations and individuals committed to Educational Justice, Media Rights, Housing Equity, Decarceration, Gender Liberation, Environmental Justice, Youth Leadership and more. From that perspective pep marie approaches every collaboration with an intersectional lens and commitment to learning.",
    ],
  },
  {
    id: "zara-raven",
    name: "zara raven",
    pronouns: "z/zara",
    title: "PACME Fellowship Co-facilitator",
    initials: "zr",
    imageSrc: "/images/about/zara-raven.jpg",
    bio: [
      "zara raven (z/zara) is a mad queer Caribbean care worker, community organizer, and facilitator working for the past 15 years to create safety without prisons, policing, or punishment. zara currently organizes with the Philly Childcare Collective and works as a fundraiser for the Abortion Liberation Fund of PA. previously, zara was the director of DC-based grassroots organization Collective Action for Safe Spaces (CASS). in z's free time, zara likes reading Black feminist theory, making zines, and roller skating.",
    ],
  },
  {
    id: "winter-schneider",
    name: "Winter Schneider",
    pronouns: "they/any",
    title: "Director of Resource Mobilization",
    initials: "WS",
    imageSrc: "/images/about/winter-schneider.jpg",
    bio: [
      "Winter is an abolitionist educator, organizer, and artist committed to historical reckoning in service of collective liberation. Having first joined PMR as Director in 2023, Winter led the development of PMR’s programmatic offerings and internal leadership structures. Now as Director of Resource Mobilization, their focus is on building the connections, practices, and structures that can redefine and generate real value in the field of grassroots archiving and preservation. Winter holds an MA and PhD in history from UCLA where their research focused on land, debt, and archival representation in post-revolutionary Haiti, and they continue to work on research projects that expose the roots of colonial infrastructure in Haiti, Philadelphia, and the Midwestern United States. In Philly, they have organized with the PILOTs campaign, Our City Our Schools, Drexel Community for Justice, and the Philly Revenue Project. Winter is an emerging multi-media artist and storyteller, and is a current Audio Documentary Fellow at PhillyCAM. In their free time you can find them immersed in creative projects, parenting a thirteen-year-old, or spending time in the woods.",
    ],
  },
];

export const communityAdvisoryBoard: AdvisoryBoardMember[] = [
  { id: "cab-rasheed-z-ajamu", name: "Rasheed Z. Ajamu" },
  { id: "cab-nora-kerrich", name: "Nora Kerrich" },
  { id: "cab-pep-marie", name: "pep marie" },
  { id: "cab-tina-morton", name: "Tina Morton" },
  { id: "cab-dan-papa", name: "Dan Papa" },
  { id: "cab-clemencia-rodriguez", name: "Clemencia Rodriguez" },
  { id: "cab-ryan-saunders", name: "Ryan Saunders" },
];
