"use client";

import { useEffect } from "react";
import Link from "next/link";

export function HashRedirect({ href }: { href: string }) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <p className="text-pmr-muted">
      Continue to{" "}
      <Link href={href} className="font-bold text-pmr-coral hover:underline">
        About
      </Link>
      .
    </p>
  );
}
