import { useCallback, useMemo, useState } from 'react';

import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear } from '@visx/scale';
import { BarStackHorizontal } from '@visx/shape';
import { BarGroupBar, SeriesPoint } from '@visx/shape/lib/types';

import { FoodscapeData } from 'types/data';
import { Dataset } from 'types/datasets';
import { FoodscapeChartData } from 'types/foodscapes';

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

  const { data: foodscapesData } = useFoodscapes();

  const { data } = useData<FoodscapeData>({
    sql: dataset.widget.sql,
    shape: 'array',
  });

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

  const xScale = useMemo(() => {
    return scaleLinear<number>({
      domain: [0, TOTAL],
      range: [0, width],
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
    <svg width={width} height={height}>
      <Group top={1}>
        <BarStackHorizontal<FoodscapeChartData, number>
          data={DATA}
          keys={KEYS}
          width={width - 2}
          height={height - 2}
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
                    <rect
                      x={bar.x}
                      y={bar.y}
                      width={bar.width}
                      height={bar.height}
                      fill={bar.color}
                      fillOpacity={selected?.length ? opacity : 1}
                      {...(interactive && {
                        onClick: () => handleBarClick(bar),
                        onMouseEnter: () => setHover(bar.key),
                        onMouseLeave: () => setHover(null),
                      })}
                      cursor={interactive ? 'pointer' : 'default'}
                    />

                    {hover === bar.key && (
                      <rect
                        x={bar.x}
                        y={bar.y + 1}
                        width={bar.width}
                        height={bar.height - 1}
                        fill="transparent"
                        stroke="#1C274A"
                        strokeWidth={1}
                        pointerEvents="none"
                        shapeRendering="crispEdges"
                      />
                    )}

                    {selected?.includes(bar.key) && (
                      <rect
                        x={bar.x}
                        y={bar.y}
                        width={bar.width}
                        height={bar.height}
                        fill="transparent"
                        stroke="#1C274A"
                        strokeWidth={2}
                        pointerEvents="none"
                        shapeRendering="crispEdges"
                      />
                    )}
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
            width={width}
            height={height - 3}
            fill="transparent"
            stroke="#1C274A"
            strokeWidth={1}
            pointerEvents="none"
            shapeRendering="crispEdges"
          />
        )}
      </Group>
    </svg>
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
