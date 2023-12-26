/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Heebo", "Montserrat", "sans-serif"],
    },
    extend: {
      width: {
        '18': '4.5rem'
      },
      height: {
        '18': '4.5rem'
      },
      borderWidth: {
        '1': '1px'
      }
    },
  },
  plugins: [],
}