export interface CampFaqItem {
  id: string;
  question: string;
  answer: string;
}

export const campFaqItems: CampFaqItem[] = [
  {
    id: "who",
    question: "Who can join Media Camp?",
    answer:
      "Young people, neighbors, and community members who want to learn oral history, digitization, and archival care. No prior media experience required — curiosity and care matter more than gear.",
  },
  {
    id: "cost",
    question: "Is Camp free?",
    answer:
      "Yes. Media Camp is free for participants. Materials and equipment are provided during sessions. Placeholder — confirm scholarship / stipend details with PMR staff before publishing.",
  },
  {
    id: "minors",
    question: "What if a camper is under 18?",
    answer:
      "Minors are welcome. When you select an under-18 age range on the form, we ask for optional parent/guardian contact info so staff can coordinate consent and pickup details.",
  },
  {
    id: "gear",
    question: "Do I need to bring equipment?",
    answer:
      "No. PMR provides mics, decks, and workstations. You are welcome to bring your own notebooks, headphones, or media you are stewarding — label everything with your name.",
  },
  {
    id: "access",
    question: "How do accessibility and dietary needs work?",
    answer:
      "Tell us on the registration form. We use that information to plan venues, schedules, and meals. Reach out to hello@peoplesmediarecord.demo if you need to discuss accommodations before registering.",
  },
  {
    id: "after",
    question: "What happens after I register?",
    answer:
      "You will receive a confirmation email (in production) with session dates, location details, and what to expect on day one. Spots may be limited — register early when the campaign window opens.",
  },
];
