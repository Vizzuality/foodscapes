import cx from 'classnames';

import { twMerge } from 'tailwind-merge';

export default function cn(classNames) {
  return twMerge(cx(classNames));
}
