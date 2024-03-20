/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        on_desktop: { "min": '1400px' },
        on_mobile: { "max": '1399px' },
      },
      backgroundColor: {
        DEFAULT: '#1a1a1a',
        menuBG: '#404040',
        cardBG: '#2a2a2a',
        logoBG: '#d1d1d1',
        ashGray: '#ACBEA3',
        paleDogwood: '#FFD4CA',
        redwood: '#AD5D4E',
        chineseViolet: '#996888',
        eerieBlack: '#1A1A1A'
      },
      colors: {
        transparent: 'transparent',
        ashGray: '#ACBEA3',
        paleDogwood: '#FFD4CA',
        redwood: '#AD5D4E',
        chineseViolet: '#996888',
        eerieBlack: '#1A1A1A'
      },
      textColor: {
        DEFAULT: '#c6c6c6',
        silver: '#c6c6c6',
        spending: '#ed0000',
        income: '#00dc00',
        ashGray: '#ACBEA3',
        paleDogwood: '#FFD4CA',
        redwood: '#AD5D4E',
        chineseViolet: '#996888',
        eerieBlack: '#1A1A1A'
      },
      fontSize: {
        DEFAULT: '1.5rem',
        mobile: '1.25rem',
        title: '5rem',
        xxlheader: '4.25rem',
        xlheader: '3.75rem',
        lheader: '3.25rem',
        header: '2.75rem',
        subheader: '2.25rem',
        xxl: '2rem',
        xl: '1.75rem',
        l: '1.5rem',
        m: '1.25rem',
        s: '1rem',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        menu: '1rem',
        card: '1rem',
        image: '1rem',
      },
    },
  },
  plugins: [],
}