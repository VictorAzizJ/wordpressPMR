/** Decorative cassette inspired by https://codepen.io/banik/pen/qMVYXL */
export function CassetteTape({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative mx-auto w-full max-w-md ${className}`}
      aria-hidden
    >
      <div className="relative rounded-pmr border-4 border-pmr-dark bg-pmr-charcoal p-4 shadow-cassette">
        <div className="absolute inset-x-0 top-3 mx-auto h-1 w-[89%] rounded-full bg-white/10" />
        <div
          className="relative mx-auto mt-2 w-[90%] overflow-hidden rounded-lg border-4 border-pmr-dark p-3"
          style={{
            background: `linear-gradient(
              #e6584c 8%, #f8f8f8 8%,
              #f8f8f8 30%, #484848 30%,
              #484848 31.5%, #f8f8f8 31.5%,
              #f8f8f8 36%, #484848 36%,
              #484848 37.5%, #f8f8f8 37.5%,
              #f8f8f8 45%, #484848 45%,
              #484848 55%, #f8f8f8 55%,
              #f8f8f8 65%, #484848 65%,
              #484848 75%, #f8f8f8 75%,
              #f8f8f8 82%, #484848 82%
            )`,
            minHeight: "140px",
          }}
        >
          <span className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded bg-pmr-charcoal text-sm font-bold text-pmr-offwhite">
            B
          </span>
          <div className="relative mx-auto mt-16 w-[70%] rounded border-4 border-pmr-dark bg-pmr-charcoal p-4">
            <div className="relative flex items-center justify-between">
              <div className="relative h-14 w-14 rounded-full border-4 border-pmr-dark bg-pmr-silver shadow-[0_0_0_3px_#4b4b56,0_0_0_5px_#353535]">
                <div className="absolute inset-2 rounded-full bg-pmr-teal" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-2 animate-gears rounded-sm bg-pmr-teal shadow-[0_0_0_2px_#353535]" />
                </div>
              </div>
              <div className="relative h-16 w-24 overflow-hidden border-4 border-pmr-dark bg-pmr-teal">
                <div className="absolute -left-8 top-1 h-12 w-12 animate-spooling rounded-full border-4 border-pmr-dark bg-pmr-silver" />
                <div className="absolute -right-8 top-1 h-12 w-12 animate-spooling rounded-full border-4 border-pmr-dark bg-pmr-silver [animation-direction:alternate-reverse]" />
              </div>
              <div className="relative h-14 w-14 rounded-full border-4 border-pmr-dark bg-pmr-silver shadow-[0_0_0_3px_#4b4b56,0_0_0_5px_#353535]">
                <div className="absolute inset-2 rounded-full bg-pmr-teal" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-2 animate-gears rounded-sm bg-pmr-teal shadow-[0_0_0_2px_#353535]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-3 left-[2%] h-8 w-[104%] rounded-pmr border-4 border-pmr-dark bg-pmr-charcoal -z-10" />
      </div>
      <p className="mt-4 text-center text-xs font-medium text-pmr-charcoal/60">
        PMR — preserving movement memory on tape &amp; digital
      </p>
    </div>
  );
}
