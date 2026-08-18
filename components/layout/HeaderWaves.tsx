const analogPath =
  "M0 32 C50 8 150 56 200 32 S350 8 400 32 S550 56 600 32 S750 8 800 32 S950 56 1000 32 S1150 8 1200 32";

const digitalPath =
  "M0 32 H40 V12 H80 V52 H120 V12 H160 V52 H200 V12 H240 V52 H280 V12 H320 V52 H360 V12 H400 V52 H440 V12 H480 V52 H520 V12 H560 V52 H600 V12 H640 V52 H680 V12 H720 V52 H760 V12 H800 V52 H840 V12 H880 V52 H920 V12 H960 V52 H1000 V12 H1040 V52 H1080 V12 H1120 V52 H1160 V12 H1200 V32";

/** Slow analog sine + digital square band behind the nav. Frozen when reduced motion. */
export function HeaderWaves() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="pmr-wave-drift absolute left-0 top-[18%] h-12 w-[200%] text-pmr-teal/30">
        <WaveSvg path={analogPath} />
      </div>
      <div className="pmr-wave-drift-digital absolute bottom-1 left-0 h-10 w-[200%] text-pmr-silver/25">
        <WaveSvg path={digitalPath} square />
      </div>
    </div>
  );
}

function WaveSvg({ path, square = false }: { path: string; square?: boolean }) {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 2400 64"
      preserveAspectRatio="none"
      focusable="false"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={square ? 1.75 : 2.25}
        strokeLinejoin={square ? "miter" : "round"}
        strokeLinecap={square ? "square" : "round"}
        style={square ? { shapeRendering: "crispEdges" } : undefined}
      >
        <path d={path} />
        <path d={path} transform="translate(1200 0)" />
      </g>
    </svg>
  );
}
