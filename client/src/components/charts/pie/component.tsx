import { useCallback, useState } from 'react';

import cn from 'lib/classnames';

import { Group } from '@visx/group';
import { Pie } from '@visx/shape';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/ui/tooltip';

import type { PieChartProps } from './types';

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export const PieChart = <T extends unknown, C extends unknown>({
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
  TooltipComponent,
}: PieChartProps<T, C>) => {
  // SIZES
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const thickness = 40;

  const [tPos, setTPos] = useState<{ x: number; y: number; value: number; label: string } | null>(
    null
  );

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
    <>
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

                const textAnchor = () => {
                  if (data.length === 1) return 'middle';
                  return centroidAngle > Math.PI ? 'end' : 'start';
                };

                return (
                  <Group key={arc.data.id}>
                    <path
                      d={pie.path(arc)}
                      fill={getColor(arc)}
                      strokeWidth={selected?.includes(arc.data.id) ? 2 : 1}
                      onClick={() => {
                        if (onPathMouseClick) onPathMouseClick(arc.data);
                      }}
                      onMouseEnter={(e) => {
                        setTPos({
                          x: e.clientX,
                          y: e.clientY,
                          value: arc.data.value,
                          label: arc.data.label,
                        });
                        if (onPathMouseEnter) onPathMouseEnter(arc.data);
                      }}
                      onMouseMove={(e) => {
                        setTPos({
                          x: e.clientX,
                          y: e.clientY,
                          value: arc.data.value,
                          label: arc.data.label,
                        });
                      }}
                      onMouseLeave={() => {
                        setTPos(null);
                        if (onPathMouseLeave) onPathMouseLeave(arc.data);
                      }}
                      className={cn({
                        'cursor-pointer stroke-black/75': true,
                        'hover:stroke-black': true,
                      })}
                    />

                    <text
                      fill="black"
                      x={centroidX + offsets.x}
                      y={centroidY + offsets.y}
                      dy=".33em"
                      fontSize={9}
                      textAnchor={textAnchor()}
                      // textAnchor="middle"
                      pointerEvents="none"
                      className="text-xxs font-bold"
                    >
                      {`${format(getValue(arc))}`}
                    </text>
                  </Group>
                );
              });
            }}
          </Pie>
        </Group>
      </svg>

      <TooltipProvider delayDuration={0} skipDelayDuration={500}>
        <Tooltip open={!!tPos}>
          <TooltipTrigger asChild>
            <div
              className="pointer-events-none fixed h-0 w-0"
              style={{
                top: tPos?.y ?? 0,
                left: tPos?.x ?? 0,
              }}
            />
          </TooltipTrigger>

          <TooltipContent asChild sideOffset={2} key={tPos?.x + tPos?.y}>
            <TooltipComponent value={tPos?.value} label={tPos?.label} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default PieChart;
