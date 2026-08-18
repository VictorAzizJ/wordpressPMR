"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import type { CampaignMode } from "@/config/campaign";
import { formatCampaignEndDate } from "@/lib/campaign/isCampaignActive";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

interface CampaignPopupProps {
  config: CampaignMode;
  onDismiss: () => void;
}

export function CampaignPopup({ config, onDismiss }: CampaignPopupProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();
  const through = formatCampaignEndDate(config);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onDismiss();
        return;
      }
      if (event.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true",
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === root)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onDismiss],
  );

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const overlay = overlayRef.current;
    const siblings = overlay
      ? Array.from(document.body.children).filter((el) => el !== overlay)
      : [];
    siblings.forEach((el) => el.setAttribute("inert", ""));

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      siblings.forEach((el) => el.removeAttribute("inert"));
      previouslyFocused?.focus?.();
    };
  }, [onKeyDown]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center"
    >
      <div
        className="absolute inset-0 bg-pmr-dark/80"
        aria-hidden
        onClick={onDismiss}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className="pmr-card relative z-10 max-h-[min(100dvh-2rem,40rem)] w-full max-w-lg overflow-y-auto p-6 shadow-glow focus:outline-none focus-visible:outline-none sm:p-8"
      >
        <button
          type="button"
          onClick={onDismiss}
          className="absolute right-3 top-3 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border-2 border-pmr-border bg-pmr-black text-pmr-offwhite transition hover:border-pmr-green hover:text-pmr-green-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pmr-green-bright/70"
          aria-label="Close"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        <p className="pr-12 font-mono text-xs font-bold uppercase tracking-widest text-pmr-green-bright">
          {config.eyebrow}
          {through ? ` · through ${through}` : ""}
        </p>
        <h2
          id={titleId}
          className="mt-3 text-2xl font-bold text-pmr-offwhite sm:text-3xl"
        >
          {config.popupTitle}
        </h2>
        <p id={descId} className="mt-3 text-pmr-muted">
          {config.description}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={config.ctaHref}
            className="pmr-btn text-base"
            onClick={onDismiss}
          >
            {config.ctaLabel}
          </Link>
          <button
            type="button"
            className="pmr-btn-secondary text-base"
            onClick={onDismiss}
          >
            {config.continueLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
