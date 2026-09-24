/** Shared Camp copy used by info cards and FAQ. */

export interface CampScheduleItem {
  title: string;
  presenters?: string;
}

export interface CampScheduleBlock {
  time: string;
  title: string;
  detail?: string;
  /** First number in the session list. Defaults to 1. */
  startAt?: number;
  items?: readonly CampScheduleItem[];
}

export interface CampScheduleDay {
  id: string;
  heading: string;
  place: string;
  /** Untimed offerings listed before the timed program. */
  preamble?: readonly {
    label: string;
    items?: readonly CampScheduleItem[];
  }[];
  blocks: readonly CampScheduleBlock[];
}

export const CAMP_SCHEDULE: readonly CampScheduleDay[] = [
  {
    id: "saturday",
    heading: "Saturday, October 3, 2026",
    place: "FACTS (1023 Callowhill St)",
    preamble: [
      {
        label: "Available all day — Exhibits",
        items: [
          {
            title: "“Philadelphia Juneteenth Festival Memory Pop-Up”",
            presenters: "Tieshka Smith",
          },
          {
            title: "Collective Memory Mapping",
            presenters: "People’s Media Record",
          },
        ],
      },
      { label: "Rest & Reflect Space" },
    ],
    blocks: [
      {
        time: "9:00 am – 10:30 am",
        title: "Plenary Session",
        detail:
          "“Nosotros no queremos olvidarnos / We do not want to forget” — Keynote Speaker: Claudia Bernardi",
      },
      {
        time: "11:00 am – 12:30 pm",
        title: "Memory Work Sessions",
        items: [
          {
            title: "“No Arena in Chinatown: Archiving a Movement”",
            presenters:
              "Dominique Chua, Mia Kang, Debora Kodish, Dave Kyu, Peri Law, Ellen Somekawa, Ran Wang, Lily Xie, Riley Xu",
          },
          {
            title:
              "“Church of the Advocate: A Case Study at the Crossroads of Historic Preservation, Archives, and Community Memory”",
            presenters: "Tyler Ray, Alex Palma",
          },
        ],
      },
      { time: "12:30 pm – 1:30 pm", title: "Lunch" },
      {
        time: "1:30 pm – 3:00 pm",
        title: "Memory Work Sessions",
        startAt: 3,
        items: [
          {
            title: "“Public Access TV: PhillyCAM Collection”",
            presenters: "Maya Winneg, Debbie Rudman, Antoine Haywood",
          },
          {
            title: "“Learning Intifadas in the Americas and the Caribbean”",
            presenters: "Conor “Coco” Tomás Reed",
          },
        ],
      },
      { time: "3:00 pm – 3:30 pm", title: "Break" },
      {
        time: "3:30 pm – 5:00 pm",
        title: "Memory Work Sessions",
        items: [
          {
            title:
              "“Reclaiming the Record: Criminalized Survivors Documenting Our Stories”",
            presenters: "zara raven, Tracy McCarter",
          },
          {
            title: "“GQ: It’s a Philly Thing”",
            presenters: "Rachel Hungry Ray, Angelina Ponzio Labate",
          },
        ],
      },
      { time: "5:00 pm – 5:15 pm", title: "Break" },
      {
        time: "5:15 pm – 6:45 pm",
        title: "Movement Memory Shorts",
        items: [
          {
            title: "“Expanding Sanctuary”",
            presenters: "Kristal Sotomayor",
          },
          {
            title: "“Barrio Television”",
            presenters: "Christina diPasquale",
          },
          {
            title: "“Portraits of Philly Rumba”",
            presenters: "Melissa Beatriz",
          },
          {
            title:
              "“Gather(in) Memory: Archiving Hyperlocal History in Germantown”",
            presenters: "Hosaena Tilahun",
          },
        ],
      },
      { time: "6:45 pm – 7:15 pm", title: "Reflection Breakouts" },
      { time: "7:15 pm – 8:00 pm", title: "Reception" },
    ],
  },
  {
    id: "sunday",
    heading: "Sunday, October 4, 2026",
    place: "Washington Square",
    blocks: [
      {
        time: "9:00 am",
        title: "Registration and Welcome table opens",
      },
      {
        time: "10:00 am – 4:00 pm",
        title: "Exhibits",
        items: [
          {
            title: "“Migrant Memory Making Video Booth”",
            presenters: "Termite TV",
          },
          {
            title: "“Collective Memory Mapping”",
            presenters: "People’s Media Record",
          },
        ],
      },
      { time: "9:00 am – 3:00 pm", title: "Youth Space" },
      {
        time: "10:30 am – 12:00 pm",
        title: "Memory Work Sessions",
        items: [
          {
            title: "“A Personal Memory Will”",
            presenters: "Patricia Felder",
          },
          {
            title: "“Documenting Stories from the Kitchen and the Garden”",
            presenters: "Bitter Kalli, Thao Tran",
          },
        ],
      },
      {
        time: "12:00 pm – 1:00 pm",
        title:
          "Push Back! Push Forward!: Activating Memory in Washington Square",
        items: [
          { title: "“[Free] SOUND”", presenters: "Sweet Corey-Bey" },
          {
            title: "“ME • WE • US • Y’ALL: Activating Family Archives”",
            presenters: "Noah-Harmony Harley",
          },
          {
            title: "“Clean Air is a Human Right: A Sing-Along”",
            presenters: "Airsick Collective",
          },
        ],
      },
      {
        time: "1:30 pm – 3:00 pm",
        title: "Plenary Session",
        detail:
          "“Unearthing Roots; Unburying Voices” — Finding Ceremony: Alex Wilson, Jazmin Benton, Sacharja Cunningham",
      },
      { time: "3:00 pm – 4:00 pm", title: "Exhibit Engagement" },
      { time: "4:00 pm – 6:00 pm", title: "Break" },
      {
        time: "6:00 pm – 7:00 pm",
        title:
          "Presented by cinéSPEAK: Grounding Session and Community Conversation",
      },
      {
        time: "7:00 pm – 8:00 pm",
        title:
          "Presented by cinéSPEAK: Film Screening: The Bombing of Osage Avenue",
      },
    ],
  },
];

export const CAMP_DATES_SUMMARY =
  "Saturday October 3rd, 9:00 am – 8:00 pm, and Sunday October 4th, 9:00 am – 8:00 pm.";

export const CAMP_DATES_NOTE = "This is a two-day convening.";

export const CAMP_LOCATION_SUMMARY = "Philadelphia, PA";

export const CAMP_LOCATION_DETAIL =
  "Camp will mostly take place at the Folk Arts Cultural Treasures Charter School (FACTS) at 1023 Callowhill Street, an ADA accessible facility. Sunday’s program will also take place at Washington Square.";

export const CAMP_CARE_LIST = [
  "Meals and refreshments are provided both days",
  "Childcare is offered to Camp participants — add names and ages on the registration form",
  "Tell us about accessibility needs and dietary preferences when you register",
  "Camp is free. Materials are provided",
] as const;

export const CAMP_AUDIENCE_INTRO =
  "People’s Media Camp is for anyone who is part of, or wants to learn more about, Greater Philadelphia’s community media and grassroots memory ecosystem, including:";

export const CAMP_AUDIENCE_LIST = [
  "Community media makers",
  "Archivists and preservationists",
  "Artists, filmmakers, photographers, storytellers",
  "Community organizers and leaders",
  "Journalists",
  "Students and educators",
  "Cultural workers",
  "Community members whose stories and histories are being preserved or represented",
  "Anyone interested in how communities document, preserve and tell their own stories",
] as const;
