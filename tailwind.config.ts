import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        emerald: { DEFAULT: "#183B38", deep: "#0E2725", ink: "#0A1D1B" },
        champagne: { DEFAULT: "#D5B98C", soft: "#C4A87C" },
        ivory: { DEFAULT: "#F3EEE5", warm: "#EDE6D8" },
        rose: { DEFAULT: "#B76E62" },
        graphite: { DEFAULT: "#242522", deep: "#1A1B18" },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "Avenir Next", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
