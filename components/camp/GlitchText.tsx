interface GlitchTextProps {
  text: string;
  as?: "h1" | "h2" | "p";
  id?: string;
  className?: string;
}

/**
 * Psycho Glitch — FreeFrontend SCSS sample, expanded to plain CSS.
 * Markup: `<h1 data-text="…">…</h1>` (same as `<p data-text="PSYCHO">`).
 */
export function GlitchText({
  text,
  as: Tag = "h1",
  id,
  className = "",
}: GlitchTextProps) {
  return (
    <Tag id={id} className={`pmr-glitch ${className}`.trim()} data-text={text}>
      {text}
    </Tag>
  );
}
