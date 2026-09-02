export interface CampFaqItem {
  id: string;
  question: string;
  answer: string;
}

export const campFaqItems: CampFaqItem[] = [
  {
    id: "who",
    question: "Who can join People’s Media Camp?",
    answer:
      "Young people, neighbors, organizers, and community members who want to learn oral history, digitization, and archival care. No prior media experience required — curiosity and care matter more than gear.",
  },
  {
    id: "cost",
    question: "Is Camp free?",
    answer:
      "Yes. People’s Media Camp is free for participants. Materials and equipment are provided during sessions. Meals and refreshments are included both days.",
  },
  {
    id: "minors",
    question: "What if a camper is under 18?",
    answer:
      "Participants 13–17 are welcome. Childcare is available for younger children through the Philly Childcare Collective — list names, ages, and an emergency contact on the registration form.",
  },
  {
    id: "childcare",
    question: "Is childcare available?",
    answer:
      "Yes. People’s Media Camp partners with the Philly Childcare Collective. Childcare is offered on Saturday, October 3 and Sunday, October 4. Add names, ages, and any allergies on the registration form.",
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
      "Camp takes place in an ADA accessible facility. Tell us about other accessibility needs and dietary preferences on the registration form so we can plan sessions, meals, and care.",
  },
  {
    id: "after",
    question: "What happens after I register?",
    answer:
      "You will receive a confirmation email with session times, the venue address, and what to expect. Spots may be limited — register early.",
  },
];
