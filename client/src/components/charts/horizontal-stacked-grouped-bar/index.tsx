import { FC, useMemo, useState } from 'react';

import { TooltipPortal } from '@radix-ui/react-tooltip';
import { Group } from '@visx/group';
import { PatternLines } from '@visx/pattern';
import { BarStackHorizontal } from '@visx/shape';
import { BarGroupBar, SeriesPoint } from '@visx/shape/lib/types';
import { ScaleLinear, ScaleBand, ScaleOrdinal } from 'd3-scale';
import { motion } from 'framer-motion';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/ui/tooltip';

type DataProps = {
  id: number;
  value: number;
  parent_id: number;
};

type GroupProps = {
  id: number;
  values: any[];
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

interface HorizontalStackedGroupedBarProps<
  D extends DataProps,
  G extends GroupProps,
  C extends ChartDataProps
> {
  data: D[];
  groupedData: G[];
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

const HorizontalStackedGroupedBar = <
  D extends DataProps,
  G extends GroupProps,
  C extends ChartDataProps
>({
  width,
  height,
  data,
  groupedData,
  xScale,
  yScale,
  colorScale,
  interactive,
  selected,
  onBarClick,
  TooltipComponent,
}: HorizontalStackedGroupedBarProps<D, G, C>) => {
  const [hover, setHover] = useState<number | null>(null);

  // CONFIG
  const KEYS = useMemo(() => {
    return [
      ...new Set(
        data //
          .sort((a, b) => a.parent_id - b.parent_id)
          .map((d) => d.parent_id)
      ),
    ];
  }, [data]);

  const TOTAL = data.reduce((acc, curr) => acc + curr.value, 0);

  const DATA = useMemo<ChartDataProps[]>(() => {
    return [
      data.reduce((acc, curr) => {
        const a = acc[curr.parent_id] ?? 0;
        acc[curr.parent_id] = a + curr.value;
        return acc;
      }, {} as ChartDataProps),
    ];
  }, [data]);

  const ALL_SELECTED = useMemo(() => {
    return groupedData
      .filter((g) => {
        const values = g.values.filter((v) => data.map((d) => d.id).includes(v.value));
        return values
          .filter((v) => data.map((d) => d.id).includes(v.value))
          .every((v) => selected.includes(v.value));
      })
      .map((s) => s.id);
  }, [data, selected, groupedData]);

  const PARTIAL_SELECTED = useMemo(() => {
    return groupedData
      .filter((g) => {
        const values = g.values.filter((v) => data.map((d) => d.id).includes(v.value));
        return (
          values.some((v) => selected.includes(v.value)) &&
          !values.every((v) => selected.includes(v.value))
        );
      })
      .map((s) => {
        const totalSelected = s.values
          .filter((v) => selected.includes(v.value))
          .reduce((acc, curr) => {
            const d1 = data.find((d) => d.id === curr.value);
            return acc + (d1?.value ?? 0);
          }, 0);

        const total = s.values.reduce((acc, curr) => {
          const d1 = data.find((d) => d.id === curr.value);
          return acc + (d1?.value ?? 0);
        }, 0);

        return {
          key: s.id,
          relativePercentage: totalSelected / total,
          absolutePercentage: totalSelected / TOTAL,
        };
      });
  }, [data, selected, groupedData, TOTAL]);

  if (width === 0 || height === 0) return null;

  return (
    <div className="relative">
      <svg width={width} height={height}>
        <PatternLines
          id="lines"
          height={4}
          width={4}
          stroke="#1C274A"
          strokeWidth={0.5}
          orientation={['diagonal']}
        />

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
              color={(d) => colorScale(`${d}`) || colorScale.range()[0]}
            >
              {(barStacks) =>
                barStacks.map((barStack) =>
                  barStack.bars.map((bar) => {
                    let opacity = 1;
                    if (!!ALL_SELECTED.length && !ALL_SELECTED.includes(bar.key)) {
                      opacity = 0.5;
                    }

                    if (
                      !!PARTIAL_SELECTED.length &&
                      !ALL_SELECTED.includes(bar.key) &&
                      !PARTIAL_SELECTED.map((p) => p.key).includes(bar.key)
                    ) {
                      opacity = 0.5;
                    }
                    if (
                      !!PARTIAL_SELECTED.length &&
                      PARTIAL_SELECTED.map((p) => p.key).includes(bar.key)
                    ) {
                      opacity = 0.75;
                    }

                    const g = groupedData.find((s) => s.id === bar.key);

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
                              <TooltipComponent
                                {...bar}
                                {...g}
                                id={bar.key}
                                total={TOTAL}
                                partialTotal={
                                  PARTIAL_SELECTED.find((p) => p.key === bar.key)
                                    ?.absolutePercentage || 0
                                }
                              />
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
                          {ALL_SELECTED.includes(bar.key) && interactive && (
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

                          {PARTIAL_SELECTED.filter((p) => p.key === bar.key && interactive).map(
                            (p) => (
                              <>
                                <motion.rect
                                  key={`bar-stack-${barStack.index}-${bar.index}-partial-selected`}
                                  x={bar.x}
                                  y={bar.y}
                                  width={bar.width}
                                  height={bar.height}
                                  fill="transparent"
                                  stroke="#1C274A"
                                  strokeWidth={1}
                                  strokeDasharray="5 3"
                                  pointerEvents="none"
                                  shapeRendering="crispEdges"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                />

                                <motion.rect
                                  key={`bar-stack-${barStack.index}-${bar.index}-partial-percentage-selected`}
                                  x={bar.x}
                                  y={bar.y}
                                  width={bar.width * p.relativePercentage}
                                  height={bar.height}
                                  fill="url(#lines)"
                                  pointerEvents="none"
                                  shapeRendering="crispEdges"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                />
                              </>
                            )
                          )}
                        </AnimatePresence> */}
                      </g>
                    );
                  })
                )
              }
            </BarStackHorizontal>
          </TooltipProvider>

          {/* {((!ALL_SELECTED.length && !PARTIAL_SELECTED.length) || !interactive) && !hover && (
            <rect
              width={Math.max(width - 4, 0)}
              height={Math.max(height - 4, 0)}
              fill="transparent"
              stroke="#1C274A"
              strokeWidth={1}
              pointerEvents="none"
              shapeRendering="crispEdges"
            />
          )} */}

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

export default HorizontalStackedGroupedBar;
