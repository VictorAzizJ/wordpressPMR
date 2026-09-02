import type { Metadata } from "next";
import { archiveBrowse } from "@/lib/archive";

export const metadata: Metadata = {
  title: archiveBrowse.title,
  description: archiveBrowse.intro,
};

export default function ArchiveBrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
