import { useMemo } from 'react';

import { AxisBottom, TickLabelProps } from '@visx/axis';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { motion } from 'framer-motion';

import type { BarChartProps, BarChartData } from './types';

// accessors
const x = (d: BarChartData) => d.label;
const y = (d: BarChartData) => d.value;

export const BarChart = ({
  data,
  width,
  height,
  margin = { top: 0, left: 0, bottom: 0, right: 0 },
}: BarChartProps) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const dataMax = Math.max(...data.map(y));

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(x),
        padding: 0.4,
      }),
    [data, xMax]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, dataMax + dataMax * 0.25],
      }),
    [dataMax, yMax]
  );

  const tickLabelProps: TickLabelProps<string> = () => {
    return {
      fill: '#fff',
      fontSize: 16,
      fontWeight: 600,
      textAnchor: 'middle',
    };
  };

  return (
    <svg width={width} height={height}>
      <Group top={0} left={margin.left}>
        {data.map((d, i) => {
          const label = x(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - yScale(y(d));
          const barX = xScale(label);
          const barY = yMax - barHeight;

          return (
            <Group key={i}>
              <motion.rect
                key={`bar-${label}`}
                x={barX}
                width={barWidth}
                initial={{
                  height: 0,
                  y: yMax,
                }}
                animate={{
                  height: barHeight,
                  y: barY,
                }}
                transition={{
                  ease: 'linear',
                }}
                fill="rgba(255,255,255)"
              />
              <motion.polygon
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition: {
                    delay: 0.25,
                  },
                }}
                points={`
                  ${barX + barWidth * 0.5},${barY - barWidth * 0.5}
                  ${barX + barWidth}, ${barY}
                  ${barX},${barY}`}
                fill="rgba(255,255,255)"
              />
            </Group>
          );
        })}

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

export default BarChart;
