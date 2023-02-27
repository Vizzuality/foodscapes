import { useMemo } from 'react';

import { ParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear } from '@visx/scale';
import { BarStackHorizontal } from '@visx/shape';

import { useData } from 'hooks/data';
import { useFoodscapes } from 'hooks/foodscapes';

import { FoodscapesLegendProps } from './legend';

interface FoodscapesLegendWidgetProps extends FoodscapesLegendProps {
  width: number;
  height: number;
}

const FoodscapesLegendWidget = ({ width, height, dataset }: FoodscapesLegendWidgetProps) => {
  const { data: foodscapesData } = useFoodscapes();

  const { data } = useData({
    sql: dataset.widget.sql,
    shape: 'array',
  });

  const KEYS = useMemo(() => {
    return data.sort((a, b) => a.soil_groups - b.soil_groups).map((d) => d.id);
  }, [data]);
  const TOTAL = data.reduce((acc, curr) => acc + curr.value, 0);

  const DATA = useMemo<Record<keyof typeof KEYS, number>[]>(() => {
    return [
      data.reduce((acc, curr) => {
        acc[curr.id] = curr.value;
        return acc;
      }, {} as Record<keyof typeof KEYS, number>),
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
      range: [0, height],
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

  return (
    <svg width={width} height={height}>
      <BarStackHorizontal<Record<keyof typeof KEYS, number>, number>
        data={DATA}
        keys={KEYS}
        width={width}
        height={height}
        y={() => height}
        xScale={xScale}
        yScale={yScale}
        color={colorScale}
      >
        {(barStacks) =>
          barStacks.map((barStack) =>
            barStack.bars.map((bar) => (
              <rect
                key={`bar-stack-${barStack.index}-${bar.index}`}
                x={bar.x}
                y={bar.y}
                width={bar.width}
                height={bar.height}
                fill={bar.color}
              />
            ))
          )
        }
      </BarStackHorizontal>
    </svg>
  );
};

const FoodscapesLegendWidgetParent = (props: FoodscapesLegendProps) => {
  return (
    <ParentSize>
      {({ width, height }) => <FoodscapesLegendWidget {...props} width={width} height={height} />}
    </ParentSize>
  );
};

export default FoodscapesLegendWidgetParent;
