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
    extend: {
      height: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
        'small-screen': ['100vh /* fallback for Opera, IE and etc. */', '100svh'],
        'large-screen': ['100vh /* fallback for Opera, IE and etc. */', '100lvh'],
      },
      animation: {
        ping1: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        ping2: 'ping 1.75s cubic-bezier(0, 0, 0.2, 1) infinite 0.25s',
        ping3: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s',
      },
      keyframes: {
        ping: {
          '75%, 100%': {
            transform: 'scaleY(1.75) scaleX(1.15)',
            opacity: 0,
          },
        },
      },
    },
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
      '7xl': ['6rem', { lineHeight: '1' }],
      '8xl': ['7rem', { lineHeight: '1' }],
      '9xl': ['7.675rem', { lineHeight: '1' }],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#FFFFFF',
      navy: {
        500: '#1C274A',
        400: '#8D92A4',
      },
      yellow: {
        100: '#FCF8E8',
        200: '#F9F1D1',
        300: '#F6EAB9',
        400: '#F3E3A2',
        500: '#F0DC8B',
        700: '#E8CC6B',
        900: '#E2BE4C',
      },
      red: {
        100: '#FCEDE8',
        200: '#F9DAD1',
        300: '#F6C8B9',
        400: '#F3B5A2',
        500: '#F0A38B',
        700: '#E8856B',
        900: '#E2684C',
      },
      green: {
        100: '#F1FCE8',
        200: '#E2F9D1',
        300: '#D4F6B9',
        400: '#C5F3A2',
        500: '#B7F08B',
        700: '#9CE86B',
        900: '#83E24C',
      },
      blue: {
        100: '#E8FAFC',
        200: '#D1F4F9',
        300: '#B9EFF6',
        400: '#A2E9F3',
        500: '#8BE4F0',
        700: '#6BD7E8',
        900: '#4CCCE2',
      },
      violet: {
        100: '#F9F3FB',
        200: '#F3E7F8',
        300: '#EEDCF4',
        400: '#E8D0F1',
        500: '#E2C4ED',
        700: '#D5ADE4',
        900: '#C897DC',
      },
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        700: '#374151',
        900: '#111827',
      },
    },
  },
};
