"use client";

import { FormEvent, useState } from "react";

interface DemoFormProps {
  children: React.ReactNode;
  successMessage?: string;
}

export function DemoForm({
  children,
  successMessage = "Thank you! This demo form does not submit data. In production, your message would be sent to PMR staff.",
}: DemoFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-pmr border-4 border-pmr-dark bg-pmr-teal p-6 text-pmr-dark">
        <p className="font-bold">{successMessage}</p>
      </div>
    );
  }

  return <form onSubmit={handleSubmit}>{children}</form>;
}
