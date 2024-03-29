/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
      'white': '#FFFFFF',
      'dim-white': '#9699a3',
      'gray': '#d5d6db',
      'green': '#73daca',
      'light-blue': '#7dcfff',
      'black': '#0d1117',
      'light-black': '#24283b',
      'accent-blue': '#4CA0FF',
      'accent-violet': '#AE6DFF',
      'accent-green': '#09D18B',
      'accent-orange': '#F58216'
    },
    extend: {
      colors: {
        blue: colors.blue
      }
    },
  },
  plugins: [],
}
