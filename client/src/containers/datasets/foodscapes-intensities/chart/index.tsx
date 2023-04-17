import { useCallback, useMemo } from 'react';

import { foodscapesAtom } from 'store/explore-map';

import { ParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear } from '@visx/scale';
import { BarGroupBar, SeriesPoint } from '@visx/shape/lib/types';
import { useRecoilValue } from 'recoil';

import { FoodscapeIntensityData } from 'types/data';
import { Dataset } from 'types/datasets';
import { FoodscapeIntensityChartData } from 'types/foodscapes-intensities';

import { useData } from 'hooks/data';
import { useFoodscapesIntensities } from 'hooks/foodscapes-intensities';

import HorizontalStackedBar from 'components/charts/horizontal-stacked-bar';

import { FoodscapesIntensitiesChartTooltip } from './tooltips';

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
  const foodscapes = useRecoilValue(foodscapesAtom);

  // DATA
  const { data: foodscapesIntensitiesData } = useFoodscapesIntensities();

  const { data } = useData<FoodscapeIntensityData>({
    sql: dataset.widget.sql,
    foodscapes,
    shape: 'array',
  });

  // CONFIG
  const KEYS = useMemo(() => {
    return data.map((d) => d.id);
  }, [data]);
  const TOTAL = data.reduce((acc, curr) => acc + curr.value, 0);

  // SCALES
  const xScale = useMemo(() => {
    return scaleLinear<number>({
      domain: [0, TOTAL],
      range: [0, width - 4],
      round: true,
    });
  }, [width, TOTAL]);

  const yScale = useMemo(() => {
    return scaleBand<number>({
      domain: [],
      range: [0, height - 4],
    });
  }, [height]);

  const colorScale = useMemo(() => {
    return scaleLinear<string>({
      domain: KEYS,
      range: KEYS.map((key) => {
        const { color } = foodscapesIntensitiesData.find((d) => d.value === key) || {};
        return color;
      }),
    });
  }, [foodscapesIntensitiesData, KEYS]);

  const handleBarClick = useCallback(
    (
      bar: Omit<BarGroupBar<number>, 'value' | 'key'> & {
        bar: SeriesPoint<FoodscapeIntensityChartData>;
        key: number;
      }
    ) => {
      const { key } = bar;
      if (onBarClick) onBarClick(key);
    },
    [onBarClick]
  );

  return (
    <HorizontalStackedBar<FoodscapeIntensityData, FoodscapeIntensityChartData>
      data={data}
      width={width}
      height={height}
      selected={selected}
      interactive={interactive}
      xScale={xScale}
      yScale={yScale}
      colorScale={colorScale}
      onBarClick={handleBarClick}
      TooltipComponent={FoodscapesIntensitiesChartTooltip}
    />
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
