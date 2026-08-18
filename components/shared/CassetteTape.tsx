/** Decorative cassette inspired by https://codepen.io/banik/pen/qMVYXL */
export function CassetteTape({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative mx-auto w-full max-w-md overflow-x-clip ${className}`}
      aria-hidden
    >
      <div className="relative rounded-pmr border-4 border-pmr-dark bg-pmr-charcoal p-3 shadow-cassette sm:p-4">
        <div className="absolute inset-x-0 top-3 mx-auto h-1 w-[89%] rounded-full bg-pmr-cream/20" />
        <div
          className="relative mx-auto mt-2 min-h-[6.75rem] w-[90%] overflow-hidden rounded-lg border-4 border-pmr-dark p-2 sm:min-h-[8.75rem] sm:p-3"
          style={{
            background: `linear-gradient(
              #e6584c 8%, #f5f0eb 8%,
              #f5f0eb 30%, #4b4b56 30%,
              #4b4b56 31.5%, #f5f0eb 31.5%,
              #f5f0eb 36%, #4b4b56 36%,
              #4b4b56 37.5%, #f5f0eb 37.5%,
              #f5f0eb 45%, #4b4b56 45%,
              #4b4b56 55%, #f5f0eb 55%,
              #f5f0eb 65%, #4b4b56 65%,
              #4b4b56 75%, #f5f0eb 75%,
              #f5f0eb 82%, #4b4b56 82%
            )`,
          }}
        >
          <span className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded bg-pmr-charcoal font-mono text-xs font-bold text-pmr-offwhite sm:left-4 sm:top-4 sm:h-7 sm:w-7 sm:text-sm">
            B
          </span>
          {/* w-fit + shrink-0 keeps hubs circular; flex must not squash reels/gears */}
          <div className="relative mx-auto mt-10 w-fit max-w-full min-w-[70%] rounded border-4 border-pmr-dark bg-pmr-charcoal p-2 sm:mt-16 sm:p-4">
            <div className="relative flex items-center justify-between gap-2 sm:gap-3">
              <div className="relative h-10 w-10 shrink-0 rounded-full border-4 border-pmr-dark bg-pmr-silver shadow-[0_0_0_3px_#4b4b56,0_0_0_5px_#353535] sm:h-14 sm:w-14">
                <div className="absolute inset-2 rounded-full bg-pmr-teal" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-6 w-1.5 shrink-0 animate-gears rounded-sm bg-pmr-teal shadow-[0_0_0_2px_#353535] sm:h-8 sm:w-2" />
                </div>
              </div>
              <div className="relative h-10 w-14 shrink-0 overflow-hidden border-4 border-pmr-dark bg-pmr-teal/80 sm:h-16 sm:w-24">
                <div className="absolute -left-6 top-0.5 h-8 w-8 animate-spooling rounded-full border-4 border-pmr-dark bg-pmr-silver sm:-left-8 sm:top-1 sm:h-12 sm:w-12" />
                <div className="absolute -right-6 top-0.5 h-8 w-8 animate-spooling rounded-full border-4 border-pmr-dark bg-pmr-silver [animation-direction:alternate-reverse] sm:-right-8 sm:top-1 sm:h-12 sm:w-12" />
              </div>
              <div className="relative h-10 w-10 shrink-0 rounded-full border-4 border-pmr-dark bg-pmr-silver shadow-[0_0_0_3px_#4b4b56,0_0_0_5px_#353535] sm:h-14 sm:w-14">
                <div className="absolute inset-2 rounded-full bg-pmr-teal" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-6 w-1.5 shrink-0 animate-gears rounded-sm bg-pmr-teal shadow-[0_0_0_2px_#353535] sm:h-8 sm:w-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-3 left-[2%] -z-10 h-8 w-[104%] rounded-pmr border-4 border-pmr-dark bg-pmr-charcoal" />
      </div>
      <p className="mt-4 text-center font-mono text-xs font-medium text-pmr-charcoal/60">
        PMR — preserving movement memory on tape &amp; digital
      </p>
    </div>
  );
}
