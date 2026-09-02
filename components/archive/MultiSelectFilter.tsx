"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

interface MultiSelectFilterProps {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function MultiSelectFilter({
  label,
  options,
  selected,
  onChange,
}: MultiSelectFilterProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const count = selected.length;

  useEffect(() => {
    if (!open) return;
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function toggle(value: string) {
    onChange(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]
    );
  }

  return (
    <div ref={rootRef} className="relative min-w-0">
      <button
        ref={buttonRef}
        type="button"
        className="flex min-h-11 w-full items-center justify-between gap-2 rounded-lg border-2 border-pmr-dark bg-pmr-offwhite px-3 py-2 text-left font-mono text-sm font-bold text-pmr-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pmr-coral/70"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="truncate">
          {label}
          {count > 0 ? (
            <span className="ml-1 font-medium text-pmr-charcoal">({count})</span>
          ) : null}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <div
          id={menuId}
          role="listbox"
          aria-multiselectable="true"
          aria-label={label}
          className="absolute z-30 mt-1 max-h-64 w-full min-w-[14rem] overflow-y-auto rounded-lg border-2 border-pmr-dark bg-pmr-offwhite py-1 shadow-cassette"
        >
          {options.length === 0 ? (
            <p className="px-3 py-2 text-sm text-pmr-charcoal">No options</p>
          ) : (
            options.map((option) => {
              const checked = selected.includes(option.value);
              return (
                <label
                  key={option.value}
                  className="flex min-h-10 cursor-pointer items-center gap-2 px-3 py-1.5 text-sm text-pmr-dark hover:bg-pmr-teal/40"
                >
                  <input
                    type="checkbox"
                    role="option"
                    aria-selected={checked}
                    checked={checked}
                    onChange={() => toggle(option.value)}
                    className="h-4 w-4 shrink-0 accent-pmr-coral"
                  />
                  <span className="leading-snug">{option.label}</span>
                </label>
              );
            })
          )}
        </div>
      ) : null}
    </div>
  );
}
