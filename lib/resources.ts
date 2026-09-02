export const resourcesHub = {
  title: "Archiving and Preservation Resources",
  intro:
    "Whether you are an activist, an archivist, a filmmaker, a librarian, a researcher, or simply an avid lover of grassroots media, this resource page aims to provide you with a wealth of knowledge and tools to support your archiving and preservation endeavors.",
};

export const resourcePoolEmbedUrl =
  "https://airtable.com/embed/shrXu6JCaOB8EEPEG?backgroundColor=green&viewControls=on";

export const resourcePoolIntro = [
  "This database provides users access to a wide array of resources related to the archiving and preservation of grassroots media.",
  "These resources are organized according to resource type, including tools, guides, resource banks, articles, archives, organizations, grant and funding opportunities, and service providers.",
  "To better identify these resources, each record includes its particular descriptions and keywords.",
] as const;

export const resourceSections = [
  {
    href: "/resources/pool",
    label: "Resource Pool",
    description: `${resourcePoolIntro[0]} ${resourcePoolIntro[1]}`,
  },
  {
    href: "/resources/pace",
    label: "Philadelphia Audiovisual Collections Evaluation (PACE)",
    description:
      "Learn about the year-long evaluation of local community media collections that People's Media Record undertook in collaboration with Scribe Video Center and Philadelphia Community Access Media.",
  },
  {
    href: "/resources/glossary",
    label: "Glossary",
    description:
      "We provide here a list of key concepts that are relevant to our work and the practice of archiving and preserving grassroots media.",
  },
] as const;
