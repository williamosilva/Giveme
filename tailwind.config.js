/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Raleway: ["Raleway", "sans-serif"],
        Sora: ["Sora", "sans-serif"],
        DM: ["DM Serif Display", "serif"],
      },
    },
  },
  plugins: [],
};
