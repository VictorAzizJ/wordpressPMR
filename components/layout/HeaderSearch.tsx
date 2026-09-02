"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Search, X } from "lucide-react";

type SearchMode = "archive" | "all";

const MODE_LABELS: Record<SearchMode, string> = {
  archive: "Search the archive",
  all: "Search the site",
};

interface HeaderSearchProps {
  className?: string;
  /** Collapse to an icon until clicked (desktop header). */
  expandable?: boolean;
}

export function HeaderSearch({
  className = "",
  expandable = false,
}: HeaderSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const inputId = useId();
  const modeMenuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<SearchMode>("archive");
  const [modeOpen, setModeOpen] = useState(false);
  const [expanded, setExpanded] = useState(!expandable);

  useEffect(() => {
    if (pathname.startsWith("/search")) setMode("all");
    else if (pathname.startsWith("/archive")) setMode("archive");
  }, [pathname]);

  useEffect(() => {
    if (!expandable || !expanded) return;
    inputRef.current?.focus();
  }, [expandable, expanded]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setModeOpen(false);
        if (expandable && expanded && !query.trim()) setExpanded(false);
      }
    }

    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      if (modeOpen) {
        setModeOpen(false);
        return;
      }
      if (expandable && expanded) {
        if (!query.trim()) {
          setExpanded(false);
        } else {
          setQuery("");
        }
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [expandable, expanded, query, modeOpen]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setModeOpen(false);
    const q = query.trim();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    const qs = params.toString();
    const path = mode === "archive" ? "/archive/browse" : "/search";
    router.push(qs ? `${path}?${qs}` : path);
  }

  function chooseMode(next: SearchMode) {
    setMode(next);
    setModeOpen(false);
    inputRef.current?.focus();
  }

  if (expandable && !expanded) {
    return (
      <div ref={rootRef} className={className}>
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border-2 border-pmr-dark bg-pmr-coral text-pmr-dark transition hover:bg-pmr-dark hover:text-pmr-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pmr-cream"
          aria-label="Open search"
          aria-expanded={false}
        >
          <Search className="h-4 w-4" aria-hidden />
        </button>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <form
        role="search"
        onSubmit={onSubmit}
        className={`flex min-h-11 items-stretch overflow-hidden rounded-lg border-2 border-pmr-dark bg-pmr-offwhite text-pmr-dark transition-[width] duration-200 ease-out ${
          expandable ? "w-[min(18rem,70vw)] sm:w-[20rem]" : "w-full"
        }`}
      >
        <label htmlFor={inputId} className="sr-only">
          {MODE_LABELS[mode]}
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`${MODE_LABELS[mode]}…`}
          className="min-w-0 flex-1 border-0 bg-transparent px-3 py-1.5 font-mono text-sm text-pmr-dark placeholder:text-pmr-silver focus:outline-none focus:ring-0"
        />
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={modeOpen}
          aria-controls={modeMenuId}
          aria-label="Choose search scope"
          onClick={() => setModeOpen((open) => !open)}
          className="inline-flex min-h-11 w-8 shrink-0 items-center justify-center text-pmr-dark transition hover:text-pmr-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pmr-coral/70"
        >
          <ChevronDown
            className={`h-4 w-4 transition ${modeOpen ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
        <button
          type="submit"
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center border-l-2 border-pmr-dark bg-pmr-coral text-pmr-dark transition hover:bg-pmr-dark hover:text-pmr-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pmr-cream"
          aria-label={MODE_LABELS[mode]}
        >
          <Search className="h-4 w-4" aria-hidden />
        </button>
        {expandable ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setModeOpen(false);
              setExpanded(false);
            }}
            className="inline-flex min-h-11 min-w-10 shrink-0 items-center justify-center border-l-2 border-pmr-dark bg-pmr-cream text-pmr-dark transition hover:bg-pmr-dark hover:text-pmr-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pmr-coral/70"
            aria-label="Close search"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        ) : null}
      </form>
      {modeOpen ? (
        <ul
          id={modeMenuId}
          role="listbox"
          aria-label="Search scope"
          className="absolute right-0 top-[calc(100%+0.25rem)] z-50 min-w-[13rem] overflow-hidden rounded-lg border-2 border-pmr-dark bg-pmr-offwhite shadow-lg"
        >
          {(["archive", "all"] as const).map((value) => (
            <li key={value} role="option" aria-selected={mode === value}>
              <button
                type="button"
                onClick={() => chooseMode(value)}
                className={`w-full px-3 py-2.5 text-left font-mono text-sm transition hover:bg-pmr-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pmr-coral/70 ${
                  mode === value
                    ? "bg-pmr-cream font-medium text-pmr-dark"
                    : "text-pmr-dark"
                }`}
              >
                {MODE_LABELS[value]}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
