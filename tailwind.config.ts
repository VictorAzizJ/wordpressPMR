import type { Config } from "tailwindcss";

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
          green: "#39d353",
          "green-bright": "#6eff7a",
          black: "#0b0d0b",
          elevated: "#151a15",
          offwhite: "#e8ede6",
          muted: "#8a9a88",
          coral: "#e6584c",
          border: "#2a352a",
          // Legacy aliases → CRT system (prefer green / elevated / black / muted)
          teal: "#39d353",
          charcoal: "#151a15",
          dark: "#0b0d0b",
          silver: "#8a9a88",
          cream: "#1c231c",
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
        inset: "inset 0 0 0 4px #0b0d0b",
        cassette: "0 4px 0 0 #0b0d0b, 0 8px 24px rgba(11, 13, 11, 0.45)",
        glow: "0 0 12px rgba(57, 211, 83, 0.35)",
      },
      animation: {
        static: "static 2s steps(1) infinite",
        gears: "gears 3.5s linear infinite alternate",
        spooling: "spooling 3.5s linear infinite alternate",
        flicker: "flicker 4s linear infinite",
        "tracking-glitch": "tracking-glitch 6s steps(2) infinite",
        "reel-spin": "gears 2.8s linear infinite",
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
        spooling: {
          from: {
            boxShadow:
              "0 0 0 0.5em #2a352a, 0 0 0 calc(0.5em + 3px) #0b0d0b",
          },
          to: {
            boxShadow:
              "0 0 0 2.5em #2a352a, 0 0 0 calc(2.5em + 3px) #0b0d0b",
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
