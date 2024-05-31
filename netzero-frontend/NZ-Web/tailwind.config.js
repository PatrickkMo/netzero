/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      boxShadow: {
        '1xl': '1px 1px 4px rgba(0, 0, 0, 0.15)',
      }
    },

    fontFamily: {
      'Inter': ['Inter'],
    }
  },
  plugins: [],
}

