/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: "'Roboto', sans-serif", // Adds a new `font-display` class,
        italic: "'Hachi Maru Pop', cursive"
      }
    }
  },
  plugins: [require("daisyui")],
}

