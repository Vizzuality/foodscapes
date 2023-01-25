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
    fontSize: {
      xxs: ['0.625rem', { lineHeight: '1rem' }],
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.5rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3rem' }],
      '5xl': ['3.5rem', { lineHeight: '4rem' }],
      '6xl': ['5rem', { lineHeight: '5.7rem' }],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#FFFFFF',
      navy: '#1C274A',
      yellow: {
        0: '#FCF8E8',
        20: '#F9F1D1',
        30: '#F6EAB9',
        40: '#F3E3A2',
        50: '#F0DC8B',
        70: '#F3ECBE',
        90: '#F7F2D4',
      },
      red: {
        0: '#FCEDE8',
        20: '#F9DAD1',
        30: '#F6C8B9',
        40: '#F3B5A2',
        50: '#F0A38B',
        70: '#E8856B',
        90: '#E2684C',
      },
      green: {
        0: '#F1FCE8',
        20: '#E2F9D1',
        30: '#D4F6B9',
        40: '#C5F3A2',
        50: '#B7F08B',
        70: '#9CE86B',
        90: '#83E24C',
      },
      blue: {
        0: '#E8FAFC',
        20: '#D1F4F9',
        30: '#B9EFF6',
        40: '#A2E9F3',
        50: '#8BE4F0',
        70: '#6BD7E8',
        90: '#4CCCE2',
      },
      violet: {
        0: '#F9F3FB',
        20: '#F3E7F8',
        30: '#EEDCF4',
        40: '#E8D0F1',
        50: '#E2C4ED',
        70: '#D5ADE4',
        90: '#C897DC',
      },
    },
  },
};
