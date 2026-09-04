import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { AboutPageBody } from "@/components/about/AboutPageBody";

const aboutDescription =
  "Mission, vision, values, and people behind People's Media Record — an archival and educational hub for community media in Philadelphia.";

export const metadata: Metadata = {
  title: "About",
  description: aboutDescription,
};

export default function AboutPage() {
  return (
    <>
      <section
        className="relative isolate overflow-hidden border-b-4 border-pmr-border bg-pmr-dark"
        aria-labelledby="about-heading"
      >
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/images/home/hero-01-we-are.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pmr-dark/80 via-pmr-dark/45 to-pmr-dark/20"
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex min-h-[min(52svh,28rem)] max-w-7xl flex-col justify-end px-4 py-12 sm:px-6 sm:py-16">
          <h1
            id="about-heading"
            className="max-w-4xl text-3xl font-bold tracking-tight text-pmr-offwhite sm:text-4xl lg:text-5xl"
          >
            About People&apos;s Media Record
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-pmr-cream sm:text-lg">
            {aboutDescription}
          </p>
        </div>
      </section>

      <PageShell>
        <AboutPageBody />
      </PageShell>
    </>
  );
}
