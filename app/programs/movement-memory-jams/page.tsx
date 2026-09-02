import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import {
  instagramHandleDisplay,
  instagramProfileUrl,
} from "@/config/social";
import { movementMemoryJams } from "@/lib/programs";

export const metadata: Metadata = {
  title: movementMemoryJams.title,
  description: movementMemoryJams.intro,
};

function JamPhoto() {
  const { src, alt, caption } = movementMemoryJams.photo;

  return (
    <figure className="overflow-hidden rounded-pmr border-4 border-pmr-border bg-pmr-elevated shadow-cassette">
      {src ? (
        <div className="relative aspect-[3/2] bg-pmr-dark">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 48rem, 100vw"
          />
        </div>
      ) : (
        <div
          className="relative flex aspect-[3/2] items-center justify-center bg-pmr-elevated"
          aria-hidden
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgb(var(--pmr-dark)/0.35)_0_12px,transparent_12px_24px)]"
          />
          <p className="relative z-10 px-4 text-center font-mono text-sm text-pmr-muted">
            Photo from a 2026 Movement Memory Jam forthcoming
          </p>
        </div>
      )}
      <figcaption className="border-t-2 border-pmr-border bg-pmr-dark px-4 py-3 font-mono text-sm text-pmr-muted">
        {src ? caption : "Image placeholder — a 2026 Movement Memory Jam"}
      </figcaption>
    </figure>
  );
}

export default function MovementMemoryJamsPage() {
  const igUrl = instagramProfileUrl();
  const igHandle = instagramHandleDisplay();

  return (
    <PageShell title={movementMemoryJams.title}>
      <div className="max-w-3xl space-y-8 text-lg leading-relaxed text-pmr-muted">
        <p>{movementMemoryJams.intro}</p>
        <p>
          To see announcements for past and upcoming Movement Memory Jams, check
          out{" "}
          <Link
            href="/#updates-heading"
            className="font-bold text-pmr-coral hover:underline"
          >
            What&apos;s Current
          </Link>{" "}
          on our homepage or visit{" "}
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-pmr-coral hover:underline"
          >
            {igHandle}
          </a>{" "}
          on Instagram.
        </p>
        <JamPhoto />
      </div>
    </PageShell>
  );
}
