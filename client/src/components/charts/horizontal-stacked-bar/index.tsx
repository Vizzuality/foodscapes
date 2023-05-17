import { FC, useMemo, useState } from 'react';

import { TooltipPortal } from '@radix-ui/react-tooltip';
import { Group } from '@visx/group';
import { BarStackHorizontal } from '@visx/shape';
import { BarGroupBar, SeriesPoint } from '@visx/shape/lib/types';
import { ScaleLinear, ScaleBand, ScaleOrdinal } from 'd3-scale';
import { motion } from 'framer-motion';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/ui/tooltip';

type DataProps = {
  id: number;
  value: number;
};
type ChartDataProps = Record<string, number>;

export type TooltipProps<T> = {
  id: number;
  total: number;
  index: number;
  height: number;
  width: number;
  x: number;
  y: number;
  color: string;
  bar: SeriesPoint<T>;
  key: number;
};

interface HorizontalStackedBarProps<D extends DataProps, C extends ChartDataProps> {
  data: D[];
  width: number;
  height: number;
  xScale: ScaleLinear<number, number, never>;
  yScale: ScaleBand<number>;
  colorScale: ScaleOrdinal<string, string, never>;
  interactive?: boolean;
  selected?: readonly number[];
  onBarClick?: (
    bar: Omit<BarGroupBar<number>, 'value' | 'key'> & {
      bar: SeriesPoint<C>;
      key: number;
    }
  ) => void;
  TooltipComponent: FC<TooltipProps<C>>;
}

const HorizontalStackedBar = <D extends DataProps, C extends ChartDataProps>({
  width,
  height,
  data,
  xScale,
  yScale,
  colorScale,
  interactive,
  selected,
  onBarClick,
  TooltipComponent,
}: HorizontalStackedBarProps<D, C>) => {
  const [hover, setHover] = useState<number | null>(null);

  // CONFIG
  const KEYS = useMemo(() => {
    return data.map((d) => d.id);
  }, [data]);

  const TOTAL = data.reduce((acc, curr) => acc + curr.value, 0);

  const DATA = useMemo<ChartDataProps[]>(() => {
    return [
      data.reduce((acc, curr) => {
        acc[curr.id] = curr.value;
        return acc;
      }, {} as ChartDataProps),
    ];
  }, [data]);

  if (width === 0 || height === 0) return null;

  return (
    <div className="relative">
      <svg width={width} height={height}>
        <Group top={2} left={2}>
          <TooltipProvider delayDuration={0} skipDelayDuration={500}>
            <BarStackHorizontal<any, number>
              data={DATA}
              keys={KEYS}
              width={Math.max(width - 2, 0)}
              height={Math.max(height - 2, 0)}
              y={() => height}
              xScale={xScale}
              yScale={yScale}
              color={(d) => {
                return colorScale(`${d}`) || colorScale.range()[0];
              }}
            >
              {(barStacks) =>
                barStacks.map((barStack) =>
                  barStack.bars.map((bar) => {
                    const opacity = selected?.includes(bar.key) ? 1 : 0.5;

                    return (
                      <g key={`bar-stack-${barStack.index}-${bar.index}`}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.rect
                              x={bar.x}
                              y={bar.y}
                              width={bar.width}
                              height={bar.height}
                              fill={bar.color}
                              {...(interactive && {
                                onClick: () => onBarClick(bar),
                                onMouseEnter: () => {
                                  setHover(bar.key);
                                },
                                onMouseLeave: () => {
                                  setHover(null);
                                },
                              })}
                              cursor={interactive ? 'pointer' : 'default'}
                              pointerEvents={interactive ? 'all' : 'none'}
                              animate={{
                                fillOpacity: selected?.length ? opacity : 1,
                              }}
                            />
                          </TooltipTrigger>

                          <TooltipPortal>
                            <TooltipContent asChild sideOffset={2}>
                              <TooltipComponent {...bar} id={bar.key} total={TOTAL} />
                            </TooltipContent>
                          </TooltipPortal>
                        </Tooltip>

                        {hover === bar.key && (
                          <rect
                            x={bar.x}
                            y={bar.y}
                            width={bar.width}
                            height={bar.height}
                            fill="transparent"
                            stroke="#1C274A"
                            strokeWidth={1}
                            pointerEvents="none"
                            shapeRendering="crispEdges"
                          />
                        )}

                        {/* <AnimatePresence>
                          {selected?.includes(bar.key) && (
                            <motion.rect
                              key={`bar-stack-${barStack.index}-${bar.index}-selected`}
                              x={bar.x}
                              y={bar.y}
                              width={bar.width}
                              height={bar.height}
                              fill="transparent"
                              stroke="#1C274A"
                              strokeWidth={2}
                              pointerEvents="none"
                              shapeRendering="crispEdges"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            />
                          )}
                        </AnimatePresence> */}
                      </g>
                    );
                  })
                )
              }
            </BarStackHorizontal>
          </TooltipProvider>

          {!hover && (
            <rect
              width={Math.max(width - 4, 0)}
              height={Math.max(height - 4, 0)}
              fill="transparent"
              stroke="#1C274A"
              strokeWidth={1}
              pointerEvents="none"
              shapeRendering="crispEdges"
            />
          )}
        </Group>
      </svg>
    </div>
  );
};

export default HorizontalStackedBar;
