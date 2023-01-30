import { FC } from 'react';

import cx from 'classnames';

import { THEME, SIZE } from './constants';
import type { ButtonProps } from './types';

function buildClassName({ className, disabled, size, theme }) {
  return cx({
    'flex items-center justify-center rounded-3xl': true,
    [THEME[theme]]: true,
    [SIZE[size]]: true,
    [className]: !!className,
    // 'opacity-50 pointer-events-none': disabled,
  });
}

export const Button: FC<ButtonProps> = ({
  children,
  theme = 'red',
  size = 'base',
  className,
  disabled,
  ...restProps
}: ButtonProps) => (
  <button
    type="button"
    className={buildClassName({
      className,
      disabled,
      size,
      theme,
    })}
    disabled={disabled}
    {...restProps}
  >
    {children}
  </button>
);

export default Button;
