export const resourcesHub = {
  title: "Archiving and Preservation Resources",
  intro:
    "Whether you are an activist, an archivist, a filmmaker, a librarian, a researcher, or simply an avid lover of grassroots media, this resource page aims to provide you with a wealth of knowledge and tools to support your archiving and preservation endeavors.",
  photo: {
    src: "/images/resources/resources-hero.jpg",
    alt: "Labeled MiniDV cassettes bundled in a storage bin",
  },
};

export const paceCopy = [
  "Community media—which we define as the documentation and gathering, outside an institutional archive, of media produced in service of the community who creates it—plays a vital role in documenting and preserving local histories and in empowering people. However, many of the audiovisual materials created by community media organizations and makers are at risk of deterioration and loss, due to factors like technological obsolescence. This urgent problem is compounded by the limited capacity and resources that we have to support our collections.",
  "In collaboration with Scribe Video Center and Philadelphia Cable Access Media and with support from the Mellon Foundation, the People's Media Record conducted the Philadelphia Audiovisual Collections Evaluation (PACE), a study in 2022 to raise awareness about these challenges. We surveyed 20 local organizations and media makers about their community media collections; conducted 6 in-depth interviews with selected participants from the survey; and organized a series of focus groups where we discussed the findings from the survey and interviews.",
  "We have created a report that summarizes and analyzes the most relevant takeaways from this study, outlining potential opportunities around which community media organizations and makers can strategize and collaborate together and build collective infrastructures. In the report you will also find a full copy of the survey, sample interview questions, and data tables based on survey responses. We hope the report helps jump-start conversations around how to collectively cultivate sustainable preservation ecosystems in Philadelphia and beyond.",
] as const;

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
