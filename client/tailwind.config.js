/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
         montserratAlt: ["Montserrat Alternates", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        poiret: ["Poiret One", "cursive"],
        redrose: ["Red Rose", "sans-serif"],
      },
    },
  },
  plugins: [],
}

