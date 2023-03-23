import { FC, useMemo } from 'react';

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
          {(barStacks) =>
            barStacks.map((barStack) =>
              barStack.bars.map((bar) => (
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
                  }}
                  x={bar.x}
                  width={bar.width}
                  {...(bar.key === 't1' && { fill: 'url(#lines)' })}
                  {...(bar.key !== 't1' && { fill: bar.color })}
                />
              ))
            )
          }
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
