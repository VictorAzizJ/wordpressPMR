/** Payload shape for Camp registration (Phase 6 posts this to Sheets). */
export interface CampRegistrationPayload {
  name: string;
  email: string;
  phone?: string;
  ageRange?: string;
  neighborhood?: string;
  accessibilityNeeds?: string;
  dietaryNeeds?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  hearAbout?: string;
  notes?: string;
  guardian?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

export const CAMP_AGE_RANGES = [
  { value: "under-13", label: "Under 13" },
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

export function isUnderEighteen(ageRange: string | undefined): boolean {
  return ageRange === "under-13" || ageRange === "13-17";
}
