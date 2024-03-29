import { useMemo } from 'react';

import { Annotation, HtmlLabel } from '@visx/annotation';
import { AxisBottom } from '@visx/axis';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'usehooks-ts';

import { screens } from 'styles/styles.config';

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

  const lg = useMediaQuery(`(min-width: ${screens.lg})`);

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(x),
        padding: lg ? 0.7 : 0.55,
      }),
    [data, xMax, lg]
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

  return (
    <svg width={width} height={height}>
      <Group top={margin.top} left={margin.left}>
        {data.map((d, i) => {
          const label = x(d);
          const w = xScale.bandwidth();
          const h = yMax - yScale(y(d));
          const barX = xScale(label);
          const barY = yMax - h;

          const polygonX = {
            x1: barX + w * 0.5,
            x2: barX + w,
            x3: barX,
          };

          const polygonY = {
            initialY1: barY,
            y1: barY - w * 0.4,
            y2: barY,
            y3: barY,
          };

          return (
            <Group key={i}>
              <motion.rect
                key={`bar-${label}`}
                x={barX}
                width={w}
                initial={{
                  height: 0,
                  y: yMax,
                }}
                animate={{
                  height: h,
                  y: barY,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                  ease: 'linear',
                }}
                fill="rgba(255,255,255)"
              />
              {/* Triangle */}
              <path
                d={`
                  M
                  ${polygonX.x1},${polygonY.initialY1}
                  ${polygonX.x2},${polygonY.y2}
                  ${polygonX.x3},${polygonY.y3}
                  z
                `}
                fill="rgba(255,255,255)"
              >
                <animate
                  attributeName="d"
                  attributeType="XML"
                  to={`M${polygonX.x1},${polygonY.y1} ${polygonX.x2},${polygonY.y2} ${polygonX.x3},${polygonY.y3}z`}
                  begin="1.01s"
                  dur="0.125s"
                  fill="freeze"
                />
              </path>

              <Annotation x={barX + w} y={lg ? barY : barY - w * 0.4} dx={lg ? 0 : -w / 2} dy={0}>
                <HtmlLabel horizontalAnchor="start" verticalAnchor="end" showAnchorLine={false}>
                  <motion.div
                    className="whitespace-nowrap font-semibold text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: 1,
                    }}
                  >
                    <span className="text-lg">+ {d.value.toLocaleString()} $</span>
                    <span className="text-sm">/Ha</span>
                  </motion.div>
                </HtmlLabel>
              </Annotation>
            </Group>
          );
        })}

        <AxisBottom
          scale={xScale}
          top={yMax}
          hideAxisLine
          hideTicks
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

export default BarChart;
