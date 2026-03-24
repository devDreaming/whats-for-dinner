/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f5f3",
          100: "#d9e5e0",
          200: "#b3cbc2",
          300: "#8db1a3",
          400: "#4e7d6b",
          500: "#234338",
          600: "#1A3129",
          700: "#152821",
          800: "#101e19",
          900: "#0b1411",
        },
        secondary: {
          50: "#f8fced",
          100: "#f0f8d8",
          200: "#e6f4bf",
          300: "#DCF1A7",
          400: "#c8e47e",
          500: "#b0d450",
          600: "#8fb53a",
          700: "#6e8c2d",
          800: "#4e6320",
          900: "#2e3a13",
        },
        tertiary: {
          50: "#eef3f1",
          100: "#d4e0db",
          200: "#a9c1b8",
          300: "#7ea294",
          400: "#538371",
          500: "#234338",
          600: "#1c362d",
          700: "#162a23",
          800: "#0f1d18",
          900: "#09110e",
        },
      },
    },
  },
  plugins: [],
};
