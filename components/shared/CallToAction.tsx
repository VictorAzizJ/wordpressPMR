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
      <Link href={href} className="pmr-btn mt-4 text-sm">
        {buttonLabel}
      </Link>
    </div>
  );
}
