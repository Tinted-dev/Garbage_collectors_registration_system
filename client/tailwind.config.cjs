/** @type {import('tailwindcss').Config} */
// tailwind.config.js
// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#228B22",
        earth: "#e6f4ea",
        limegreen: "#a3d977",
      },
      fontFamily: {
        eco: ['"Segoe UI"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
