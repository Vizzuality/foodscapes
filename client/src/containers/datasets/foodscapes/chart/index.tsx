import { useCallback, useMemo, useState } from 'react';

import { TooltipPortal } from '@radix-ui/react-tooltip';
import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear } from '@visx/scale';
import { BarStackHorizontal } from '@visx/shape';
import { BarGroupBar, SeriesPoint } from '@visx/shape/lib/types';
import { AnimatePresence, motion } from 'framer-motion';

import { FoodscapeData } from 'types/data';
import { Dataset } from 'types/datasets';
import { FoodscapeChartData } from 'types/foodscapes';

import { useData } from 'hooks/data';
import { useFoodscapes } from 'hooks/foodscapes';

import { FoodscapesChartTooltip } from 'containers/datasets/foodscapes/chart/tooltips';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/ui/tooltip';

interface FoodscapesChartParentProps {
  dataset: Dataset;
  interactive?: boolean;
  selected?: readonly number[];
  onBarClick?: (key: number) => void;
}
interface FoodscapesChartProps extends FoodscapesChartParentProps {
  width: number;
  height: number;
}

const FoodscapesChart = ({
  width,
  height,
  dataset,
  interactive,
  selected,
  onBarClick,
}: FoodscapesChartProps) => {
  const [hover, setHover] = useState<number | null>(null);

  // DATA
  const { data: foodscapesData } = useFoodscapes();

  const { data } = useData<FoodscapeData>({
    sql: dataset.widget.sql,
    shape: 'array',
  });

  // CONFIG
  const KEYS = useMemo(() => {
    return data.sort((a, b) => a.soil_groups - b.soil_groups).map((d) => d.id);
  }, [data]);
  const TOTAL = data.reduce((acc, curr) => acc + curr.value, 0);

  const DATA = useMemo<FoodscapeChartData[]>(() => {
    return [
      data.reduce((acc, curr) => {
        acc[curr.id] = curr.value;
        return acc;
      }, {} as FoodscapeChartData),
    ];
  }, [data]);

  // SCALES
  const xScale = useMemo(() => {
    return scaleLinear<number>({
      domain: [0, TOTAL],
      range: [0, width - 1],
      round: true,
    });
  }, [width, TOTAL]);

  const yScale = useMemo(() => {
    return scaleBand<number>({
      domain: [],
      range: [0, height - 2],
    });
  }, [height]);

  const colorScale = useMemo(() => {
    return scaleLinear<string>({
      domain: KEYS,
      range: KEYS.map((key) => {
        const { color } = foodscapesData.find((d) => d.value === key) || {};
        return color;
      }),
    });
  }, [foodscapesData, KEYS]);

  const handleBarClick = useCallback(
    (
      bar: Omit<BarGroupBar<number>, 'value' | 'key'> & {
        bar: SeriesPoint<FoodscapeChartData>;
        key: number;
      }
    ) => {
      const { key } = bar;
      if (onBarClick) onBarClick(key);
    },
    [onBarClick]
  );

  return (
    <div className="relative">
      <svg width={width} height={height}>
        <Group top={1}>
          <TooltipProvider delayDuration={0} skipDelayDuration={500}>
            <BarStackHorizontal<FoodscapeChartData, number>
              data={DATA}
              keys={KEYS}
              width={Math.max(width - 2, 0)}
              height={Math.max(height - 2, 0)}
              y={() => height}
              xScale={xScale}
              yScale={yScale}
              color={(d) => colorScale(+d)}
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
                                onClick: () => handleBarClick(bar),
                                onMouseEnter: () => {
                                  setHover(bar.key);
                                },
                                onMouseLeave: () => {
                                  setHover(null);
                                },
                              })}
                              cursor={interactive ? 'pointer' : 'default'}
                              animate={{
                                fillOpacity: selected?.length ? opacity : 1,
                              }}
                            />
                          </TooltipTrigger>

                          <TooltipPortal>
                            <TooltipContent asChild sideOffset={2}>
                              <FoodscapesChartTooltip {...bar} id={bar.key} total={TOTAL} />
                            </TooltipContent>
                          </TooltipPortal>
                        </Tooltip>

                        {hover === bar.key && (
                          <rect
                            x={bar.x}
                            y={bar.y + 1}
                            width={bar.width}
                            height={Math.max(bar.height - 1, 0)}
                            fill="transparent"
                            stroke="#1C274A"
                            strokeWidth={1}
                            pointerEvents="none"
                            shapeRendering="crispEdges"
                          />
                        )}

                        <AnimatePresence>
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
                        </AnimatePresence>
                      </g>
                    );
                  })
                )
              }
            </BarStackHorizontal>
          </TooltipProvider>

          {!selected?.length && !hover && (
            <rect
              x={1}
              y={1}
              width={Math.max(width - 1, 0)}
              height={Math.max(height - 3, 0)}
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

const FoodscapesChartParent = (props: FoodscapesChartParentProps) => {
  return (
    <ParentSize>
      {({ width, height }) => <FoodscapesChart {...props} width={width} height={height} />}
    </ParentSize>
  );
};

export default FoodscapesChartParent;
