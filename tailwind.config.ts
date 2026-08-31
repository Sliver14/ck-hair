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
        brand: {
          dark: "#0F0F0F",
          charcoal: "#1A1A1A",
          muted: "#666666",
          lightMuted: "#999999",
          border: "#E5E5E5",
          sand: "#F7F5F0",
          cream: "#FAF8F5",
          accent: "#D4AF37",
          gold: "#C5A059",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
