export const mmpCommunityPolicyMeta = {
  title: "Media Mobilizing Project Collection Community Policy",
  description:
    "This document, created in agreement with former MMP members, determines People's Media Record's relationship with the Media Mobilizing Project Collection.",
  note: "This document will be revised as needed in accordance with the interests and wishes of representatives of the MMP community.",
} as const;

export const mmpCommunityPolicySections = [
  { id: "introduction", number: 1, title: "Introduction" },
  { id: "context", number: 2, title: "Context" },
  { id: "intent", number: 3, title: "Intent" },
  { id: "privacy", number: 4, title: "Privacy" },
  { id: "open-access", number: 5, title: "Open Access" },
  { id: "restricted-access", number: 6, title: "Restricted Access" },
  { id: "private-access", number: 7, title: "Private Access" },
  { id: "community-access", number: 8, title: "Community Access" },
  {
    id: "copyright",
    number: 9,
    title: "Copyright, Fair Use, and Licensing",
  },
  { id: "references", number: 10, title: "References" },
] as const;
