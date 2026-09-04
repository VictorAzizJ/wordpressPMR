import type { Config } from "tailwindcss";

/** RGB-channel tokens from `app/globals.css` so camp can rebind CRT aliases. */
const pmr = (token: string) => `rgb(var(${token}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pmr: {
          teal: pmr("--pmr-teal"),
          coral: pmr("--pmr-coral"),
          charcoal: pmr("--pmr-charcoal"),
          dark: pmr("--pmr-dark"),
          offwhite: pmr("--pmr-offwhite"),
          silver: pmr("--pmr-silver"),
          cream: pmr("--pmr-cream"),
          blue: pmr("--pmr-blue"),
          tangerine: pmr("--pmr-tangerine"),
          // CRT aliases → cassette
          green: pmr("--pmr-green"),
          "green-bright": pmr("--pmr-green-bright"),
          black: pmr("--pmr-black"),
          elevated: pmr("--pmr-elevated"),
          muted: pmr("--pmr-muted"),
          border: pmr("--pmr-border"),
        },
      },
      fontFamily: {
        sans: [
          "var(--font-space-grotesk)",
          "Space Grotesk",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-ibm-plex-mono)",
          "IBM Plex Mono",
          "ui-monospace",
          "monospace",
        ],
        glitch: [
          "var(--font-bungee-shade)",
          "Bungee Shade",
          "cursive",
        ],
      },
      borderRadius: {
        pmr: "10px",
      },
      boxShadow: {
        inset: "inset 0 0 0 4px rgb(var(--pmr-dark))",
        cassette:
          "0 4px 0 0 rgb(var(--pmr-dark)), 0 8px 24px rgb(var(--pmr-dark) / 0.25)",
        glow: "0 0 12px rgb(var(--pmr-green) / 0.35)",
      },
      animation: {
        static: "static 2s steps(1) infinite",
        gears: "gears 3.5s linear infinite alternate",
        spooling: "spooling 3.5s linear infinite alternate",
        flicker: "flicker 4s linear infinite",
        "tracking-glitch": "tracking-glitch 6s steps(2) infinite",
        "reel-spin": "gears 2.8s linear infinite",
        "reel-slow": "reel-slow 10s linear infinite",
      },
      keyframes: {
        static: {
          "0%, 100%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
        },
        gears: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(2160deg)" },
        },
        "reel-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        spooling: {
          from: {
            boxShadow:
              "0 0 0 0.5em #5a5a5a, 0 0 0 calc(0.5em + 3px) #353535",
          },
          to: {
            boxShadow:
              "0 0 0 2.5em #5a5a5a, 0 0 0 calc(2.5em + 3px) #353535",
          },
        },
        flicker: {
          "0%, 92%, 100%": { opacity: "1" },
          "93%": { opacity: "0.85" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.7" },
          "97%": { opacity: "1" },
        },
        "tracking-glitch": {
          "0%, 90%, 100%": { transform: "translateX(0)", opacity: "0.12" },
          "91%": { transform: "translateX(-2px)", opacity: "0.25" },
          "92%": { transform: "translateX(2px)", opacity: "0.18" },
          "93%": { transform: "translateX(0)", opacity: "0.12" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
