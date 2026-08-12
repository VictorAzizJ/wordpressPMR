interface GlitchTextProps {
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
}

/**
 * Psycho Glitch — FreeFrontend SCSS sample, expanded to plain CSS.
 * Markup: `<h1 data-text="…">…</h1>` (same as `<p data-text="PSYCHO">`).
 */
export function GlitchText({
  text,
  as: Tag = "h1",
  className = "",
}: GlitchTextProps) {
  return (
    <Tag className={`pmr-glitch ${className}`.trim()} data-text={text}>
      {text}
    </Tag>
  );
}
