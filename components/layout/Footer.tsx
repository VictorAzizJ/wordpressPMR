import Link from "next/link";

const footerLinks = [
  { href: "/archive", label: "Archive" },
  { href: "/camp", label: "Camp" },
  { href: "/glossary", label: "Glossary" },
  { href: "/access-request", label: "Request Access" },
  { href: "/contact", label: "Contact" },
  { href: "/donate", label: "Donate" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t-4 border-pmr-border bg-pmr-elevated text-pmr-offwhite">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-pmr-green">
              People&apos;s Media Record
            </p>
            <p className="mt-2 max-w-sm text-sm text-pmr-muted">
              A community archive preserving movement media, oral histories, and
              independent journalism for public education and collective memory.
            </p>
          </div>
          <div>
            <p className="font-bold">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-pmr-muted transition hover:text-pmr-green-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold">Get involved</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/build-with-us"
                  className="text-pmr-muted transition hover:text-pmr-green-bright"
                >
                  Volunteer & partner
                </Link>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="text-pmr-muted transition hover:text-pmr-green-bright"
                >
                  Support the archive
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-pmr-border pt-6 text-center text-xs text-pmr-muted">
          Demo prototype — mock data for client presentation. © People&apos;s
          Media Record.
        </p>
      </div>
    </footer>
  );
}
