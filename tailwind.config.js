/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        black: '#000000',
        white: '#ffffff',
        bg_default: "#f2f2f2",
        primary: "#880e4f",
        primaryDark: "#560027",
        primaryLight: "#bc4778",
      }
    },
  },
  plugins: [],
}

