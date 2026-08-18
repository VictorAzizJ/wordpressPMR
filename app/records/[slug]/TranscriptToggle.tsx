"use client";

import { useId, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function TranscriptToggle({ transcript }: { transcript: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex min-h-11 w-full items-center justify-between rounded-lg border-2 border-pmr-border bg-pmr-elevated px-4 py-3 font-bold text-pmr-offwhite"
      >
        Transcript
        {open ? (
          <ChevronUp className="h-5 w-5" aria-hidden />
        ) : (
          <ChevronDown className="h-5 w-5" aria-hidden />
        )}
      </button>
      {open && (
        <div
          id={panelId}
          className="mt-2 rounded-lg border-2 border-pmr-border/30 bg-pmr-elevated p-4 text-sm leading-relaxed text-pmr-muted"
        >
          {transcript}
        </div>
      )}
    </div>
  );
}
