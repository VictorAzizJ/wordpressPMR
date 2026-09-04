"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import type { HeroPhoto } from "@/lib/hero-photos";

const CROSSFADE_MS = 7000;

/** Next index at random, never the same as current when count > 1. */
function nextRandomIndex(current: number, count: number): number {
  if (count <= 1) return 0;
  let next = current;
  while (next === current) {
    next = Math.floor(Math.random() * count);
  }
  return next;
}

interface PhotoCarouselProps {
  photos: HeroPhoto[];
  children?: ReactNode;
  labelledBy?: string;
  minHeightClass?: string;
  contentClassName?: string;
}

export function PhotoCarousel({
  photos,
  children,
  labelledBy,
  minHeightClass = "min-h-[min(85svh,42rem)]",
  contentClassName = "justify-end py-16 sm:py-20 lg:justify-center lg:py-24",
}: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const count = photos.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    // Do not pause on hover/focus of the full hero — it fills the viewport,
    // so the cursor sitting on the page would freeze the slideshow.
    if (reduceMotion || count <= 1) return;
    const id = window.setInterval(() => {
      setIndex((current) => nextRandomIndex(current, count));
    }, CROSSFADE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, count]);

  const activeIndex = reduceMotion ? 0 : index;

  if (count === 0) return null;

  return (
    <section aria-labelledby={labelledBy}>
      <div
        className={`relative isolate overflow-hidden border-b-4 border-pmr-border bg-pmr-dark ${minHeightClass}`}
      >
        <div className="absolute inset-0" aria-hidden>
          {photos.map((photo, i) => {
            const visible = i === activeIndex;
            return (
              <div
                key={photo.id}
                className={`pmr-hero-crossfade absolute inset-0 ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  unoptimized
                  priority={i === 0}
                />
              </div>
            );
          })}
        </div>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pmr-dark/80 via-pmr-dark/45 to-pmr-dark/20"
          aria-hidden
        />

        {children ? (
          <div
            className={`relative z-10 mx-auto flex ${minHeightClass} max-w-7xl flex-col px-4 sm:px-6 ${contentClassName}`}
          >
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
