import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme1: "#0d1b2a",
        theme2: "#1b263b",
        theme3: "#415a77",
        theme4: "#778da9",
        theme5: "#e0e1dd",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
