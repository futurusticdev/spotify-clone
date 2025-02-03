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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        "spotify-bar": {
          "0%, 100%": {
            height: "4px",
            opacity: ".3",
          },
          "50%": {
            height: "16px",
            opacity: "1",
          },
        },
      },
      animation: {
        "spotify-bar": "spotify-bar 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
