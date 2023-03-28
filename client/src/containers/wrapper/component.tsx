import { ReactNode } from 'react';

import cx from 'classnames';

export interface WrapperProps {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div
      className={cx({
        'mx-auto w-full max-w-7xl px-12 lg:px-10': true,
      })}
    >
      {children}
    </div>
  );
};

export default Wrapper;
