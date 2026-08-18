"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Mail, Search } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { heroPhotos, type HeroPhoto } from "@/lib/hero-photos";

const CROSSFADE_MS = 10000;

interface HomeHeroProps {
  photos?: HeroPhoto[];
  /** Use h2 when another page-level h1 is already present (e.g. campaign landing). */
  titleAs?: "h1" | "h2";
}

export function HomeHero({ photos = heroPhotos, titleAs = "h1" }: HomeHeroProps) {
  const headingId = useId();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
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
    if (paused || reduceMotion || count <= 1) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, CROSSFADE_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, count]);

  const HeadingTag = titleAs;
  const activeIndex = reduceMotion ? 0 : index;

  if (count === 0) return null;

  return (
    <section
      className="relative isolate min-h-[min(85svh,42rem)] overflow-hidden border-b-4 border-pmr-border bg-pmr-dark"
      aria-labelledby={headingId}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
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
                alt=""
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
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pmr-dark via-pmr-dark/70 to-pmr-dark/25"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[min(85svh,42rem)] max-w-7xl flex-col justify-end px-4 py-16 sm:px-6 sm:py-20 lg:justify-center lg:py-24">
        <p className="font-mono text-sm font-bold uppercase tracking-widest text-pmr-teal">
          Community archive
        </p>
        <HeadingTag
          id={headingId}
          className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-pmr-offwhite sm:text-5xl lg:text-6xl"
        >
          Movement memory on tape
        </HeadingTag>
        <p className="mt-4 max-w-2xl text-base text-pmr-cream sm:text-lg">
          People&apos;s Media Record stewards oral histories, community radio,
          strike footage, and youth media — so movement memory stays public,
          usable, and cared for.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
          <Link href="/subscribe" className="pmr-btn text-base">
            <Mail className="h-4 w-4" aria-hidden />
            Subscribe
          </Link>
          <Link href="/donate" className="pmr-btn text-base">
            <Heart className="h-4 w-4" aria-hidden />
            Donate
          </Link>
          <Link href="/archive" className="pmr-btn-hero text-base">
            <Search className="h-4 w-4" aria-hidden />
            Search archive
          </Link>
        </div>
      </div>
    </section>
  );
}
