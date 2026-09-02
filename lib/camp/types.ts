/** Payload shape for Camp registration (posted to Sheets via /api/camp/register). */
export interface CampChild {
  name?: string;
  age?: string;
}

export interface CampRegistrationPayload {
  name: string;
  email: string;
  phone: string;
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

export const CAMP_HEAR_ABOUT = [
  { value: "friend", label: "Friend or family" },
  { value: "school", label: "School / youth program" },
  { value: "social", label: "Social media" },
  { value: "pmr-event", label: "PMR event or workshop" },
  { value: "org", label: "Community organization" },
  { value: "other", label: "Other" },
] as const;

export const CAMP_MAX_CHILDREN = 3;

export function isUnderEighteen(ageRange: string | undefined): boolean {
  return ageRange === "13-17";
}
