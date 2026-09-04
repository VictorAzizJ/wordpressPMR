"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { archiveSections } from "@/lib/archive";

export function ArchiveSideMenu() {
  const pathname = usePathname();

  return (
    <aside
      className="pmr-card h-fit p-4 sm:p-5 lg:sticky lg:top-28"
      aria-label="Archive sections"
    >
      <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-wide text-pmr-coral">
        In this section
      </h2>
      <nav>
        <ul className="space-y-1">
          {archiveSections.map((section) => {
            const active =
              pathname === section.href ||
              pathname.startsWith(`${section.href}/`);
            return (
              <li key={section.href}>
                <Link
                  href={section.href}
                  className={`block rounded-md px-3 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pmr-coral/70 ${
                    active
                      ? "bg-pmr-dark text-pmr-green-bright"
                      : "text-pmr-cream hover:bg-pmr-dark/60 hover:text-pmr-offwhite"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {section.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
