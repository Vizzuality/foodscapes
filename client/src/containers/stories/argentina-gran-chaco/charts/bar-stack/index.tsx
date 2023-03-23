import { FC, useMemo } from 'react';

import { Annotation, HtmlLabel } from '@visx/annotation';
import { AxisBottom } from '@visx/axis';
import { Group } from '@visx/group';
import { PatternLines } from '@visx/pattern';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { BarStack } from '@visx/shape';
import { group } from 'd3-array';
import { motion } from 'framer-motion';

import type { BarStackChartProps, GroupBarStackChartData } from './types';

// data
const xAccessor = (d: GroupBarStackChartData) => d.key;

export const BarStackChart: FC<BarStackChartProps> = ({
  data,
  width,
  height,
  margin = { top: 0, left: 0, bottom: 0, right: 0 },
}: BarStackChartProps) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const groups = useMemo(() => {
    return Array.from(
      group(data, (d) => d.name),
      ([key, value]) => ({
        key,
        ...value.reduce(
          (acc, v) => {
            return {
              ...acc,
              [v.type]: v.value,
              total: acc.total + v.value,
            };
          },
          { total: 0 }
        ),
      })
    ) as GroupBarStackChartData[];
  }, [data]);

  const keys = groups.map((g) => g.key);
  const stackedKeys = useMemo(() => ['t1', 't2', 't3'], []);

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        domain: keys,
        padding: 0.7,
      }),
    [keys, xMax]
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...groups.map((g) => g.total))],
        nice: true,
      }),
    [groups, yMax]
  );

  const colorScale = useMemo(
    () =>
      scaleOrdinal({
        domain: stackedKeys,
        range: ['#FFF', '#FFF', '#FFF'],
      }),
    [stackedKeys]
  );

  return (
    <svg width={width} height={height}>
      <PatternLines
        id="lines"
        height={5}
        width={5}
        stroke={'white'}
        strokeWidth={1}
        orientation={['diagonal']}
      />
      <Group top={margin.top} left={margin.left}>
        <BarStack
          data={groups}
          keys={stackedKeys}
          x={xAccessor}
          xScale={xScale}
          yScale={yScale}
          color={colorScale}
        >
          {(barStacks) => {
            const highlight = barStacks
              //
              .filter((barStack) => barStack.key === 't2' || barStack.key === 't3')
              .map((barStack) => barStack.bars.filter((bar) => bar.index === groups.length - 1))
              .flat()
              .reduce(
                (acc, bar) => {
                  return {
                    x: bar.x,
                    y: bar.y,
                    width: bar.width,
                    height: bar.height + acc.height,
                  };
                },
                { x: 0, y: 0, width: 0, height: 0 }
              );

            return (
              <>
                {/* highlight */}
                <motion.rect
                  initial={{
                    height: 0,
                    y: yMax,
                    opacity: 0,
                  }}
                  animate={{
                    height: highlight.height + 4,
                    y: highlight.y - 4,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    ease: 'linear',
                    delay: 0.5,
                    opacity: {
                      repeat: Infinity,
                      repeatType: 'loop',
                      duration: 2,
                    },
                  }}
                  x={highlight.x - 4}
                  width={highlight.width + 8}
                  fillOpacity={0}
                  stroke="white"
                  strokeWidth={2}
                  strokeDasharray="4"
                />

                {barStacks.map((barStack) =>
                  barStack.bars.map((bar) => (
                    <>
                      <motion.rect
                        key={`bar-stack-${barStack.index}-${bar.index}`}
                        initial={{
                          height: 0,
                          y: yMax,
                        }}
                        animate={{
                          height: bar.height - 4 > 0 ? bar.height - 4 : bar.height,
                          y: bar.y,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: 'linear',
                          delay: 0.5,
                        }}
                        x={bar.x}
                        width={bar.width}
                        {...(bar.key === 't1' && { fill: 'url(#lines)' })}
                        {...(bar.key !== 't1' && { fill: bar.color })}
                      />

                      {/* Annotations */}
                      {bar.key === 't2' && bar.index === groups.length - 1 && (
                        <Annotation x={bar.x} y={bar.y + bar.height * 0.5} dx={-20} dy={-5}>
                          <HtmlLabel
                            horizontalAnchor="end"
                            verticalAnchor="middle"
                            showAnchorLine={false}
                          >
                            <motion.div
                              className="font-semibold text-white"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{
                                delay: 1,
                              }}
                            >
                              <span className="block text-sm leading-tight">
                                Private <br /> benefits
                              </span>
                            </motion.div>
                          </HtmlLabel>
                        </Annotation>
                      )}

                      {bar.key === 't3' && bar.index === groups.length - 1 && (
                        <Annotation x={bar.x} y={bar.y + bar.height * 0.5} dx={-20} dy={-5}>
                          <HtmlLabel
                            horizontalAnchor="end"
                            verticalAnchor="middle"
                            showAnchorLine={false}
                          >
                            <motion.div
                              className="font-semibold text-white"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{
                                delay: 1,
                              }}
                            >
                              <span className="block text-sm leading-tight">
                                Public <br /> benefits
                              </span>
                            </motion.div>
                          </HtmlLabel>
                        </Annotation>
                      )}

                      {bar.key === 't3' && bar.index === groups.length - 1 && (
                        <Annotation
                          x={bar.x + bar.width}
                          y={bar.y + bar.height * 0.5}
                          dx={15}
                          dy={-2}
                        >
                          <HtmlLabel
                            horizontalAnchor="start"
                            verticalAnchor="middle"
                            showAnchorLine={false}
                          >
                            <motion.div
                              className="whitespace-nowrap font-semibold text-white"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{
                                delay: 1,
                              }}
                            >
                              <span className="text-lg">+ 90 %</span>
                            </motion.div>
                          </HtmlLabel>
                        </Annotation>
                      )}
                    </>
                  ))
                )}
              </>
            );
          }}
        </BarStack>

        <AxisBottom
          scale={xScale}
          top={yMax}
          hideAxisLine
          hideTicks
          tickFormat={(value) => value}
          tickComponent={(tickProps) => {
            return (
              <foreignObject
                width={xScale.bandwidth() * 2.5}
                height={50}
                x={tickProps.x - xScale.bandwidth() * 2.5 * 0.5}
                y={5}
              >
                <div className="px-1 text-center text-sm font-bold text-white">
                  {tickProps.formattedValue}
                </div>
              </foreignObject>
            );
          }}
        />
      </Group>
    </svg>
  );
};

export default BarStackChart;
