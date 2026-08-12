import Image from "next/image";
import Link from "next/link";
import type { StorySection } from "@/lib/types";
import { getRecordById } from "@/lib/mock-data";

interface StoryBodyProps {
  sections: StorySection[];
}

export function StoryBody({ sections }: StoryBodyProps) {
  return (
    <div className="prose-pmr space-y-8">
      {sections.map((section, i) => {
        switch (section.type) {
          case "paragraph":
            return (
              <p
                key={i}
                className="text-lg leading-relaxed text-pmr-muted"
              >
                {section.content}
              </p>
            );
          case "pullquote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-pmr-coral bg-pmr-elevated py-4 pl-6 pr-4 text-xl font-medium italic text-pmr-offwhite"
              >
                {section.content}
              </blockquote>
            );
          case "embedded_record": {
            const record = section.recordId
              ? getRecordById(section.recordId)
              : null;
            return (
              <div
                key={i}
                className="rounded-pmr border-4 border-pmr-border bg-pmr-elevated p-5 text-pmr-offwhite"
              >
                <p className="font-mono text-xs font-bold uppercase text-pmr-green">
                  From the archive
                </p>
                <p className="mt-1 font-bold">{section.content}</p>
                {record && (
                  <Link
                    href={`/records/${record.slug}`}
                    className="mt-3 inline-flex text-sm font-bold text-pmr-coral hover:text-pmr-green-bright"
                  >
                    View record →
                  </Link>
                )}
              </div>
            );
          }
          case "gallery":
            return (
              <div key={i}>
                <p className="mb-3 text-sm font-bold text-pmr-offwhite">
                  {section.content}
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {section.images?.map((img, j) => (
                    <div
                      key={j}
                      className="relative aspect-video overflow-hidden rounded-lg border-2 border-pmr-border"
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
