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
        theme1: "#11052c",
        theme2: "#3d087b",
        theme3: "#f43b86",
        theme4: "#ffe459",
        theme5: "#fff",
      },
      fontFamily: {
        arcade: "'Digital Numbers', sans-serif;",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
