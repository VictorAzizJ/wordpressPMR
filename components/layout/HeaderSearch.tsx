"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

type SearchMode = "archive" | "all";

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
  const modeId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<SearchMode>("archive");
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
    if (!expandable || !expanded) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        if (!query.trim()) setExpanded(false);
      }
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
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
  }, [expandable, expanded, query]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const q = query.trim();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    const qs = params.toString();
    const path = mode === "archive" ? "/archive" : "/search";
    router.push(qs ? `${path}?${qs}` : path);
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
    <div ref={rootRef} className={className}>
      <form
        role="search"
        onSubmit={onSubmit}
        className={`flex min-h-11 items-stretch overflow-hidden rounded-lg border-2 border-pmr-dark bg-pmr-offwhite text-pmr-dark transition-[width] duration-200 ease-out ${
          expandable ? "w-[min(18rem,70vw)] sm:w-[20rem]" : "w-full"
        }`}
      >
        <label htmlFor={inputId} className="sr-only">
          {mode === "archive" ? "Search the archive" : "Search all"}
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={
            mode === "archive" ? "Search the archive…" : "Search all…"
          }
          className="min-w-0 flex-1 border-0 bg-transparent px-3 py-1.5 font-mono text-sm text-pmr-dark placeholder:text-pmr-silver focus:outline-none focus:ring-0"
        />
        <label htmlFor={modeId} className="sr-only">
          Search scope
        </label>
        <select
          id={modeId}
          value={mode}
          onChange={(event) => setMode(event.target.value as SearchMode)}
          className="max-w-[9.5rem] shrink-0 cursor-pointer border-l-2 border-pmr-dark bg-pmr-cream px-1.5 font-mono text-[11px] font-medium text-pmr-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pmr-coral/70"
        >
          <option value="archive">Search the archive</option>
          <option value="all">Search all</option>
        </select>
        <button
          type="submit"
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center border-l-2 border-pmr-dark bg-pmr-coral text-pmr-dark transition hover:bg-pmr-dark hover:text-pmr-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pmr-cream"
          aria-label={mode === "archive" ? "Search the archive" : "Search all"}
        >
          <Search className="h-4 w-4" aria-hidden />
        </button>
        {expandable ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setExpanded(false);
            }}
            className="inline-flex min-h-11 min-w-10 shrink-0 items-center justify-center border-l-2 border-pmr-dark bg-pmr-cream text-pmr-dark transition hover:bg-pmr-dark hover:text-pmr-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pmr-coral/70"
            aria-label="Close search"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        ) : null}
      </form>
    </div>
  );
}
