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
  const bg =
    variant === "coral"
      ? "bg-pmr-coral border-pmr-border"
      : "bg-pmr-elevated border-pmr-border text-pmr-offwhite";

  return (
    <div
      className={`rounded-pmr border-4 p-6 sm:p-8 ${bg} ${variant === "charcoal" ? "" : "text-pmr-offwhite"}`}
    >
      <h3 className="text-xl font-bold sm:text-2xl">{title}</h3>
      <p className="mt-2 max-w-xl text-sm opacity-90 sm:text-base">
        {description}
      </p>
      <Link
        href={href}
        className={`mt-4 inline-flex rounded-lg border-2 border-pmr-border px-5 py-2.5 text-sm font-bold transition ${
          variant === "coral"
            ? "bg-pmr-black text-pmr-offwhite hover:bg-pmr-elevated hover:text-pmr-green-bright"
            : "bg-pmr-coral text-pmr-offwhite hover:bg-pmr-black"
        }`}
      >
        {buttonLabel}
      </Link>
    </div>
  );
}
