import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        svgSpin: {
          "0%": { "transform": "rotate(0deg)" },
          "100%": { "transform": "rotate(270deg)" }
        },
        dash: {
          "0%": {
            "stroke-dashoffset": "180"
          },
          "50%": {
            "stroke-dashoffset": "10",
            "transform": "rotate(135deg)"
          },
          "100%": {
            "stroke-dashoffset": "180",
            "transform": "rotate(450deg)"
          }
        },
        colors: {
          "0%": {
            "stroke": "#4285f4",
          },

          "25%": {
            "stroke": "#de3e35",
          },

          "50%": {
            "stroke": "#f7c223"
          },

          "75%": {
            "stroke": "#1b9a59"
          },

          "100%": {
            "stroke": "#4285f4"
          }
        }
      },
      animation: {
        svgSpin: "svgSpin 1.44s linear infinite",
        dash: "dash 1.44s ease-in-out infinite, colors 5.6s ease-in-out infinite",
      }
    },
  },
  plugins: [],
};
export default config;
