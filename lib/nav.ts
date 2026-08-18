import { pastWorkshopVideosUrl } from "@/config/programs";

export type NavChild = {
  href: string;
  label: string;
  external?: boolean;
};

export type NavId = "archive" | "resources" | "programs" | "about";

export type NavEntry = {
  id: NavId;
  label: string;
  href?: string;
  children?: NavChild[];
};

export const mainNav: NavEntry[] = [
  {
    id: "archive",
    label: "Archive",
    children: [
      { href: "/collections", label: "Collections" },
      { href: "/archive/policy", label: "Policy" },
      { href: "/glossary", label: "Glossary" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    href: "/resources",
  },
  {
    id: "programs",
    label: "Programs",
    children: [
      { href: "/programs/pacme", label: "PACME" },
      { href: "/camp", label: "People's Media Camp" },
      {
        href: "/programs/movement-memory-jams",
        label: "Movement Memory Jams",
      },
      { href: "/events", label: "Workshops" },
      {
        href: pastWorkshopVideosUrl,
        label: "Past workshop videos",
        external: true,
      },
    ],
  },
];

export const aboutNav: NavEntry = {
  id: "about",
  label: "About",
  children: [
    { href: "/about/mission", label: "Mission" },
    { href: "/about/people", label: "People" },
  ],
};

function starts(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isNavSectionActive(id: NavId, pathname: string): boolean {
  switch (id) {
    case "archive":
      return (
        starts(pathname, "/archive") ||
        starts(pathname, "/collections") ||
        starts(pathname, "/glossary") ||
        starts(pathname, "/records")
      );
    case "resources":
      return starts(pathname, "/resources");
    case "programs":
      return (
        starts(pathname, "/programs") ||
        starts(pathname, "/camp") ||
        starts(pathname, "/events")
      );
    case "about":
      return starts(pathname, "/about");
  }
}
