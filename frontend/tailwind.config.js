/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fffbeb',
          500: '#ffd700',
          600: '#ffb000',
          700: '#ff8c00',
          900: '#b8860b',
        },
        secondary: {
          500: '#1a1a1a',
          600: '#111111',
        },
        batman: {
          black: '#000000',
          dark: '#111111',
          gray: '#1a1a1a',
          gold: '#ffd700',
          yellow: '#ffb000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

