import Link from "next/link";

interface CallToActionProps {
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
  variant?: "coral" | "charcoal";
}

export function CallToAction({
  title,
  description,
  href,
  buttonLabel,
  variant = "coral",
}: CallToActionProps) {
  /* coral = charcoal panel + yellow accent (not a full yellow flood) */
  const shell =
    variant === "coral"
      ? "border-pmr-coral bg-pmr-elevated text-pmr-offwhite"
      : "border-pmr-border bg-pmr-elevated text-pmr-offwhite";

  return (
    <div className={`rounded-pmr border-4 p-6 sm:p-8 ${shell}`}>
      {variant === "coral" ? (
        <p className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-pmr-coral">
          Stay connected
        </p>
      ) : null}
      <h3 className="text-xl font-bold sm:text-2xl">{title}</h3>
      <p className="mt-2 max-w-xl text-sm opacity-90 sm:text-base">
        {description}
      </p>
      <Link
        href={href}
        className="mt-4 inline-flex min-h-11 items-center rounded-lg border-2 border-pmr-border bg-pmr-coral px-5 py-2.5 text-sm font-bold text-pmr-dark transition hover:bg-pmr-dark hover:text-pmr-offwhite"
      >
        {buttonLabel}
      </Link>
    </div>
  );
}
