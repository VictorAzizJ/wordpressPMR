import type { AccessLevel } from "@/lib/types";

const labels: Record<AccessLevel, string> = {
  public: "Public",
  request_access: "Request Access",
  restricted: "Restricted",
  private: "Private",
};

const styles: Record<AccessLevel, string> = {
  public: "bg-pmr-teal text-pmr-dark border-pmr-dark",
  request_access: "bg-amber-200 text-amber-950 border-amber-800",
  restricted: "bg-pmr-coral text-pmr-offwhite border-pmr-dark",
  private: "bg-pmr-silver text-pmr-dark border-pmr-dark",
};

export function AccessBadge({ level }: { level: AccessLevel }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border-2 px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${styles[level]}`}
    >
      {labels[level]}
    </span>
  );
}
