import Link from "next/link";

const exploreLinks = [
  { href: "/archive", label: "Archive" },
  { href: "/programs", label: "Programs" },
  { href: "/about", label: "About" },
  { href: "/glossary", label: "Glossary" },
];

const involvedLinks = [
  { href: "/camp", label: "Camp" },
  { href: "/subscribe", label: "Subscribe" },
  { href: "/donate", label: "Donate" },
  { href: "/contact", label: "Contact" },
];

const footerLinkClass =
  "inline-flex min-h-11 items-center text-pmr-muted transition hover:text-pmr-green-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pmr-green-bright/70";

export function Footer() {
  return (
    <footer className="mt-auto border-t-4 border-pmr-border bg-pmr-elevated text-pmr-offwhite">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-pmr-green-bright">
              People&apos;s Media Record
            </p>
            <p className="mt-2 max-w-sm text-sm text-pmr-muted">
              A community archive preserving movement media, oral histories, and
              independent journalism for public education and collective memory.
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="font-bold">Explore</p>
            <ul className="mt-3 space-y-1 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Get involved">
            <p className="font-bold">Get involved</p>
            <ul className="mt-3 space-y-1 text-sm">
              {involvedLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-8 border-t border-pmr-border pt-6 text-center text-xs text-pmr-muted">
          Demo prototype — mock data for client presentation. © People&apos;s
          Media Record.
        </p>
      </div>
    </footer>
  );
}
