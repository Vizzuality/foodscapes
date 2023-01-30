import { ButtonHTMLAttributes } from 'react';

export interface AnchorButtonProps {
  theme: 'green' | 'red' | 'yellow' | 'danger';
  size: 'xs' | 's' | 'base' | 'l' | 'xl';
  className?: string;
}

// Button props
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorButtonProps & {
    href?: undefined;
  };
