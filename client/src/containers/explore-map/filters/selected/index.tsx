import { MouseEvent } from 'react';

import cn from 'lib/classnames';

import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

interface FilterSelectedProps {
  text: string;
  popover?: { id: number | string; label: string }[];
  visible: boolean;
  onClear: (e: MouseEvent<HTMLElement>) => void;
}

const FilterSelected = ({ text, popover, visible, onClear }: FilterSelectedProps) => {
  return popover ? (
    <Tooltip>
      <TooltipTrigger asChild>
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
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          side="top"
          align="center"
          className="max-w-sm rounded-none bg-white p-2 shadow-lg"
        >
          <ul className="list-disc space-y-1 pl-4">
            {popover?.map((p) => (
              <li key={p.id} className="text-xs text-navy-500">
                {p.label}
              </li>
            ))}
          </ul>

          <TooltipArrow className="fill-white" width={10} height={5} />
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  ) : (
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
