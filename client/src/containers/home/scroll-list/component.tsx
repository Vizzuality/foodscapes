import { Children, isValidElement, PropsWithChildren } from 'react';

import ScrollItem from './item';

interface ScrollListProps extends PropsWithChildren {}

const ScrollList = ({ children }: ScrollListProps) => {
  return (
    <>
      {Children.map(children, (child, index) => {
        if (!child || !isValidElement(child)) {
          return null;
        }

        return <ScrollItem step={index}>{child}</ScrollItem>;
      })}
    </>
  );
};

export default ScrollList;
