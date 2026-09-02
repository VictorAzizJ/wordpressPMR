import { heroPhotos, type HeroPhoto } from "@/lib/hero-photos";

export type PacmeFellow = {
  id: string;
  name: string;
  pronouns?: string;
  affiliation?: string;
  initials: string;
  imageSrc?: string;
  bio?: string[];
};

export const pacmeTitle =
  "Preserving and Archiving Community Media (PACME) Fellowship";

export const pacmeIntro =
  "The Preserving and Archiving Community Media (PACME) fellowship has run between 2024 and 2026 as a nine-month annual fellowship that supports Philadelphia-based media creators and stewards in preserving and archiving the media collections of the groups, organizations, neighborhoods, and communities to which they belong, in addition to their personal media collections. This program delivers in-depth workshops in community-based archiving and preservation that help practitioners, their communities, and audiences tap into the lessons of the past as part of the essential work of imagining liberatory futures for all residents of the greater Philadelphia region and the Delaware Valley.";

export const pacmeStewardship =
  "9 months of stewardship, workshops, and activations: PACME fellows engage in workshops on audiovisual preservation, metadata and cataloguing, digital preservation, community media as a tool for social empowerment, digitization, resource mobilization, strategic planning, and more. Alongside these sessions, fellows also plan activations of the collections they are working with, making space for their communities to interact with and give feedback on what is already being built. This effort supports the long-term stewardship of these collections and also helps build the necessary community around them. Across the board, PACME aims to empower people who have been historically marginalized from access to preservation and archiving education and services by delivering tools, skills, and knowledge in ways that uplift their goals and are responsive to their experience.";

/** Placeholder stills until PACME-specific photos are supplied. */
export const pacmePhotos: HeroPhoto[] = heroPhotos;

export const currentPacmeFellows: PacmeFellow[] = [
  {
    id: "khalil-abdellah",
    name: "Khalil Abdellah",
    initials: "KA",
    imageSrc: "/images/programs/pacme/khalil-abdellah.jpg",
  },
  {
    id: "marcellus-armstrong",
    name: "Marcellus Armstrong",
    initials: "MA",
    imageSrc: "/images/programs/pacme/marcellus-armstrong.jpg",
  },
  {
    id: "melissa-beatriz",
    name: "Melissa Beatriz",
    initials: "MB",
    imageSrc: "/images/programs/pacme/melissa-beatriz.jpg",
  },
  {
    id: "dominique-chua",
    name: "Dominique Chua",
    initials: "DC",
    imageSrc: "/images/programs/pacme/dominique-chua.jpg",
  },
  { id: "keyssh-datts", name: "Keyssh Datts", initials: "KD", imageSrc: "/images/programs/pacme/keyssh-datts.jpg" },
  {
    id: "noah-harmony-harley",
    name: "Noah-Harmony Harley",
    initials: "NH",
    imageSrc: "/images/programs/pacme/noah-harmony-harley.jpg",
  },
  {
    id: "indah",
    name: "Indah",
    initials: "IN",
    imageSrc: "/images/programs/pacme/indah.jpg",
  },
  {
    id: "regina-jennings",
    name: "Regina Jennings",
    initials: "RJ",
    imageSrc: "/images/programs/pacme/regina-jennings.jpg",
  },
  { id: "cory-seals", name: "Cory Seals", initials: "CS" },
  {
    id: "tieshka-smith",
    name: "Tieshka Smith",
    initials: "TS",
    imageSrc: "/images/programs/pacme/tieshka-smith.jpg",
  },
];

export const pacmeFellows2025: PacmeFellow[] = [
  {
    id: "alyssa-bigbee",
    name: "Alyssa Bigbee",
    pronouns: "she/her",
    affiliation: "Black Rebel Nomads & Rebel Arts",
    initials: "AB",
    bio: [
      "Alyssa Bigbee is a multidisciplinary performer and creator who integrates multimedia, anthropology, dance, and circus arts into her innovative performances. She is dedicated to artistic growth and community engagement, seeking collaborative opportunities with other artists. Her work challenges perceptions and creates immersive experiences.",
      "Alyssa is committed to documenting the contributions of Black Philly artists and international collaborations, aiming to establish a historical archive. Currently, she has a collection of digital prints, videos, scrapbooks, and artifacts from various collaborations, including coverage of events like Black Circus Week. Her goal is to create a database that emphasizes the significance of community among Philly artists and the power of cultural exchange.",
    ],
  },
  {
    id: "arielle-julia-brown",
    name: "Arielle Julia Brown",
    pronouns: "she/her",
    affiliation: "Black Spatial Relics",
    initials: "AJ",
    bio: [
      "Arielle Julia Brown is an artist, curator, and creative wayfinder who directs and supports cultural spaces as sites for radical imagination, vision building, and social transformation in her communities. Arielle’s practices traverse cultural strategy, research, evaluation, performance curation, dramaturgy, facilitation, and performance-making. Working most frequently in performance, philanthropic, memory work, and cultural organizing spaces, Arielle’s offerings help create the conditions for the truthtelling necessary for the building of the Beloved Community. Arielle is the founder and director of Black Spatial Relics and a convener and presenter of Black Radical performances.",
      "Reviewing and engaging the last eight years of supported performances, convenings, and programs of Black Spatial Relics, Arielle will sit with digitally kept materials to begin the process of crafting an accessible archive of these works. Featuring the works from some of the 24 artists in residence, 26 micrograntees, and numerous presented artists, this process of archiving will bring forward and make more accessible a body of Black radical performance works that remain potent and essential in these times.",
    ],
  },
  {
    id: "brujo-de-la-mancha",
    name: "Brujo de la Mancha",
    pronouns: "all pronouns welcome",
    affiliation: "Ollin Yolliztli Calmecac",
    initials: "BM",
    bio: [
      "Brujo de la Mancha is a multidisciplinary artist focused on showcasing indigenous art and artists. Growing up in Mexico City, he was influenced by the cultural legacies of the Mayan, Olmec, and Aztec civilizations. His Tlaxcalan grandmother, who spoke Nahuatl, Tojolabal, and Spanish, played a key role in his development. In 2003, he co-founded the non-profit Ollin Yoliztli Calmecac, an Aztec dance troupe aimed at promoting Mexicayotl culture. He has received various grants, including one from The Institute for Cultural Partnership to learn Tlapizcalli clay flute-making, and another for traditional Aztec dance apprenticeship. In 2021, he earned the Creative Entrepreneur Accelerator Grant and has received two grants for his documentaries highlighting the impact of COVID-19 on Mexicans in South Philly and the history of Aztec dance in Philadelphia.",
      "He currently possesses 8mm and MiniDV tapes, flyers, news articles, and other digital materials, with hopeful plans to create a website archive of Aztec dance history in Philadelphia.",
    ],
  },
  {
    id: "john-morrison",
    name: "John Morrison",
    pronouns: "he/him",
    initials: "JM",
    bio: [
      "John Morrison is a DJ, radio host, and music journalist from Philadelphia. For the past 25 years, he has worked as a writer covering Philadelphia’s music scene. His work has appeared in The New York Times, NPR Music, Spin Magazine, Red Bull Music Academy, Bandcamp Daily, and more. An in-demand on-air personality, Morrison regularly appears on NPR’s All Songs Considered and The World Cafe as well as NPR’s Tiny Desk Top Shelf series. Morrison is also the author of Boyz II Men: 40th Anniversary Celebration, a comprehensive book on Philly R&B legends, Boyz II Men.",
      "Their interview archive is a large repository of recorded conversations with some of the leading lights of Philadelphia hip-hop culture and beyond. This archive includes select interviews from his personal archives, and his hope is to preserve them for prosperity and future access for journalists, scholars, and academics.",
    ],
  },
  {
    id: "tomarra-sankara-kilombo",
    name: "Tomarra Sankara-Kilombo",
    pronouns: "she/her",
    affiliation: "Black Soul Vintage",
    initials: "TS",
    bio: [
      "Tomarra Sankara-Kilombo is an archivist, collector, and collage artist. Through her curatorial practice and business, “Black Soul,” she engages her art in dialogue with archival materials, ephemera, and historical artifacts related to African-descendant culture. Sankara-Kilombo’s work serves as a conduit through which she navigates the conception of black futures rooted in the enduring legacy of her ancestors.",
      "Her collection includes books, magazines, pamphlets, and other media such as movie posters, VHS, cassettes, and vinyl records chronicling Black/African-descendent life and culture with emphasis on protest culture in the 1960s and 70s. Through this fellowship, Tomarra hopes to specifically engage her collection of Black Magazines, thinking of creative ways to digitize the media as well as utilizing materials as resources for art making. Her community-centered event will involve creating and facilitating a collage workshop.",
    ],
  },
  {
    id: "anula-shetty",
    name: "Anula Shetty",
    pronouns: "she/her",
    affiliation: "Termite TV Collective",
    initials: "AS",
    bio: [
      "Anula Shetty is an award-winning filmmaker and new media artist, recognized for her work as a Leeway Foundation Media Artist and Activist Fellow. She has held residencies with SEPTA transit and participated in initiatives like Public Works and Mural Arts. Anula is a Pew Fellowship recipient and holds an MFA in Film & Media Arts from Temple University. She serves on the Alliance for Media Arts and Culture board and is involved with A-Doc, Brown Girls Doc Mafia, and the Bitchitra Collective, and she co-directs Termite TV.",
      "Her collection features migration and immigration stories filmed with the Termite TV Collective over the past 20 years, focusing on Asian American and Latinx communities in Philadelphia. Given the rising dehumanization of immigrant communities, she aims to create a living immigrant archive to preserve these vital histories. Anula is particularly interested in using VR, AR, and 3D modeling to envision future spaces for cultural preservation.",
    ],
  },
  {
    id: "kristal-sotomayor",
    name: "Kristal Sotomayor",
    pronouns: "they/she",
    affiliation: "New Hope Celebrates (NHC)",
    initials: "KS",
    bio: [
      "Kristal Sotomayor is an award-winning director, producer, journalist, and curator based in Philadelphia and Pittsburgh. Recognized as one of the “10 Latinx Filmmakers You Should Know About” by HipLatina, they are a 2023 DOC NYC Documentary New Leader Honoree and a Rockwood Documentary Leadership Fellow. Their short documentary “Expanding Sanctuary” won the Philadelphia Filmmaker Award at the 2024 BlackStar Film Festival, while their experimental documentary “Don’t Cry For Me All You Drag Queens” has screened internationally. Currently, they are in post-production on their debut narrative short film “Las Cosas Que Brillan,” which follows a Trans Latina mermaid. Kristal is developing several projects through Sotomayor Productions.",
    ],
  },
];

export const pacmeFellows2024: PacmeFellow[] = [
  {
    id: "rasheed-z-ajamu",
    name: "Rasheed Z. Ajamu",
    initials: "RA",
    bio: [
      "I’m a community-centered journalist seeking to learn how to better serve my community’s preservation by blending my journalism with archival practices.",
    ],
  },
  {
    id: "grace-fan",
    name: "Grace Fan",
    pronouns: "she/her",
    initials: "GF",
    bio: [
      "Grace is a volunteer with Asian Americans United (AAU) and will be working with the AAU archives to help support the No Arena in Chinatown campaign. She is looking forward to finding wisdom, treasures, and through-lines in the AAU archives that will help support the current campaign as the community tries to fight off predatory development that threatens the existence of a crucial Asian American cultural/historical neighborhood in Philadelphia.",
    ],
  },
  {
    id: "tina-morton",
    name: "Tina Morton",
    initials: "TM",
    bio: [
      "Tina Morton is a media activist, video oral historian, Scribe Video Facilitator and Associate Professor at Howard University, deeply committed to facilitating members of community groups in telling their own stories in their own voice. She has taught preteens to seniors, from Senegal to South Philly, how to use media for social activism. Through this fellowship Tina will archive her 20 years of video footage of the Philadelphia’s ODUNDE Festival.",
    ],
  },
  {
    id: "krystal-strong",
    name: "Krystal Strong",
    initials: "KS",
    bio: [
      "I am a Philly scholar-organizer whose research and political work focuses on youth and community activism, educational justice, and Black social movements in Africa and the U.S. I serve as archive director of The MOVE Activist Archive, a community archiving project to preserve the revolutionary history of The MOVE Organization. I am excited to connect with, learn from, and collaborate with other community members and institutions that are working to preserve our local histories and memories!",
    ],
  },
  {
    id: "chanina-wong",
    name: "Chanina Wong",
    pronouns: "she/her",
    initials: "CW",
    bio: [
      "Chanina is a community archive coordinator and organizer for VietLead: a grassroots organization that has collected community stories and archival research from Philadelphia and South Jersey’s Southeast Asian community since 2016. She’s eager to refine how to best care for these stories of refugee resistance and resilience, including resource-sharing and collaborating with other preservationists and storytellers in solidarity, assiduity, and collective liberation.",
    ],
  },
];
