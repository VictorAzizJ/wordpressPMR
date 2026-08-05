import { stories } from "@/lib/mock-data";
import { PageShell } from "@/components/layout/PageShell";
import { StoryCard } from "@/components/stories/StoryCard";

export default function StoriesPage() {
  return (
    <PageShell
      title="Stories & Exhibitions"
      subtitle="Editorial narratives weaving archive materials into public education and movement memory."
    >
      <div className="grid gap-8">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </PageShell>
  );
}
