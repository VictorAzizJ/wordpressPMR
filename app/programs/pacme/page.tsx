import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PacmeFellows } from "@/components/programs/PacmeFellows";
import { PhotoCarousel } from "@/components/shared/PhotoCarousel";
import {
  pacmeIntro,
  pacmePhotos,
  pacmeStewardship,
  pacmeTitle,
} from "@/lib/pacme";

export const metadata: Metadata = {
  title: "PACME Fellowship",
  description: pacmeIntro,
};

export default function PacmePage() {
  return (
    <>
      <PhotoCarousel
        photos={pacmePhotos}
        labelledBy="pacme-heading"
        minHeightClass="min-h-[min(52svh,28rem)]"
        contentClassName="justify-end py-12 sm:py-16"
      >
        <h1
          id="pacme-heading"
          className="max-w-4xl text-3xl font-bold tracking-tight text-pmr-offwhite sm:text-4xl lg:text-5xl"
        >
          {pacmeTitle}
        </h1>
      </PhotoCarousel>

      <PageShell>
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-pmr-muted">
          <p>{pacmeIntro}</p>
          <p>{pacmeStewardship}</p>
        </div>
        <PacmeFellows />
      </PageShell>
    </>
  );
}
