"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Radio } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/archive", label: "Search Archive" },
  { href: "/collections", label: "Collections" },
  { href: "/stories", label: "Stories" },
  { href: "/resources", label: "Resources" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-4 border-pmr-dark bg-pmr-charcoal text-pmr-offwhite">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold tracking-tight transition hover:text-pmr-teal"
        >
          <Radio className="h-7 w-7 text-pmr-coral" aria-hidden />
          <span className="text-lg sm:text-xl">
            People&apos;s Media Record
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "bg-pmr-coral text-pmr-offwhite"
                  : "hover:bg-pmr-dark"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/build-with-us" className="pmr-btn ml-2 text-sm">
            Build With Us
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg border-2 border-pmr-dark bg-pmr-dark p-2 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t-2 border-pmr-dark bg-pmr-charcoal px-4 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2 font-medium hover:bg-pmr-dark"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/build-with-us"
                className="pmr-btn mt-2 w-full text-center"
                onClick={() => setOpen(false)}
              >
                Build With Us
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
