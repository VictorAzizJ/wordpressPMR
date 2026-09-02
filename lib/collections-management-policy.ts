export const collectionsManagementPolicyMeta = {
  title: "Collections Management Policy",
  description:
    "A system of guidelines for directing the responsible stewardship of the People's Media Record's Archive, based on the mission, vision, and principles of People's Media Record.",
  drafted: "November 2025",
  revisionCycle: "every three years",
} as const;

export const collectionsManagementPolicySections = [
  { id: "introduction", number: 1, title: "Introduction" },
  {
    id: "statement-of-responsibility",
    number: 2,
    title: "Statement of Responsibility",
  },
  { id: "principles-and-ethics", number: 3, title: "Principles and Ethics" },
  { id: "scope-and-purpose", number: 4, title: "Scope and Purpose" },
  { id: "acquisitions", number: 5, title: "Acquisitions" },
  {
    id: "postcustodial-stewardship",
    number: 6,
    title: "Postcustodial Stewardship",
  },
  { id: "removal", number: 7, title: "Removal" },
  { id: "collections-care", number: 8, title: "Collections Care" },
  { id: "access-and-privacy", number: 9, title: "Access and Privacy" },
] as const;
