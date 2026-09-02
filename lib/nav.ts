import { archiveSections } from "./archive";

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
    id: "about",
    label: "About",
    href: "/about",
    children: [
      { href: "/about#mission-vision-values", label: "Mission, Vision, and Values" },
      { href: "/about#people", label: "People" },
    ],
  },
  {
    id: "programs",
    label: "Programs",
    href: "/programs",
    children: [
      { href: "/programs/pacme", label: "PACME Fellowship" },
      { href: "/camp", label: "People's Media Camp" },
      {
        href: "/programs/movement-memory-jams",
        label: "Movement Memory Jams",
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    href: "/resources",
    children: [
      { href: "/resources/pool", label: "Resource Pool" },
      { href: "/resources/pace", label: "PACE" },
      { href: "/resources/glossary", label: "Glossary" },
    ],
  },
  {
    id: "archive",
    label: "Archive",
    href: "/archive",
    children: archiveSections.map((section) => ({
      href: section.href,
      label: section.label,
    })),
  },
];

function starts(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isNavSectionActive(id: NavId, pathname: string): boolean {
  switch (id) {
    case "archive":
      return (
        starts(pathname, "/archive") ||
        starts(pathname, "/collections") ||
        starts(pathname, "/records")
      );
    case "resources":
      return starts(pathname, "/resources");
    case "programs":
      return starts(pathname, "/programs") || starts(pathname, "/camp");
    case "about":
      return starts(pathname, "/about");
  }
}
