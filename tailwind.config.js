const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'movie-card': '#343a40',
      },
      width: {
        '150': '150px',
        '200': '200px',
        '250': '250px',
        '300': '300px',
        '500': '500px',
      },
      height: {
        '150': '150px',
        '200': '200px',
        '250': '250px',
        '300': '300px',
        '500': '500px',
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
