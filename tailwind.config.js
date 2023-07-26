/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Poppins': ['Poppins', 'sans-serif'],
      },
      dropShadow: {
        'cartoon': '0px 8px 0px #f3f3f3',
        'cartoonB': '0px 8px 0px #5e5e5e',
      },
      screens: {
        'ss': '400px',
        // => @media (min-width: 640px) { ... }
      },
    },
  },
  plugins: [],
}

