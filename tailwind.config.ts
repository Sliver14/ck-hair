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
          dark: "#2B2118",          // Dark Brown for text, logo, primary actions
          charcoal: "#3E3025",      // Deep warm brown
          muted: "#756558",         // Readable warm taupe-brown
          lightMuted: "#A39488",    // Soft muted taupe
          border: "#E5D7C9",        // Harmonious warm border
          sand: "#EAD7C3",          // Background #EAD7C3 (Secondary / Accent background)
          cream: "#FAF6F2",         // Background #FAF6F2 (Primary background)
          offwhite: "#F5F5F5",      // Off white #F5F5F5
          pink: "#B76E79",          // Pink accent #B76E79
          accent: "#B76E79",        // Pink accent #B76E79
          gold: "#B76E79",          // Rose Gold / Pink accent #B76E79
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
