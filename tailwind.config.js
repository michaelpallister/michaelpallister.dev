const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'light-grey': '#D6D6D6',
      aureolin: '#FFEE32',
      'cyber-yellow': '#FFD100',
      'eerie-black': '#202020',
      jet: '#333533',
    },
    extend: {
      fontFamily: {
        sans: ['Raleway', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
