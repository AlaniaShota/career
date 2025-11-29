/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gstore-blue": "#1E40AF",
        "gstore-midnight": "#0F172A",
        "magic-gold": "#FACC15",
        "soft-silver": "#DDE2E9",
        "soft-sky": "rgba(203, 222, 248, 1)",
      },
      backgroundColor: {
        "magic-gold-bg": "#FACC15",
      },
    },
  },
  plugins: [],
};
