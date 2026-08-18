"use client";

import Link from "next/link";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import type { NavEntry } from "@/lib/nav";
import { NavTabIndicators, navTabClass } from "@/components/layout/NavTab";

interface NavDropdownProps {
  item: NavEntry;
  active: boolean;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  variant?: "dropdown" | "accordion";
  align?: "left" | "right";
}

export function NavDropdown({
  item,
  active,
  open,
  onToggle,
  onClose,
  variant = "dropdown",
  align = "left",
}: NavDropdownProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const children = item.children ?? [];

  useEffect(() => {
    if (!open || variant !== "dropdown") return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) onClose();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, variant]);

  if (variant === "accordion") {
    return (
      <div>
        <button
          type="button"
          className={`${navTabClass()} w-full justify-between`}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={onToggle}
        >
          {item.label}
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
          <NavTabIndicators active={active} />
        </button>
        {open ? (
          <ul id={menuId} className="mb-2 ml-3 border-l-2 border-pmr-blue pl-3">
            {children.map((child) => (
              <li key={child.href}>
                <DropdownLink item={child} onNavigate={onClose} stacked />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative h-full">
      <button
        ref={buttonRef}
        type="button"
        className={navTabClass()}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={onToggle}
      >
        {item.label}
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
        <NavTabIndicators active={active} />
      </button>
      {open ? (
        <ul
          id={menuId}
          role="menu"
          className={`absolute top-full z-50 min-w-[16rem] border-2 border-pmr-dark bg-pmr-offwhite py-1 text-pmr-dark shadow-cassette ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children.map((child) => (
            <li key={child.href} role="none">
              <DropdownLink item={child} onNavigate={onClose} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function DropdownLink({
  item,
  onNavigate,
  stacked = false,
}: {
  item: { href: string; label: string; external?: boolean };
  onNavigate: () => void;
  stacked?: boolean;
}) {
  const className = stacked
    ? "flex min-h-11 items-center gap-2 px-2 py-2 text-sm font-medium text-pmr-offwhite hover:text-pmr-cream"
    : "flex min-h-11 items-center gap-2 px-4 py-2 text-sm font-medium text-pmr-dark hover:bg-pmr-teal/40";

  if (item.external) {
    return (
      <a
        href={item.href}
        role={stacked ? undefined : "menuitem"}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
      >
        {item.label}
        <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      role={stacked ? undefined : "menuitem"}
      className={className}
      onClick={onNavigate}
    >
      {item.label}
    </Link>
  );
}
