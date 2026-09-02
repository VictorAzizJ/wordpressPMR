import { resourcePoolEmbedUrl } from "@/lib/resources";

export function ResourcePoolList() {
  return (
    <div className="overflow-hidden rounded-pmr border-4 border-pmr-border bg-pmr-elevated">
      <iframe
        className="block w-full bg-transparent"
        src={resourcePoolEmbedUrl}
        title="Resource Pool database"
        width="100%"
        height={720}
        loading="lazy"
      />
    </div>
  );
}
