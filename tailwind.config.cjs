/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
      'white': '#FFFFFF',
      'dim-white': '#9699a3',
      'gray': '#d5d6db',
      'green': '#73daca',
      'light-blue': '#7dcfff',
      'black': '#1a1b26',
      'light-black': '#24283b'
    },
    extend: {
      fontFamily: {
        'poppins': ['"Poppins"', '"bold"']
      }
    },
  },
  plugins: [],
}
