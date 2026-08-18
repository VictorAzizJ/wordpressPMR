"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArchiveSlide } from "./ArchiveSlide";
import {
  featuredSlides,
  type FeaturedSlide,
} from "@/lib/featured-slides";

const AUTOPLAY_MS = 7000;
const SWIPE_THRESHOLD_PX = 50;

interface FeaturedArchiveCarouselProps {
  slides?: FeaturedSlide[];
  /** Use h2 when another page-level h1 is already present (e.g. campaign landing). */
  titleAs?: "h1" | "h2";
}

export function FeaturedArchiveCarousel({
  slides = featuredSlides,
  titleAs = "h1",
}: FeaturedArchiveCarouselProps) {
  const baseId = useId();
  const liveId = `${baseId}-live`;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const pointerStartX = useRef<number | null>(null);
  const count = slides.length;
  const current = slides[index] ?? slides[0];

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion || count <= 1) return;
    // Re-bind when index changes so manual nav resets the autoplay window.
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, count, index]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return;
    if ((e.target as HTMLElement | null)?.closest("a, button")) return;
    pointerStartX.current = e.clientX;
    setPaused(true);
  };

  const finishPointer = (e: PointerEvent<HTMLDivElement>) => {
    const start = pointerStartX.current;
    pointerStartX.current = null;
    if (start == null) return;
    const dx = e.clientX - start;
    if (Math.abs(dx) >= SWIPE_THRESHOLD_PX) {
      if (dx < 0) goNext();
      else goPrev();
    }
    window.setTimeout(() => setPaused(false), AUTOPLAY_MS);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (count <= 1) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  };

  if (!current || count === 0) return null;

  return (
    <section
      className="relative border-b-4 border-pmr-border bg-pmr-black"
      aria-roledescription="carousel"
      aria-label="Featured archive"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div id={liveId} className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {index + 1} of {count}: {current.title}
      </div>

      <div
        className="relative touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerUp={finishPointer}
        onPointerCancel={() => {
          pointerStartX.current = null;
        }}
      >
        {slides.map((slide, i) => (
          <ArchiveSlide
            key={slide.id}
            slide={slide}
            slideId={`${baseId}-slide-${slide.id}`}
            active={i === index}
            headingAs={titleAs}
            priorityImage={i === 0 && slide.media.kind === "image"}
          />
        ))}
      </div>

      {count > 1 && (
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 pb-10 sm:px-6">
          <div
            className="flex items-center gap-2"
            role="group"
            aria-label="Carousel controls"
            onKeyDown={onKeyDown}
          >
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border-2 border-pmr-border bg-pmr-elevated text-pmr-offwhite transition hover:border-pmr-green hover:text-pmr-green-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pmr-green-bright/70"
              aria-controls={liveId}
              aria-label="Previous slide"
              onClick={goPrev}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border-2 border-pmr-border bg-pmr-elevated text-pmr-offwhite transition hover:border-pmr-green hover:text-pmr-green-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pmr-green-bright/70"
              aria-controls={liveId}
              aria-label="Next slide"
              onClick={goNext}
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div
            className="flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="Slide selectors"
            onKeyDown={onKeyDown}
          >
            {slides.map((slide, i) => {
              const selected = i === index;
              const panelId = `${baseId}-slide-${slide.id}`;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={panelId}
                  aria-label={`Go to slide ${i + 1}: ${slide.title}`}
                  className={`h-11 min-w-11 rounded-lg border-2 px-3 font-mono text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pmr-green-bright/70 ${
                    selected
                      ? "border-pmr-green bg-pmr-green/20 text-pmr-green-bright"
                      : "border-pmr-border bg-pmr-elevated text-pmr-muted hover:border-pmr-green hover:text-pmr-green-bright"
                  }`}
                  onClick={() => goTo(i)}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
