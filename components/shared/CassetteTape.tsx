/** Decorative cassette inspired by https://codepen.io/banik/pen/qMVYXL */
export function CassetteTape({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative mx-auto w-full max-w-md ${className}`}
      aria-hidden
    >
      <div className="relative rounded-pmr border-4 border-pmr-border bg-pmr-elevated p-4 shadow-cassette">
        <div className="absolute inset-x-0 top-3 mx-auto h-1 w-[89%] rounded-full bg-pmr-green/20" />
        <div
          className="relative mx-auto mt-2 w-[90%] overflow-hidden rounded-lg border-4 border-pmr-border p-3"
          style={{
            background: `linear-gradient(
              #e6584c 8%, #e8ede6 8%,
              #e8ede6 30%, #2a352a 30%,
              #2a352a 31.5%, #e8ede6 31.5%,
              #e8ede6 36%, #2a352a 36%,
              #2a352a 37.5%, #e8ede6 37.5%,
              #e8ede6 45%, #2a352a 45%,
              #2a352a 55%, #e8ede6 55%,
              #e8ede6 65%, #2a352a 65%,
              #2a352a 75%, #e8ede6 75%,
              #e8ede6 82%, #2a352a 82%
            )`,
            minHeight: "140px",
          }}
        >
          <span className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded bg-pmr-elevated font-mono text-sm font-bold text-pmr-offwhite">
            B
          </span>
          {/* w-fit + shrink-0 keeps hubs circular; flex must not squash reels/gears */}
          <div className="relative mx-auto mt-16 w-fit min-w-[70%] rounded border-4 border-pmr-border bg-pmr-elevated p-4">
            <div className="relative flex items-center justify-between gap-3">
              <div className="relative h-14 w-14 shrink-0 rounded-full border-4 border-pmr-border bg-pmr-muted shadow-[0_0_0_3px_#2a352a,0_0_0_5px_#0b0d0b]">
                <div className="absolute inset-2 rounded-full bg-pmr-green" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-2 shrink-0 animate-gears rounded-sm bg-pmr-green shadow-[0_0_0_2px_#0b0d0b]" />
                </div>
              </div>
              <div className="relative h-16 w-24 shrink-0 overflow-hidden border-4 border-pmr-border bg-pmr-green/80">
                <div className="absolute -left-8 top-1 h-12 w-12 animate-spooling rounded-full border-4 border-pmr-border bg-pmr-muted" />
                <div className="absolute -right-8 top-1 h-12 w-12 animate-spooling rounded-full border-4 border-pmr-border bg-pmr-muted [animation-direction:alternate-reverse]" />
              </div>
              <div className="relative h-14 w-14 shrink-0 rounded-full border-4 border-pmr-border bg-pmr-muted shadow-[0_0_0_3px_#2a352a,0_0_0_5px_#0b0d0b]">
                <div className="absolute inset-2 rounded-full bg-pmr-green" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-2 shrink-0 animate-gears rounded-sm bg-pmr-green shadow-[0_0_0_2px_#0b0d0b]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-3 left-[2%] -z-10 h-8 w-[104%] rounded-pmr border-4 border-pmr-border bg-pmr-elevated" />
      </div>
      <p className="mt-4 text-center font-mono text-xs font-medium text-pmr-muted">
        PMR — preserving movement memory on tape &amp; digital
      </p>
    </div>
  );
}
