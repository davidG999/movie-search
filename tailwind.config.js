const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'movie-card': '#343a40',
      },
      width: {
        '50': '200px',
      },
      scale: {
        '103': '1.03',
      }
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('pages', '& > li')
      addVariant('removeIcons', '& > img')
    })
  ],
}
