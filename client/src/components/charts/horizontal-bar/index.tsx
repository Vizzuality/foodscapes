import { useState } from 'react';

import cn from 'lib/classnames';

import { ScaleLinear, ScaleOrdinal } from 'd3-scale';

export type DataProps = {
  id: number;
  value: number;
  label: string;
};

interface HorizontalBarProps<D extends DataProps> {
  data: D[];
  xScale: ScaleLinear<number, number, never>;
  colorScale: ScaleOrdinal<string, string, never>;
  selected?: readonly number[];
  interactive?: boolean;
  format: (value: D) => string;
  onBarClick?: (bar: D) => void;
}

const HorizontalBar = <D extends DataProps>({
  data,
  xScale,
  colorScale,
  selected,
  interactive,
  format,
  onBarClick,
}: HorizontalBarProps<D>) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="relative">
      <ul className="space-y-2.5">
        {data.map((d, i) => {
          const { id, label, value } = d;
          return (
            <li
              key={label + i}
              className={cn({
                'group cursor-pointer': interactive,
              })}
              {...(interactive && {
                onMouseEnter: () => {
                  setHover(id);
                },
                onMouseLeave: () => {
                  setHover(null);
                },
                onClick: () => onBarClick(d),
              })}
            >
              <div
                style={{
                  width: `${xScale(value)}%`,
                }}
                className="flex items-center space-x-1"
              >
                <div
                  className={cn({
                    'h-2 w-full border border-navy-500': true,
                    'group-hover:border-2': hover === id || selected?.includes(id),
                    'border-2': selected?.includes(id),
                    'opacity-50': hover !== id && !!selected?.length && !selected?.includes(id),
                  })}
                  style={{ background: colorScale(id.toString()) }}
                />

                <div className="shrink-0 whitespace-nowrap text-[8px] font-bold text-navy-500">
                  {format(d)}
                </div>
              </div>

              <div className="text-sm font-light text-navy-500">{label}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HorizontalBar;
