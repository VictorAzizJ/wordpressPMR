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
          teal: "#8fe2ec",
          coral: "#e6584c",
          charcoal: "#4b4b56",
          dark: "#353535",
          offwhite: "#f8f8f8",
          silver: "#adadad",
          cream: "#f5f0eb",
        },
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "Roboto", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pmr: "10px",
      },
      boxShadow: {
        inset: "inset 0 0 0 4px #353535",
        cassette: "0 4px 0 0 #353535, 0 8px 24px rgba(53, 53, 53, 0.25)",
      },
      animation: {
        static: "static 2s steps(1) infinite",
        gears: "gears 3.5s linear infinite alternate",
        spooling: "spooling 3.5s linear infinite alternate",
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
              "0 0 0 0.5em #5a5a5a, 0 0 0 calc(0.5em + 3px) #353535",
          },
          to: {
            boxShadow:
              "0 0 0 2.5em #5a5a5a, 0 0 0 calc(2.5em + 3px) #353535",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
