const { colors } = require("./@community-next/design-system/theme/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './@community-next/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors,
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
