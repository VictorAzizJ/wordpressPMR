import Link from "next/link";
import Image from "next/image";
import type { Story } from "@/lib/types";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="pmr-card group block overflow-hidden transition hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/9] bg-pmr-black sm:aspect-[2/1]">
        <Image
          src={story.heroImage}
          alt=""
          fill
          className="object-cover transition group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-pmr-coral">
          Exhibition
        </p>
        <h3 className="mt-1 text-xl font-bold text-pmr-offwhite group-hover:text-pmr-green-bright">
          {story.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-pmr-muted">{story.intro}</p>
      </div>
    </Link>
  );
}
