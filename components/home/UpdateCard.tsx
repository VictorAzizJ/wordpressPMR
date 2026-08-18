import Image from "next/image";
import type { UpdatePost } from "@/lib/updates";

interface UpdateCardProps {
  post: UpdatePost;
}

function formatPostedAt(iso: string): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function UpdateCard({ post }: UpdateCardProps) {
  const dateLabel = formatPostedAt(post.postedAt);
  const inner = (
    <>
      <div className="relative aspect-square overflow-hidden bg-pmr-black">
        <Image
          src={post.image}
          alt=""
          fill
          className="object-cover motion-safe:transition motion-safe:group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
      </div>
      <div className="p-4">
        {post.caption ? (
          <p className="line-clamp-3 text-sm text-pmr-offwhite">{post.caption}</p>
        ) : null}
        {dateLabel ? (
          <time
            dateTime={post.postedAt}
            className="mt-3 block font-mono text-xs text-pmr-muted"
          >
            {dateLabel}
          </time>
        ) : null}
      </div>
    </>
  );

  if (post.permalink) {
    return (
      <article className="pmr-card group overflow-hidden motion-safe:transition motion-safe:hover:-translate-y-0.5">
        <a
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pmr-green-bright/70"
        >
          {inner}
        </a>
      </article>
    );
  }

  return (
    <article className="pmr-card overflow-hidden">{inner}</article>
  );
}
