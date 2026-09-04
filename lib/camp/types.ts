/** Payload shape for Camp registration (posted to Sheets via /api/camp/register). */
export interface CampChild {
  name?: string;
  age?: string;
}

export const CAMP_DAYS = [
  {
    value: "saturday",
    shortLabel: "Saturday, October 3rd",
    label:
      "Saturday, October 3rd: workshops, skillshares, roundtables, screenings of archival short films, a very special keynote, and more!",
  },
  {
    value: "sunday",
    shortLabel: "Sunday, October 4th",
    label:
      "Sunday, October 4th: workshops, the People’s Bazaar, and a very special feature length screening and conversation hosted by our partners at cinéSPEAK, and more!",
  },
] as const;

export type CampAttendingDay = (typeof CAMP_DAYS)[number]["value"];

export interface CampRegistrationPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  attendingDays: CampAttendingDay[];
  ageRange?: string;
  neighborhood?: string;
  city?: string;
  organization?: string;
  accessibilityNeeds?: string;
  dietaryNeeds?: string;
  children?: CampChild[];
  childAllergies?: string;
  emergencyContactPhone?: string;
  hearAbout?: string;
  notes?: string;
}

export const CAMP_AGE_RANGES = [
  { value: "13-17", label: "13–17" },
  { value: "18-24", label: "18–24" },
  { value: "25-34", label: "25–34" },
  { value: "35-plus", label: "35+" },
  { value: "prefer-not", label: "Prefer not to say" },
] as const;

export const CAMP_MAX_CHILDREN = 3;

export function isUnderEighteen(ageRange: string | undefined): boolean {
  return ageRange === "13-17";
}
