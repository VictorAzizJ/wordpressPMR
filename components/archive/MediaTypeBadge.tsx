import { FileText, Film, Image, Music } from "lucide-react";
import type { MediaType } from "@/lib/types";

const config: Record<
  MediaType,
  { label: string; icon: typeof Film; className: string }
> = {
  video: { label: "Video", icon: Film, className: "bg-pmr-charcoal text-pmr-offwhite" },
  audio: { label: "Audio", icon: Music, className: "bg-pmr-dark text-pmr-offwhite" },
  image: { label: "Image", icon: Image, className: "bg-pmr-silver text-pmr-dark" },
  document: {
    label: "Document",
    icon: FileText,
    className: "bg-pmr-cream text-pmr-dark",
  },
};

export function MediaTypeBadge({ type }: { type: MediaType }) {
  const { label, icon: Icon, className } = config[type];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border-2 border-pmr-dark px-2 py-0.5 text-xs font-bold ${className}`}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {label}
    </span>
  );
}
