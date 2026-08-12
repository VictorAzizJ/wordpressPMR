/** Soft CRT grain + scanlines. Decorative only. */
export function GrainOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50" aria-hidden>
      <div className="grain-texture absolute inset-0 animate-static opacity-[0.12]" />
      <div className="scanlines absolute inset-0 opacity-60" />
    </div>
  );
}
