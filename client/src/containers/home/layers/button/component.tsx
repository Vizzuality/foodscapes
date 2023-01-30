import { FC } from 'react';

import cn from 'lib/classnames';

import { THEME, SIZE } from './constants';
import type { ButtonProps } from './types';

function buildClassName({ disabled, selected, unselected, size, theme }) {
  return cn({
    'flex items-center justify-center rounded-3xl relative z-10 whitespace-nowrap': true,
    [THEME[theme].default]: true,
    [THEME[theme].selected]: selected,
    [THEME[theme].unselected]: unselected,
    [SIZE[size]]: true,
    'opacity-50 pointer-events-none': disabled,
  });
}

export const Button: FC<ButtonProps> = ({
  children,
  theme = 'red',
  size = 'base',
  className,
  disabled,
  selected,
  unselected,
  ...restProps
}: ButtonProps) => (
  <button
    className={cn({
      'relative flex items-center justify-center rounded-3xl': true,
      [className]: className,
    })}
    type="button"
    disabled={disabled}
    {...restProps}
  >
    <div
      className={buildClassName({
        disabled,
        selected,
        unselected,
        size,
        theme,
      })}
    >
      {children}
    </div>

    <span
      className={cn({
        [THEME[theme].ping]: !selected && !unselected,
      })}
    />
  </button>
);

export default Button;
