"use client";

import { Play, Lock } from "lucide-react";
import type { AccessLevel, MediaType } from "@/lib/types";
import Image from "next/image";

interface MediaPlayerProps {
  thumbnail: string;
  title: string;
  mediaType: MediaType;
  clipLength?: string;
  accessLevel: AccessLevel;
}

export function MediaPlayer({
  thumbnail,
  title,
  mediaType,
  clipLength,
  accessLevel,
}: MediaPlayerProps) {
  const restricted =
    accessLevel === "restricted" || accessLevel === "private";
  const requestOnly = accessLevel === "request_access";

  return (
    <div className="pmr-card overflow-hidden">
      <div className="relative aspect-video bg-pmr-black">
        <Image
          src={thumbnail}
          alt=""
          fill
          className={`object-cover ${restricted || requestOnly ? "opacity-50 blur-sm" : ""}`}
          sizes="(max-width: 768px) 100vw, 66vw"
          unoptimized
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-pmr-black/40">
          {restricted ? (
            <>
              <Lock className="h-12 w-12 text-pmr-offwhite" aria-hidden />
              <p className="px-4 text-center text-sm font-bold text-pmr-offwhite">
                Media restricted — staff approval required
              </p>
            </>
          ) : requestOnly ? (
            <>
              <Lock className="h-10 w-10 text-pmr-offwhite" aria-hidden />
              <p className="px-4 text-center text-sm font-bold text-pmr-offwhite">
                Request access to view or play this recording
              </p>
            </>
          ) : (
            <>
              <button
                type="button"
                className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-pmr-offwhite bg-pmr-coral motion-safe:transition motion-safe:hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pmr-green-bright/70"
                aria-label={`Play ${title}`}
              >
                <Play className="h-8 w-8 fill-pmr-offwhite text-pmr-offwhite" aria-hidden />
              </button>
              <p className="text-xs font-medium uppercase tracking-wider text-pmr-offwhite">
                Demo player — {mediaType}
                {clipLength && ` · ${clipLength}`}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
