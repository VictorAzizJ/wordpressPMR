interface TapeLabelProps {
  children: React.ReactNode;
  as?: "h2" | "h3" | "p";
  className?: string;
  id?: string;
}

/** Mono “tape label” section header used across the Camp page. */
export function TapeLabel({
  children,
  as: Tag = "h2",
  className = "",
  id,
}: TapeLabelProps) {
  return (
    <Tag
      id={id}
      className={`inline-block border-2 border-pmr-border bg-pmr-black px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-pmr-green sm:text-sm ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}

export function XeroxDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`xerox-divider h-1 w-full ${className}`.trim()}
      aria-hidden
    />
  );
}
