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
        'bottomRight': '-20px -12px 4px #CECFD0',
      },
      screens: {
        'ss': '450px',
        'mm': '650px',
        'll': '825px',
        '1xl': '1420px',
        '01xl':'1360px'
        // => @media (min-width: 640px) { ... }
      },
      backgroundImage: {
        'triangle': "url('/src/assets/Triangle.svg')",
        'MessagesCard': "url('/src/assets/MessageBg.png')",
      }
    },
  },
  plugins: [],
}

