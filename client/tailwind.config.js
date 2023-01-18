const forms = require('@tailwindcss/forms');
const lineClamp = require('@tailwindcss/line-clamp');
const { fontFamily } = require('tailwindcss/defaultTheme');

/**
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: [
    './src/components/**/*.@(tsx|ts)',
    './src/containers/**/*.@(tsx|ts)',
    './src/pages/**/*.tsx',
  ],
  plugins: [forms, lineClamp],
  theme: {
    fontFamily: {
      sans: ['var(--font-public-sans)', ...fontFamily.sans],
      display: ['var(--font-domine)', ...fontFamily.sans],
    },
  },
};
