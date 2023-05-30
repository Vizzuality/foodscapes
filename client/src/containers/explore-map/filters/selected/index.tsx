import { MouseEvent } from 'react';

import cn from 'lib/classnames';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

interface FilterSelectedProps {
  text: string;
  visible: boolean;
  onClear: (e: MouseEvent<HTMLElement>) => void;
}

const FilterSelected = ({ text, visible, onClear }: FilterSelectedProps) => {
  return (
    <div
      className={cn({
        'flex items-center justify-between space-x-2 rounded-3xl bg-white p-1 pl-2': true,
        hidden: !visible,
      })}
    >
      <p className="text-xs font-bold uppercase text-navy-500 line-clamp-1">{text}</p>

      <button
        type="button"
        className="flex items-center justify-center rounded-full bg-navy-500 p-1"
        onClick={onClear}
      >
        <Icon icon={CLOSE_SVG} className="h-3 w-3 text-white" />
      </button>
    </div>
  );
};

export default FilterSelected;
