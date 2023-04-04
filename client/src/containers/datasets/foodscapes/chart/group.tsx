import { useCallback, useMemo, useState } from 'react';

import { TooltipPortal } from '@radix-ui/react-tooltip';
import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear } from '@visx/scale';
import { BarStackHorizontal } from '@visx/shape';
import { BarGroupBar, SeriesPoint } from '@visx/shape/lib/types';
import { group } from 'd3-array';
import { AnimatePresence, motion } from 'framer-motion';

import { FoodscapeData } from 'types/data';
import { Dataset } from 'types/datasets';
import { FoodscapeChartData } from 'types/foodscapes';

import { useData } from 'hooks/data';
import { useFoodscapes } from 'hooks/foodscapes';

import { FoodscapesChartTooltipGroup } from 'containers/datasets/foodscapes/chart/tooltips';

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
    return [
      ...new Set(
        data //
          .sort((a, b) => a.soil_groups - b.soil_groups)
          .map((d) => d.soil_groups)
      ),
    ];
  }, [data]);
  const TOTAL = data.reduce((acc, curr) => acc + curr.value, 0);

  const DATA = useMemo<FoodscapeChartData[]>(() => {
    return [
      data.reduce((acc, curr) => {
        const a = acc[curr.soil_groups] || 0;
        acc[curr.soil_groups] = a + curr.value;
        return acc;
      }, {} as FoodscapeChartData),
    ];
  }, [data]);

  const GROUPS = useMemo(() => {
    return Array.from(
      group(foodscapesData, (d) => d.parentId),
      ([key, value]) => ({
        key,
        value,
        label: value.map((v) => v.parentLabel).reduce((_, v) => v, ''),
        color: value.map((v) => v.parentColor).reduce((_, v) => v, ''),
      })
    );
  }, [foodscapesData]);

  const ALL_SELECTED = useMemo(() => {
    return GROUPS.filter((g) => {
      return g.value.every((v) => selected.includes(v.value));
    }).map((s) => s.key);
  }, [selected, GROUPS]);

  const PARTIAL_SELECTED = useMemo(() => {
    return GROUPS.filter((g) => {
      return g.value.some((v) => selected.includes(v.value));
    }).map((s) => s.key);
  }, [selected, GROUPS]);

  // SCALES
  const xScale = useMemo(() => {
    return scaleLinear<number>({
      domain: [0, TOTAL],
      range: [0, width - 2],
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
        const { parentColor } = foodscapesData.find((d) => d.parentId === key) || {};
        return parentColor;
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
                    let opacity = 1;
                    if (!!ALL_SELECTED.length && !ALL_SELECTED.includes(bar.key)) {
                      opacity = 0.5;
                    }
                    if (!!PARTIAL_SELECTED.length && !PARTIAL_SELECTED.includes(bar.key)) {
                      opacity = 0.5;
                    }
                    if (!!PARTIAL_SELECTED.length && PARTIAL_SELECTED.includes(bar.key)) {
                      opacity = 0.75;
                    }

                    const g = GROUPS.find((s) => s.key === bar.key);

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
                                fillOpacity: opacity,
                              }}
                            />
                          </TooltipTrigger>

                          <TooltipPortal>
                            <TooltipContent asChild sideOffset={2}>
                              <FoodscapesChartTooltipGroup
                                {...bar}
                                {...g}
                                id={bar.key}
                                total={TOTAL}
                              />
                            </TooltipContent>
                          </TooltipPortal>
                        </Tooltip>

                        {hover === bar.key && (
                          <rect
                            x={bar.x + 1}
                            y={bar.y + 1}
                            width={Math.max(bar.width - 1, 0)}
                            height={Math.max(bar.height - 1, 0)}
                            fill="transparent"
                            stroke="#1C274A"
                            strokeWidth={1}
                            pointerEvents="none"
                            shapeRendering="crispEdges"
                          />
                        )}

                        <AnimatePresence>
                          {ALL_SELECTED.includes(bar.key) && (
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

                          {PARTIAL_SELECTED.includes(bar.key) && (
                            <motion.rect
                              key={`bar-stack-${barStack.index}-${bar.index}-partial-selected`}
                              x={bar.x}
                              y={bar.y}
                              width={bar.width}
                              height={bar.height}
                              fill="transparent"
                              stroke="#1C274A"
                              strokeWidth={2}
                              strokeDasharray="4"
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

          {!ALL_SELECTED.length && !PARTIAL_SELECTED.length && !hover && (
            <rect
              x={1}
              y={1}
              width={Math.max(width - 3, 0)}
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
