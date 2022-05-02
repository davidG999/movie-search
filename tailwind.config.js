const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'movie-card': '#343a40',
        'high-rating': '#3498db',
        'low-rating': '#e74c3c',
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
    plugin(function({ addVariant }) {
      addVariant('pages', '& > li')
    })
],
}
