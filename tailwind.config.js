const defaultTheme = require('tailwindcss/defaultTheme')

const { colors, backgroundImage, boxShadow } = require("./@community-next/design-system/theme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './@community-next/design-system/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors,
    extend: {
      fontFamily: {
        'sans': ['Inter', ...defaultTheme.fontFamily.sans],
      },
      boxShadow,
      backgroundImage,
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
