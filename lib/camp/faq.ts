import {
  CAMP_AUDIENCE_INTRO,
  CAMP_AUDIENCE_LIST,
} from "@/lib/camp/content";

export interface CampFaqItem {
  id: string;
  question: string;
  /** Plain-text answer when there are no bullets. */
  answer?: string;
  /** Optional intro before a bullet list. */
  intro?: string;
  bullets?: readonly string[];
}

export const campFaqItems: CampFaqItem[] = [
  {
    id: "who",
    question: "Who can join People’s Media Camp?",
    intro: CAMP_AUDIENCE_INTRO,
    bullets: CAMP_AUDIENCE_LIST,
  },
  {
    id: "cost",
    question: "Is Camp free?",
    answer:
      "Yes. People’s Media Camp is free for participants. Materials and equipment are provided during sessions. Meals and refreshments are included both days.",
  },
  {
    id: "minors",
    question: "What if a Camp participant is under 18?",
    answer:
      "We welcome people ages 13–17 to participate in all sessions of Camp according to their interests. Childcare is available for younger children — list names, ages, and emergency contact on the registration form.",
  },
  {
    id: "childcare",
    question: "Is Childcare available?",
    answer:
      "Yes. Childcare is offered on Saturday, October 3 and Sunday, October 4. Add names, ages, and any allergies on the registration form.",
  },
  {
    id: "gear",
    question: "Do I need to bring equipment?",
    answer:
      "No. PMR provides all necessary materials for workshops. You are welcome to bring your own notebooks, headphones, media you are stewarding (please label all personal items clearly with your name), or media to share.",
  },
  {
    id: "access",
    question: "How do accessibility and dietary needs work?",
    answer:
      "Camp takes place in an ADA accessible facility. Tell us about other accessibility needs and dietary preferences on the registration form so we can plan sessions, meals, and care.",
  },
  {
    id: "after",
    question: "What happens after I register?",
    answer:
      "After you register we’ll include you in all communications announcing session times and the schedule line-up.",
  },
];
