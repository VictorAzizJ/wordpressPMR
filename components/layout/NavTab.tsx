export function navTabClass() {
  return "relative inline-flex h-full min-h-11 items-center gap-1 px-3 text-base font-semibold leading-none text-pmr-offwhite transition hover:text-pmr-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pmr-coral/70";
}

/** Teal foot on every tab; tangerine bar on the current section. */
export function NavTabIndicators({ active }: { active: boolean }) {
  return (
    <>
      <span
        className={`pointer-events-none absolute inset-x-1.5 bottom-0 h-2 ${
          active ? "bg-pmr-tangerine" : "bg-pmr-teal"
        }`}
        aria-hidden
      />
      {active ? (
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[3px] bg-pmr-tangerine"
          aria-hidden
        />
      ) : null}
    </>
  );
}
