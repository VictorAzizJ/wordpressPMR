/** Compact cassette mark for the header (~44px). Hubs spin slowly; freeze with reduced motion. */
export function CassetteLogo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative h-11 w-[4.5rem] shrink-0 ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0 rounded-md border-[3px] border-pmr-dark bg-pmr-charcoal shadow-[2px_2px_0_0_rgb(var(--pmr-dark))]" />
      <div className="absolute inset-x-[5px] top-[5px] h-0.5 rounded-full bg-pmr-cream/25" />
      <div className="absolute inset-[7px] flex items-center justify-between gap-1 rounded-sm border-2 border-pmr-dark bg-pmr-cream px-0.5">
        <Hub />
        <div className="h-1.5 flex-1 rounded-[1px] bg-pmr-coral" />
        <Hub />
      </div>
    </div>
  );
}

function Hub() {
  return (
    <div className="relative h-5 w-5 shrink-0 rounded-full border-2 border-pmr-dark bg-pmr-silver">
      <div className="absolute inset-[2px] rounded-full bg-pmr-teal" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-3 w-0.5 origin-center animate-reel-slow rounded-sm bg-pmr-teal shadow-[0_0_0_1px_#353535]" />
      </div>
    </div>
  );
}
