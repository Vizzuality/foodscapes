import { useMemo } from 'react';

import { ParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear } from '@visx/scale';
import { BarStackHorizontal } from '@visx/shape';

import { FoodscapeData } from 'types/data';
import { Dataset } from 'types/datasets';
import { FoodscapeChartData } from 'types/foodscapes';

import { useData } from 'hooks/data';
import { useFoodscapes } from 'hooks/foodscapes';

interface FoodscapesChartParentProps {
  dataset: Dataset;
}
interface FoodscapesChartProps extends FoodscapesChartParentProps {
  width: number;
  height: number;
}

const FoodscapesChart = ({ width, height, dataset }: FoodscapesChartProps) => {
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
      <BarStackHorizontal<FoodscapeChartData>
        data={DATA}
        keys={KEYS}
        width={width}
        height={height}
        y={() => height}
        xScale={xScale}
        yScale={yScale}
        color={(d) => colorScale(+d)}
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

const FoodscapesChartParent = (props: FoodscapesChartParentProps) => {
  return (
    <ParentSize>
      {({ width, height }) => <FoodscapesChart {...props} width={width} height={height} />}
    </ParentSize>
  );
};

export default FoodscapesChartParent;
