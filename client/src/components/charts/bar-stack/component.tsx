import { FC, useMemo } from 'react';

import { AxisBottom, TickLabelProps } from '@visx/axis';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { BarStack } from '@visx/shape';
import { group } from 'd3-array';

import type { BarStackChartProps, GroupBarStackChartData } from './types';

// data
const barName = (d: GroupBarStackChartData) => d.key;

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
      group(data, (d) => d.key),
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

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        domain: groups.map(barName),
        padding: 0.5,
      }),
    [groups, xMax]
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
        domain: ['t1', 't2', 't3'],
        range: ['#4F76A3', '#F0867D', '#65A6F0'],
      }),
    []
  );

  const tickLabelProps: TickLabelProps<string> = () => {
    return {
      fill: '#fff',
      fontSize: 16,
      fontWeight: 600,
      textAnchor: 'middle',
    };
  };

  console.log({ colorScale });

  return (
    <svg width={width} height={height}>
      <Group top={margin.top}>
        <BarStack
          data={groups}
          keys={keys}
          x={barName}
          xScale={xScale}
          yScale={yScale}
          color={colorScale}
        />
        <AxisBottom
          scale={xScale}
          top={yMax}
          hideAxisLine
          hideTicks
          tickLabelProps={tickLabelProps}
        />
      </Group>
    </svg>
  );
};

export default BarStackChart;
