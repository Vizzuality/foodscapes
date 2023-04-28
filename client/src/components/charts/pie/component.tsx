import { useCallback, useMemo, useState } from 'react';

import { Group } from '@visx/group';
import { scaleOrdinal } from '@visx/scale';
import { Pie } from '@visx/shape';
import { motion } from 'framer-motion';

import type { PieChartProps } from './types';

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export const PieChart = <T extends unknown>({
  data,
  // colorScale,
  selected,
  width,
  height,
  margin = defaultMargin,
  onPathMouseClick,
  onPathMouseEnter,
  onPathMouseLeave,
  pieProps,
}: PieChartProps<T>) => {
  const [hover, setHover] = useState<string | null>(selected);

  // SIZES
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const thickness = 40;

  const COLOR_SCALE = scaleOrdinal({
    domain: data.map((l) => l.id),
    range: ['rgba(93,30,91,1)', 'rgba(93,30,91,0.8)', 'rgba(93,30,91,0.6)', 'rgba(93,30,91,0.4)'],
  });

  useMemo(() => {
    setHover(selected);
  }, [selected]);

  // Getters
  const getValue = useCallback((d: any) => d.value, []);
  const getColor = useCallback((d: any) => COLOR_SCALE(d.id), [COLOR_SCALE]);
  const getInnerRadius = useCallback(
    (d: any) => {
      if (d.data.id === hover) {
        return radius - thickness - 5;
      }
      return radius - thickness;
    },
    [radius, thickness, hover]
  );

  const getOuterRadius = useCallback(
    (d: any) => {
      if (d.data.id === hover) {
        return radius + 5;
      }

      return radius;
    },
    [radius, hover]
  );

  return (
    <svg width={width} height={height}>
      <Group top={centerY + margin.top} left={centerX + margin.left}>
        <Pie
          data={data}
          pieValue={getValue}
          innerRadius={getInnerRadius}
          outerRadius={getOuterRadius}
          padAngle={0.015}
          cornerRadius={0}
          startAngle={0}
          {...pieProps}
        >
          {(pie) => {
            return pie.arcs.map((arc) => (
              <motion.path
                key={arc.data.id}
                d={pie.path(arc)}
                fill={getColor(arc)}
                animate={{
                  d: pie.path(arc),
                }}
                transition={{
                  duration: 0.1,
                }}
                onClick={() => {
                  if (onPathMouseClick) onPathMouseClick(arc.data);
                }}
                onMouseEnter={() => {
                  if (onPathMouseEnter) onPathMouseEnter(arc.data);
                }}
                onMouseLeave={() => {
                  if (onPathMouseLeave) onPathMouseLeave(arc.data);
                }}
              />
            ));
          }}
        </Pie>
      </Group>
    </svg>
  );
};

export default PieChart;
