import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  href?: string;
  linkLabel?: string;
}

export function SectionHeading({
  title,
  href,
  linkLabel = "View all",
}: SectionHeadingProps) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <h2 className="text-2xl font-bold text-pmr-offwhite sm:text-3xl">{title}</h2>
      {href && (
        <Link
          href={href}
          className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-pmr-coral transition hover:text-pmr-green-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pmr-green-bright/70"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}
