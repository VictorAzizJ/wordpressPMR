import Link from "next/link";
import { CassetteTape } from "@/components/shared/CassetteTape";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center">
      <CassetteTape className="max-w-xs opacity-80" />
      <h1 className="mt-8 text-3xl font-bold text-pmr-dark">Tape not found</h1>
      <p className="mt-3 text-pmr-charcoal">
        This page isn&apos;t in the archive yet. Try searching or return home.
      </p>
      <Link href="/" className="pmr-btn mt-8">
        Back to home
      </Link>
    </div>
  );
}
