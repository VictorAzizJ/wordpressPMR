"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function TranscriptToggle({ transcript }: { transcript: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg border-2 border-pmr-dark bg-pmr-offwhite px-4 py-3 font-bold text-pmr-dark"
      >
        Transcript
        {open ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>
      {open && (
        <div className="mt-2 rounded-lg border-2 border-pmr-dark/30 bg-pmr-cream p-4 text-sm leading-relaxed text-pmr-charcoal">
          {transcript}
        </div>
      )}
    </div>
  );
}
