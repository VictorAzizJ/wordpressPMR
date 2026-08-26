import type { ReactNode } from "react";

interface SignalGlitchBgProps {
  children: ReactNode;
  className?: string;
}

/**
 * Slow signal/VHS-style background interference.
 * Content stays readable and still; only backdrop layers glitch.
 */
export function SignalGlitchBg({
  children,
  className = "",
}: SignalGlitchBgProps) {
  return (
    <div
      className={`signal-glitch-bg relative isolate overflow-hidden ${className}`.trim()}
    >
      <div className="signal-glitch-layer pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
