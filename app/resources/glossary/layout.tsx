import type { Metadata } from "next";
import { resourceSections } from "@/lib/resources";

const glossary = resourceSections[2];

export const metadata: Metadata = {
  title: glossary.label,
  description: glossary.description,
};

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
