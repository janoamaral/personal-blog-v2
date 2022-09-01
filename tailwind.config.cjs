/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
      'white': '#FFFFFF',
      'gray': '#d5d6db',
      'green': '#73daca',
      'light-blue': '#7dcfff',
      'black': '#1a1b26'
    },
    extend: {
      fontFamily: {
        'poppins': ['"Poppins"', '"bold"']
      }
    },
  },
  plugins: [],
}
