export const THEMES = {
  filled: 'filled',
  dark: 'dark',
  light: 'light',
  'dark-light': 'dark-light',
  'light-dark': 'light-dark',
} as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];
