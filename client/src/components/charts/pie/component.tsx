import { useCallback } from 'react';

import { Group } from '@visx/group';
import { Pie } from '@visx/shape';

import type { PieChartProps } from './types';

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export const PieChart = <T extends unknown>({
  data,
  colorScale,
  selected,
  width,
  height,
  margin = defaultMargin,
  onPathMouseClick,
  onPathMouseEnter,
  onPathMouseLeave,
  pieProps,
  format,
}: PieChartProps<T>) => {
  // SIZES
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const thickness = 40;

  // Getters
  const getValue = useCallback((d: any) => d.value, []);
  const getColor = useCallback(
    (d: any) => {
      return colorScale(`${d.data.id}`) || colorScale.range()[0];
    },
    [colorScale]
  );

  const getInnerRadius = useCallback(() => {
    return radius - thickness;
  }, [radius, thickness]);

  const getOuterRadius = useCallback(() => {
    return radius;
  }, [radius]);

  return (
    <svg width={width} height={height}>
      <Group top={centerY + margin.top} left={centerX + margin.left}>
        <Pie
          data={data}
          pieValue={getValue}
          innerRadius={getInnerRadius}
          outerRadius={getOuterRadius}
          cornerRadius={0}
          startAngle={0}
          {...pieProps}
        >
          {(pie) => {
            return pie.arcs.map((arc) => {
              const { path } = pie;
              const [centroidX, centroidY] = path.centroid(arc);
              const centroidAngle = (arc.endAngle + arc.startAngle) / 2 - Math.PI / 2;
              const offsets = {
                x: (thickness * 0.5 + 10) * Math.cos(centroidAngle),
                y: (thickness * 0.5 + 10) * Math.sin(centroidAngle),
              };

              return (
                <Group key={arc.data.id}>
                  <path
                    d={pie.path(arc)}
                    fill={getColor(arc)}
                    strokeWidth="1"
                    stroke="black"
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

                  {selected?.includes(arc.data.id) && (
                    <text
                      fill="black"
                      x={centroidX + offsets.x}
                      y={centroidY + offsets.y}
                      dy=".33em"
                      fontSize={9}
                      textAnchor={centroidAngle > Math.PI ? 'end' : 'start'}
                      pointerEvents="none"
                      className="text-xxs font-bold"
                    >
                      {`${format(getValue(arc))}`}
                    </text>
                  )}
                </Group>
              );
            });
          }}
        </Pie>
      </Group>
    </svg>
  );
};

export default PieChart;
