"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";

type SearchMode = "archive" | "all";

export function HeaderSearch({ className = "" }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const inputId = useId();
  const modeId = useId();
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<SearchMode>("archive");

  useEffect(() => {
    if (pathname.startsWith("/search")) setMode("all");
    else if (pathname.startsWith("/archive")) setMode("archive");
  }, [pathname]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const q = query.trim();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    const qs = params.toString();
    const path = mode === "archive" ? "/archive" : "/search";
    router.push(qs ? `${path}?${qs}` : path);
  }

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={`flex min-h-11 items-stretch overflow-hidden rounded-lg border-2 border-pmr-dark bg-pmr-offwhite text-pmr-dark ${className}`}
    >
      <label htmlFor={inputId} className="sr-only">
        {mode === "archive" ? "Search the archive" : "Search all"}
      </label>
      <input
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
        className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center border-l-2 border-pmr-dark bg-pmr-coral text-pmr-offwhite transition hover:bg-pmr-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pmr-cream"
        aria-label={mode === "archive" ? "Search the archive" : "Search all"}
      >
        <Search className="h-4 w-4" aria-hidden />
      </button>
    </form>
  );
}
