/** @type {import('tailwindcss').Config} */
const path = require('path')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    path.resolve(__dirname, './node_modules/litepie-datepicker/**/*.js'),
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        128: '32rem',
        144: '36rem',
      },
      height: {
        128: '32rem',
      },
      colors: {
        // Change with you want it
        'litepie-primary': colors.lightBlue, // color system for light mode
        'litepie-secondary': colors.coolGray, // color system for dark mode
      },
    },
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      textOpacity: ['disabled'],
      textColor: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
