import { ButtonHTMLAttributes } from 'react';

// Button props
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  theme: 'green' | 'red' | 'yellow' | 'danger';
  size: 'xs' | 's' | 'base' | 'l' | 'xl';
  className?: string;
  selected?: boolean;
  unselected?: boolean;
};
