"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X } from "lucide-react";
import { TapeLabel } from "@/components/camp/TapeLabel";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

interface CampRegistrationSuccessProps {
  name?: string;
  onReset?: () => void;
}

export function CampRegistrationSuccess({
  name,
  onReset,
}: CampRegistrationSuccessProps) {
  const firstName = name?.trim() || "";
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onReset?.();
        return;
      }
      if (event.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const items = Array.from(
        root.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter(
        (el) =>
          !el.hasAttribute("disabled") &&
          el.getAttribute("aria-hidden") !== "true"
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
    [onReset]
  );

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onKeyDown]);

  const dialog = (
    <div
      ref={overlayRef}
      className="camp-signal fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center"
    >
      <div
        className="absolute inset-0 bg-pmr-dark/70"
        aria-hidden
        onClick={() => onReset?.()}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className="camp-form-card relative z-10 max-h-[min(100dvh-2rem,32rem)] w-full max-w-lg overflow-y-auto p-6 shadow-cassette focus:outline-none sm:p-8"
      >
        <button
          type="button"
          onClick={() => onReset?.()}
          className="absolute right-3 top-4 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border-2 border-pmr-border bg-pmr-cream text-pmr-dark transition hover:border-pmr-coral hover:text-pmr-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pmr-coral"
          aria-label="Close"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        <TapeLabel as="p">Registration received</TapeLabel>
        <h2
          id={titleId}
          className="mt-4 pr-12 text-2xl font-bold text-pmr-dark"
        >
          You&apos;re registered
          {firstName ? `, ${firstName}` : ""}.
        </h2>
        <p
          id={descId}
          className="mt-3 text-base leading-relaxed text-pmr-charcoal"
        >
          Thanks for signing up for People’s Media Camp. Check your email for a
          confirmation. We’ll include you in all communications announcing
          session times and the schedule line-up.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/camp" className="pmr-btn">
            Back to Camp
          </Link>
          {onReset && (
            <button
              type="button"
              className="pmr-btn-secondary"
              onClick={onReset}
            >
              Submit another registration
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(dialog, document.body);
}
