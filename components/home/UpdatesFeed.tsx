import { Instagram } from "lucide-react";
import {
  instagramHandleDisplay,
  instagramProfileUrl,
  social,
  updatesFeed,
} from "@/config/social";
import type { UpdatePost } from "@/lib/updates";
import { UpdateCard } from "./UpdateCard";

interface UpdatesFeedProps {
  posts: UpdatePost[];
  handle?: string;
}

export function UpdatesFeed({
  posts,
  handle = social.instagramHandle,
}: UpdatesFeedProps) {
  const visible = posts.slice(0, updatesFeed.limit);
  if (visible.length === 0) return null;

  const profileUrl = instagramProfileUrl(handle);
  const handleLabel = instagramHandleDisplay(handle);

  return (
    <section
      className="bg-pmr-charcoal py-12 sm:py-16"
      aria-labelledby="updates-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h2
            id="updates-heading"
            className="scroll-mt-28 text-2xl font-bold text-pmr-offwhite sm:text-3xl"
          >
            What&apos;s Current?
          </h2>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-pmr-coral transition hover:text-pmr-green-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pmr-green-bright/70"
          >
            <Instagram className="h-4 w-4" aria-hidden />
            {handleLabel}
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <UpdateCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
