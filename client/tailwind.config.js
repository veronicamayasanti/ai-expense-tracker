/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#004B44",
          dark: "#00322d",
          light: "#b1eee4",
          container: "#e6f4f2",
        },
        surface: {
          DEFAULT: "#f8f9fa",
          container: "#edeeef",
          lowest: "#ffffff",
        }
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
}
