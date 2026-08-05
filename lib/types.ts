export type AccessLevel = "public" | "request_access" | "restricted" | "private";
export type MediaType = "video" | "audio" | "image" | "document";
export type PublishStatus = "published" | "draft";

export interface ArchiveRecord {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  clipLength?: string;
  mediaType: MediaType;
  mediaUrl?: string;
  thumbnail: string;
  transcript?: string;
  collectionIds: string[];
  organization?: string;
  location?: string;
  people?: string[];
  topics: string[];
  language?: string;
  rightsStatus?: string;
  accessLevel: AccessLevel;
  relatedRecordIds?: string[];
  sourceSystemId?: string;
  featured?: boolean;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  recordIds: string[];
  steward?: string;
  dateRange?: string;
  accessNotes?: string;
  featured?: boolean;
}

export interface StorySection {
  type: "paragraph" | "pullquote" | "embedded_record" | "gallery";
  content: string;
  recordId?: string;
  images?: string[];
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  heroImage: string;
  intro: string;
  sections: StorySection[];
  relatedRecordIds: string[];
  credits?: string;
  status: PublishStatus;
  featured?: boolean;
}

export interface Resource {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  link?: string;
  audience?: string;
  tags: string[];
  featured?: boolean;
}

export interface GlossaryTerm {
  id: string;
  slug: string;
  term: string;
  definition: string;
  relatedResourceIds?: string[];
  relatedRecordIds?: string[];
  relatedStoryIds?: string[];
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  dateTime: string;
  location: string;
  description: string;
  registrationLink?: string;
  relatedResourceIds?: string[];
  isUpcoming: boolean;
}

export interface AccessRequest {
  requesterName: string;
  email: string;
  affiliation?: string;
  recordOrCollection: string;
  intendedUse: string;
  agreement: boolean;
}

export interface PartnershipInquiry {
  name: string;
  email: string;
  organization?: string;
  interestType: string;
  skillsOffered?: string;
  message: string;
}

export type InterestType =
  | "donate"
  | "volunteer"
  | "share_skills"
  | "steward_collection"
  | "partner"
  | "offer_resources";

export interface ArchiveFilters {
  query?: string;
  topics?: string[];
  years?: string[];
  mediaTypes?: MediaType[];
  collectionIds?: string[];
  accessLevels?: AccessLevel[];
}
