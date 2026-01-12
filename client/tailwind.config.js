/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef7ee",
          100: "#fdecd7",
          200: "#fad5ae",
          300: "#f6b77a",
          400: "#f19044",
          500: "#ed7320",
          600: "#de5916",
          700: "#b84314",
          800: "#933618",
          900: "#772f17",
        },
      },
    },
  },
  plugins: [],
};
