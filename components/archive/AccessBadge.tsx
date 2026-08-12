import type { AccessLevel } from "@/lib/types";

const labels: Record<AccessLevel, string> = {
  public: "Public",
  request_access: "Request Access",
  restricted: "Restricted",
  private: "Private",
};

const styles: Record<AccessLevel, string> = {
  public: "bg-pmr-green text-pmr-black border-pmr-border",
  request_access: "bg-amber-400/90 text-amber-950 border-amber-700",
  restricted: "bg-pmr-coral text-pmr-offwhite border-pmr-border",
  private: "bg-pmr-muted text-pmr-black border-pmr-border",
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
