/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { 
        'roboto': ['robotoblack', "system-ui"], 
        'biber': ['biber', "system-ui"], 
        'poppins': ["poppins"], 
      },
    },
  },
  plugins: [],
}