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
        brand: {
          black: "#1B1B1B",
          dark: "#121212",
          surface: "#181818",
          card: "#222222",
          gold: "#C5A059",
          "gold-light": "#D8B369",
          "gold-dark": "#9E7B36",
          ivory: "#F7F3E7",
          "ivory-dark": "#EDE7D3",
          white: "#FFFFFF",
          muted: "#8E8E93",
          border: "rgba(197, 160, 89, 0.25)",
        },
      },
      fontFamily: {
        madani: ["Madani Arabic", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        "gold-glow": "0 0 25px rgba(197, 160, 89, 0.2)",
        "gold-glow-lg": "0 0 45px rgba(197, 160, 89, 0.35)",
        luxury: "0 20px 40px -15px rgba(0, 0, 0, 0.08)",
        "luxury-dark": "0 20px 40px -15px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};
export default config;

