/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'shop-bg': '#111315',
        'shop-panel': '#191B1F',
        'shop-blue': '#3772FF',
        'shop-green': '#B5FF00',
        'shop-border': '#2A2C31',
        'shop-text-muted': '#808191',
      },
    },
  },
  plugins: [],
};