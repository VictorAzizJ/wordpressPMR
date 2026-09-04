import { Construction } from "lucide-react";

interface UnderConstructionProps {
  title?: string;
  message?: string;
}

export function UnderConstruction({
  title = "Archive catalog under construction",
  message = "We are connecting the People's Media Record digital catalog to this site. Browse, search, and individual records will return here once that work is complete. In the meantime, you can learn about the MMP Collection and our policies from the Archive menu.",
}: UnderConstructionProps) {
  return (
    <div className="rounded-lg border-2 border-dashed border-pmr-border bg-pmr-elevated p-8 sm:p-10">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-pmr border-2 border-pmr-coral bg-pmr-dark"
          aria-hidden
        >
          <Construction className="h-6 w-6 text-pmr-coral" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-pmr-offwhite sm:text-2xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-pmr-cream sm:text-lg">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
