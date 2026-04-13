import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A", // matte black
        secondary: "#1A1A1A", // brushed steel gray
        text: {
          DEFAULT: "#FFFFFF", // pure white
          muted: "#9CA3AF", // subtle gray
        },
        gold: "#D4AF37", // warm gold
        teal: "#0F4C5C", // deep teal
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        space: ["var(--font-space-grotesk)"],
        bebas: ["var(--font-bebas)", "sans-serif"],
        gondens: ["var(--font-big-shoulders)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
