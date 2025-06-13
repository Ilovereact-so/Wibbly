/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Poppins': ['Poppins', 'sans-serif'],
        'SerifDM':["DM Serif Text", 'serif']
      },
      dropShadow: {
        'cartoon': '0px 8px 0px #f3f3f3',
        'cartoonB': '0px 8px 0px #5e5e5e',
        'bottomRight': '-20px -12px 4px #CECFD0',
        'bottomRight_dark': '-17px -12px 4px #cecfd069',

      },
      screens: {
        'ss': '450px',
        '01ss': "545px",
        '02ss': "500px",
        'mm': '650px',
        '1mm': '600px',
        'll': '825px',
        '1ll':'910px',
        '1xl': '1420px',
        '01xl':'1370px',
        '02xl':'1220px',
        '3xl':'1600px',
        // orginal screens:
        'a1':"900px",
        'a2':"385px"


        // => @media (min-width: 640px) { ... }
      },
      backgroundImage: {
        'triangle': "url('/src/assets/Triangle.svg')",
        'MessagesCard': "url('/src/assets/MessageBg.png')",
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        heading: "var(--color-heading)",
        text: "var(--color-text)",
        background: "var(--color-background)",
      },
      transitionProperty:{
        "projects":"width, background-color"
      }
    },
  },
  plugins: [],
}

