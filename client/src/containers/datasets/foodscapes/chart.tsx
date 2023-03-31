import { useCallback, useMemo, useState } from 'react';

import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear } from '@visx/scale';
import { BarStackHorizontal } from '@visx/shape';
import { BarGroupBar, SeriesPoint } from '@visx/shape/lib/types';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { AnimatePresence, motion } from 'framer-motion';

import { FoodscapeData } from 'types/data';
import { Dataset } from 'types/datasets';
import { Foodscape, FoodscapeChartData } from 'types/foodscapes';

import { useData } from 'hooks/data';
import { useFoodscapes } from 'hooks/foodscapes';

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

  const { format: formatPercentage } = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip<
      Omit<BarGroupBar<number>, 'value' | 'key'> & {
        bar: SeriesPoint<FoodscapeChartData>;
        key: number;
      }
    >();
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
  });

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

  const TOOLTIP = useMemo<(Foodscape & { percentage: string }) | null>(() => {
    if (!tooltipData) return null;

    const f = foodscapesData.find((d) => d.value === tooltipData.key);
    if (!f) return null;

    const percentage = formatPercentage(tooltipData.bar.data[tooltipData.key] / TOTAL);

    return {
      ...f,
      percentage,
    };
  }, [TOTAL, tooltipData, foodscapesData, formatPercentage]);

  // SCALES
  const xScale = useMemo(() => {
    return scaleLinear<number>({
      domain: [0, TOTAL],
      range: [0, width - 1],
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
    <div className="relative" ref={containerRef}>
      <svg width={width} height={height}>
        <Group top={1}>
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
                            showTooltip({
                              tooltipData: bar,
                              tooltipLeft: bar.x + bar.width / 2,
                              tooltipTop: 0,
                            });
                          },
                          onMouseLeave: () => {
                            setHover(null);
                            hideTooltip();
                          },
                        })}
                        cursor={interactive ? 'pointer' : 'default'}
                        animate={{
                          fillOpacity: selected?.length ? opacity : 1,
                        }}
                      />

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

      {tooltipOpen && TOOLTIP && (
        <TooltipInPortal
          unstyled
          top={tooltipTop - 10 - height * 0.05}
          left={tooltipLeft}
          className="pointer-events-none absolute"
        >
          <div
            key={Math.random()}
            className="relative max-w-[180px] -translate-x-1/2 -translate-y-full space-y-1 border border-navy-500/25 bg-white p-1 text-navy-500 shadow-md"
          >
            <h3 className="text-[8px] font-bold uppercase">{TOOLTIP.label}</h3>
            <span>{TOOLTIP.percentage}</span>
          </div>
        </TooltipInPortal>
      )}
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
